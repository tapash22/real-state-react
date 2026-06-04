import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

type HeaderProps = {
  // add props later if needed
};

export default function Header(_props: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
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

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
          className="rounded-lg px-4 py-2 font-semibold text-sm transition-all shadow-sm hover:scale-105 cursor-pointer"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* Auth Links */}
        <nav className="flex items-center gap-1">
          <Link
            to="/signin"
            style={{ color: "var(--nav-link)" }}
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            style={{ backgroundColor: "var(--button-bg)" }}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
