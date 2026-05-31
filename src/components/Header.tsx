import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

type HeaderProps = {
  // add props later if needed
};

export default function Header(_props: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between p-5 bg-violet-500">
      {/* Logo */}
      <div>
        <Link
          to="/"
          className="text-white font-bold text-2xl uppercase tracking-widest"
        >
          HomeLand
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
