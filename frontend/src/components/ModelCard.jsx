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
            label={`Model: ${metrics.model}`}
            color="primary"
          />

          <Chip
            label={`RMSE: ${metrics.rmse}`}
            color="success"
          />

          <Chip
            label={`MAE: ${metrics.mae}`}
            color="secondary"
          />

          
        </Stack>
      </CardContent>
    </Card>
  );
}