from fastapi import APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models.model_loader import model, scaler
from app.preprocessing.encoder import encode_features
from app.preprocessing.find import filter_flights
import pandas as pd
import traceback
from pydantic import BaseModel
from datetime import datetime
import os

router = APIRouter()

class PredictionRequest(BaseModel):
    from_city: str
    to_city: str
    departure: str

@router.post("/")
async def predict(request: PredictionRequest):
    try:
        print(f"Received prediction request: {request}")
        # Calculate days until departure
        departure_date = datetime.strptime(request.departure, "%Y-%m-%d")
        days_left = (departure_date - datetime.now()).days
        print(f"Days until departure: {days_left}")
        
        # Filter flights
        current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        print(f"Current directory: {current_dir}")
        filter_flights(request.from_city, request.to_city)
        print("Filtered flights based on source and destination.")

        # Encode features
        encoded_row = encode_features(days_left)
        print("Feature encoding completed.")
        print(f"Encoded features: {encoded_row}")

        # Define feature columns
        feature_columns = [
            "airline", "flight", "source_city", "departure_time", "stops",
            "arrival_time", "destination_city", "class", "duration", "days_left"
        ]

        # Prepare data for prediction
        X = encoded_row[feature_columns]
        X_scaled = scaler.transform(X)
        prediction = model.predict(X_scaled)
        print(f"Prediction made: {prediction}")

        # Update available.csv with predictions
        df = pd.read_csv(os.path.join(current_dir, "available.csv"))
        prices = [int(i) for i in prediction]
        df["predicted_fare"] = prices
        df.to_csv(os.path.join(current_dir, "available.csv"), index=False)
        print("Updated available.csv with predictions")

        return {"predicted_price": prediction.tolist()[0]}

    except FileNotFoundError as e:
        print(f"File not found error: {str(e)}")
        raise HTTPException(status_code=404, detail=f"Required file not found: {str(e)}")
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")