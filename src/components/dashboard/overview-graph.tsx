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

const data = [
  {
    name: "Jan",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Feb",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Mar",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Apr",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "May",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Jun",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Jul",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Aug",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Sep",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Oct",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Nov",
    value: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Dec",
    value: Math.floor(Math.random() * 10) + 1,
  },
];

export function OverviewGraph() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="value" stroke="green" strokeWidth={3} />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}
