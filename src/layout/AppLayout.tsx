import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

export function AppLayout() {
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
  // Fires cleanly every single time the URL pathname alters

  // --- FEATURE 2: RELOAD / REFRESH -> RESTORE EXACT PAST SCROLL POSITION ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 1. Try to fetch an existing scroll footprint location saved from before the refresh
    const savedScrollPosition = sessionStorage.getItem(`scroll_${pathname}`);
    if (savedScrollPosition) {
      // Must use "auto" instant behavior so the user doesn't see a delayed flash/jump
      container.scrollTo({
        top: parseInt(savedScrollPosition, 10),
        behavior: "auto",
      });
    }

    // 2. Track real-time scrolling changes to update the session storage cache
    const handleScroll = () => {
      sessionStorage.setItem(
        `scroll_${pathname}`,
        container.scrollTop.toString(),
      );
    };

    container.addEventListener("scroll", handleScroll);

    // Clean up event listeners unconditionally on component unmount
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
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
      className="h-screen w-screen flex flex-col overflow-y-auto scrollbar-thin transition-colors duration-300"
    >
      {/* STICKY HEADER WRAPPER */}
      <header
        style={{
          backgroundColor: "var(--bg)", // Fallback style override
          borderBottomColor: "var(--border)",
        }}
        className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 bg-white/80 dark:bg-slate-900/80"
      >
        <Header />
      </header>

      {/* CORE CANVAS ELEMENT */}
      {/* Ensure your root structure provides space down to its children */}
      <main className="flex-grow w-full">
        {/* React Router Outlet mounts child sub-pages right here */}
        <Outlet />
      </main>

      {/* FOOTER CANVAS LAYER */}
      <footer
        style={{ borderColor: "var(--border)" }}
        className="border-t w-full"
      >
        <Footer />
      </footer>
    </div>
  );
}
