import { AnalyticsDashboard } from "@/features/analytics/components/analytics-dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("analytics_auth");

  if (!authCookie) {
    redirect("/analytics/login");
  }

  return <AnalyticsDashboard />;
}
