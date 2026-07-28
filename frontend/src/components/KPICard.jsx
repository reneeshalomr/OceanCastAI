import { Card, CardContent, Typography } from "@mui/material";

export default function KPICard({
  title,
  value,
  subtitle,
  color = "#1976d2",
}) {
  return (
    <Card
      sx={{
        
        borderLeft: `6px solid ${color}`,
        borderRadius: 3,
      }}
      elevation={3}
    >
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ my: 1 }}
        >
          {value}
        </Typography>

        <Typography variant="body2">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}