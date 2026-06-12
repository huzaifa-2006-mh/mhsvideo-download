"use client";

import { useEffect, useState } from "react";
import SEOManager from "@/components/dashboard/SEOManager";
import { ExternalLink } from "lucide-react";
import type { SEOSettings } from "@/types";

export default function RobotsPage() {
  const [settings, setSettings] = useState<SEOSettings | null>(null);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((res) => res.json())
      .then(setSettings);
  }, []);

  return (
    <div>
      <SEOManager
        title="Robots & Sitemap"
        description="Control search engine crawling and indexing behavior"
        fields={[
          {
            key: "robotsIndex",
            label: "Allow Search Engine Indexing",
            type: "toggle",
            help: "Allow search engines to index your website pages",
          },
          {
            key: "robotsFollow",
            label: "Allow Link Following",
            type: "toggle",
            help: "Allow search engines to follow links on your pages",
          },
        ]}
      />

      {settings && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="dashboard-card">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Sitemap URL</h3>
            <a
              href="/sitemap.xml"
              target="_blank"
              className="flex items-center gap-2 text-sm text-brand-600 hover:underline"
            >
              {settings.siteUrl}/sitemap.xml
              <ExternalLink className="h-3 w-3" />
            </a>
            <p className="mt-2 text-xs text-gray-400">
              Submit this URL to Google Search Console
            </p>
          </div>

          <div className="dashboard-card">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Robots.txt</h3>
            <a
              href="/robots.txt"
              target="_blank"
              className="flex items-center gap-2 text-sm text-brand-600 hover:underline"
            >
              {settings.siteUrl}/robots.txt
              <ExternalLink className="h-3 w-3" />
            </a>
            <p className="mt-2 text-xs text-gray-400">
              Auto-generated based on your settings above
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
