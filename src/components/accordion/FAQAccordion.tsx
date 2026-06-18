import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { faqData } from "../../data";

export function FAQAccordion() {
  // We only need state to track the active, open item panel
  const [openId, setOpenId] = useState<string | number | null>(null);

  const toggleItem = (id: string | number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="my-5 lg:my-16 w-full px-8 lg:px-16 max-w-7xl mx-auto  transition-colors duration-300">
      {/* HEADER */}
      <div className="py-3 text-center space-y-1">
        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
        >
          Your questions, answered
        </h3>
      </div>
      <div className="w-full divide-y-2 divide-[var(--border)] p-5 space-y-2">
        {faqData.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="py-5 transition-colors duration-200">
              {/* Header Trigger */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex justify-between items-center text-left gap-4 font-bold text-lg md:text-xl tracking-tight text-[var(--text)] cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="group-hover:opacity-80 transition-opacity">
                  {item.question}
                </span>
                <FiChevronDown
                  className={`w-6 h-6 shrink-0 transition-transform duration-300 ease-out text-[var(--text)] opacity-80 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Smooth Height Reveal Transition Container */}
              <div
                className="grid transition-all duration-300 ease-in-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                  pointerEvents: isOpen ? "auto" : "none",
                }}
              >
                {/* Inner wrapper to contain the overflow */}
                <div className="overflow-hidden">
                  <p
                    className="pt-4 pb-1 text-base leading-relaxed"
                    style={{ color: "var(--text-paragraph, var(--text))" }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
