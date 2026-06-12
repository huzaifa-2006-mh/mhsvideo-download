import SEOManager from "@/components/dashboard/SEOManager";

export default function SocialMediaPage() {
  return (
    <SEOManager
      title="Social Media SEO"
      description="Configure Open Graph and Twitter Card tags for social sharing"
      fields={[
        {
          key: "ogTitle",
          label: "Open Graph Title",
          placeholder: "MHS Video Downloader - Free Social Media Video Downloader",
          help: "Title shown when your site is shared on Facebook, LinkedIn, etc.",
        },
        {
          key: "ogDescription",
          label: "Open Graph Description",
          type: "textarea",
          placeholder: "Download videos from YouTube, TikTok, Instagram & Facebook instantly...",
          help: "Description shown in social media previews",
        },
        {
          key: "ogImage",
          label: "Open Graph Image URL",
          placeholder: "/og-image.png",
          help: "Image shown in social shares (recommended: 1200x630px)",
        },
        {
          key: "ogType",
          label: "Open Graph Type",
          placeholder: "website",
          help: "Type of content (website, article, product)",
        },
        {
          key: "twitterCard",
          label: "Twitter Card Type",
          placeholder: "summary_large_image",
          help: "Twitter card format (summary, summary_large_image, app, player)",
        },
        {
          key: "twitterSite",
          label: "Twitter Handle",
          placeholder: "@mhsdownloader",
          help: "Your Twitter/X username",
        },
      ]}
    />
  );
}
