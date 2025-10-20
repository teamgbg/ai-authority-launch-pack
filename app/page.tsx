"use client";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section with Video Background */}
      <main className="relative">
        {/* Video Background Container */}
        <div className="relative overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/hero-background.mp4" type="video/mp4" />
            </video>
            {/* Video Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl pt-32 pb-24 text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center rounded-full border border-[#F83600]/20 bg-[#F83600]/5 px-4 py-2">
              <span className="text-sm font-medium text-[#F83600]">
                ✨ Your Personal Brand in 10 Minutes
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
              Launch Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#F83600] to-[#FF6B3D] bg-clip-text text-transparent">
                  Brand Authority
                </span>
                <span className="absolute bottom-2 left-0 h-3 w-full bg-[#F83600]/20 -z-10" />
              </span>
              {" "}in Minutes
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-8 text-white/90 drop-shadow-lg sm:text-xl">
              Get your AI-powered Personal Brand One-Pager + 3 Ready-to-Post Social Captions —
              completely free. Perfect for established experts ready to shine online.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[#F83600] px-8 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#E02F00] hover:shadow-xl hover:scale-105 active:scale-95"
                onClick={() => {
                  // TODO: Open chat interface
                  alert('Chat interface coming soon!');
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create My Brand Pack
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F83600] to-[#FF6B3D] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              <button className="inline-flex h-14 items-center justify-center rounded-full border-2 border-[#1D2127]/20 bg-white px-8 font-semibold text-[#1D2127] transition-all duration-300 hover:border-[#F83600]/40 hover:bg-[#F83600]/5">
                See How It Works
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-white/80 drop-shadow-md">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-[#F83600] to-[#FF6B3D]" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-[#1D2127] to-[#3D4147]" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-[#F83600] to-[#FF6B3D]" />
              </div>
              <span className="font-medium">Join 500+ experts who launched their brand</span>
            </div>
          </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-6xl pb-24">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="group rounded-2xl border border-[#1D2127]/10 bg-white p-8 transition-all duration-300 hover:border-[#F83600]/30 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F83600]/10 text-[#F83600] transition-colors duration-300 group-hover:bg-[#F83600] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1D2127]">Lightning Fast</h3>
                <p className="text-sm leading-relaxed text-[#1D2127]/70">
                  Get your personalized brand assets in under 10 minutes with our AI-powered system
                </p>
              </div>

              <div className="group rounded-2xl border border-[#1D2127]/10 bg-white p-8 transition-all duration-300 hover:border-[#F83600]/30 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F83600]/10 text-[#F83600] transition-colors duration-300 group-hover:bg-[#F83600] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1D2127]">Tailored to You</h3>
                <p className="text-sm leading-relaxed text-[#1D2127]/70">
                  Every asset is uniquely crafted based on your expertise, voice, and professional brand
                </p>
              </div>

              <div className="group rounded-2xl border border-[#1D2127]/10 bg-white p-8 transition-all duration-300 hover:border-[#F83600]/30 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F83600]/10 text-[#F83600] transition-colors duration-300 group-hover:bg-[#F83600] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1D2127]">Ready to Use</h3>
                <p className="text-sm leading-relaxed text-[#1D2127]/70">
                  Download your brand one-pager and post your social content immediately — no editing needed
                </p>
              </div>
            </div>
          </div>

        {/* How It Works Section */}
        <div className="mx-auto max-w-6xl px-6 pb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1D2127] mb-4">
                How It Works
              </h2>
              <p className="text-lg text-[#1D2127]/70 max-w-2xl mx-auto">
                Three simple steps to launch your authority brand in minutes
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F83600] to-[#FF6B3D] text-white text-2xl font-bold shadow-lg">
                  1
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#1D2127]">
                  Chat with AI
                </h3>
                <p className="text-[#1D2127]/70 leading-relaxed">
                  Have a friendly 5-minute conversation with our AI assistant about your expertise, experience, and ideal clients
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F83600] to-[#FF6B3D] text-white text-2xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#1D2127]">
                  Get Your Brand Pack
                </h3>
                <p className="text-[#1D2127]/70 leading-relaxed">
                  Receive your personalized Brand Authority One-Pager plus 3 ready-to-post social media captions instantly
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F83600] to-[#FF6B3D] text-white text-2xl font-bold shadow-lg">
                  3
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#1D2127]">
                  Launch Your Authority
                </h3>
                <p className="text-[#1D2127]/70 leading-relaxed">
                  Download your one-pager, post your social content, and start attracting your ideal clients immediately
                </p>
              </div>
            </div>
          </div>

        {/* Bottom CTA Section */}
        <div className="mx-auto max-w-6xl px-6 pb-24">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F83600] to-[#FF6B3D] p-12 text-center shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

              <div className="relative z-10">
                <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                  Ready to Launch Your Brand?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                  Join hundreds of experts who have already launched their authority brand.
                  Get your free AI-powered Brand Pack in just 10 minutes.
                </p>
                <button
                  className="group inline-flex h-14 items-center justify-center rounded-full bg-white px-8 font-semibold text-[#F83600] shadow-lg transition-all duration-300 hover:bg-[#1D2127] hover:text-white hover:scale-105 active:scale-95"
                  onClick={() => alert('Chat interface coming soon!')}
                >
                  <span className="flex items-center gap-2">
                    Start Your Free Brand Pack Now
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
                <p className="mt-4 text-sm text-white/80">
                  No credit card required • 100% free • Takes less than 10 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-[#1D2127]/10 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-center text-sm text-[#1D2127]/60">
            © 2025 Launcha AI Authority. Built for experts ready to launch their brand.
          </p>
        </div>
      </footer>
    </div>
  );
}
