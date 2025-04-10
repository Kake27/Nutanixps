import pickle
import os

def load_scaler():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        scaler_path = os.path.join(current_dir, "scaler.pkl")
        with open(scaler_path, "rb") as f:
            scaler = pickle.load(f)
        print("Scaler loaded successfully")
        return scaler
    except Exception as e:
        print(f"Error loading scaler: {str(e)}")
        raise

def load_model():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, "xgb_model.pkl")
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        print("Model loaded successfully")
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        raise

scaler = load_scaler()
model = load_model()