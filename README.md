# 🌊 OceanCastAI

OceanCastAI is an AI-powered ocean forecasting platform built with FastAPI, xarray, and NASA MUR Sea Surface Temperature (SST) datasets.

## Features

- Load NASA MUR NetCDF datasets
- Query SST at any latitude and longitude
- Retrieve annual SST time series
- Metadata API
- RESTful FastAPI backend
- Interactive API documentation
- AI forecasting (coming soon)

## Tech Stack

- Python
- FastAPI
- xarray
- NumPy
- Pandas
- Plotly
- React (coming soon)

## Project Structure

```
OceanCastAI/
├── backend/
├── frontend/
├── data/
├── docs/
├── ml/
└── tests/
```

## Current API

| Endpoint | Description |
|----------|-------------|
| `/health` | Health check |
| `/datasets` | List available datasets |
| `/sst/{filename}/metadata` | Dataset metadata |
| `/sst/{filename}/point` | SST at a location |
| `/sst/{filename}/timeseries` | 12-month SST time series |

## Future Work

- Interactive global SST map
- Machine learning forecasting
- Climate anomaly detection
- Docker deployment
- Cloud hosting
- User authentication

## Author

Renee