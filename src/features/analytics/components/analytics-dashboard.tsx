"use client";

import { Input, Pagination, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  BarChart3,
  ExternalLink,
  Eye,
  FileText,
  LogOut,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "../actions/auth-actions";
import {
  useAllPosts,
  useAnalyticsOverview,
  useTopPosts,
  useViewsTrend,
} from "../hooks/use-analytics-queries";
import { TrendChart } from "./charts/trend-chart";
import { ViewsChart } from "./charts/views-chart";
import { StatCard } from "./ui/stat-card";

const { Search } = Input;

export function AnalyticsDashboard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [trendDays, setTrendDays] = useState(30);

  const overview = useAnalyticsOverview();
  const topPosts = useTopPosts(10);
  const allPosts = useAllPosts(currentPage, 20, searchQuery);
  const trend = useViewsTrend(trendDays);

  const handleLogout = async () => {
    try {
      await logoutAction();
      router.push("/analytics/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: "55%",
      render: (text: string) => (
        <span className="font-primary text-sm font-medium text-tertiary-12">
          {text}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category: string) => (
        <span className="inline-flex rounded-full bg-primary-1 px-2.5 py-0.5 font-primary text-xs font-medium text-primary-7">
          {category || "Uncategorized"}
        </span>
      ),
    },
    {
      title: "Published",
      dataIndex: "publishedAt",
      key: "publishedAt",
      width: 120,
      render: (date: string) => (
        <span className="font-primary text-sm text-tertiary-7">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      width: 100,
      align: "right",
      render: (views: number) => (
        <span className="font-primary text-sm font-semibold text-tertiary-12">
          {(views || 0).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      align: "right",
      render: (_: any, record: any) => (
        <a
          href={`/blog/${record.slug.current}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-primary text-sm font-medium text-primary-6 transition-colors hover:text-primary-7"
        >
          View
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-28 bg-gradient-to-br from-tertiary-2 via-white to-primary-1/20">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-secondary text-4xl font-bold text-tertiary-12">
              Analytics
            </h1>
            <p className="mt-2 font-primary text-sm text-tertiary-7">
              Track your blog performance and insights
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-tertiary-5 bg-white px-4 py-2.5 font-primary text-sm font-medium text-tertiary-12 shadow-sm transition-all hover:border-tertiary-6 hover:shadow"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Eye className="h-5 w-5" />}
            label="Total Views"
            value={overview.data?.totalViews || 0}
            loading={overview.isLoading}
          />
          <StatCard
            icon={<FileText className="h-5 w-5" />}
            label="Total Posts"
            value={overview.data?.totalPosts || 0}
            loading={overview.isLoading}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Posts with Views"
            value={overview.data?.postsWithViews || 0}
            loading={overview.isLoading}
          />
          <StatCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="Average Views"
            value={overview.data?.averageViews || 0}
            loading={overview.isLoading}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - 2 columns */}
          <div className="space-y-6 lg:col-span-2">
            {/* Top Performing Posts */}
            <div className="rounded-xl border border-tertiary-4 bg-white shadow-sm">
              <div className="border-b border-tertiary-4 p-6">
                <h2 className="font-secondary text-xl font-bold text-tertiary-12">
                  Top Performing Posts
                </h2>
                <p className="mt-1 font-primary text-sm text-tertiary-7">
                  Your most viewed content
                </p>
              </div>
              <div className="p-6">
                {topPosts.isLoading ? (
                  <div className="flex h-[400px] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-1 border-t-primary-6"></div>
                  </div>
                ) : topPosts.data?.posts && topPosts.data.posts.length > 0 ? (
                  <ViewsChart
                    data={topPosts.data.posts.map((post: any) => ({
                      title: post.title,
                      views: post.views || 0,
                    }))}
                  />
                ) : (
                  <div className="flex h-[400px] items-center justify-center">
                    <p className="font-primary text-sm text-tertiary-7">
                      No data available yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6 h-full">
            {/* Views Trend */}
            <div className="rounded-xl border border-tertiary-4 bg-white shadow-sm h-full">
              <div className="border-b border-tertiary-4 p-6">
                <h3 className="font-secondary text-lg font-bold text-tertiary-12">
                  Views Trend
                </h3>
                <div className="mt-3 flex gap-2">
                  {[7, 30, 90].map((days) => (
                    <button
                      key={days}
                      onClick={() => setTrendDays(days)}
                      className={`rounded-lg px-3 py-1.5 font-primary text-xs font-medium transition-colors ${
                        trendDays === days
                          ? "bg-primary-6 text-white"
                          : "bg-tertiary-3 text-tertiary-12 hover:bg-tertiary-4"
                      }`}
                    >
                      {days}d
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6">
                {trend.isLoading ? (
                  <div className="flex h-[370px] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-1 border-t-primary-6"></div>
                  </div>
                ) : trend.data?.trend && trend.data.trend.length > 0 ? (
                  <TrendChart data={trend.data.trend} />
                ) : (
                  <div className="flex h-[370px] items-center justify-center">
                    <p className="font-primary text-sm text-tertiary-7">
                      No trend data
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* All Posts Table */}
        <div className="rounded-xl mt-5 lg:col-span-3 border border-tertiary-4 bg-white shadow-sm">
          <div className="border-b border-tertiary-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-secondary text-xl font-bold text-tertiary-12">
                  All Posts
                </h2>
                <p className="mt-1 font-primary text-sm text-tertiary-7">
                  {allPosts.data?.total || 0} total posts
                </p>
              </div>
              <div className="w-64">
                <Search
                  placeholder="Search posts..."
                  allowClear
                  onSearch={handleSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="[&_.ant-input]:font-primary [&_.ant-input]:text-sm"
                />
              </div>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={allPosts.data?.posts || []}
            loading={allPosts.isLoading}
            rowKey="_id"
            pagination={false}
            className="[&_.ant-table]:border-0 [&_.ant-table-thead>tr>th]:bg-tertiary-2 [&_.ant-table-thead>tr>th]:font-primary [&_.ant-table-thead>tr>th]:text-xs [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-table-thead>tr>th]:uppercase [&_.ant-table-thead>tr>th]:tracking-wider [&_.ant-table-thead>tr>th]:text-tertiary-7 [&_.ant-table-tbody>tr]:w-fit [&_.ant-table-tbody>tr:hover]:bg-tertiary-2"
          />

          {allPosts.data?.totalPages && allPosts.data.totalPages > 1 && (
            <div className="flex justify-center border-t border-tertiary-4 px-6 py-4">
              <Pagination
                current={currentPage}
                total={allPosts.data.total}
                pageSize={20}
                onChange={setCurrentPage}
                showSizeChanger={false}
                className="[&_.ant-pagination-item]:border-none [&_.ant-pagination-item]:!bg-transparent [&_.ant-pagination-item-active]:!bg-primary-6 [&_.ant-pagination-item-active>a]:!text-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
