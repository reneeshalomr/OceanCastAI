from pydantic import BaseModel


class MetadataResponse(BaseModel):
    file: str
    dimensions: dict
    variables: list[str]
    coordinates: list[str]
    units: str | None = None


class SSTPointResponse(BaseModel):
    dataset: str
    month: int
    latitude: float
    longitude: float
    sst_celsius: float


class DatasetListResponse(BaseModel):
    datasets: list[str]
    
class SSTTimeSeriesResponse(BaseModel):
    dataset: str
    latitude: float
    longitude: float
    months: list[int]
    sst_celsius: list[float]    