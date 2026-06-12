"use client";

import Link from "next/link";
import { Download } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
            <Download className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">MHS Video Downloader</h1>
            <p className="text-xs text-gray-500">Free & Fast Downloads</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#platforms" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            Platforms
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            How It Works
          </a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}
