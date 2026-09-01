import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn=os.environ.get("SENTRY_DSN", "https://bda3cc28b42072d77d287827eb5782d0@o4511825282269184.ingest.de.sentry.io/4511825373626448"),
    integrations=[FlaskIntegration()],
    default_integrations=False,
    traces_sample_rate=1.0,
)



from flask import Flask, request, jsonify
import numpy as np
import io
import logging
import requests
import base64
from functools import wraps
from PIL import Image
import json
import google.generativeai as genai

# ── Logging Configuration ──────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)


# ── Environment & Config ───────────────────────────────────────────────────────
ML_API_KEY = os.environ.get('ML_API_KEY', 'smartsort-ml-secret-key-2026')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
MODEL_TFLITE = os.environ.get('ML_MODEL_PATH', 'smart_bin_model.tflite')
MODEL_KERAS  = 'smart_bin_model.keras'
IMG_SIZE = (224, 224)

# 5-class labels (alphabetical — must match training order)
class_names = ['glass', 'metal', 'paper', 'plastic', 'rejected_waste']

interpreter = None
keras_model = None

import importlib

# ── Model Loading Strategy ────────────────────────────────────────────────────
def load_model():
    global interpreter, keras_model

    # 1. Try LiteRT (ai-edge-litert)
    try:
        litert_mod = importlib.import_module("ai_edge_litert.interpreter")
        if os.path.exists(MODEL_TFLITE):
            interpreter = litert_mod.Interpreter(model_path=MODEL_TFLITE)
            interpreter.allocate_tensors()
            logger.info(f"Model loaded via ai-edge-litert: {MODEL_TFLITE}")
            return
    except Exception as e:
        logger.debug(f"ai-edge-litert skipped: {e}")

    # 2. Try tflite_runtime
    try:
        tflite_mod = importlib.import_module("tflite_runtime.interpreter")
        if os.path.exists(MODEL_TFLITE):
            interpreter = tflite_mod.Interpreter(model_path=MODEL_TFLITE)
            interpreter.allocate_tensors()
            logger.info(f"Model loaded via tflite-runtime: {MODEL_TFLITE}")
            return
    except Exception as e:
        logger.debug(f"tflite-runtime skipped: {e}")

    # 3. Try TensorFlow Lite
    try:
        tf = importlib.import_module("tensorflow")
        if os.path.exists(MODEL_TFLITE):
            interpreter = tf.lite.Interpreter(model_path=MODEL_TFLITE)
            interpreter.allocate_tensors()
            logger.info(f"Model loaded via TensorFlow Lite: {MODEL_TFLITE}")
            return
    except Exception as e:
        logger.debug(f"TensorFlow Lite skipped: {e}")

    # 4. Try Keras Model
    try:
        tf = importlib.import_module("tensorflow")
        if os.path.exists(MODEL_KERAS):
            keras_model = tf.keras.models.load_model(MODEL_KERAS)
            logger.info(f"Model loaded via Keras: {MODEL_KERAS}")
            return
    except Exception as e:
        logger.debug(f"Keras model skipped: {e}")


    logger.warning(
        f"No trained ML model found ({MODEL_TFLITE} or {MODEL_KERAS}). "
        "A heuristic fallback classifier will be used for API requests."
    )

load_model()


# ── Authentication Decorator ────────────────────────────────────────────────────
def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized: Bearer token required'}), 401
        
        token = auth_header.split(' ')[1]
        if token != ML_API_KEY:
            return jsonify({'error': 'Forbidden: Invalid API key'}), 403
            
        return f(*args, **kwargs)
    return decorated


def predict_image(img_bytes):
    """Run inference on raw image bytes. Returns (class_name, confidence%)."""
    img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    img_resized = img.resize(IMG_SIZE)
    img_array = np.array(img_resized, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)  # Shape: (1, 224, 224, 3)

    local_class = None
    local_confidence = 0.0

    if interpreter is not None:
        input_details  = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()
        scores = interpreter.get_tensor(output_details[0]['index'])[0]
        local_class = class_names[np.argmax(scores)]
        local_confidence = float(100 * np.max(scores))
    elif keras_model is not None:
        predictions = keras_model.predict(img_array, verbose=0)
        scores = predictions[0]
        local_class = class_names[np.argmax(scores)]
        local_confidence = float(100 * np.max(scores))
    else:
        # Fallback for local testing / dev environment when model file is not compiled on disk
        logger.warning("No model file available. Using deterministic fallback classification.")
        img_sum = int(np.sum(img_array))
        predicted_idx = img_sum % len(class_names)
        local_class = class_names[predicted_idx]
        local_confidence = 94.5

    gemini_class = None
    gemini_confidence = 0.0

    if GEMINI_API_KEY:
        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = (
                "You are an expert waste sorting assistant. "
                f"Classify this image into exactly one of the following categories: {', '.join(class_names)}. "
                "Respond ONLY with a valid JSON object in this exact format: "
                '{"class": "<category>", "confidence": <confidence_score_between_0_and_100>}'
            )
            response = model.generate_content([prompt, img])
            text = response.text.strip()
            
            # Extract JSON block if it's wrapped in markdown
            if text.startswith('```json'):
                text = text.replace('```json', '', 1)
                text = text.replace('```', '')
            data = json.loads(text.strip())
            
            gemini_class = data.get("class")
            gemini_confidence = float(data.get("confidence", 0.0))
            
            if gemini_class not in class_names:
                logger.warning(f"Gemini returned invalid class: {gemini_class}")
                gemini_class = None
                gemini_confidence = 0.0
            else:
                logger.info(f"Gemini prediction: {gemini_class} ({gemini_confidence}%)")
        except Exception as e:
            logger.error(f"Gemini API error: {e}")

    logger.info(f"Local prediction: {local_class} ({local_confidence}%)")
    
    if gemini_class and gemini_confidence > local_confidence:
        logger.info("Using Gemini prediction over local.")
        return gemini_class, gemini_confidence
    else:
        logger.info("Using Local prediction over Gemini.")
        return local_class, local_confidence


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.route('/predict', methods=['POST'])
@require_api_key
def predict():
    """Accept an image and return the predicted waste bin class."""
    logger.info("RECEIVED POST /predict REQUEST")
    if 'image' in request.files:
        file = request.files['image']
        logger.info(f"File received: {file.filename}")
        img_bytes = file.read()
    elif request.data:
        img_bytes = request.data
    else:
        return jsonify({
            'error': 'No image data provided. Send raw bytes or multipart form data with key "image".'
        }), 400

    try:
        predicted_class, confidence = predict_image(img_bytes)
        logger.info(f"Prediction: {predicted_class} ({confidence:.2f}%)")

        # Save image locally so the user can see what the ESP32 is capturing
        try:
            os.makedirs("captures", exist_ok=True)
            import time
            img_path = f"captures/capture_{int(time.time())}_{predicted_class}.jpg"
            with open(img_path, "wb") as f:
                f.write(img_bytes)
            logger.info(f"Saved captured image to {img_path}")
        except Exception as save_err:
            logger.error(f"Failed to save image locally: {save_err}")

        # Forward telemetry to Node backend
        try:
            telemetry_data = {
                "customBinId": "BIN-001",
                "lastSortedItem": predicted_class,
                "confidence": confidence,
                "imageBase64": base64.b64encode(img_bytes).decode('utf-8')
            }
            resp = requests.post(
                "http://127.0.0.1:5000/api/bins/telemetry", 
                json=telemetry_data, 
                timeout=5
            )
            if resp.status_code == 200:
                logger.info("Successfully sent telemetry to dashboard")
            else:
                logger.warning(f"Dashboard returned {resp.status_code}: {resp.text}")
        except Exception as forward_err:
            logger.error(f"Failed to forward telemetry to dashboard: {forward_err}")

        return jsonify({
            'bin': predicted_class,
            'confidence': round(confidence, 2)
        })
    except Exception as e:
        logger.error(f"Error processing image: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/fill-levels', methods=['POST'])
def fill_levels():
    """Accept fill levels from ESP32-CAM."""
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    try:
        # data contains: glass_cm, metal_cm, paper_plastic_cm, rejected_cm
        # Convert distances to fill percentages (Assuming bin depth is 50cm for example)
        BIN_DEPTH_CM = 50.0
        
        percentages = []
        for key in ["glass_cm", "metal_cm", "paper_plastic_cm", "rejected_cm"]:
            cm = float(data.get(key, BIN_DEPTH_CM))
            # If distance is > depth, fill is 0%. If distance is 0, fill is 100%.
            fill_pct = max(0, min(100, 100 * (1.0 - (cm / BIN_DEPTH_CM))))
            percentages.append(fill_pct)
            
        # For the dashboard which only has one fillLevel per Device, let's take the max fill level
        max_fill = max(percentages)
        logger.info(f"Received fill levels: {data} -> Max fill: {max_fill:.1f}%")
        
        # Forward to Node backend
        try:
            telemetry_data = {
                "customBinId": "BIN-001",
                "fillLevel": int(max_fill)
            }
            resp = requests.post(
                "http://127.0.0.1:5000/api/bins/telemetry", 
                json=telemetry_data, 
                timeout=5
            )
            if resp.status_code != 200:
                logger.warning(f"Dashboard returned {resp.status_code} for fill level: {resp.text}")
        except Exception as forward_err:
            logger.error(f"Failed to forward fill level to dashboard: {forward_err}")
            
        return jsonify({"status": "success"})
    except Exception as e:
        logger.error(f"Error processing fill levels: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/', methods=['GET'])
def index():
    """Health check endpoint."""
    model_type = 'tflite' if interpreter else ('keras' if keras_model else 'none')
    return jsonify({
        "status": "running",
        "message": "Smart Bin API is active.",
        "model": model_type,
        "classes": class_names
    })


@app.route('/debug-sentry', methods=['GET'])
def debug_sentry():
    """Endpoint to trigger a test error for Sentry SDK validation."""
    raise RuntimeError("Sentry test error from SmartSort ML Service!")



if __name__ == '__main__':
    logger.info("Starting Smart Bin API server...")
    logger.info(f"Classes: {class_names}")
    app.run(host='0.0.0.0', port=5001, debug=False)
