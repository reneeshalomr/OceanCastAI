from fastapi import APIRouter

from backend.app.api.health import router as health_router
from backend.app.api.datasets import router as datasets_router
from backend.app.api.sst import router as sst_router
from backend.app.api.forecast import router as forecast_router
from backend.app.api.model import router as model_router

router = APIRouter()

router.include_router(health_router)
router.include_router(datasets_router)
router.include_router(sst_router)
router.include_router(forecast_router)
router.include_router(model_router)


@router.get("/status")
def status():
    return {
        "service": "OceanCastAI API",
        "status": "online"
    }