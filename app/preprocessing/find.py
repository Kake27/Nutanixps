import pandas as pd

def filter_flights(source, dest):
    df=pd.read_csv("flights.csv")
    filtered_flights = df[(df['source_city'] == source) & (df['destination_city'] == dest)]

    output_file = "available.csv"
    filtered_flights.to_csv(output_file, index=False)





