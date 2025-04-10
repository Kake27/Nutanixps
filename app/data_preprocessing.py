import pickle
import os
import pandas as pd

ENCODER_DIR = "encoders"

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("xgb_model.pkl", "rb") as f:
    model = pickle.load(f)

def load_encoder(name):
    path = os.path.join(ENCODER_DIR, f"{name}.pkl")
    with open(path, "rb") as f:
        return pickle.load(f)

airline_encoder = load_encoder("airline_encoder")
flight_encoder = load_encoder("flight_encoder")
source_city_encoder = load_encoder("source_city_encoder")
departure_time_encoder = load_encoder("departure_time_encoder")
stops_encoder = load_encoder("stops_encoder")
arrival_time_encoder = load_encoder("arrival_time_encoder")
destination_city_encoder = load_encoder("destination_city_encoder")
class_encoder = load_encoder("class_encoder")

df = pd.read_csv('available.csv')

df["airline"] = airline_encoder.transform(df["airline"])
df["flight"] = flight_encoder.transform(df["flight"])
df["source_city"] = source_city_encoder.transform(df["source_city"])
df["departure_time"] = departure_time_encoder.transform(df["departure_time"])
df["stops"] = stops_encoder.transform(df["stops"])
df["arrival_time"] = arrival_time_encoder.transform(df["arrival_time"])
df["destination_city"] = destination_city_encoder.transform(df["destination_city"])
df["class"] = class_encoder.transform(df["class"])
df["days_left"] = 20

feature_columns = [
    "airline", "flight", "source_city", "departure_time", "stops",
    "arrival_time", "destination_city", "class", "duration", "days_left"
]

X = df[feature_columns]
X_scaled = scaler.transform(X)
prediction = model.predict(X_scaled)
print("Predicted fares:", prediction[:10])

