"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useCharts } from "@/queries/useCharts";

function ChartsContainer() {
  // Get the charts data from the custom hook
  const { data, isPending } = useCharts();

  // Guard clauses
  if (isPending) return <h2 className="text-xl font-medium">Please wait...</h2>;
  if (!data || data.length < 1) return null;

  // Returned JSX
  return (
    <section className="mt-16 h-[400px]">
      <h1 className="text-4xl font-semibold text-center">
        Monthly Applications
      </h1>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data} width={500} height={400} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="date" type="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
export default ChartsContainer;
