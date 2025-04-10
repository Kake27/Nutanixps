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
import random

router = APIRouter()

class PredictionRequest(BaseModel):
    from_city: str
    to_city: str
    departure: str

@router.post("/predict")
async def predict(request: PredictionRequest):
    try:
        print(f"Received prediction request: {request}")
        # Calculate days until departure
        try:
            departure_date = datetime.strptime(request.departure, "%Y-%m-%d")
            days_left = (departure_date - datetime.now()).days
            print(f"Days until departure: {days_left}")
        except ValueError as e:
            print(f"Error during prediction: {str(e)}")
            raise HTTPException(status_code=422, detail="Invalid date format. Please use YYYY-MM-DD")
        
        # Filter flights
        current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        print(f"Current directory: {current_dir}")
        try:
            filter_flights(request.from_city, request.to_city)
            print("Filtered flights based on source and destination.")
        except ValueError as e:
            print(f"Error during prediction: {str(e)}")
            raise HTTPException(status_code=404, detail=str(e))
        except FileNotFoundError as e:
            print(f"File not found error: {str(e)}")
            raise HTTPException(status_code=404, detail=f"Required file not found: {str(e)}")

        # Encode features
        encoded_row = encode_features(days_left)
        print("Feature encoding completed.")

        # Define feature columns
        feature_columns = [
            "airline", "flight", "source_city", "departure_time", "stops",
            "arrival_time", "destination_city", "class", "duration", "days_left"
        ]

        # Prepare data for prediction
        X = encoded_row[feature_columns]
        X_scaled = scaler.transform(X)
        prediction = model.predict(X_scaled)

        # Update available.csv with predictions
        df = pd.read_csv(os.path.join(current_dir, "available.csv"))
        
        prices = [int(int(i)+random.randint(1000, 2500)) for i in prediction]
        df["predicted_fare"] = prices

        df.sort_values(by="predicted_fare", ascending=True, inplace=True)

        df.to_csv(os.path.join(current_dir, "available.csv"), index=False)
        print("Updated available.csv with predictions")

        return {"predicted_price": int(df.iloc[0]["predicted_fare"])}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")