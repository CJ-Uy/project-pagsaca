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

export function VoltageSummaryGraph() {
  const getVoltageData = async () => {
    try {
      const response = await fetch("/api/dashboard/graphData");
      const data = await response.json();
      setVoltageData(data.sortedVoltage);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getVoltageData();
  }, []);

  const [voltageData, setVoltageData] = useState(null);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={voltageData}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="average"
          stroke="green"
          strokeWidth={3}
        />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}
