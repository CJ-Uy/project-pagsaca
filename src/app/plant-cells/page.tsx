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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plantCells = () => {
  const getM1GraphData = async () => {
    try {
      const response = await fetch("/api/plant-cells/M1");
      const data = await response.json();
      setVoltageDataM1(data.sortedVoltage);
      setWaterLevelM1(data.sortedWaterLevel);
      setSoilMoistureM1(data.sortedSoilMoisture);
    } catch (error) {
      console.error(error);
    }
  };

  const getM2GraphData = async () => {
    try {
      const response = await fetch("/api/plant-cells/M2");
      const data = await response.json();
      setVoltageDataM2(data.sortedVoltage);
      setWaterLevelM2(data.sortedWaterLevel);
      setSoilMoistureM2(data.sortedSoilMoisture);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getM1GraphData();
    getM2GraphData();
  }, []);

  const [voltageDataM1, setVoltageDataM1] = useState(null);
  const [waterLevelM1, setWaterLevelM1] = useState(null);
  const [soilMoistureM1, setSoilMoistureM1] = useState(null);
  const [voltageDataM2, setVoltageDataM2] = useState(null);
  const [waterLevelM2, setWaterLevelM2] = useState(null);
  const [soilMoistureM2, setSoilMoistureM2] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardTitle className="p-5">
          <br />
          <h1>Module 1</h1>
          <br />
        </CardTitle>
        <CardContent>
          <h2>Voltage</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={voltageDataM1}>
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
          <h2>Water Level</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={waterLevelM1}>
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
          <h2>Soil Moisture</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={soilMoistureM1}>
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
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardTitle>
          <br />
          <h1>Module 2</h1>
          <br />
        </CardTitle>
        <CardContent>
          <h2>Voltage</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={voltageDataM2}>
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
          <h2>Water Level</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={waterLevelM2}>
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
          <h2>Soil Moisture</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={soilMoistureM2}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default plantCells;
