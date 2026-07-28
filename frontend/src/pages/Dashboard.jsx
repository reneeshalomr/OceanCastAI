import { useState, useEffect } from "react";
import KPICard from "../components/KPICard";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

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
        console.error(error);
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
      console.error(error);
      alert("Unable to load ocean data.");
    }

    setLoading(false);
  }

  return (
    <Box
      sx={{
        maxWidth: 1500,
        mx: "auto",
        p: 3,
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
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          OceanCastAI
        </Typography>

        <Typography variant="body1">
          OceanCastAI is an AI-powered dashboard for exploring global Sea Surface
          Temperature (SST) data. Users can interactively inspect ocean temperatures,
          visualize monthly trends, analyze anomalies, and generate machine learning
          forecasts using a Random Forest model trained on historical satellite data.
        </Typography>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <DatasetSelector
          dataset={dataset}
          setDataset={setDataset}
        />
      </Box>

      <Grid
        container
        spacing={3}
        sx={{ mt: 2 }}
      >
        <Grid item xs={12} lg={8}>
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
        </Grid>

        <Grid item xs={12} lg={4}>
          <KPICard
            title="Current SST"
            value={
              result
                ? `${result.sst_celsius} °C`
                : "--"
            }
            subtitle={
              result
                ? `${result.latitude}, ${result.longitude}`
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
              mt: 3,
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Controls
            </Typography>

            <Typography
              variant="body2"
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
                padding: "10px",
                borderRadius: "8px",
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
              disabled ={loading}
              sx={{ mt: 3 , height: 48,}}
              onClick={() =>
                loadOceanData(
                  latitude,
                  longitude
                )
              }
            >
              {loading?(
                <Circularprogress 
                  size={24}
                  color ="inherit"
                />
              ):(
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