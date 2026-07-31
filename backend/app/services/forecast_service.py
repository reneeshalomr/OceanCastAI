from pathlib import Path

import joblib
import numpy as np
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

    # Get prediction from every tree in the forest
    tree_predictions = np.array(
        [
            tree.predict(prediction_input)[0]
            for tree in model.estimators_
        ]
    )

    forecast = tree_predictions.mean()
    prediction_std = tree_predictions.std()

    # Approximate interval based on tree prediction spread
    lower_bound = forecast - (1.96 * prediction_std)
    upper_bound = forecast + (1.96 * prediction_std)

    current = get_sst_point(
        filename,
        month,
        lat,
        lon,
    )

    current_temperature = current["sst_celsius"]

    forecast_temperature = round(
        float(forecast),
        2,
    )

    change = round(
        forecast_temperature - current_temperature,
        2,
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

        "prediction_std": round(
            float(prediction_std),
            3,
        ),

        "prediction_interval_95": {
            "lower": round(
                float(lower_bound),
                2,
            ),
            "upper": round(
                float(upper_bound),
                2,
            ),
        },

        "model": "Random Forest SST Predictor",
        "model_version": "v2.0.0",
        "algorithm": "RandomForestRegressor",

        "training_period": "2005-2021",
        "validation_period": "2022-2023",
        "test_period": "2024-2025",

        "training_samples": 1040000,

        "validation_mae": 0.532,
        "validation_rmse": 0.808,

        "test_mae": 0.551,
        "test_rmse": 0.823,

        "evaluation_strategy": "Temporal holdout",
    }