import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoDownloader from "@/components/VideoDownloader";
import PlatformSection from "@/components/PlatformSection";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 py-20 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Free • Fast • No Registration
            </div>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              MHS Video Downloader
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-brand-100 md:text-xl">
              Download videos from YouTube, TikTok, Instagram & Facebook instantly.
              HD quality, completely free.
            </p>

            <div className="flex justify-center">
              <VideoDownloader />
            </div>
          </div>
        </section>

        <PlatformSection />
      </main>

      <Footer />
    </div>
  );
}
