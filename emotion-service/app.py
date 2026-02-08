from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os

app = FastAPI()

# Load emotion detection model
model = load_model("model/model.h5", compile=False)
emotions = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]

# Load Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

@app.post("/predict")
async def predict_emotion(image: UploadFile = File(...)):
    """
    Accepts image, detects face, predicts emotion
    Returns: {"emotion": "happy", "confidence": 0.82}
    """
    try:
        # Read image
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image")
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        # No face detected → return neutral with low confidence
        if len(faces) == 0:
            return {"emotion": "neutral", "confidence": 0.3}
        
        # Process first detected face
        (x, y, w, h) = faces[0]
        face_roi = gray[y:y+h, x:x+w]
        face_roi = cv2.resize(face_roi, (64, 64))
        face_roi = face_roi / 255.0
        face_roi = np.expand_dims(face_roi, axis=0)
        face_roi = np.expand_dims(face_roi, axis=-1)
        
        # Predict emotion
        predictions = model.predict(face_roi)
        emotion_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][emotion_idx])
        
        # Map to simplified emotions (7 classes → 4 classes)
        emotion_map = {
            "angry": "angry",
            "disgust": "angry",
            "fear": "sad",
            "happy": "happy",
            "sad": "sad",
            "surprise": "happy",
            "neutral": "neutral"
        }
        
        detected_emotion = emotions[emotion_idx]
        final_emotion = emotion_map.get(detected_emotion, "neutral")
        
        return {"emotion": final_emotion, "confidence": confidence}
    
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy"}
