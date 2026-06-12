import SEOManager from "@/components/dashboard/SEOManager";

export default function SEOGeneralPage() {
  return (
    <SEOManager
      title="General SEO Settings"
      description="Configure basic SEO settings for your website"
      fields={[
        {
          key: "siteName",
          label: "Site Name",
          placeholder: "MHS Video Downloader",
          help: "The name of your website displayed in search results and browser tabs",
        },
        {
          key: "siteUrl",
          label: "Site URL",
          placeholder: "https://yourdomain.com",
          help: "Your website's primary URL (include https://)",
        },
        {
          key: "title",
          label: "SEO Title",
          placeholder: "MHS Video Downloader - Free Video Downloads",
          help: "Main title tag (recommended: 50-60 characters)",
        },
        {
          key: "description",
          label: "Meta Description",
          type: "textarea",
          placeholder: "Download videos from YouTube, TikTok, Instagram & Facebook...",
          help: "Description shown in search results (recommended: 150-160 characters)",
        },
        {
          key: "keywords",
          label: "Keywords",
          type: "tags",
          placeholder: "video downloader, youtube downloader, tiktok download",
          help: "Comma-separated keywords for SEO",
        },
        {
          key: "canonicalUrl",
          label: "Canonical URL",
          placeholder: "https://yourdomain.com",
          help: "Preferred URL for search engines to index",
        },
        {
          key: "language",
          label: "Language",
          placeholder: "en",
          help: "Site language code (e.g., en, ur, hi)",
        },
        {
          key: "author",
          label: "Author",
          placeholder: "MHS Team",
        },
      ]}
    />
  );
}
