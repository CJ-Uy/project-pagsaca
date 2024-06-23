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

export function WaterLevelSummaryGraph() {
  const getWaterLevelData = async () => {
    try {
      const response = await fetch("/api/dashboard/graphData");
      const data = await response.json();
      setWaterLevelData(data.sortedWaterLevel);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getWaterLevelData();
  }, []);

  const [waterLevelData, setWaterLevelData] = useState(null);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={waterLevelData}>
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
