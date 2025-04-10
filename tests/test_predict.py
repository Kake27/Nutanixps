from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_predict_route():
    # Test data
    test_data = {
        "from_city": "DEL",
        "to_city": "BOM",
        "departure": "2024-04-20"
    }
    
    # Make request
    response = client.post("/predict/", json=test_data)
    
    # Check status code
    assert response.status_code == 200
    
    # Check response structure
    data = response.json()
    assert "predicted_price" in data
    assert isinstance(data["predicted_price"], (int, float))

def test_predict_route_invalid_cities():
    # Test data with invalid cities
    test_data = {
        "from_city": "INVALID",
        "to_city": "INVALID",
        "departure": "2024-04-20"
    }
    
    # Make request
    response = client.post("/predict/", json=test_data)
    
    # Check status code
    assert response.status_code == 404

def test_predict_route_invalid_date():
    # Test data with invalid date format
    test_data = {
        "from_city": "DEL",
        "to_city": "BOM",
        "departure": "invalid-date"
    }
    
    # Make request
    response = client.post("/predict/", json=test_data)
    
    # Check status code
    assert response.status_code == 422  # FastAPI validation error 