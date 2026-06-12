import type { Metadata } from "next";
import { getSEOSettings, generateSchemaMarkup } from "@/lib/seo";
import "./globals.css";

export function generateMetadata(): Metadata {
  const seo = getSEOSettings();

  return {
    metadataBase: new URL(seo.siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: seo.author }],
    creator: seo.author,
    publisher: seo.siteName,
    robots: {
      index: seo.robotsIndex,
      follow: seo.robotsFollow,
      googleBot: {
        index: seo.robotsIndex,
        follow: seo.robotsFollow,
      },
    },
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      type: seo.ogType as "website",
      locale: seo.language,
      url: seo.siteUrl,
      siteName: seo.siteName,
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.siteName }],
    },
    twitter: {
      card: seo.twitterCard as "summary_large_image",
      site: seo.twitterSite,
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [seo.ogImage],
    },
    icons: {
      icon: seo.favicon,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = getSEOSettings();
  const schema = generateSchemaMarkup(seo);

  return (
    <html lang={seo.language}>
      <head>
        {seo.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${seo.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${seo.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}
        {seo.googleSearchConsole && (
          <meta name="google-site-verification" content={seo.googleSearchConsole} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
