export default function ModelCard({ metrics }) {

  if (!metrics) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,.1)"
      }}
    >

      <h2>
        🧠 AI Model Performance
      </h2>

      <p>
        <strong>Model:</strong>{" "}
        {metrics.model}
      </p>

      <p>
        <strong>Algorithm:</strong>{" "}
        {metrics.algorithm}
      </p>

      <p>
        <strong>Dataset:</strong>{" "}
        NASA MUR Sea Surface Temperature
      </p>

      <p>
        <strong>Training Period:</strong>{" "}
        2004 - 2025
      </p>

      <p>
        <strong>Training Samples:</strong>{" "}
        {metrics.samples.toLocaleString()}
      </p>

      <p>
        <strong>Mean Absolute Error:</strong>{" "}
        {metrics.mae} °C
      </p>

      <p>
        <strong>Root Mean Square Error:</strong>{" "}
        {metrics.rmse} °C
      </p>

      <hr />

      <p
        style={{
          fontSize: "14px",
          color: "#555"
        }}
      >
        The model predicts sea surface temperature using
        historical ocean observations, geographic location,
        and seasonal patterns.
      </p>

    </div>
  );
}