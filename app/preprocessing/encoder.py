import pickle
import pandas as pd
import os

ENCODER_DIR = "app\models\encoders"

def load_encoder(name):
    path = os.path.join(ENCODER_DIR, f"{name}.pkl")
    with open(path, "rb") as f:
        return pickle.load(f)

def encode_features(days):
    airline_encoder = load_encoder("airline_encoder")
    flight_encoder = load_encoder("flight_encoder")
    source_city_encoder = load_encoder("source_city_encoder")
    departure_time_encoder = load_encoder("departure_time_encoder")
    stops_encoder = load_encoder("stops_encoder")
    arrival_time_encoder = load_encoder("arrival_time_encoder")
    destination_city_encoder = load_encoder("destination_city_encoder")
    class_encoder = load_encoder("class_encoder")

    df = pd.read_csv("available.csv")

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

