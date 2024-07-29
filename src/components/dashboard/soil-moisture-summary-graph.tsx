"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";

export function SoilMoistureSummaryGraph() {
  const getSoilMoistureData = async () => {
    try {
      const response = await fetch("/api/dashboard/graphData");
      const data = await response.json();
      setSoilMoistureData(data.sortedSoilMoisture);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSoilMoistureData();
  }, []);

  const [soilMoistureData, setSoilMoistureData] = useState(null);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={soilMoistureData}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="average"
          stroke="blue"
          strokeWidth={3}
        />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}
