from fastapi import APIRouter
import pandas as pd
from pathlib import Path
from sklearn.metrics import mean_absolute_error, mean_squared_error
import joblib


router = APIRouter(
    prefix="/model",
    tags=["Model"]
)


DATA_FILE = Path(
    "ml/training_data.csv"
)

MODEL_FILE = Path(
    "ml/saved_models/sst_model.joblib"
)


@router.get("/metrics")
def model_metrics():

    df = pd.read_csv(DATA_FILE)

    model = joblib.load(
        MODEL_FILE
    )


    X = df[
        [
            "year",
            "month",
            "lat",
            "lon"
        ]
    ]

    y = df["sst"]


    predictions = model.predict(X)


    mae = mean_absolute_error(
        y,
        predictions
    )


    rmse = mean_squared_error(
        y,
        predictions
    ) ** 0.5


    return {

        "model": "Random Forest SST Predictor",

        "algorithm": "Random Forest Regression",

        "samples": len(df),

        "mae": round(
            float(mae),
            3
        ),

        "rmse": round(
            float(rmse),
            3
        )

    }