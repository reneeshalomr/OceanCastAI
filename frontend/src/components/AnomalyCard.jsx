import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
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
          <strong>Current SST:</strong>{" "}
          {anomaly.current_sst} °C
        </Typography>

        <Typography>
          <strong>Climatological SST:</strong>{" "}
          {anomaly.climatology_sst} °C
        </Typography>

        <Typography>
          <strong>Anomaly:</strong>{" "}
          {anomaly.anomaly > 0 ? "+" : ""}
          {anomaly.anomaly} °C
        </Typography>

        <Chip
          label={anomaly.category}
          sx={{ mt: 2 }}
          color={
            anomaly.anomaly > 0.25
              ? "warning"
              : anomaly.anomaly < -0.25
              ? "info"
              : "success"
          }
        />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          Baseline: {anomaly.baseline}
        </Typography>
      </CardContent>
    </Card>
  );
}