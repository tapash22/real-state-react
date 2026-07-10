import React from "react";

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
];

// ==========================================
// Core Feature Component
// ==========================================
const VoiceServices: React.FC = () => {
  return (
    <div className="bg-[#0b0c10] text-white min-h-screen py-20 px-6 sm:px-12 md:px-24 font-sans selection:bg-[#00a896] selection:text-black">
      {/* Top Header Section */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-24 border-b border-zinc-800 pb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-3">
            SERVICES | Audio Production & Voice Talent Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl leading-tight">
            We Provide Best Voice <br /> Over Service
          </h1>
        </div>
        <p className="text-zinc-400 text-sm md:text-base max-w-md leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          feugiat fermentum massa sit amet mollis.
        </p>
      </header>

      {/* Sticky Stack Card Container */}
      <main className="max-w-7xl mx-auto flex flex-col gap-16 relative">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 1;

          // Custom calculations for staggered stacking distances
          const topOffset = 40 + index * 32;
          const zIndex = (index + 1) * 10;

          return (
            <section
              key={service.id}
              style={{
                position: "sticky",
                top: `${topOffset}px`,
                zIndex: zIndex,
              }}
              className={`bg-[#12131a] rounded-3xl p-8 md:p-12 flex flex-col gap-8 md:gap-12 items-center justify-between shadow-[0_-15px_30px_rgba(0,0,0,0.5)] border border-zinc-900/50 ${
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Text Layout Block */}
              <div className="flex-1 space-y-6 w-full">
                <span className="text-6xl md:text-7xl font-bold text-zinc-800 block tracking-tighter">
                  {service.id}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
                  {service.desc}
                </p>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#00a896] hover:bg-[#008f7f] text-white font-medium px-5 py-3 rounded-full text-sm transition-all group shadow-lg shadow-[#00a896]/10 focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:ring-offset-2 focus:ring-offset-[#12131a]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Micro-Badges Collection Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 transition-opacity duration-300 group-hover:opacity-90">
                  {service.badges.map((badge, idx) => (
                    <span
                      key={`${service.id}-badge-${idx}`}
                      className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-xs font-semibold tracking-wider px-3 py-1.5 rounded-md uppercase"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* Spacer Element ensuring final card elements scroll cleanly through viewports */}
      <div className="h-[20vh]" aria-hidden="true" />
    </div>
  );
};

export default VoiceServices;
