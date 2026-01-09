"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrendChartProps {
  data: Array<{
    date: string;
    views: number;
  }>;
}

export function TrendChart({ data }: TrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[370px] items-center justify-center">
        <p className="font-primary text-sm text-tertiary-7">
          No trend data available
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={370}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#004eea" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#004eea" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#8C8C8C", fontSize: 11 }}
          stroke="#D9D9D9"
        />
        <YAxis tick={{ fill: "#8C8C8C", fontSize: 11 }} stroke="#D9D9D9" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #F0F0F0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{ color: "#141414", fontWeight: 600 }}
          itemStyle={{ color: "#004eea" }}
        />
        <Area
          type="monotone"
          dataKey="views"
          stroke="#004eea"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorViews)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
