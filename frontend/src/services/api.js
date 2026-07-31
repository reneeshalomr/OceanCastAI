const API =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

export async function getPoint(dataset, month, lat, lon) {
  const res = await fetch(
    `${API}/sst/${dataset}/point?month=${month}&lat=${lat}&lon=${lon}`
  );

  if (!res.ok) throw new Error("Unable to load SST point");

  return res.json();
}

export async function getTimeSeries(dataset, lat, lon) {
  const res = await fetch(
    `${API}/sst/${dataset}/timeseries?lat=${lat}&lon=${lon}`
  );

  if (!res.ok) throw new Error("Unable to load time series");

  return res.json();
}

export async function getForecast(dataset, month, lat, lon) {
  const res = await fetch(
    `${API}/forecast/${dataset}?month=${month}&lat=${lat}&lon=${lon}`
  );

  if (!res.ok) throw new Error("Unable to load forecast");

  return res.json();
}

export async function getDatasets() {
  const res = await fetch(`${API}/datasets`);

  if (!res.ok) throw new Error("Unable to load datasets");

  return res.json();
}

export async function getModelMetrics(){

  const response = await fetch(
    "http://127.0.0.1:8000/model/metrics"
  );

  return await response.json();

}

export async function getAnomaly(
  dataset,
  month,
  lat,
  lon
) {
  const res = await fetch(
    `${API}/sst/${dataset}/anomaly?month=${month}&lat=${lat}&lon=${lon}`
  );

  if (!res.ok) {
    throw new Error("Unable to load anomaly");
  }

  return res.json();
}