import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function AuthLayout() {
  const { pathname } = useLocation();

  // Create a reference to target the scrollable container layout div
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- FEATURE 1: ROUTE CHANGE -> SMOOTH SCROLL TO TOP ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Smoothly animates the layout div back up to pixel coordinate 0
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return (
    <div
      ref={scrollContainerRef} // Attached the reference anchor right
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-heading)",
      }}
      /* Added your custom scrollbar utilities 'overflow-y-auto h-screen scrollbar-thin' 
         so it manages the window frame layout seamlessly */
      className="h-screen w-full flex flex-col overflow-y-auto scrollbar-thin transition-colors duration-300"
    >
      {/* STICKY HEADER WRAPPER */}

      <header
        style={{ backgroundColor: "var(--nav-bg)" }}
        className="flex justify-between items-center px-6 md:px-10 py-3 shadow-sm border-b transition-colors duration-300 border-[var(--border)]"
      >
        {/* Logo */}
        <div>
          <Link
            to="/"
            style={{ color: "var(--nav-link)" }}
            className="flex items-center gap-5 font-bold text-2xl tracking-wide transition-opacity hover:opacity-90"
            aria-label="Thikana Home"
          >
            {/* Combined Brand Logo & Text Mark SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 450 120"
              className="h-10 w-auto md:h-12"
              fill="none"
            >
              <g transform="translate(10, 10)">
                {/* Roof Frame */}
                <path
                  d="M11 49.3L47.2 20.2c2.5-2 5.9-2 8.4 0l36.2 29.1c1.7 1.4 4.2 1.1 5.5-0.6s1.1-4.2-0.6-5.5L60.5 14.1c-5.3-4.3-12.9-4.3-18.2 0L6 43.2c-1.7 1.4-2 3.8-0.6 5.5s3.9 2 5.6 0.6z"
                  fill="currentColor" /* Adaptable roof silhouette based on active text theme */
                />
                <path d="M80 24h7v13l-7-5.6V24z" fill="currentColor" />

                {/* Central Structural Letter Pillars */}
                <path d="M39 48h24v8h-8v36h-8V56h-8v-8z" fill="currentColor" />

                {/* Playful Accents (Teal & Amber variants mapped safely) */}
                <path
                  d="M33 56H16c-2.2 0-4 1.8-4 4v17c0 2.2 1.8 4 4 4h4l-4 7 9-7h8c2.2 0 4-1.8 4-4V60c0-2.2-1.8-4-4-4z"
                  fill="#F59E0B" /* Thikana Amber */
                />

                <path
                  d="M69 56h17c2.2 0 4 1.8 4 4v17c0 2.2-1.8 4-4 4h-8l9 7-4-7h-4c-2.2 0-4-1.8-4-4V60c0-2.2 1.8-4 4-4z"
                  fill="#14B8A6" /* Thikana Teal */
                />
                <rect
                  x="73"
                  y="66"
                  width="2.5"
                  height="2.5"
                  rx="0.5"
                  fill="#FFFFFF"
                />
                <rect
                  x="77.5"
                  y="66"
                  width="2.5"
                  height="2.5"
                  rx="0.5"
                  fill="#FFFFFF"
                />
                <rect
                  x="82"
                  y="66"
                  width="2.5"
                  height="2.5"
                  rx="0.5"
                  fill="#FFFFFF"
                />
              </g>

              <text
                x="135"
                y="74"
                fill="currentColor"
                fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                fontWeight="700"
                fontSize="48px"
                letterSpacing="0.5px"
              >
                Thikana
              </text>
            </svg>
          </Link>
        </div>
      </header>

      {/* CORE CANVAS ELEMENT */}
      {/* Ensure your root structure provides space down to its children */}
      <main className="flex-grow w-full">
        {/* React Router Outlet mounts child sub-pages right here */}
        <Outlet />
      </main>
    </div>
  );
}
