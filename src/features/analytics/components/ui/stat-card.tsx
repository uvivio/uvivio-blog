interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  loading,
}: StatCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-tertiary-4 bg-white p-6 shadow-sm">
        <div className="animate-pulse space-y-3">
          <div className="h-10 w-10 rounded-lg bg-tertiary-3"></div>
          <div className="h-4 w-24 rounded bg-tertiary-3"></div>
          <div className="h-8 w-32 rounded bg-tertiary-3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl border border-tertiary-4 bg-white p-6 shadow-sm transition-all hover:border-primary-3 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-lg bg-primary-1 p-2.5 text-primary-6 transition-colors group-hover:bg-primary-2">
          {icon}
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              trend.isPositive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <p className="mb-1 font-primary text-sm font-medium text-tertiary-7">
        {label}
      </p>
      <p className="font-secondary text-3xl font-bold text-tertiary-12">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
}
