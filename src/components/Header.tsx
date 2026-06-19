import { useState } from "react";
import { FaBars, FaPhoneAlt, FaUserPlus } from "react-icons/fa";
import { FiDollarSign, FiMessageSquare } from "react-icons/fi";
import { LuLayers, LuLogIn } from "react-icons/lu";

import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RiGlobalLine } from "react-icons/ri";
import { Dropdown } from "./dropdown/Dropdown";
import { ThemeToggle } from "./toggle/ThemeToggle";

type HeaderProps = {
  // add props later if needed
};

export default function Header(_props: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Language configuration state
  const [lang, setLang] = useState("English");
  const langOptions = ["English", "বাংলা "];

  return (
    <>
      <header
        style={{ backgroundColor: "var(--nav-bg)" }}
        className="sticky top-0 z-40 flex justify-between items-center px-4 md:px-10 py-4 shadow-sm border-b transition-colors duration-300 border-[var(--border)]"
      >
        {/* Left Side: Logo */}
        <div className="flex items-center">
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
              className="h-9 w-auto md:h-10"
              fill="none"
            >
              <g transform="translate(10, 10)">
                <path
                  d="M11 49.3L47.2 20.2c2.5-2 5.9-2 8.4 0l36.2 29.1c1.7 1.4 4.2 1.1 5.5-0.6s1.1-4.2-0.6-5.5L60.5 14.1c-5.3-4.3-12.9-4.3-18.2 0L6 43.2c-1.7 1.4-2 3.8-0.6 5.5s3.9 2 5.6 0.6z"
                  fill="currentColor"
                />
                <path d="M80 24h7v13l-7-5.6V24z" fill="currentColor" />
                <path d="M39 48h24v8h-8v36h-8V56h-8v-8z" fill="currentColor" />
                <path
                  d="M33 56H16c-2.2 0-4 1.8-4 4v17c0 2.2 1.8 4 4 4h4l-4 7 9-7h8c2.2 0 4-1.8 4-4V60c0-2.2-1.8-4-4-4z"
                  fill="#F59E0B"
                />
                <path
                  d="M69 56h17c2.2 0 4 1.8 4 4v17c0 2.2-1.8 4-4 4h-8l9 7-4-7h-4c-2.2 0-4-1.8-4-4V60c0-2.2 1.8-4 4-4z"
                  fill="#14B8A6"
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

        {/* Right Side: Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-6 font-medium text-[15px]">
          <Link
            to="/how-it-works"
            style={{ color: "var(--text)" }}
            className="hover:opacity-80 transition-opacity"
          >
            How it works
          </Link>
          <Link
            to="/pricing"
            style={{ color: "var(--text)" }}
            className="hover:opacity-80 transition-opacity"
          >
            Pricing
          </Link>
          <Link
            to="/help"
            style={{ color: "var(--text)" }}
            className="hover:opacity-80 transition-opacity"
          >
            Help
          </Link>
          <Link
            to="/auth/signin"
            style={{ color: "var(--text)" }}
            className="hover:opacity-80 transition-opacity ml-2"
          >
            Log in
          </Link>
          <Link
            to="/auth/signup"
            style={{ color: "var(--text)" }}
            className="hover:opacity-80 transition-opacity"
          >
            Sign up
          </Link>

          {/* Landlord CTA Button */}
          <Link
            to="/list-property"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            className="border rounded-lg px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            I'm a landlord
          </Link>

          {/* Desktop Language Selector dropdown integration */}
          <div className="w-32">
            <Dropdown
              smallSize={true}
              showValue={true}
              selectedValue={lang}
              onSelect={setLang}
              options={langOptions}
              label="Language"
              Icon={RiGlobalLine}
            />
          </div>

          {/* Theme Toggle Switch inside Desktop Menu */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Hamburger Trigger (Hidden on Desktop) */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Mobile Theme Toggle Trigger */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <button
            onClick={() => setIsOpen(true)}
            style={{ color: "var(--text)" }}
            className="p-1 cursor-pointer"
            aria-label="Open menu"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs lg:hidden">
          {/* Main Panel Container: Controlled strictly to be full screen viewport depth */}
          <div
            style={{ backgroundColor: "var(--nav-bg)" }}
            className="w-full max-w-xs h-[100dvh] flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
          >
            {/* Top Header Drawer Row */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-[var(--border)] shrink-0">
              {/* Scaled App Logo */}
              <div style={{ color: "var(--nav-link)" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 450 120"
                  className="h-7 w-auto"
                  fill="none"
                >
                  <g transform="translate(10, 10)">
                    <path
                      d="M11 49.3L47.2 20.2c2.5-2 5.9-2 8.4 0l36.2 29.1c1.7 1.4 4.2 1.1 5.5-0.6s1.1-4.2-0.6-5.5L60.5 14.1c-5.3-4.3-12.9-4.3-18.2 0L6 43.2c-1.7 1.4-2 3.8-0.6 5.5s3.9 2 5.6 0.6z"
                      fill="currentColor"
                    />
                    <path d="M80 24h7v13l-7-5.6V24z" fill="currentColor" />
                    <path
                      d="M39 48h24v8h-8v36h-8V56h-8v-8z"
                      fill="currentColor"
                    />
                  </g>
                  <text
                    x="135"
                    y="74"
                    fill="currentColor"
                    fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                    fontWeight="700"
                    fontSize="48px"
                  >
                    Thikana
                  </text>
                </svg>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ color: "var(--text)" }}
                className="p-1 cursor-pointer"
                aria-label="Close menu"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Authentication Action Row */}
            <div className="grid grid-cols-2 gap-3 p-4 border-b border-[var(--border)] shrink-0">
              <Link
                to="/auth/signup"
                onClick={() => setIsOpen(false)}
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
                className="flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10"
              >
                <FaUserPlus className="w-4 h-4" /> Sign up
              </Link>
              <Link
                to="/auth/signin"
                onClick={() => setIsOpen(false)}
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
                className="flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10"
              >
                <LuLogIn className="w-4 h-4" /> Sign in
              </Link>
            </div>

            {/* Navigation Drawer Menu List */}
            <nav className="flex-1 overflow-y-auto py-4 flex flex-col space-y-1">
              <Link
                to="/how-it-works"
                onClick={() => setIsOpen(false)}
                style={{ color: "var(--text)" }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors"
              >
                <LuLayers className="w-5 h-5 opacity-70" />
                <span>How it works</span>
              </Link>

              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                style={{ color: "var(--text)" }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors"
              >
                <FiDollarSign className="w-5 h-5 opacity-70" />
                <span>Pricing</span>
              </Link>

              <Link
                to="/help"
                onClick={() => setIsOpen(false)}
                style={{ color: "var(--text)" }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors"
              >
                <IoMdHelpCircleOutline className="w-5 h-5 opacity-70" />
                <span>Help</span>
              </Link>

              <Link
                to="/chat-support"
                onClick={() => setIsOpen(false)}
                style={{ color: "var(--text)" }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors"
              >
                <FiMessageSquare className="w-5 h-5 opacity-70" />
                <span>Live chat support</span>
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                style={{ color: "var(--text)" }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors"
              >
                <FaPhoneAlt className="w-4 h-4 opacity-70" />
                <span>Contact us</span>
              </Link>
              <div className="p-5 border-t border-[var(--border)] bg-[var(--nav-bg)] shrink-0 flex justify-center items-center">
                <Dropdown
                  smallSize={true}
                  showValue={true}
                  selectedValue={lang}
                  onSelect={setLang}
                  options={langOptions}
                  label="Language"
                  Icon={RiGlobalLine}
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
