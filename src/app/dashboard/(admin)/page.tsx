"use client";

import { useEffect, useState } from "react";
import {
  Globe,
  Search,
  BarChart3,
  FileText,
  Eye,
  CheckCircle2,
} from "lucide-react";
import type { SEOSettings } from "@/types";

export default function DashboardOverview() {
  const [settings, setSettings] = useState<SEOSettings | null>(null);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((res) => res.json())
      .then(setSettings);
  }, []);

  const stats = [
    {
      label: "Site Name",
      value: settings?.siteName || "MHS Video Downloader",
      icon: Globe,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "SEO Title",
      value: settings?.title ? `${settings.title.substring(0, 40)}...` : "Not set",
      icon: Search,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Keywords",
      value: `${settings?.keywords?.length || 0} keywords`,
      icon: FileText,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Analytics",
      value: settings?.googleAnalyticsId ? "Connected" : "Not connected",
      icon: BarChart3,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const checklist = [
    { label: "Meta title configured", done: !!settings?.title },
    { label: "Meta description set", done: !!settings?.description },
    { label: "Keywords added", done: (settings?.keywords?.length || 0) > 0 },
    { label: "Open Graph tags set", done: !!settings?.ogTitle },
    { label: "Twitter card configured", done: !!settings?.twitterCard },
    { label: "Sitemap enabled", done: true },
    { label: "Robots.txt configured", done: true },
    { label: "Schema markup active", done: !!settings?.schemaType },
    {
      label: "Google Analytics connected",
      done: !!settings?.googleAnalyticsId,
    },
    {
      label: "Search Console verified",
      done: !!settings?.googleSearchConsole,
    },
  ];

  const score = Math.round(
    (checklist.filter((c) => c.done).length / checklist.length) * 100
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Manage your MHS Video Downloader site.
        </p>
      </div>

      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="dashboard-card">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="dashboard-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">SEO Score</h2>
            <span
              className={`text-2xl font-bold ${
                score >= 80
                  ? "text-green-600"
                  : score >= 50
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {score}%
            </span>
          </div>
          <div className="mb-4 h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all ${
                score >= 80
                  ? "bg-green-500"
                  : score >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            Complete all SEO settings to improve your search engine ranking.
          </p>
        </div>

        <div className="dashboard-card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">SEO Checklist</h2>
          <div className="space-y-2">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <CheckCircle2
                  className={`h-4 w-4 ${item.done ? "text-green-500" : "text-gray-300"}`}
                />
                <span
                  className={`text-sm ${item.done ? "text-gray-900" : "text-gray-400"}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-card mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-5 w-5 text-brand-600" />
          <h2 className="text-lg font-semibold text-gray-900">Search Preview</h2>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-lg text-blue-700 hover:underline cursor-pointer">
            {settings?.title || "MHS Video Downloader"}
          </p>
          <p className="text-sm text-green-700">
            {settings?.siteUrl || "http://localhost:3000"}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {settings?.description ||
              "Download videos from YouTube, TikTok, Instagram, and Facebook for free."}
          </p>
        </div>
      </div>
    </div>
  );
}
