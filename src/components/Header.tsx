import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

type HeaderProps = {
  // add props later if needed
};

export default function Header(_props: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between px-10 py-3 bg-violet-500">
      {/* Logo */}
      <div>
        <Link
          to="/"
          className="flex items-center gap-5 text-white font-bold text-2xl tracking-wide transition-opacity hover:opacity-90"
          aria-label="Thikana Home"
        >
          {/* Combined Brand Logo & Text Mark SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 450 120"
            className="h-12 w-auto md:h-14"
            fill="none"
          >
            <g transform="translate(10, 10)">
              <path
                d="M11 49.3L47.2 20.2c2.5-2 5.9-2 8.4 0l36.2 29.1c1.7 1.4 4.2 1.1 5.5-0.6s1.1-4.2-0.6-5.5L60.5 14.1c-5.3-4.3-12.9-4.3-18.2 0L6 43.2c-1.7 1.4-2 3.8-0.6 5.5s3.9 2 5.6 0.6z"
                fill="#1e2d4a"
              />
              <path d="M80 24h7v13l-7-5.6V24z" fill="#1e2d4a" />

              <path d="M39 48h24v8h-8v36h-8V56h-8v-8z" fill="#1e2d4a" />

              <path
                d="M33 56H16c-2.2 0-4 1.8-4 4v17c0 2.2 1.8 4 4 4h4l-4 7 9-7h8c2.2 0 4-1.8 4-4V60c0-2.2-1.8-4-4-4z"
                fill="#f2a115"
              />

              <path
                d="M69 56h17c2.2 0 4 1.8 4 4v17c0 2.2-1.8 4-4 4h-8l9 7-4-7h-4c-2.2 0-4-1.8-4-4V60c0-2.2 1.8-4 4-4z"
                fill="#20b2aa"
              />
              <rect
                x="73"
                y="66"
                width="2.5"
                height="2.5"
                rx="0.5"
                fill="#7bf2da"
              />
              <rect
                x="77.5"
                y="66"
                width="2.5"
                height="2.5"
                rx="0.5"
                fill="#7bf2da"
              />
              <rect
                x="82"
                y="66"
                width="2.5"
                height="2.5"
                rx="0.5"
                fill="#7bf2da"
              />
            </g>

            <text
              x="135"
              y="74"
              fill="currentColor"
              font-family="Poppins, system-ui, -apple-system, sans-serif"
              font-weight="700"
              font-size="48px"
              letter-spacing="0.5px"
            >
              Thikana
            </text>
          </svg>
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:scale-105"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* Auth Links */}
        <nav className="flex items-center">
          <Link
            to="/signin"
            className="mx-3 rounded-lg px-3 py-2 text-white transition hover:bg-blue-700"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="mx-3 rounded-lg bg-blue-500 px-3 py-2 text-white transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
