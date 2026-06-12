import SEOManager from "@/components/dashboard/SEOManager";

export default function AnalyticsPage() {
  return (
    <SEOManager
      title="Analytics & Tracking"
      description="Connect Google Analytics and Search Console for tracking"
      fields={[
        {
          key: "googleAnalyticsId",
          label: "Google Analytics ID",
          placeholder: "G-XXXXXXXXXX",
          help: "Your GA4 Measurement ID (starts with G-)",
        },
        {
          key: "googleSearchConsole",
          label: "Google Search Console Verification",
          placeholder: "verification-code-here",
          help: "Meta verification code from Google Search Console",
        },
      ]}
    />
  );
}
