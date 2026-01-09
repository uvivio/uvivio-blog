"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ViewsChartProps {
  data: Array<{
    title: string;
    views: number;
  }>;
}

export function ViewsChart({ data }: ViewsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="font-primary text-sm text-tertiary-7">
          No data available
        </p>
      </div>
    );
  }

  const chartData = data.map((item, index) => ({
    name: `Post ${index + 1}`,
    fullTitle: item.title,
    views: item.views || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
        <XAxis
          dataKey="name"
          tick={{ fill: "#8C8C8C", fontSize: 12 }}
          stroke="#D9D9D9"
        />
        <YAxis tick={{ fill: "#8C8C8C", fontSize: 12 }} stroke="#D9D9D9" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #F0F0F0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{ color: "#141414", fontWeight: 600 }}
          itemStyle={{ color: "#004eea" }}
          formatter={(value: any, name: any, props: any) => {
            return [value, props.payload.fullTitle];
          }}
        />
        <Bar
          dataKey="views"
          fill="#004eea"
          radius={[4, 4, 0, 0]}
          maxBarSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
