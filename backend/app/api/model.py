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

        "training_period": "2005-2021",
        "validation_period": "2022-2023",
        "test_period": "2024-2025",

        "training_samples": 1040000,
        "validation_samples": 240000,
        "test_samples": 240000,

        "validation_mae": 0.532,
        "validation_rmse": 0.808,

        "test_mae": 0.551,
        "test_rmse": 0.823,

        "evaluation_strategy": "Temporal holdout"
    }