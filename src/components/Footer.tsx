import { IconType } from "react-icons";
import ep from "../assets/ep.jpg";
import { socialMediaLinkList } from "../data";
import { useTheme } from "../hooks/useTheme";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      style={{ backgroundColor: "var(--footer-bg)" }}
      className="transition-colors duration-300"
    >
      <div className="w-full flex flex-col gap-10 px-10 py-5 lg:py-8 lg:flex-row">
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
              {socialMediaLinkList && socialMediaLinkList?.length > 0 && (
                <ul className={`flex w-auto h-full p-0 md:p-2 space-x-1`}>
                  {socialMediaLinkList.map((item, index) => {
                    //declear icon type
                    const Icon: IconType = item.icon;
                    return (
                      <li
                        key={index}
                        className="group relative w-auto h-auto p-3 flex justify-center items-center cursor-pointer"
                      >
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon
                            size={20}
                            className=" group-hover:text-cyan-400 transition duration-300
                                          group-hover:drop-shadow-[0_0_8px_#22d3ee]"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
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
