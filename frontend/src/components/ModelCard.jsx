import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

export default function ModelCard({ metrics }) {
  if (!metrics) return null;

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
          Model Performance
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1}>
          <Chip
            label={metrics.model}
            color="primary"
          />

          <Chip
            label={`Test MAE: ${metrics.test_mae} °C`}
          />

          <Chip
            label={`Test RMSE: ${metrics.test_rmse} °C`}
          />

          <Chip
            label={`Train: ${metrics.training_period}`}
          />

          <Chip
            label={`Test: ${metrics.test_period}`}
          />

          <Chip
            label="Temporal Holdout"
            color="success"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}