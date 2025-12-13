"use client";

import BrandOnePager from "@/components/BrandOnePager";

export default function PreviewPage() {
  // Add print styles
  if (typeof document !== 'undefined') {
    const styleId = 'single-page-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .single-page-container {
            box-shadow: none !important;
            border-radius: 0 !important;
            page-break-after: avoid;
            page-break-inside: avoid;
            max-height: 100vh;
            height: auto;
          }
          @page {
            size: letter;
            margin: 0.25in;
          }
        }

        /* Screen sizing to match print dimensions */
        .single-page-container {
          width: 8.5in;
          min-height: 10.5in;
          max-height: 10.5in;
          overflow: auto;
        }
      `;
      document.head.appendChild(style);
    }
  }
  // Sample data for testing the template
  const sampleData = {
    name: "Sarah Johnson",
    title: "Leadership Development Consultant & Executive Coach",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    email: "sarah@transformleadership.com",
    website: "https://transformleadership.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/sarahjohnsoncoach",
    expertise: "I specialize in transforming mid-career professionals into confident, strategic leaders through proven leadership frameworks and personalized coaching. With 15 years of corporate experience and certifications in executive coaching, I help leaders navigate complex organizational challenges and unlock their full potential.",
    uniqueValue: "Unlike generic leadership programs, I combine neuroscience-based techniques with practical business strategy. My approach is rooted in real-world corporate experience, not just theory. I've personally coached over 200 executives and have a track record of helping clients achieve promotions and lead successful organizational transformations.",
    services: [
      "1-on-1 Executive Coaching",
      "Leadership Development Programs",
      "Team Performance Workshops",
      "Career Transition Coaching",
      "Strategic Planning Sessions"
    ],
    idealClient: "Mid-to-senior level professionals (ages 40-55) who are stepping into executive leadership roles or navigating career transitions. They're accomplished in their fields but need strategic guidance to elevate their leadership presence and decision-making capabilities.",
    toneOfVoice: "Professional yet warm and approachable. I balance authority with empathy, using clear, jargon-free language that inspires confidence while remaining relatable and authentic.",
    headline: "Transform Your Leadership, Transform Your Career",
    subheadline: "Empowering ambitious professionals to lead with confidence, clarity, and impact",
    keyPoints: [
      "15+ years of corporate leadership experience",
      "Certified Executive Coach (ICF-ACC)",
      "200+ executives coached to success",
      "Specialization in neuroscience-based leadership",
      "Proven track record of client promotions",
      "Personalized, results-driven approach"
    ],
    results: [
      "200+ Executives Coached",
      "15 Years Experience",
      "98% Client Satisfaction"
    ],
    testimonials: [
      {
        quote: "Sarah's coaching was transformational. Within 6 months, I was promoted to VP and leading a team of 50. Her neuroscience-based approach gave me practical tools I use daily.",
        author: "Michael Chen, VP of Operations"
      },
      {
        quote: "Working with Sarah helped me navigate the most challenging career transition of my life with confidence and clarity. I couldn't have done it without her.",
        author: "Jennifer Martinez, Senior Director"
      }
    ],
    callToAction: "Ready to elevate your leadership? Let's start a conversation about your goals."
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1D2127] mb-3">
            Personal Brand One-Pager Preview
          </h1>
          <p className="text-lg text-[#1D2127]/70">
            Edit this template to match your desired design
          </p>
        </div>

        <BrandOnePager data={sampleData} />

        <div className="mt-8 text-center">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F83600] text-white rounded-full font-semibold hover:bg-[#E02F00] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Preview
          </button>
        </div>
      </div>
    </div>
  );
}
