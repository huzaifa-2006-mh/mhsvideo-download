export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold text-gray-900">MHS Video Downloader</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Download videos from YouTube, TikTok, Instagram, and Facebook for free.
              Fast, secure, and no registration required.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">Supported Platforms</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>YouTube Video Downloader</li>
              <li>TikTok Video Downloader</li>
              <li>Instagram Video Downloader</li>
              <li>Facebook Video Downloader</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">Legal</h4>
            <p className="text-sm leading-relaxed text-gray-500">
              Only download videos you have permission to download. Respect copyright
              and platform terms of service.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} MHS Video Downloader. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
