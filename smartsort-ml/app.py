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

# ── Logging Configuration ──────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)


# ── Environment & Config ───────────────────────────────────────────────────────
ML_API_KEY = os.environ.get('ML_API_KEY', 'smartsort-ml-secret-key-2026')
MODEL_TFLITE = os.environ.get('ML_MODEL_PATH', 'smart_bin_model.tflite')
MODEL_KERAS  = 'smart_bin_model.keras'
IMG_SIZE = (224, 224)

# 5-class labels (alphabetical — must match training order)
class_names = ['glass', 'metal', 'paper', 'plastic', 'rejected_waste']

interpreter = None
keras_model = None

# Try LiteRT / TFLite runtime (lightweight, works on Python 3.13)
try:
    from ai_edge_litert.interpreter import Interpreter
    interpreter = Interpreter(model_path=MODEL_TFLITE)
    interpreter.allocate_tensors()
    logger.info(f"Model loaded via ai-edge-litert: {MODEL_TFLITE}")
except ImportError:
    try:
        import tflite_runtime.interpreter as tflite
        interpreter = tflite.Interpreter(model_path=MODEL_TFLITE)
        interpreter.allocate_tensors()
        logger.info(f"Model loaded via tflite-runtime: {MODEL_TFLITE}")
    except ImportError:
        try:
            import tensorflow as tf
            interpreter = tf.lite.Interpreter(model_path=MODEL_TFLITE)
            interpreter.allocate_tensors()
            logger.info(f"Model loaded via TensorFlow Lite: {MODEL_TFLITE}")
        except Exception:
            try:
                import tensorflow as tf
                keras_model = tf.keras.models.load_model(MODEL_KERAS)
                logger.info(f"Model loaded via Keras: {MODEL_KERAS}")
            except Exception as e:
                logger.error(f"Could not load any model: {e}")
                logger.error(f"Make sure {MODEL_TFLITE} or {MODEL_KERAS} exists.")

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
    img = img.resize(IMG_SIZE)
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)  # Shape: (1, 224, 224, 3)

    if interpreter is not None:
        input_details  = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()
        scores = interpreter.get_tensor(output_details[0]['index'])[0]
    elif keras_model is not None:
        predictions = keras_model.predict(img_array, verbose=0)
        scores = predictions[0]
    else:
        raise RuntimeError("No model loaded. Check startup logs.")

    predicted_class = class_names[np.argmax(scores)]
    confidence = float(100 * np.max(scores))
    return predicted_class, confidence


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.route('/predict', methods=['POST'])
@require_api_key
def predict():
    """Accept an image and return the predicted waste bin class."""
    if 'image' in request.files:
        file = request.files['image']
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
