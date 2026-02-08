import urllib.request
import os

MODEL_URL = "https://github.com/oarriaga/face_classification/raw/master/trained_models/emotion_models/fer2013_mini_XCEPTION.102-0.66.hdf5"
MODEL_PATH = "model/model.h5"

def download_model():
    print(f"Downloading pre-trained FER-2013 model from: {MODEL_URL}")
    print(f"Saving to: {MODEL_PATH}")
    
    try:
        urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
        print("Download complete!")
        print(f"File size: {os.path.getsize(MODEL_PATH) / 1024 / 1024:.2f} MB")
        print("Verifying file integrity (HDF5 signature)...")
        with open(MODEL_PATH, 'rb') as f:
            header = f.read(8)
            # HDF5 magic number: \x89HDF\r\n\x1a\n
            if header == b'\x89HDF\r\n\x1a\n':
                print("Verification successful: Valid HDF5 file.")
            else:
                 print("Verification failed: Not a valid HDF5 file.")
    except Exception as e:
        print(f"Error downloading model: {e}")

if __name__ == "__main__":
    # Ensure model directory exists
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    download_model()
