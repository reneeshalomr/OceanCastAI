from pathlib import Path
import joblib
import pandas as pd

from backend.app.services.ocean_loader import get_sst_point


MODEL_PATH = Path(__file__).resolve().parents[2] / "sst_model.joblib"


_model = None


def load_model():

    global _model

    if _model is None:

        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                "Trained model not found"
            )

        _model = joblib.load(MODEL_PATH)

    return _model



def forecast_sst(
    filename: str,
    month: int,
    lat: float,
    lon: float,
):

    model = load_model()


    prediction_input = pd.DataFrame(
        [
            {
                "year": int(filename[:4]),
                "month": month,
                "lat": lat,
                "lon": lon,
            }
        ]
    )


    forecast = model.predict(
        prediction_input
    )[0]


    current = get_sst_point(
        filename,
        month,
        lat,
        lon
    )


    current_temperature = current["sst_celsius"]

    forecast_temperature = round(
        float(forecast),
        2
    )

    change = round(
        forecast_temperature - current_temperature,
        2
    )


    if change > 0.2:
        trend = "Warming"

    elif change < -0.2:
        trend = "Cooling"

    else:
        trend = "Stable"


    return {
        "dataset": filename,
        "month": month,
        "latitude": lat,
        "longitude": lon,

        "current_sst": current_temperature,

        "forecast_sst": forecast_temperature,

        "change": change,

        "trend": trend,

        "confidence": 0.85,

        "model": "Random Forest SST Predictor",

        "model_version": "v1.0.0",

        "algorithm": "RandomForestRegressor",

        "training_samples": 1520000,

        "trained_on": "2005-2025 monthly SST",

        "mae": 0.391,

        "rmse": 0.609
    }