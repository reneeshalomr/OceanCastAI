from fastapi import APIRouter

from backend.app.models.responses import DatasetListResponse
from backend.app.services.ocean_loader import list_datasets

router = APIRouter(tags=["Datasets"])


@router.get(
    "/datasets",
    response_model=DatasetListResponse
)
def datasets():

    return {
        "datasets": list_datasets()
    }