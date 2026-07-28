export default function AnomalyCard({ anomaly }) {

  if (!anomaly) {
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
        🌎 SST Anomaly
      </h2>


      <p>
        <strong>Mean SST:</strong>{" "}
        {anomaly.mean_sst} °C
      </p>


      <p>
        <strong>Lowest Anomaly:</strong>{" "}
        {anomaly.min_anomaly} °C
      </p>


      <p>
        <strong>Highest Anomaly:</strong>{" "}
        {anomaly.max_anomaly} °C
      </p>


      <p>
        <strong>Average Anomaly:</strong>{" "}
        {anomaly.average_anomaly} °C
      </p>


      <p>
        Compared with the dataset average temperature.
      </p>

    </div>
  );
}