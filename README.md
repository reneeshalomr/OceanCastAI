# 🌊 OceanCastAI

OceanCastAI is an AI-powered web application for exploring global Sea Surface Temperature (SST) data using satellite observations and machine learning.

## Features

- 🌍 Interactive world map
- 📍 Click any location to retrieve SST
- 📈 Monthly SST trend visualization
- 🤖 AI SST forecasting using Random Forest
- 🌡 SST anomaly analysis
- 📊 Model performance metrics
- 📅 Multi-year dataset support
- ⚡ FastAPI backend
- ⚛ React + Material UI frontend

## Tech Stack

### Backend
- FastAPI
- Xarray
- NumPy
- Pandas
- Scikit-learn

### Frontend
- React
- Material UI
- Recharts
- React Leaflet

## Machine Learning

Random Forest Regressor trained on historical SST observations using:

- Year
- Month
- Latitude
- Longitude

Outputs:

- Forecast SST
- Trend
- Confidence

## Screenshots

(Add screenshots here)

## Running

Backend

```bash
uvicorn backend.app.main:app --reload
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

## Author

Renee