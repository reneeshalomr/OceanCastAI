import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
      })
      .catch(() => {
        setStatus("Backend Offline");
      });
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>🌊 OceanCastAI</h1>

      <h2>AI-Powered Ocean Forecasting Platform</h2>

      <hr />

      <h3>Backend Status</h3>

      <p>{status}</p>
    </div>
  );
}

export default App;