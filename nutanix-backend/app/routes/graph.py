from fastapi import APIRouter, HTTPException
from app.models.model_loader import model, scaler
from app.preprocessing.encoder import encode_features
from app.preprocessing.find import filter_flights
import pandas as pd
import traceback
from pydantic import BaseModel
from datetime import datetime, timedelta
import os
import random

router = APIRouter()

class PredictionRequest(BaseModel):
    from_city: str
    to_city: str
    departure: str

async def predict(from_city: str, to_city: str, days: int):
    try:
        # print(f"Received graph request: {from_city}, {to_city}, {days}")
        # Calculate days until departure
        try:
            print(f"Days until departure: {days}")
        except ValueError as e:
            print(f"Error during prediction: {str(e)}")
            raise HTTPException(status_code=422, detail="Invalid date format. Please use YYYY-MM-DD")
        
        # Filter flights
        current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        print(f"Current directory: {current_dir}")
        try:
            filter_flights(from_city, to_city)
        except ValueError as e:
            print(f"Error during prediction: {str(e)}")
            raise HTTPException(status_code=404, detail=str(e))
        except FileNotFoundError as e:
            print(f"File not found error: {str(e)}")
            raise HTTPException(status_code=404, detail=f"Required file not found: {str(e)}")


        encoded_row = encode_features(days)
        print("Feature encoding completed.")

        feature_columns = [
            "airline", "flight", "source_city", "departure_time", "stops",
            "arrival_time", "destination_city", "class", "duration", "days_left"
        ]

        X = encoded_row[feature_columns]
        X_scaled = scaler.transform(X)
        prediction = model.predict(X_scaled)


        df = pd.read_csv(os.path.join(current_dir, "available.csv"))
        
        prices = [int(i) for i in prediction]
        df["predicted_fare"] = prices

        df.sort_values(by="predicted_fare", ascending=True, inplace=True)

        df.to_csv(os.path.join(current_dir, "available.csv"), index=False)

        return int(df.iloc[0]["predicted_fare"])

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")
    

@router.post("/graphs")
async def get_graphs(request: PredictionRequest):
    try:
        try:
            departure_date = datetime.strptime(request.departure, "%Y-%m-%d")
            days_left = (departure_date - datetime.now()).days 
        except ValueError as e:
            print(f"Error during prediction: {str(e)}")
            raise HTTPException(status_code=422, detail="Invalid date format. Please use YYYY-MM-DD")

        date_prices = []
        currdate = datetime.now()
        while(days_left>=0):
            price = await predict(request.from_city, request.to_city, days_left)
            date_prices.append({"date": currdate.strftime("%Y-%m-%d"), "price": price})
            days_left -= 1
            currdate += timedelta(days=1)

        return {"graph_predictions": date_prices}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during getting graphs: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error during getting graphs: {str(e)}")
