import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

export default function SSTChart({ data }) {

  if (!data) return null;

  const chartData = data.months.map((month, i) => ({
    month: month,
    temperature: Number(data.sst_celsius[i].toFixed(2)),
  }));

  const average =
    chartData.reduce(
      (sum, row) => sum + row.temperature,
      0
    ) / chartData.length;

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,.1)",
      }}
    >
      <h2>Monthly Sea Surface Temperature</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis
            unit="°C"
          />

          <Tooltip />

          <Legend />

          <ReferenceLine
            y={average}
            stroke="red"
            strokeDasharray="5 5"
            label="Average"
          />

          <Line
            type="monotone"
            dataKey="temperature"
            name="SST"
            stroke="#0077ff"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}