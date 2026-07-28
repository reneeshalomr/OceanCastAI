from fastapi import APIRouter

router = APIRouter(
    prefix="/model",
    tags=["Model"]
)


@router.get("/metrics")
def model_metrics():
    return {
        "model": "Random Forest SST Predictor",
        "algorithm": "Random Forest Regression",
        "samples": 1520000,
        "mae": 0.391,
        "rmse": 0.609,
        "training_period": "2004-2025"
    }