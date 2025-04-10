# Flight Price Prediction System

A full-stack application for predicting flight prices using machine learning models and visualizing price trends through interactive graphs.

## Project Overview

This project consists of two main components:
- A modern React frontend for user interaction and data visualization
- A Python FastAPI backend powered by machine learning for price predictions

## Features

### Frontend
- Modern, responsive UI built with React and TailwindCSS
- Interactive flight search form
- Real-time price predictions
- Dynamic graph visualizations using Chart.js
- Smooth animations and transitions
- Mobile-friendly design

### Backend
- FastAPI-based REST API
- Machine learning models for price prediction
- Data processing and analysis
- CSV data integration
- Efficient API endpoints

## Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- Chart.js
- React Router DOM
- Axios
- ESLint

### Backend
- Python
- FastAPI
- Scikit-learn
- XGBoost
- Pandas
- NumPy
- Uvicorn

## Prerequisites

### Frontend
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Backend
- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flight-price-prediction
```

2. Frontend Setup:
```bash
cd nutanix-frontend
npm install
```

3. Backend Setup:
```bash
cd nutanix-backend
pip install -r requirements.txt
```

## Running the Application

1. Start the Backend Server:
```bash
cd nutanix-backend
python run_servers.py
```

2. Start the Frontend Development Server:
```bash
cd nutanix-frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:8000`.

## Project Structure

```
flight-price-prediction/
├── nutanix-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── nutanix-backend/
│   ├── app/
│   ├── flights.csv
│   ├── available.csv
│   ├── requirements.txt
│   └── run_servers.py
└── README.md
```

## API Endpoints

The backend provides several endpoints for:
- Flight price predictions
- Historical price data
- Available flight routes
- Price trend analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
