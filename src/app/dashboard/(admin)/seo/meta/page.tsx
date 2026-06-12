import SEOManager from "@/components/dashboard/SEOManager";

export default function MetaTagsPage() {
  return (
    <SEOManager
      title="Meta Tags"
      description="Configure HTML meta tags for better search engine visibility"
      fields={[
        {
          key: "title",
          label: "Page Title",
          placeholder: "MHS Video Downloader - Free Video Downloads",
          help: "The title tag shown in browser tabs and search results",
        },
        {
          key: "description",
          label: "Meta Description",
          type: "textarea",
          placeholder: "Download videos from YouTube, TikTok, Instagram & Facebook for free...",
          help: "Brief description of your page for search engines",
        },
        {
          key: "keywords",
          label: "Meta Keywords",
          type: "tags",
          help: "Keywords related to your website content",
        },
        {
          key: "favicon",
          label: "Favicon URL",
          placeholder: "/favicon.ico",
          help: "Path to your site favicon",
        },
        {
          key: "schemaType",
          label: "Schema Type",
          placeholder: "WebApplication",
          help: "JSON-LD schema type (WebApplication, WebSite, Organization)",
        },
        {
          key: "schemaOrganization",
          label: "Organization Name",
          placeholder: "MHS Video Downloader",
        },
        {
          key: "schemaLogo",
          label: "Organization Logo URL",
          placeholder: "/logo.png",
        },
      ]}
    />
  );
}
