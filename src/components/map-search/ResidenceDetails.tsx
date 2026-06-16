import React from "react";

// Define strict types for the data structures
export interface Promotion {
  title: string;
  description?: string;
  bulletPoints?: string[];
}

export interface HighlightItem {
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  general: string[];
}

export interface ResidenceData {
  title: string;
  tenantCount: number;
  cleaningInfo: string;
  promotions: Promotion[];
  highlights: HighlightItem[];
  services: ServicesConfig;
}

interface ResidenceDetailsProps {
  data: ResidenceData;
}

const ResidenceDetails: React.FC<ResidenceDetailsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className=" bg-transparent font-sans ">
      {/* Header Section */}
      <header className="space-y-3 py-3 ">
        <h1 className="text-2xl font-bold text-[var(--text)]  flex items-center">
          <span className="text-xl">🏠</span> {data.title}
        </h1>
        <p className="text-sm text-[var(--text)] flex items-center ">
          <span>👥</span>{" "}
          <strong className="text-[var(--muted)] ">
            {data.tenantCount} tenants
          </strong>{" "}
          have successfully called this place home
        </p>
      </header>

      {/* About Section */}
      <section className="py-3 space-y-3">
        <h2 className="text-lg font-bold text-[var(--text)] border-b-2 border-[var(--border)] leading-10 ">
          About this Student residence
        </h2>

        {/* Cleaning Info */}
        <div className="flex items-start gap-2 text-sm text-[var(--muted)]">
          <span className="text-orange-500 mt-1">♦</span>
          <p>{data.cleaningInfo}</p>
        </div>

        {/* Promos */}
        <div className="space-y-4">
          {data.promotions?.map((promo, index) => (
            <div key={index} className="text-sm text-[var(--text)] ">
              <div className="flex items-center gap-2 font-semibold text-[var(--text)]  mb-1">
                <span>☀️</span> {promo.title}
              </div>
              {promo.description && (
                <p className="text-[var(--text)]  pl-6 mb-1">
                  {promo.description}
                </p>
              )}
              {promo.bulletPoints && (
                <ul className="list-disc pl-10 space-y-1 text-[var(--muted)] ">
                  {promo.bulletPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <button className="text-xs font-semibold text-slate-500 underline mt-3 hover:text-slate-800 block">
          Show more
        </button>
      </section>

      {/* Highlights Section */}
      <section className="py-3 space-y-3">
        <h2 className="text-lg font-bold text-[var(--text)] leading-10  border-b-2 border-[var(--border)] ">
          Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.highlights?.map((highlight, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg overflow-hidden space-y-2"
            >
              <img
                src={highlight.image}
                alt={highlight.title}
                className="w-full h-28 object-cover rounded-tl-xl rounded-tr-xl "
              />
              <div className="p-3 space-y-1">
                <h3 className="font-bold text-[var(--text)]  text-sm tracking-wider ">
                  {highlight.title}
                </h3>
                <p className="text-xs text-[var(--text)]  leading-relaxed tracking-wider">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-3 space-y-3 border-b-2 border-[var(--border)] ">
        <h2 className="text-lg font-bold text-[var(--text)] border-b-2 border-[var(--border)] leading-10 ">
          Services
        </h2>
        <div className="pl-1">
          <h3 className="text-sm font-bold text-[var(--text)]  flex items-center gap-2 ">
            <span>☕</span> General
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-sm text-[var(--meted)] ">
            {data.services?.general?.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Available Places Header Bar */}
      <section className="flex items-center justify-between py-3 space-y-3 ">
        <h2 className="text-lg font-bold text-[var(--text)] ">
          Available places
        </h2>
        <button className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--text)]  hover:bg-slate-50">
          <span>↕️</span> Recommended
        </button>
      </section>
    </div>
  );
};

export default ResidenceDetails;
