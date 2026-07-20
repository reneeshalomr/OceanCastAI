from pathlib import Path
import xarray as xr


DATA_FOLDER = Path("data")


def list_datasets():
    files = DATA_FOLDER.glob("*.nc")
    return [file.name for file in files]


def load_dataset(filename: str):
    filepath = DATA_FOLDER / filename

    if not filepath.exists():
        raise FileNotFoundError(
            f"Dataset {filename} not found"
        )

    return xr.open_dataset(filepath)


def get_metadata(filename: str):

    ds = load_dataset(filename)

    metadata = {
        "file": filename,
        "dimensions": dict(ds.sizes),
        "variables": list(ds.data_vars),
        "coordinates": list(ds.coords),
        "units": ds["analysed_sst"].attrs.get("units")
    }

    ds.close()

    return metadata


def get_sst_point(
    filename: str,
    month: int,
    lat: float,
    lon: float
):

    ds = load_dataset(filename)

    sst = ds["analysed_sst"]

    value = (
        sst
        .sel(
            month=month,
            lat=lat,
            lon=lon,
            method="nearest"
        )
        .values
    )

    ds.close()

    celsius = float(value - 273.15)

    return {
        "dataset": filename,
        "month": month,
        "latitude": lat,
        "longitude": lon,
        "sst_celsius": round(celsius, 2)
    }
    
def get_sst_timeseries(filename: str, lat: float, lon: float):
    ds = load_dataset(filename)

    sst = (
        ds["analysed_sst"]
        .sel(lat=lat, lon=lon, method="nearest")
        .values
    )

    ds.close()

    sst_celsius = (sst - 273.15).round(2)

    return {
        "dataset": filename,
        "latitude": lat,
        "longitude": lon,
        "months": list(range(1, 13)),
        "sst_celsius": sst_celsius.tolist()
    }    