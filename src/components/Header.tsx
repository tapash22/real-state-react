import { useMutation, useQueryClient } from "@tanstack/react-query";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBars, FaPhoneAlt } from "react-icons/fa";
import { FiDollarSign, FiMessageSquare } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LuLayers } from "react-icons/lu";
import { RiGlobalLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import ThikanaLogo from "../assets/ThikanaLogo";
import { currentUserQueryKey, useCurrentUser } from "../hooks/useCurrentUser";
import { useTheme } from "../hooks/useTheme";
import { Dropdown } from "./dropdown/Dropdown";
import { ThemeToggle } from "./toggle/ThemeToggle";

type HeaderProps = {
  // Add props later if needed
};

export default function Header(_props: HeaderProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const isAuthenticated = !!currentUser;

  const currentLangLabel = i18n.language?.startsWith("bn")
    ? "বাংলা"
    : "English";

  const langOptions = ["English", "বাংলা"];

  const handleLanguageChange = (selectedLang: string) => {
    const langCode = selectedLang === "বাংলা" ? "bn" : "en";
    i18n.changeLanguage(langCode);
  };

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(currentUserQueryKey, null);
      handleCloseMenu();
      navigate("/auth/signin", { replace: true });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  /*
   * GSAP TRANSITION SETUP
   */
  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;

    if (!drawer || !overlay) return;

    const ctx = gsap.context(() => {
      // Set initial off-screen states
      gsap.set(drawer, { xPercent: 100 });
      gsap.set(overlay, { opacity: 0, pointerEvents: "none" });

      // Create a master paused timeline
      timelineRef.current = gsap
        .timeline({ paused: true })
        .to(overlay, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          drawer,
          {
            xPercent: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "<" // Start at the same time as overlay fade
        );
    });

    return () => ctx.revert();
  }, []);

  /*
   * PLAY / REVERSE ANIMATION ON STATE CHANGE
   */
  useEffect(() => {
    if (isOpen) {
      timelineRef.current?.play();
    } else {
      timelineRef.current?.reverse();
    }
  }, [isOpen]);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* DESKTOP / MAIN HEADER */}
      <header
        style={{ backgroundColor: "var(--nav-bg)" }}
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
        {/* LOGO */}
        <div className="flex items-center">
          <Link
            to="/"
            style={{ color: "var(--nav-link)" }}
            className="flex items-center gap-5 text-2xl font-bold tracking-wide hover:opacity-90 transition-opacity"
            aria-label="Thikana Home"
          >
            <ThikanaLogo className="h-10 w-auto text-[var(--logo)]" />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-5 whitespace-nowrap text-sm font-semibold tracking-wider lg:flex">
          <Link
            to="/how-it-works"
            style={{ color: "var(--text)" }}
            className="hover:opacity-80 transition-opacity"
          >
            {t("nav.howItWorks")}
          </Link>

          <Link
            to="/pricing"
            style={{ color: "var(--text)" }}
            className="hover:opacity-80 transition-opacity"
          >
            {t("nav.pricing")}
          </Link>

          <Link
            to="/help"
            style={{ color: "var(--text)" }}
            className="hover:opacity-80 transition-opacity"
          >
            {t("nav.help")}
          </Link>

          {!isUserLoading &&
            (isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="
                  ml-2 flex w-fit rounded-lg border border-[var(--border)]
                  px-5 py-2 shadow-sm shadow-[var(--primary)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5 hover:border-[var(--card)] hover:shadow-lg
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  style={{ color: "var(--text)" }}
                  className="ml-2 hover:opacity-80 transition-opacity"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/auth/signup"
                  style={{ color: "var(--text)" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {t("nav.signup")}
                </Link>
              </>
            ))}

          <Link
            to="/list-property"
            style={{ color: "var(--text)" }}
            className="
              rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)]
              px-4 py-2 transition-all duration-300 ease-out
              hover:translate-y-0.5 hover:border-[var(--card)] hover:shadow-lg
            "
          >
            {t("nav.landlordCta")}
          </Link>

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

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* MOBILE HEADER ACTIONS */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{ color: "var(--text)" }}
            className="cursor-pointer p-1"
            aria-label="Open menu"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER CONTAINER (Always mounted for smooth GSAP exit transitions) */}
      <div
        ref={overlayRef}
        className="
          fixed inset-0 z-50 flex justify-end
          bg-black/40 backdrop-blur-xs lg:hidden
        "
        onClick={handleCloseMenu}
      >
        <div
          ref={drawerRef}
          style={{ backgroundColor: "var(--nav-bg)" }}
          className="
            flex h-[100dvh] w-full max-w-xs flex-col shadow-2xl
          "
          onClick={(event) => event.stopPropagation()}
        >
          {/* DRAWER HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <Link to="/" onClick={handleCloseMenu} aria-label="Thikana Home">
              <ThikanaLogo className="h-7 w-auto text-[var(--logo)]" />
            </Link>
            <button
              type="button"
              onClick={handleCloseMenu}
              style={{ color: "var(--text)" }}
              className="cursor-pointer p-1"
              aria-label="Close menu"
            >
              <IoClose className="h-6 w-6" />
            </button>
          </div>

          {/* DRAWER NAVIGATION */}
          <nav className="flex flex-1 flex-col space-y-1 overflow-y-auto overflow-x-hidden py-4">
            <Link
              to="/how-it-works"
              onClick={handleCloseMenu}
              style={{ color: "var(--text)" }}
              className="flex items-center gap-4 px-5 py-3.5 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <LuLayers className="h-5 w-5 opacity-70" />
              <span>{t("nav.howItWorks")}</span>
            </Link>

            <Link
              to="/pricing"
              onClick={handleCloseMenu}
              style={{ color: "var(--text)" }}
              className="flex items-center gap-4 px-5 py-3.5 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <FiDollarSign className="h-5 w-5 opacity-70" />
              <span>{t("nav.pricing")}</span>
            </Link>

            <Link
              to="/help"
              onClick={handleCloseMenu}
              style={{ color: "var(--text)" }}
              className="flex items-center gap-4 px-5 py-3.5 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <IoMdHelpCircleOutline className="h-5 w-5 opacity-70" />
              <span>{t("nav.help")}</span>
            </Link>

            <Link
              to="/chat-support"
              onClick={handleCloseMenu}
              style={{ color: "var(--text)" }}
              className="flex items-center gap-4 px-5 py-3.5 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <FiMessageSquare className="h-5 w-5 opacity-70" />
              <span>{t("nav.liveChat")}</span>
            </Link>

            <Link
              to="/contact"
              onClick={handleCloseMenu}
              style={{ color: "var(--text)" }}
              className="flex items-center gap-4 px-5 py-3.5 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <FaPhoneAlt className="h-4 w-4 opacity-70" />
              <span>{t("nav.contactUs")}</span>
            </Link>

            <div className="px-5 pt-4 border-t border-[var(--border)] mt-2">
              {!isUserLoading &&
                (isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="
                      flex w-full justify-center rounded-lg border border-[var(--border)]
                      px-5 py-2.5 shadow-sm text-sm font-semibold
                      disabled:cursor-not-allowed disabled:opacity-50
                    "
                  >
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/auth/signin"
                      onClick={handleCloseMenu}
                      style={{ color: "var(--text)" }}
                      className="w-full text-center py-2 text-sm font-semibold border border-[var(--border)] rounded-lg"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      to="/auth/signup"
                      onClick={handleCloseMenu}
                      className="w-full text-center py-2 text-sm font-semibold bg-[var(--primary)] text-white rounded-lg"
                    >
                      {t("nav.signup")}
                    </Link>
                  </div>
                ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}