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
@router.get(
    "/sst/{filename}/grid"
)
def sst_grid(filename: str):

    try:
        from backend.app.services.ocean_loader import load_dataset

        ds = load_dataset(filename)

        import numpy as np

        sst = (
            ds["analysed_sst"]
            .isel(month=0)
            .values
        )

        sst = np.nan_to_num(
            sst,
            nan=-999
        )

        lat = ds["lat"].values
        lon = ds["lon"].values

        ds.close()

        return {
            "dataset": filename,
            "month": 1,
            "lat": lat.tolist(),
            "lon": lon.tolist(),
            "sst": sst.tolist()
        }


    except FileNotFoundError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )        
        
@router.get(
    "/sst/{filename}/anomaly"
)
def sst_anomaly(filename: str):

    try:
        from backend.app.services.ocean_loader import load_dataset
        import numpy as np

        ds = load_dataset(filename)

        sst = (
            ds["analysed_sst"]
            .isel(month=0)
            .values[::20, ::20]
        )

        mean_sst = np.nanmean(sst)

        anomaly = sst - mean_sst

        anomaly = np.nan_to_num(
            anomaly,
            nan=0
        )

        lat = ds["lat"].values[::20]
        lon = ds["lon"].values[::20]

        ds.close()

        return {
            "dataset": filename,
            "mean_sst": round(float(mean_sst), 2),

            "min_anomaly": round(
                float(np.nanmin(anomaly)),
                2
            ),

            "max_anomaly": round(
                float(np.nanmax(anomaly)),
                2
            ),

            "average_anomaly": round(
                float(np.nanmean(anomaly)),
                2
            ),

            "message": "Anomaly statistics calculated successfully"
        }

    except FileNotFoundError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )        