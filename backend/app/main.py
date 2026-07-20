from fastapi import FastAPI

from backend.app.api.health import router as health_router
from backend.app.api.datasets import router as datasets_router
from backend.app.api.sst import router as sst_router


app = FastAPI(
    title="OceanCastAI",
    description="AI-powered ocean forecasting platform",
    version="0.1.0"
)


app.include_router(health_router)
app.include_router(datasets_router)
app.include_router(sst_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to OceanCastAI 🌊",
        "status": "running"
    }