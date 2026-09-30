import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { FaBars, FaPhoneAlt, FaUserPlus } from "react-icons/fa";
import { FiDollarSign, FiMessageSquare } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LuLayers, LuLogIn } from "react-icons/lu";
import { RiGlobalLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import { currentUserQueryKey, useCurrentUser } from "../hooks/useCurrentUser";
import { useTheme } from "../hooks/useTheme";
import { Dropdown } from "./dropdown/Dropdown";
import { ThemeToggle } from "./toggle/ThemeToggle";

type HeaderProps = {
  // Add props later if needed
};

export default function Header(_props: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /*
   * CURRENT USER / AUTHENTICATION
   * currentUser = demoUser when authenticated
   * currentUser = null when logged out
   */
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const isAuthenticated = !!currentUser;

  /*
   * LANGUAGE
   */

  const currentLangLabel = i18n.language?.startsWith("bn")
    ? "বাংলা"
    : "English";

  const langOptions = ["English", "বাংলা"];

  const handleLanguageChange = (selectedLang: string) => {
    const langCode = selectedLang === "বাংলা" ? "bn" : "en";

    i18n.changeLanguage(langCode);
  };

  /*
   * LOGOUT
   */

  const logoutMutation = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      /*
       * Immediately update React Query.
       * This causes:
       * isAuthenticated = true
       * isAuthenticated = false
       * without waiting for the 5-minute staleTime.
       */
      queryClient.setQueryData(currentUserQueryKey, null);

      // Close mobile drawer
      setIsOpen(false);

      // Redirect to signin
      navigate("/auth/signin", {
        replace: true,
      });
    },
  });

  /*
   * LOGOUT HANDLER
   */

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {/* DESKTOP / MAIN HEADER */}

      <header
        style={{
          backgroundColor: "var(--nav-bg)",
        }}
        className="
          sticky top-0 z-40
          flex items-center justify-between
          border-b border-[var(--border)]
          px-4 py-4
          shadow-sm
          transition-colors duration-300
          md:px-10
        "
      >
        {/* LEFT SIDE - LOGO */}

        <div className="flex items-center">
          <Link
            to="/"
            style={{
              color: "var(--nav-link)",
            }}
            className="
              flex items-center gap-5
              text-2xl font-bold tracking-wide
              transition-opacity
              hover:opacity-90
            "
            aria-label="Thikana Home"
          >
            {/* Brand Logo */}
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

        {/* DESKTOP NAVIGATION */}

        <div
          className="
            hidden
            items-center
            gap-5
            whitespace-nowrap
            text-sm
            font-semibold
            tracking-wider
            lg:flex
          "
        >
          {/* How it works */}

          <Link
            to="/how-it-works"
            style={{
              color: "var(--text)",
            }}
            className="transition-opacity hover:opacity-80"
          >
            {t("nav.howItWorks")}
          </Link>

          {/* Pricing */}

          <Link
            to="/pricing"
            style={{
              color: "var(--text)",
            }}
            className="transition-opacity hover:opacity-80"
          >
            {t("nav.pricing")}
          </Link>

          {/* Help */}

          <Link
            to="/help"
            style={{
              color: "var(--text)",
            }}
            className="transition-opacity hover:opacity-80"
          >
            {t("nav.help")}
          </Link>

          {/* AUTHENTICATION */}

          {!isUserLoading &&
            (isAuthenticated ? (
              /*
               * LOGGED IN
               * Show Logout
               */
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="
                  ml-2
                  flex w-fit
                  rounded-lg
                  border border-[var(--border)]
                  px-5 py-2
                  shadow-sm
                  shadow-[var(--primary)]
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-0.5
                  hover:border-[var(--card)]
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            ) : (
              /*
               * LOGGED OUT
               * Show Login + Signup
               */
              <>
                <Link
                  to="/auth/signin"
                  style={{
                    color: "var(--text)",
                  }}
                  className="
                    ml-2
                    transition-opacity
                    hover:opacity-80
                  "
                >
                  {t("nav.login")}
                </Link>

                <Link
                  to="/auth/signup"
                  style={{
                    color: "var(--text)",
                  }}
                  className="
                    transition-opacity
                    hover:opacity-80
                  "
                >
                  {t("nav.signup")}
                </Link>
              </>
            ))}

          {/* LANDLORD CTA */}

          <Link
            to="/list-property"
            style={{
              color: "var(--text)",
            }}
            className="
              rounded-lg
              border-2
              border-[var(--muted)]
              bg-[var(--bg)]
              px-4 py-2

              translate-y-0

              transition-all
              duration-300
              ease-out

              hover:translate-y-0.5
              hover:border-[var(--card)]
              hover:shadow-lg
            "
          >
            {t("nav.landlordCta")}
          </Link>

          {/* LANGUAGE */}

          <div className="w-auto">
            <Dropdown
              smallSize={true}
              showValue={true}
              selectedValue={currentLangLabel}
              onSelect={handleLanguageChange}
              options={langOptions}
              label={t("nav.language")}
              Icon={RiGlobalLine}
            />
          </div>

          {/* THEME TOGGLE */}

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* MOBILE HEADER ACTIONS */}

        <div className="flex items-center gap-4 lg:hidden">
          {/* Theme */}

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Hamburger */}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{
              color: "var(--text)",
            }}
            className="cursor-pointer p-1"
            aria-label="Open menu"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}

      {isOpen && (
        <div
          className="
            fixed inset-0 z-50
            flex justify-end
            bg-black/40
            backdrop-blur-xs
            lg:hidden
          "
        >
          {/* Drawer */}

          <div
            style={{
              backgroundColor: "var(--nav-bg)",
            }}
            className="
              flex
              h-[100dvh]
              w-full
              max-w-xs
              flex-col
              shadow-2xl
              animate-in
              slide-in-from-right
              duration-200
            "
          >
            {/*
                DRAWER HEADER
           = */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-[var(--border)]
                px-5 py-4
              "
            >
              {/* Logo */}

              <div
                style={{
                  color: "var(--nav-link)",
                }}
              >
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

              {/* Close */}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "var(--text)",
                }}
                className="cursor-pointer p-1"
                aria-label="Close menu"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            {/* MOBILE AUTHENTICATION */}

            <nav
              className="
                flex
                flex-1
                flex-col
                space-y-1
                overflow-y-auto
                py-4
              "
            >
              {/* How it works */}

              <Link
                to="/how-it-works"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "var(--text)",
                }}
                className="
                  flex
                  items-center
                  gap-4
                  px-5 py-3.5
                  font-medium
                  transition-colors
                  hover:bg-black/5
                  dark:hover:bg-white/10
                "
              >
                <LuLayers className="h-5 w-5 opacity-70" />

                <span>{t("nav.howItWorks")}</span>
              </Link>

              {/* Pricing */}

              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "var(--text)",
                }}
                className="
                  flex
                  items-center
                  gap-4
                  px-5 py-3.5
                  font-medium
                  transition-colors
                  hover:bg-black/5
                  dark:hover:bg-white/10
                "
              >
                <FiDollarSign className="h-5 w-5 opacity-70" />

                <span>{t("nav.pricing")}</span>
              </Link>

              {/* Help */}

              <Link
                to="/help"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "var(--text)",
                }}
                className="
                  flex
                  items-center
                  gap-4
                  px-5 py-3.5
                  font-medium
                  transition-colors
                  hover:bg-black/5
                  dark:hover:bg-white/10
                "
              >
                <IoMdHelpCircleOutline className="h-5 w-5 opacity-70" />

                <span>{t("nav.help")}</span>
              </Link>

              {/* Live Chat */}

              <Link
                to="/chat-support"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "var(--text)",
                }}
                className="
                  flex
                  items-center
                  gap-4
                  px-5 py-3.5
                  font-medium
                  transition-colors
                  hover:bg-black/5
                  dark:hover:bg-white/10
                "
              >
                <FiMessageSquare className="h-5 w-5 opacity-70" />

                <span>{t("nav.liveChat")}</span>
              </Link>

              {/* Contact */}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "var(--text)",
                }}
                className="
                  flex
                  items-center
                  gap-4
                  px-5 py-3.5
                  font-medium
                  transition-colors
                  hover:bg-black/5
                  dark:hover:bg-white/10
                "
              >
                <FaPhoneAlt className="h-4 w-4 opacity-70" />

                <span>{t("nav.contactUs")}</span>
              </Link>

              {/* MOBILE LANGUAGE */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  justify-center
                  border-t
                  border-[var(--border)]
                  bg-[var(--nav-bg)]
                  p-5
                "
              >
                <Dropdown
                  smallSize={true}
                  showValue={true}
                  selectedValue={currentLangLabel}
                  onSelect={handleLanguageChange}
                  options={langOptions}
                  label={t("nav.language")}
                  Icon={RiGlobalLine}
                />
              </div>

              {/* MOBILE NAVIGATION */}

              {!isUserLoading &&
                (isAuthenticated ? (
                  /*
                   * LOGGED IN
                   */

                  <div
                    className="
                        w-full
                        shrink-0
                        border-b
                        border-[var(--border)]
                        p-4
                      "
                  >
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                      className="
                                  ml-2
                  flex w-fit
                  rounded-lg
                  border border-[var(--border)]
                  px-5 py-2
                  shadow-sm
                  shadow-[var(--primary)]
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-0.5
                  hover:border-[var(--card)]
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                              "
                    >
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                ) : (
                  /*
                   * LOGGED OUT
                   */

                  <div
                    className="
                    grid
                    shrink-0
                    grid-cols-2
                    gap-3
                    border-b
                    border-[var(--border)]
                    p-4
                  "
                  >
                    {/* Sign up */}

                    <Link
                      to="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                      className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      py-2.5
                      text-sm
                      font-semibold
                      transition-colors
                      hover:bg-black/5
                      dark:hover:bg-white/10
                    "
                    >
                      <FaUserPlus className="h-4 w-4" />
                      Sign up
                    </Link>

                    {/* Sign in */}

                    <Link
                      to="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                      className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      py-2.5
                      text-sm
                      font-semibold
                      transition-colors
                      hover:bg-black/5
                      dark:hover:bg-white/10
                    "
                    >
                      <LuLogIn className="h-4 w-4" />
                      Sign in
                    </Link>
                  </div>
                ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
