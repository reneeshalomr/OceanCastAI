import {
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

export default function ForecastCard({ forecast }) {
  if (!forecast) return null;

  return (
    <Card
      elevation={3}
      sx={{
        mt: 2,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          AI Forecast
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography>
          <strong>Current SST:</strong>{" "}
          {forecast.current_sst} °C
        </Typography>

        <Typography>
          <strong>Forecast SST:</strong>{" "}
          {forecast.forecast_sst} °C
        </Typography>

        <Typography>
          <strong>Change:</strong>{" "}
          {forecast.change} °C
        </Typography>

        <Typography>
          <strong>Trend:</strong>{" "}
          {forecast.trend}
        </Typography>

        {forecast.prediction_std !== undefined && (
          <Typography>
            <strong>Prediction Std Dev:</strong>{" "}
            {forecast.prediction_std} °C
          </Typography>
        )}

        {forecast.prediction_interval_95 && (
          <Typography>
            <strong>95% Prediction Interval:</strong>{" "}
            {forecast.prediction_interval_95.lower} °C
            {" - "}
            {forecast.prediction_interval_95.upper} °C
          </Typography>
        )}

        <Typography sx={{ mt: 1 }}>
          <strong>Model:</strong>{" "}
          {forecast.model}
        </Typography>
      </CardContent>
    </Card>
  );
}