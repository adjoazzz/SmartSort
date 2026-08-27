import os
import glob
import json
import base64
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

def generate_html_audit():
    if not os.path.exists(MODEL_TFLITE):
        print("Model file not found.")
        return

    interpreter = litert.Interpreter(model_path=MODEL_TFLITE)
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    captures = glob.glob(os.path.join(CAPTURES_DIR, '*.jpg'))
    
    items = []
    for cap_path in sorted(captures, reverse=True):
        filename = os.path.basename(cap_path)
        try:
            img = Image.open(cap_path).convert('RGB')
            # Save small thumbnail base64 for html display
            thumb = img.copy()
            thumb.thumbnail((250, 250))
            import io
            buf = io.BytesIO()
            thumb.save(buf, format='JPEG')
            b64_img = base64.b64encode(buf.getvalue()).decode('utf-8')

            # Preprocess for model
            img_resized = img.resize((224, 224))
            img_arr = np.array(img_resized, dtype=np.float32)
            img_arr = np.expand_dims(img_arr, axis=0)

            interpreter.set_tensor(input_details[0]['index'], img_arr)
            interpreter.invoke()
            scores = interpreter.get_tensor(output_details[0]['index'])[0]

            top_idx = int(np.argmax(scores))
            predicted_label = CLASS_NAMES[top_idx]
            confidence = float(100 * np.max(scores))

            scores_dict = {c: float(s) * 100 for c, s in zip(CLASS_NAMES, scores)}

            items.append({
                'filename': filename,
                'b64': b64_img,
                'predicted_label': predicted_label,
                'confidence': round(confidence, 1),
                'scores': scores_dict
            })
        except Exception as e:
            print(f"Error reading {filename}: {e}")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartSort ML Terminal Audit Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
        <header class="mb-8 border-b border-slate-800 pb-4 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-emerald-400">SmartSort ML Prediction Audit</h1>
                <p class="text-slate-400 text-sm mt-1">Cross-checking {len(items)} stored captures against TFLite inference</p>
            </div>
            <div class="flex gap-4 text-center">
                <div class="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                    <span class="block text-2xl font-bold text-emerald-400">{len(items)}</span>
                    <span class="text-xs text-slate-400">Total Captures</span>
                </div>
                <div class="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                    <span class="block text-2xl font-bold text-amber-400">{len([i for i in items if i['confidence'] < 80])}</span>
                    <span class="text-xs text-slate-400">Low Confidence (&lt;80%)</span>
                </div>
            </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
"""
    for item in items:
        conf_color = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" if item['confidence'] >= 80 else "bg-amber-500/20 text-amber-400 border-amber-500/30"
        
        bars_html = ""
        for cls_name, score in item['scores'].items():
            is_top = cls_name == item['predicted_label']
            bar_color = "bg-emerald-500" if is_top else "bg-slate-600"
            text_style = "font-bold text-white" if is_top else "text-slate-400"
            bars_html += f"""
            <div class="text-xs mb-1">
                <div class="flex justify-between {text_style}">
                    <span>{cls_name}</span>
                    <span>{score:.1f}%</span>
                </div>
                <div class="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div class="{bar_color} h-full" style="width: {min(100, max(2, score))}%"></div>
                </div>
            </div>
            """

        html_content += f"""
            <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col shadow-lg">
                <div class="relative bg-black flex items-center justify-center h-48 border-b border-slate-700">
                    <img src="data:image/jpeg;base64,{item['b64']}" class="max-h-full max-w-full object-contain" alt="{item['filename']}">
                    <span class="absolute top-2 right-2 text-xs font-semibold px-2.5 py-1 rounded-full border {conf_color}">
                        {item['confidence']}% Conf
                    </span>
                </div>
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-3">
                            <span class="text-xs text-slate-400 font-mono truncate max-w-[150px]" title="{item['filename']}">{item['filename']}</span>
                            <span class="text-sm font-bold uppercase tracking-wider text-emerald-400">{item['predicted_label']}</span>
                        </div>
                        <div class="space-y-1">
                            {bars_html}
                        </div>
                    </div>
                </div>
            </div>
        """

    html_content += """
        </div>
    </div>
</body>
</html>
"""

    out_path = os.path.join(os.path.dirname(__file__), 'audit_report.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"HTML Audit Report generated: {out_path}")

if __name__ == '__main__':
    generate_html_audit()
