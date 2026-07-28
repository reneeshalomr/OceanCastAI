import {
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

export default function AnomalyCard({ anomaly }) {
  if (!anomaly) return null;

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
          SST Anomaly
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography>
          <strong>Mean SST:</strong>{" "}
          {anomaly.mean_sst} °C
        </Typography>

        <Typography>
          <strong>Minimum:</strong>{" "}
          {anomaly.min_anomaly} °C
        </Typography>

        <Typography>
          <strong>Maximum:</strong>{" "}
          {anomaly.max_anomaly} °C
        </Typography>

        <Typography>
          <strong>Average:</strong>{" "}
          {anomaly.average_anomaly} °C
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          Sea surface temperature anomaly relative to the dataset mean.
        </Typography>
      </CardContent>
    </Card>
  );
}