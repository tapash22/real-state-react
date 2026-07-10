import React from "react";
import { SectionHeader } from "../../../components/header-section/SectionHeader";

// ==========================================
// Type Contracts & Interfaces
// ==========================================
export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  badges: string[];
}

// ==========================================
// Static Mock Content
// ==========================================
const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    title: "Professional Vocal Recording",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat fermentum massa sit amet mollis.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
    badges: ["1200+ TRACKS", "99% CLARITY", "5 MIC SETUP"],
  },
  {
    id: "02",
    title: "Instrumental Track Production",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat fermentum massa sit amet mollis.",
    image:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=600&auto=format&fit=crop",
    badges: ["MULTI INSTRUMENT", "100% HD", "24/7 SUPPORT"],
  },
  {
    id: "03",
    title: "Electronic Music Arrangement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat fermentum massa sit amet mollis.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop",
    badges: ["50+ SONGS", "3D AUDIO", "EDM / AMBIENT"],
  },
  {
    id: "04",
    title: "Instrumental Track Production",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat fermentum massa sit amet mollis.",
    image:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=600&auto=format&fit=crop",
    badges: ["MULTI INSTRUMENT", "100% HD", "24/7 SUPPORT"],
  },
  {
    id: "05",
    title: "Electronic Music Arrangement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat fermentum massa sit amet mollis.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop",
    badges: ["50+ SONGS", "3D AUDIO", "EDM / AMBIENT"],
  },
];

// ==========================================
// Core Feature Component
// ==========================================
const VoiceServices: React.FC = () => {
  return (
    <div className="bg-[var(--bg)] w-full min-h-screen flex flex-col justify-center items-center ">
      {/* Top Header Section */}
      <div className="py-5 lg:py-10">
        <SectionHeader
          tagTitle="SERVICES | Audio Production & Voice Talent Solutions"
          headerTitle=" We Provide Best Voice Over Service"
          subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          feugiat fermentum massa sit amet mollis."
        />
      </div>

      {/* Sticky Stack Card Container */}
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 1;

          const headerHeight = 74;
          const bufferSpace = 24;
          const baseStickyMargin = headerHeight + bufferSpace;

          // Cards stack cleanly right beneath each other
          const topOffset = baseStickyMargin + index * 32;
          const zIndex = (index + 1) * 5;

          return (
            <section
              key={service.id}
              style={{
                position: "sticky",
                top: `${topOffset}px`,
                zIndex: zIndex,
              }}
              className={`bg-[var(--card)] rounded-xl p-5 lg:p-10 flex flex-col gap-8 md:gap-12 items-center justify-between shadow-md shadow-[var(--primary)] border-t border-[var(--primary)] ${
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Text Layout Block */}
              <div className="flex-1 space-y-6 w-full">
                <span className="text-6xl md:text-7xl font-bold text-[var(--muted)] block tracking-wider">
                  {service.id}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-[var(--text)]">
                  {service.title}
                </h3>
                <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-lg">
                  {service.desc}
                </p>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[var(--button)] shadow-md shadow-[var(--primary)] border border-[var(--border)] text-[var(--text)] font-medium px-5 py-3 rounded-full text-sm transition-all group  focus:outline-none focus:border-[var(--primary)] focus:ring-offset-0 focus:ring-offset-[var(--border)]"
                >
                  Discover More
                  <span
                    className="inline-block transform group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </div>

              {/* Media Card Preview Component */}
              <div className="flex-1 w-full max-w-xl group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-inner cursor-pointer">
                <img
                  src={service.image}
                  alt={`Cover visual for ${service.title}`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-[0.75]"
                  loading="lazy"
                />

                {/* Visual Depth Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                {/* Micro-Badges Collection Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 transition-opacity duration-300 group-hover:opacity-90">
                  {service.badges.map((badge, idx) => (
                    <span
                      key={`${service.id}-badge-${idx}`}
                      className="bg-[var(--bg)/50] backdrop-blur-sm border border-[var(--border)] text-[var(--text)] text-sm font-light  px-3 py-2 rounded-md uppercase tracking-wider"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default VoiceServices;
