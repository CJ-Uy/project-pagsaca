"use client";

// components/VoltageAnalysis.js
import { useState, useEffect } from "react";
import { applyKalmanFilter } from "@/lib/kalmanFilter";
import { calculateLinearRegression } from "@/lib/linearRegression";
import VoltageChart from "@/components/plant-cells/voltage-chart";

export default function VoltageAnalysis({ moduleId }) {
  const [voltageData, setVoltageData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [regressionData, setRegressionData] = useState(null);
  const [isDownwardTrend, setIsDownwardTrend] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(`/api/plant-cells/voltageData`);
      const data = await response.json();
      setVoltageData(data);

      const filtered = applyKalmanFilter(data);
      setFilteredData(filtered);

      const regression = calculateLinearRegression(filtered);
      setRegressionData(regression);

      setIsDownwardTrend(regression.slope < -0.1); // Adjust threshold as needed
    }

    loadData();
  }, [moduleId]);

  return (
    <div>
      <h1>Voltage Analysis for Module {moduleId}</h1>
      <VoltageChart
        voltageData={voltageData}
        filteredData={filteredData}
        regressionData={regressionData}
      />
      {isDownwardTrend && (
        <p className="warning">Warning: A downward trend has been detected!</p>
      )}
    </div>
  );
}
