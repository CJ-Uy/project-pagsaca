// components/VoltageChart.js
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

export default function VoltageChart({
  voltageData,
  filteredData,
  regressionData,
}) {
  // Check if voltageData and filteredData are arrays and have data
  if (
    !Array.isArray(voltageData) ||
    !Array.isArray(filteredData) ||
    voltageData.length === 0
  ) {
    return <div>No data available for chart</div>;
  }

  const allData = voltageData.map((point, index) => ({
    ...point,
    filteredVoltage: filteredData[index]?.filteredVoltage ?? null,
  }));

  const regressionLine =
    regressionData && allData.length > 0
      ? [
          {
            timestamp: allData[0].timestamp,
            voltage:
              regressionData.slope * allData[0].timestamp +
              regressionData.intercept,
          },
          {
            timestamp: allData[allData.length - 1].timestamp,
            voltage:
              regressionData.slope * allData[allData.length - 1].timestamp +
              regressionData.intercept,
          },
        ]
      : [];

  return (
    <LineChart width={600} height={300} data={allData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        type="number"
        scale="time"
        domain={["dataMin", "dataMax"]}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="voltage"
        stroke="#8884d8"
        dot={false}
        name="Raw Voltage"
      />
      <Line
        type="monotone"
        dataKey="filteredVoltage"
        stroke="#82ca9d"
        dot={false}
        name="Filtered Voltage"
      />
      {regressionData && regressionLine.length > 0 && (
        <Line
          data={regressionLine}
          type="linear"
          dataKey="voltage"
          stroke="red"
          strokeWidth={2}
          dot={false}
          name="Regression Line"
        />
      )}
      {regressionData && regressionData.slope < -0.1 && (
        <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
      )}
    </LineChart>
  );
}
