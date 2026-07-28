export default function ForecastCard({ forecast }) {

  if (!forecast) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "12px",
        background: "#f8fbff",
        boxShadow: "0 4px 12px rgba(0,0,0,.1)"
      }}
    >

      <h2>
        🤖 AI SST Forecast
      </h2>


      <p>
        <strong>Current SST:</strong>{" "}
        {forecast.current_sst} °C
      </p>


      <p>
        <strong>Predicted SST:</strong>{" "}
        {forecast.forecast_sst} °C
      </p>


      <p>
        <strong>Change:</strong>{" "}
        {forecast.change > 0 ? "+" : ""}
        {forecast.change} °C
      </p>


      <p>
        <strong>Trend:</strong>{" "}
        {forecast.trend === "Cooling" && "❄️ "}
        {forecast.trend === "Warming" && "🔥 "}
        {forecast.trend === "Stable" && "➖ "}
        {forecast.trend}
      </p>


      <p>
        <strong>Confidence:</strong>{" "}
        {(forecast.confidence * 100).toFixed(0)}%
      </p>


      <p>
        <strong>Model:</strong>{" "}
        {forecast.model}
      </p>

    </div>
  );
}