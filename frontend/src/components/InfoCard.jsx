export default function InfoCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#666",
          fontSize: "16px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          margin: "10px 0",
          color: "#1565c0",
        }}
      >
        {value}
      </h1>

      <p
        style={{
          margin: 0,
          color: "#888",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}