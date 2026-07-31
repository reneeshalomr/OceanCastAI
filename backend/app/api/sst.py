from pathlib import Path

import numpy as np
import xarray as xr
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
    load_dataset,
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
            detail=str(e),
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
            detail=str(e),
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
            detail=str(e),
        )


@router.get("/sst/{filename}/grid")
def sst_grid(filename: str):
    try:
        ds = load_dataset(filename)

        # Downsample to avoid sending millions
        # of values to the frontend.
        sst = (
            ds["analysed_sst"]
            .isel(month=0)
            .values[::20, ::20]
        )

        sst = np.nan_to_num(
            sst,
            nan=-999,
        )

        lat = ds["lat"].values[::20]
        lon = ds["lon"].values[::20]

        return {
            "dataset": filename,
            "month": 1,
            "lat": lat.tolist(),
            "lon": lon.tolist(),
            "sst": sst.tolist(),
        }

    except FileNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.get("/sst/{filename}/anomaly")
def sst_anomaly(
    filename: str,
    month: int,
    lat: float,
    lon: float,
):
    try:
        climatology_path = (
            Path(__file__).resolve().parents[2]
            / "data"
            / "monthly_climatology_2004_2025_fixed.nc"
        )

        if not climatology_path.exists():
            raise HTTPException(
                status_code=404,
                detail="Climatology dataset not found",
            )

        current = get_sst_point(
            filename,
            month,
            lat,
            lon,
        )

        current_sst = float(
            current["sst_celsius"]
        )

        with xr.open_dataset(
            climatology_path
        ) as climatology_ds:

            climatology_sst = float(
                climatology_ds["analysed_sst"]
                .sel(
                    month=month,
                    lat=lat,
                    lon=lon,
                    method="nearest",
                )
                .item()
            )

        if not np.isfinite(current_sst):
            raise HTTPException(
                status_code=422,
                detail="Current SST is unavailable at this location.",
            )

        if not np.isfinite(climatology_sst):
            raise HTTPException(
                status_code=422,
                detail="Climatology SST is unavailable at this location.",
            )

        anomaly = current_sst - climatology_sst

        if anomaly > 1:
            category = "Much Warmer Than Normal"
        elif anomaly > 0.25:
            category = "Warmer Than Normal"
        elif anomaly < -1:
            category = "Much Cooler Than Normal"
        elif anomaly < -0.25:
            category = "Cooler Than Normal"
        else:
            category = "Near Normal"

        return {
            "dataset": filename,
            "month": month,
            "latitude": lat,
            "longitude": lon,
            "current_sst": round(current_sst, 2),
            "climatology_sst": round(climatology_sst, 2),
            "anomaly": round(anomaly, 2),
            "category": category,
            "baseline": "Monthly climatology 2004-2025",
        }

    except HTTPException:
        raise

    except FileNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
               