import pickle
import pandas as pd
import os

def load_encoder(name):
    try:
        current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        encoder_path = os.path.join(current_dir, "app", "models", "encoders", f"{name}.pkl")
        with open(encoder_path, "rb") as f:
            return pickle.load(f)
    except FileNotFoundError:
        print(f"Error: Encoder file not found: {encoder_path}")
        raise
    except Exception as e:
        print(f"Error loading encoder {name}: {str(e)}")
        raise

def encode_features(days):
    try:
        # Load encoders
        airline_encoder = load_encoder("airline_encoder")
        flight_encoder = load_encoder("flight_encoder")
        source_city_encoder = load_encoder("source_city_encoder")
        departure_time_encoder = load_encoder("departure_time_encoder")
        stops_encoder = load_encoder("stops_encoder")
        arrival_time_encoder = load_encoder("arrival_time_encoder")
        destination_city_encoder = load_encoder("destination_city_encoder")
        class_encoder = load_encoder("class_encoder")

        # Read available flights
        current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        available_path = os.path.join(current_dir, "available.csv")
        
        if not os.path.exists(available_path):
            raise FileNotFoundError("available.csv not found. Please filter flights first.")
            
        df = pd.read_csv(available_path)

        # Encode features
        df["airline"] = airline_encoder.transform(df["airline"])
        df["flight"] = flight_encoder.transform(df["flight"])
        df["source_city"] = source_city_encoder.transform(df["source_city"])
        df["departure_time"] = departure_time_encoder.transform(df["departure_time"])
        df["stops"] = stops_encoder.transform(df["stops"])
        df["arrival_time"] = arrival_time_encoder.transform(df["arrival_time"])
        df["destination_city"] = destination_city_encoder.transform(df["destination_city"])
        df["class"] = class_encoder.transform(df["class"])
        df["days_left"] = days

        return df
    except Exception as e:
        print(f"Error in encode_features: {str(e)}")
        raise

