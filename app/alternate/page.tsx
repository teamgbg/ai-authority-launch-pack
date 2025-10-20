"use client";

export default function AlternatePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - DaisyUI Version with Video Background */}
      <div className="hero min-h-screen relative overflow-hidden">
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
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-base-100" />
        </div>

        <div className="hero-content text-center relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="badge badge-primary badge-lg gap-2 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Your Personal Brand in 10 Minutes
            </div>

            {/* Main Headline with DaisyUI Typography */}
            <h1 className="text-5xl font-bold mb-6 sm:text-6xl lg:text-7xl text-white drop-shadow-2xl">
              Launch Your{" "}
              <span className="text-[#F83600]">Brand Authority</span>
              {" "}in Minutes
            </h1>

            {/* Subheadline */}
            <p className="py-6 text-lg leading-relaxed text-white/90 drop-shadow-lg">
              Get your AI-powered Personal Brand One-Pager + 3 Ready-to-Post Social Captions —
              completely free. Perfect for established experts ready to shine online.
            </p>

            {/* CTA Buttons - DaisyUI Version */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => alert('Chat interface coming soon!')}
              >
                Create My Brand Pack
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button className="btn btn-outline btn-lg">
                See How It Works
              </button>
            </div>

            {/* Social Proof with DaisyUI Avatar Group */}
            <div className="mt-12 flex items-center justify-center gap-3">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-orange-600"></div>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-base-content to-base-300"></div>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-orange-600"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-white/80 drop-shadow-md">
                Join 500+ experts who launched their brand
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - DaisyUI Cards */}
      <div className="bg-base-100 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 - Lightning Fast */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
              <div className="card-body">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="card-title">Lightning Fast</h2>
                <p className="opacity-70">
                  Get your personalized brand assets in under 10 minutes with our AI-powered system
                </p>
              </div>
            </div>

            {/* Card 2 - Tailored to You */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
              <div className="card-body">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="card-title">Tailored to You</h2>
                <p className="opacity-70">
                  Every asset is uniquely crafted based on your expertise, voice, and professional brand
                </p>
              </div>
            </div>

            {/* Card 3 - Ready to Use */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
              <div className="card-body">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="card-title">Ready to Use</h2>
                <p className="opacity-70">
                  Download your brand one-pager and post your social content immediately — no editing needed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - DaisyUI Version */}
      <div className="bg-base-100 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Three simple steps to launch your authority brand in minutes
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Chat with AI
              </h3>
              <p className="opacity-70 leading-relaxed">
                Have a friendly 5-minute conversation with our AI assistant about your expertise, experience, and ideal clients
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Get Your Brand Pack
              </h3>
              <p className="opacity-70 leading-relaxed">
                Receive your personalized Brand Authority One-Pager plus 3 ready-to-post social media captions instantly
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Launch Your Authority
              </h3>
              <p className="opacity-70 leading-relaxed">
                Download your one-pager, post your social content, and start attracting your ideal clients immediately
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section - DaisyUI Hero */}
      <div className="hero bg-gradient-to-br from-primary to-[#FF6B3D] py-24">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h2 className="mb-6 text-4xl sm:text-5xl font-bold text-white">
              Ready to Launch Your Brand?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join hundreds of experts who have already launched their authority brand.
              Get your free AI-powered Brand Pack in just 10 minutes.
            </p>
            <button
              className="btn btn-lg bg-white text-[#F83600] border-none hover:bg-base-200 hover:text-base-content"
              onClick={() => alert('Chat interface coming soon!')}
            >
              Start Your Free Brand Pack Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <p className="mt-4 text-sm text-white/80">
              No credit card required • 100% free • Takes less than 10 minutes
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section with DaisyUI Alert */}
      <div className="bg-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="alert shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">This is a DaisyUI version!</h3>
              <div className="text-xs">Using semantic component classes: hero, card, btn, badge, alert</div>
            </div>
            <button className="btn btn-sm btn-primary">
              <a href="/">Back to Original</a>
            </button>
          </div>
        </div>
      </div>

      {/* Footer - DaisyUI Version */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <aside>
          <p className="font-semibold">
            AI Authority Launch Pack
          </p>
          <p>© 2025 Launcha AI Authority. Built for experts ready to launch their brand.</p>
        </aside>
      </footer>
    </div>
  );
}
