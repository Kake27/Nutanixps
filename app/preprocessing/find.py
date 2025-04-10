import pandas as pd
import os

# City code to name mapping
CITY_MAPPING = {
    'DEL': 'Delhi',
    'BOM': 'Mumbai',
    'BLR': 'Bengaluru',
    'HYD': 'Hyderabad',
    'MAA': 'Chennai',
    'CCU': 'Kolkata',
    'PNQ': 'Pune',
    'GOI': 'Goa',
    'AMD': 'Ahmedabad',
    'COK': 'Kochi'
}

def filter_flights(source, dest):
    try:
        # Convert city codes to names
        source_city = CITY_MAPPING.get(source, source)
        dest_city = CITY_MAPPING.get(dest, dest)
        
        # Read the flights data
        current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        flights_path = os.path.join(current_dir, "flights.csv")
        df = pd.read_csv(flights_path)
        
        # Filter flights
        filtered_flights = df[(df['source_city'] == source_city) & (df['destination_city'] == dest_city)]
        
        if len(filtered_flights) == 0:
            raise ValueError(f"No flights found from {source_city} to {dest_city}")
        
        # Save filtered flights
        output_path = os.path.join(current_dir, "available.csv")
        filtered_flights.to_csv(output_path, index=False)
        print(f"Found {len(filtered_flights)} flights from {source_city} to {dest_city}")
        
    except FileNotFoundError:
        raise FileNotFoundError("flights.csv not found")
    except Exception as e:
        print(f"Error in filter_flights: {str(e)}")
        raise





