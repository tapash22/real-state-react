import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { SectionHeader } from "../header-section/SectionHeader";

export interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  heading?: string; // Optional custom heading
  items: FaqItem[]; // Array of questions and answers passed from the parent
}

export function FaqAccordion({
  heading = "Your questions, answered",
  items,
}: FaqAccordionProps) {
  // We only need state to track the active, open item panel
  const [openId, setOpenId] = useState<string | number | null>(null);

  const toggleItem = (id: string | number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="px-0 lg:px-16 w-full lg:max-w-7xl transition-colors duration-300">
      {/* HEADER */}
      <SectionHeader headerTitle={heading} />

      <div className="w-full divide-y-2 divide-[var(--border)] p-0 lg:p-5 space-y-2">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="py-2 lg:py-5 transition-colors duration-200"
            >
              {/* Header Trigger */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex justify-between items-center text-left gap-2 lg:gap-4 font-medium lg:font-bold text-md lg:text-xl tracking-wide text-[var(--text)] cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="group-hover:opacity-80 transition-opacity">
                  {item.question}
                </span>
                <FiChevronDown
                  size={24}
                  className={`shrink-0 transition-transform duration-300 ease-out text-[var(--text)] opacity-80 ${
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
                    className="py-3 text-base leading-relaxed"
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

// Export default so default imports like `import FaqAccordion from '...'` work seamlessly
export default FaqAccordion;
