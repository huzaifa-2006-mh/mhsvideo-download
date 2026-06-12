# MHS Video Downloader

Free social media video downloader built with Next.js. Download videos from YouTube, TikTok, Instagram, and Facebook.

## Features

- **Multi-Platform Support**: YouTube, TikTok, Instagram, Facebook
- **HD Quality Downloads**: Multiple quality options
- **Admin Dashboard**: Secure login-protected admin panel
- **Full SEO Suite**: Meta tags, Open Graph, Twitter Cards, Sitemap, Robots.txt, Schema markup, Google Analytics

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```
SESSION_SECRET=your-secret-key-min-32-chars
ADMIN_USERNAME=huzaifa
ADMIN_PASSWORD=your-password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the app.

### Admin Dashboard

- URL: [http://localhost:3000/dashboard/login](http://localhost:3000/dashboard/login)
- Default credentials are set in `.env.local`

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes
│   ├── dashboard/        # Admin dashboard
│   └── page.tsx          # Homepage
├── components/           # React components
├── lib/                  # Utilities & downloaders
└── types/                # TypeScript types
```

## SEO Features

Manage all SEO settings from the admin dashboard:

- General SEO (title, description, keywords)
- Meta Tags (favicon, schema markup)
- Social Media (Open Graph, Twitter Cards)
- Analytics (Google Analytics, Search Console)
- Robots & Sitemap configuration

## License

For personal use only. Respect copyright and platform terms of service.
"# mhsvideo-download" 
