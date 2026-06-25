import cv2
import requests
import time

API_URL = "http://localhost:5001/predict"

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Cannot open camera")
    exit()

print("==================================================")
print("Camera opened successfully!")
print("Press 'SPACE' to capture an image and predict.")
print("Press 'q' to quit.")
print("==================================================")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    # Add instructions on the screen
    cv2.putText(frame, "Press SPACE to predict, Q to quit", (10, 30), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
    
    cv2.imshow("SmartSort PC Camera Test", frame)

    key = cv2.waitKey(1) & 0xFF
    if key == ord(' '):  # Spacebar pressed
        print("Capturing and sending image to API...")
        # Encode frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        if ret:
            try:
                # Send to API
                files = {'image': ('capture.jpg', buffer.tobytes(), 'image/jpeg')}
                response = requests.post(API_URL, files=files, timeout=5)
                
                if response.status_code == 200:
                    data = response.json()
                    print(f"✅ Prediction: {data.get('bin')} | Confidence: {data.get('confidence')}%")
                else:
                    print(f"❌ Error from API: {response.text}")
            except requests.exceptions.ConnectionError:
                print("❌ Connection error: Could not connect to the API. Is your app.py server running on port 5001?")
            except Exception as e:
                print(f"❌ Error: {e}")
                
    elif key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
