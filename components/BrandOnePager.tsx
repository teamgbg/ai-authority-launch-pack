"use client";

import Image from "next/image";

interface BrandOnePagerProps {
  data: {
    name: string;
    title: string;
    photo?: string;
    email?: string;
    website?: string;
    phone?: string;
    linkedin?: string;
    expertise: string;
    uniqueValue: string;
    services?: string[];
    idealClient: string;
    toneOfVoice: string;
    headline?: string;
    subheadline?: string;
    keyPoints?: string[];
    testimonials?: Array<{ quote: string; author: string; }>;
    results?: string[];
    callToAction?: string;
  };
}

export default function BrandOnePager({ data }: BrandOnePagerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden single-page-container">
      {/* Header Section with Brand Colors */}
      <div className="bg-gradient-to-br from-[#F83600] to-[#FF6B3D] px-6 py-4 text-white">
        <div className="flex items-center gap-4">
          {/* Photo */}
          {data.photo && (
            <div className="flex-shrink-0">
              <Image
                src={data.photo}
                alt={data.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-white/30 object-cover"
              />
            </div>
          )}

          {/* Name and Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold mb-0.5">{data.name}</h1>
            <p className="text-base font-medium opacity-95 mb-2">{data.title}</p>

            {/* Contact Information Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs opacity-90">
              {data.email && (
                <a href={`mailto:${data.email}`} className="hover:opacity-100 transition-opacity flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {data.email}
                </a>
              )}
              {data.website && (
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  {data.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {data.phone && (
                <a href={`tel:${data.phone}`} className="hover:opacity-100 transition-opacity flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {data.phone}
                </a>
              )}
              {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-3 space-y-3">
        {/* Headline Section */}
        {data.headline && (
          <div className="text-center border-b border-gray-200 pb-2">
            <h2 className="text-xl font-bold text-[#1D2127] mb-1">
              {data.headline}
            </h2>
            {data.subheadline && (
              <p className="text-sm text-[#1D2127]/70 max-w-2xl mx-auto">
                {data.subheadline}
              </p>
            )}
          </div>
        )}

        {/* Expertise Section */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#F83600] uppercase tracking-wide">
            Area of Expertise
          </h3>
          <p className="text-xs text-[#1D2127] leading-snug">
            {data.expertise}
          </p>
        </div>

        {/* Unique Value Proposition */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#F83600] uppercase tracking-wide">
            What Makes Me Unique
          </h3>
          <p className="text-xs text-[#1D2127] leading-snug">
            {data.uniqueValue}
          </p>
        </div>

        {/* Services/Offerings */}
        {data.services && data.services.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#F83600] uppercase tracking-wide">
              Services & Offerings
            </h3>
            <div className="grid gap-1.5 md:grid-cols-2">
              {data.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-1.5 p-1.5 bg-[#F83600]/5 rounded border border-[#F83600]/20"
                >
                  <div className="flex-shrink-0 w-1 h-1 rounded-full bg-[#F83600] mt-1" />
                  <p className="text-xs text-[#1D2127] leading-tight">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ideal Client */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#F83600] uppercase tracking-wide">
            Who I Serve
          </h3>
          <p className="text-xs text-[#1D2127] leading-snug">
            {data.idealClient}
          </p>
        </div>

        {/* Results & Achievements */}
        {data.results && data.results.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#F83600] uppercase tracking-wide">
              Results & Achievements
            </h3>
            <div className="grid gap-1.5 md:grid-cols-3">
              {data.results.map((result, index) => (
                <div
                  key={index}
                  className="text-center p-2 bg-gradient-to-br from-[#F83600]/10 to-[#FF6B3D]/10 rounded border border-[#F83600]/20"
                >
                  <p className="text-xs font-bold text-[#F83600] leading-tight">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Points (if provided) */}
        {data.keyPoints && data.keyPoints.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#F83600] uppercase tracking-wide">
              Key Highlights
            </h3>
            <div className="grid gap-1.5 md:grid-cols-2">
              {data.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-1.5 p-1.5 bg-[#F83600]/5 rounded border border-[#F83600]/20"
                >
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#F83600] text-white flex items-center justify-center text-[10px] font-bold">
                    {index + 1}
                  </div>
                  <p className="text-xs text-[#1D2127] leading-tight pt-0.5">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials/Social Proof */}
        {data.testimonials && data.testimonials.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#F83600] uppercase tracking-wide">
              Client Testimonials
            </h3>
            <div className="space-y-1.5">
              {data.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-50 rounded border-l-3 border-[#F83600]"
                >
                  <p className="text-xs text-[#1D2127] italic leading-tight mb-0.5">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p className="text-[10px] text-[#F83600] font-semibold">
                    — {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action (if provided) */}
        {data.callToAction && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-center bg-gradient-to-br from-[#F83600] to-[#FF6B3D] rounded-lg p-3 text-white">
              <p className="text-sm font-semibold">
                {data.callToAction}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
        <p className="text-center text-[10px] text-gray-600">
          Personal Brand One-Pager • Created with Launcha AI Authority
        </p>
      </div>
    </div>
  );
}
