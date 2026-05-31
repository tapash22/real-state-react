import { Link } from "react-router-dom";

type HeaderProps = {
  // add props later if needed
};

export default function Header(_props: HeaderProps) {
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

      {/* Auth Links */}
      <nav className="flex items-center">
        <Link
          to="/signin"
          className="text-white mx-3 px-3 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="text-white bg-blue-500 mx-3 px-3 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
