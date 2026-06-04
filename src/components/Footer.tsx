import ep from "../assets/ep.jpg";
import { useTheme } from "../hooks/useTheme";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      style={{ backgroundColor: "var(--footer-bg)" }}
      className="text-white border-t border-[var(--border)] transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-10 px-6 py-12 lg:flex-row">
        {/* LEFT SIDE: Brand & Navigation Links */}
        <div className="w-full lg:w-2/3 grid gap-10 sm:grid-cols-3">
          {/* Brand & Socials */}
          <div className="flex flex-col justify-between h-full min-h-[150px]">
            <div>
              <h2
                style={{ color: "var(--footer-title)" }}
                className="text-2xl font-bold tracking-wide"
              >
                Thikana
              </h2>
              <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-sm">
                Find your perfect home with ease. We offer verified properties,
                prime locations, and affordable living options for everyone.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 flex gap-4 text-white/60">
              <button
                onClick={() => console.log("Navigate Facebook")}
                className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </button>
              <button
                onClick={() => console.log("Navigate LinkedIn")}
                className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
              <button
                onClick={() => console.log("Navigate Instagram")}
                className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Information Section */}
          <div>
            <h3
              style={{ color: "var(--footer-title)" }}
              className="mb-4 text-lg font-semibold tracking-wide"
            >
              Information
            </h3>
            <ul
              className="space-y-2.5 text-sm"
              style={{ color: "var(--footer-link)" }}
            >
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  About us
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Properties
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Careers
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Payments
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3
              style={{ color: "var(--footer-title)" }}
              className="mb-4 text-lg font-semibold tracking-wide"
            >
              Support
            </h3>
            <ul
              className="space-y-2.5 text-sm"
              style={{ color: "var(--footer-link)" }}
            >
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Add Property
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Help Center
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Our Agents
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors bg-transparent border-none p-0 text-left text-sm cursor-pointer w-full">
                  Features
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: Address & Newsletter Card */}
        <div className="w-full lg:w-1/3 relative overflow-hidden rounded-xl min-h-[260px] shadow-lg">
          <img
            src={ep}
            alt="Thikana building view"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay mask */}
          <div className="absolute inset-0 flex flex-col justify-between bg-black/70 p-5 backdrop-blur-[0.5px]">
            {/* Address & Quick Contacts */}
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-white">
                Contact Us
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                House: 40, Road: 01, Block E <br />
                Banasree, Rampura, Dhaka
              </p>
              <div className="mt-3 pt-2 border-t border-white/20 text-xs text-white/70 space-y-0.5">
                <p>Phone: +880 1674345764</p>
                <p>Email: tapasp263@gmail.com</p>
              </div>
            </div>

            {/* Email subscription box */}
            <div>
              <p className="mb-2 text-xs font-medium text-white/80">
                Get property updates in your inbox
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex overflow-hidden rounded-lg bg-white p-1"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-1.5 text-sm text-black outline-none"
                />
                <button
                  type="submit"
                  style={{ backgroundColor: "var(--button-bg)" }}
                  className="px-6 py-1.5 text-sm font-semibold rounded-md text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright bar */}
      <div
        style={{
          backgroundColor:
            theme === "light" ? "rgba(17, 34, 64, 0.4)" : "rgba(0, 0, 0, 0.3)",
        }}
        className="border-t border-white/10 py-4 text-center text-xs text-white/50"
      >
        <p>© {new Date().getFullYear()} Thikana. All rights reserved.</p>
      </div>
    </footer>
  );
}
