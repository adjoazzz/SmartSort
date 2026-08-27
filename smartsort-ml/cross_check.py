import os
import glob
import json
import numpy as np
from PIL import Image

try:
    import ai_edge_litert.interpreter as litert
except ImportError:
    try:
        import tflite_runtime.interpreter as litert
    except ImportError:
        import tensorflow.lite as litert

MODEL_TFLITE = os.path.join(os.path.dirname(__file__), 'smart_bin_model.tflite')
CAPTURES_DIR = os.path.join(os.path.dirname(__file__), 'captures')
CLASS_NAMES = ['glass', 'metal', 'paper', 'plastic', 'rejected_waste']

def run_cross_check(confidence_threshold=80.0):
    if not os.path.exists(MODEL_TFLITE):
        print(f"Error: Model file {MODEL_TFLITE} not found.")
        return

    interpreter = litert.Interpreter(model_path=MODEL_TFLITE)
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    captures = glob.glob(os.path.join(CAPTURES_DIR, '*.jpg'))
    print(f"Found {len(captures)} stored captures in {CAPTURES_DIR}.\n")

    results = []
    class_distribution = {c: 0 for c in CLASS_NAMES}
    low_confidence_items = []
    mismatch_items = []

    for cap_path in sorted(captures):
        filename = os.path.basename(cap_path)
        
        # Parse stored filename: format capture_{timestamp}_{class}.jpg
        parts = filename.replace('.jpg', '').split('_')
        stored_label = parts[-1] if len(parts) >= 3 else "unknown"
        if stored_label == "waste": # handle rejected_waste filename split
            stored_label = "rejected_waste"

        # Open and preprocess image
        try:
            img = Image.open(cap_path).convert('RGB').resize((224, 224))
            img_arr = np.array(img, dtype=np.float32)
            img_arr = np.expand_dims(img_arr, axis=0)
        except Exception as e:
            print(f"Error processing image {filename}: {e}")
            continue

        # Run inference
        interpreter.set_tensor(input_details[0]['index'], img_arr)
        interpreter.invoke()
        scores = interpreter.get_tensor(output_details[0]['index'])[0]

        top_idx = int(np.argmax(scores))
        predicted_label = CLASS_NAMES[top_idx]
        confidence = float(100 * np.max(scores))

        class_distribution[predicted_label] += 1

        item = {
            'filename': filename,
            'stored_label': stored_label,
            'predicted_label': predicted_label,
            'confidence': round(confidence, 2),
            'scores': {c: round(float(s) * 100, 2) for c, s in zip(CLASS_NAMES, scores)},
            'matches_stored': (stored_label == predicted_label)
        }

        results.append(item)

        if confidence < confidence_threshold:
            low_confidence_items.append(item)

        if stored_label != "unknown" and stored_label != predicted_label:
            mismatch_items.append(item)

    # Print summary
    print("=" * 60)
    print("           ML PREDICTION CROSS-CHECK SUMMARY           ")
    print("=" * 60)
    print(f"Total Captures Evaluated: {len(results)}")
    print(f"Class Distribution: {json.dumps(class_distribution, indent=2)}")
    print(f"Low Confidence Predictions (< {confidence_threshold}%): {len(low_confidence_items)}")
    print(f"Filename vs Model Prediction Mismatches: {len(mismatch_items)}")
    print("=" * 60)

    if mismatch_items:
        print("\n--- Top Mismatches ---")
        for m in mismatch_items[:10]:
            print(f"Filename: {m['filename']}")
            print(f"  Stored: {m['stored_label']} | Model: {m['predicted_label']} ({m['confidence']}%)")

    if low_confidence_items:
        print("\n--- Low Confidence Predictions ---")
        for lc in low_confidence_items[:10]:
            print(f"Filename: {lc['filename']} -> Pred: {lc['predicted_label']} ({lc['confidence']}%)")

    # Save summary report
    report_path = os.path.join(os.path.dirname(__file__), 'cross_check_report.json')
    with open(report_path, 'w') as f:
        json.dump({
            'total_captures': len(results),
            'class_distribution': class_distribution,
            'low_confidence_count': len(low_confidence_items),
            'mismatch_count': len(mismatch_items),
            'results': results
        }, f, indent=2)
    print(f"\nDetailed report saved to: {report_path}")

if __name__ == '__main__':
    run_cross_check()
