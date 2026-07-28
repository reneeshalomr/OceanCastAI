from fastapi import APIRouter, HTTPException
import pandas as pd

from backend.app.services.forecast_service import (
    forecast_sst,
    load_model,
)

router = APIRouter(tags=["Forecast"])


@router.get("/forecast/{filename}")
def get_forecast(
    filename: str,
    month: int,
    lat: float,
    lon: float,
):
    try:
        return forecast_sst(
            filename=filename,
            month=month,
            lat=lat,
            lon=lon,
        )

    except FileNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
        
@router.get("/forecast/{filename}/year")
def yearly_forecast(
    filename: str,
    lat: float,
    lon: float,
):
    model = load_model()

    predictions = []

    for month in range(1, 13):

        prediction_input = pd.DataFrame(
            [{
                "year": int(filename[:4]),
                "month": month,
                "lat": lat,
                "lon": lon,
            }]
        )

        value = model.predict(prediction_input)[0]

        predictions.append(
            round(float(value), 2)
        )

    return {
        "dataset": filename,
        "latitude": lat,
        "longitude": lon,
        "months": list(range(1, 13)),
        "forecast": predictions,
    }        