# 🌊 OceanCastAI

![CI](https://github.com/reneeshalomr/OceanCastAI/actions/workflows/ci.yml/badge.svg)

An AI-powered full-stack web application for exploring and forecasting global Sea Surface Temperature (SST) using satellite observations, machine learning, and interactive geospatial visualization.

OceanCastAI enables users to explore ocean temperature patterns, analyze anomalies, visualize historical trends, and generate AI-based forecasts through an intuitive web interface.

---

## 🚀 Live Demo

**Web Application:**  
https://oceancastai-d3nffiklj-renee3.vercel.app

**FastAPI Documentation:**  
https://oceancastai-backend.onrender.com/docs

**Backend API:**  
https://oceancastai-backend.onrender.com

## Features

- 🌍 Interactive global map using Leaflet
- 📍 Click any ocean location to retrieve SST measurements
- 📈 Monthly SST time-series visualization
- 🤖 AI-powered SST forecasting with Random Forest Regression
- 🌡 Sea Surface Temperature anomaly analysis
- 📊 Machine learning model performance metrics
- 📅 Multi-year SST dataset selection
- ⚡ FastAPI REST API backend
- 🎨 Responsive React + Material UI interface

---

## Architecture

```
                 Satellite SST Data (.nc)
                           │
                           ▼
                  FastAPI Backend (Python)
                           │
      ┌────────────────────┼───────────────────┐
      ▼                    ▼                   ▼
 SST Retrieval      AI Forecasting      Anomaly Analysis
      │                    │                   │
      └────────────────────┼───────────────────┘
                           ▼
                   React Frontend Dashboard
                           │
                           ▼
              Interactive Visualization
```

---

## Technology Stack

### Frontend

- React
- Material UI
- React Leaflet
- Recharts
- JavaScript
- Vite

### Backend

- FastAPI
- Python
- Xarray
- NumPy
- Pandas
- Scikit-learn

### Machine Learning

- Random Forest Regressor
- Feature Engineering
- Historical SST Prediction

---

## Machine Learning Model

The forecasting model was trained using historical Sea Surface Temperature observations.

### Input Features

- Year
- Month
- Latitude
- Longitude

### Model Outputs

- Forecasted SST
- Temperature Trend
- Prediction Confidence

---

## Project Structure

```
OceanCastAI
│
├── backend
│   ├── api
│   ├── models
│   ├── services
│   └── app.py
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
├── ml
│   ├── train_model.py
│   ├── predict.py
│   └── evaluate_model.py
│
└── docs
```

---

## Screenshots

### OceanCastAI Dashboard

Interactive SST exploration with geospatial selection, current sea surface temperature, AI forecasting, and anomaly analysis.

![OceanCastAI Dashboard](docs/screenshots/dashboard.png)

### AI Forecasting & Analysis

Random Forest SST forecasting, anomaly statistics, and model performance metrics.

![AI Forecast](docs/screenshots/forecast.png)

### Monthly Sea Surface Temperature

Interactive 12-month SST time-series visualization.

![Monthly SST Chart](docs/screenshots/chart.png)

### FastAPI Backend

REST API supporting SST queries, time series, anomaly analysis, forecasting, dataset management, and model metrics.

![OceanCastAI FastAPI](docs/screenshots/api.png)



### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Interactive Map

![Map](docs/screenshots/map.png)

### AI Forecast

![Forecast](docs/screenshots/forecast.png)

### SST Trend

![Chart](docs/screenshots/chart.png)

---

## Running Locally

### Clone the repository

```bash
git clone https://github.com/reneeshalomr/OceanCastAI.git

cd OceanCastAI
```

### Backend

```bash
pip install -r requirements.txt

uvicorn backend.app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

The API will be available at:

```
http://127.0.0.1:8000
```

---

## Future Improvements

- SST heatmap visualization
- Monthly forecast chart
- Multi-year dataset comparison
- Docker deployment
- Cloud deployment
- User-uploaded datasets

---

## Author

**Renee Shalom**

Computer Science • Artificial Intelligence • Ocean Data Science

GitHub: https://github.com/reneeshalomr