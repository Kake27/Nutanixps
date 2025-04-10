import pickle

def load_scaler():
    with open("app\models\scaler.pkl", "rb") as f:
        scaler = pickle.load(f)

    print("Scaler loaded successfully")
    return scaler

def load_model():
    with open(r"app\models\xgb_model.pkl", "rb") as f:
        model = pickle.load(f)

    print("Model loaded successfully")
    return model

scaler = load_scaler()
model = load_model()