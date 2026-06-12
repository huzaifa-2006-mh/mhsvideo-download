import {
  Youtube,
  Music2,
  Instagram,
  Facebook,
  Zap,
  Shield,
  Globe,
  Smartphone,
} from "lucide-react";

const platforms = [
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "text-red-600 bg-red-50",
    description: "Download YouTube videos in HD quality",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Music2,
    color: "text-gray-900 bg-gray-100",
    description: "Save TikTok videos without watermark",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-600 bg-pink-50",
    description: "Download Instagram Reels and videos",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600 bg-blue-50",
    description: "Save Facebook videos in HD",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your video download links in seconds",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "No registration or personal data required",
  },
  {
    icon: Globe,
    title: "All Platforms",
    description: "YouTube, TikTok, Instagram & Facebook support",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on all devices",
  },
];

export default function PlatformSection() {
  return (
    <>
      <section id="platforms" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Supported Platforms
            </h2>
            <p className="mt-2 text-gray-500">
              Download videos from all major social media platforms
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                id={platform.id}
                className="card text-center transition-transform hover:-translate-y-1"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${platform.color}`}
                >
                  <platform.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {platform.name}
                </h3>
                <p className="text-sm text-gray-500">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              How It Works
            </h2>
            <p className="mt-2 text-gray-500">Three simple steps to download any video</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Copy URL", desc: "Copy the video link from YouTube, TikTok, Instagram, or Facebook" },
              { step: "2", title: "Paste & Process", desc: "Paste the URL in the box above and click Download Video" },
              { step: "3", title: "Save Video", desc: "Choose your preferred quality and save the video to your device" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="card text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is MHS Video Downloader free?",
                a: "Yes, MHS Video Downloader is completely free to use. No registration or payment required.",
              },
              {
                q: "Which platforms are supported?",
                a: "We support YouTube, TikTok, Instagram, and Facebook video downloads.",
              },
              {
                q: "What video quality can I download?",
                a: "You can download videos in various qualities including HD, depending on the original video quality.",
              },
              {
                q: "Is it safe to use?",
                a: "Yes, we don't store your videos or personal data. All processing happens securely.",
              },
            ].map((faq) => (
              <details key={faq.q} className="card group">
                <summary className="cursor-pointer text-sm font-semibold text-gray-900">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
