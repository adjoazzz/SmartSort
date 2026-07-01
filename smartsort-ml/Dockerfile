# Use a lightweight Python base image
FROM python:3.10-slim

# Install system dependencies needed for OpenCV and other media libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files and model files
COPY app.py .
COPY smart_bin_model.tflite .
COPY smart_bin_model.keras .

# Expose the API port
EXPOSE 5001

# Run the app
CMD ["python", "app.py"]
