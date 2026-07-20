from fastapi import APIRouter, HTTPException

from backend.app.models.responses import (
    MetadataResponse,
    SSTPointResponse,
    SSTTimeSeriesResponse,
)

from backend.app.services.ocean_loader import (
    get_metadata,
    get_sst_point,
    get_sst_timeseries,
)

router = APIRouter(tags=["SST"])


@router.get(
    "/sst/{filename}/metadata",
    response_model=MetadataResponse,
)
def metadata(filename: str):

    try:
        return get_metadata(filename)

    except FileNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )


@router.get(
    "/sst/{filename}/point",
    response_model=SSTPointResponse,
)
def sst_point(
    filename: str,
    month: int,
    lat: float,
    lon: float,
):

    try:
        return get_sst_point(
            filename,
            month,
            lat,
            lon,
        )

    except FileNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
        

@router.get(
    "/sst/{filename}/timeseries",
    response_model=SSTTimeSeriesResponse,
)
def sst_timeseries(
    filename: str,
    lat: float,
    lon: float,
):
    try:
        return get_sst_timeseries(
            filename,
            lat,
            lon,
        )

    except FileNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )