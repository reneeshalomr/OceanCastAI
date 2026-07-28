import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import KPICard from "../components/KPICard";
import Header from "../components/Header";
import MapView from "../components/MapView";
import SSTChart from "../components/SSTChart";
import ForecastCard from "../components/ForecastCard";
import ModelCard from "../components/ModelCard";
import DatasetSelector from "../components/DatasetSelector";
import AnomalyCard from "../components/AnomalyCard";

import {
  getPoint,
  getTimeSeries,
  getForecast,
  getModelMetrics,
  getAnomaly,
} from "../services/api";

export default function Dashboard() {
  const [dataset, setDataset] = useState("2021_lowres.nc");
  const [month, setMonth] = useState(1);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [result, setResult] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [timeseries, setTimeseries] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [anomaly, setAnomaly] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await getModelMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Unable to load ocean data:", error);
        alert(error.message);
}
    }

    loadMetrics();
  }, []);

  async function loadOceanData(lat, lon) {
    setLoading(true);

    try {
      const point = await getPoint(
        dataset,
        month,
        lat,
        lon
      );

      const history = await getTimeSeries(
        dataset,
        lat,
        lon
      );

      const prediction = await getForecast(
        dataset,
        month,
        lat,
        lon
      );

      const anomalyData = await getAnomaly(
        dataset
      );

      setResult(point);
      setTimeseries(history);
      setForecast(prediction);
      setAnomaly(anomalyData);
    } catch (error) {
      console.error("Unable to load ocean data:", error);
      alert("Unable to load ocean data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 1500,
        mx: "auto",
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      <Header />

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          OceanCastAI
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          OceanCastAI is an AI-powered dashboard for exploring global
          Sea Surface Temperature (SST) data. Users can interactively
          inspect ocean temperatures, visualize monthly trends,
          analyze anomalies, and generate machine learning forecasts
          using a Random Forest model trained on historical satellite data.
        </Typography>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <DatasetSelector
          dataset={dataset}
          setDataset={setDataset}
        />
      </Box>

      <Grid
        container
        spacing={3}
      >
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={3}
            sx={{
              p: 1,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <MapView
              onLocationSelect={async (location) => {
                const lat = Number(
                  location.lat.toFixed(2)
                );

                const lon = Number(
                  location.lng.toFixed(2)
                );

                setLatitude(lat);
                setLongitude(lon);

                await loadOceanData(
                  lat,
                  lon
                );
              }}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <KPICard
            title="Current SST"
            value={
              result
                ? `${result.sst_celsius} °C`
                : "--"
            }
            subtitle={
              result
                ? `Lat ${result.latitude}, Lon ${result.longitude}`
                : "Select a point on the map"
            }
            color="#2196f3"
          />

          <ForecastCard
            forecast={forecast}
          />

          <AnomalyCard
            anomaly={anomaly}
          />

          <ModelCard
            metrics={metrics}
          />

          <Paper
            elevation={3}
            sx={{
              mt: 2,
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Controls
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Month
            </Typography>

            <select
              value={month}
              onChange={(e) =>
                setMonth(
                  Number(e.target.value)
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "#fff",
              }}
            >
              {[...Array(12)].map(
                (_, i) => (
                  <option
                    key={i + 1}
                    value={i + 1}
                  >
                    Month {i + 1}
                  </option>
                )
              )}
            </select>

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                height: 48,
              }}
              onClick={() =>
                loadOceanData(
                  latitude,
                  longitude
                )
              }
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Refresh Data"
              )}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
        }}
      >
        <SSTChart
          data={timeseries}
        />
      </Paper>
    </Box>
  );
}