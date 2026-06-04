import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

export function AppLayout() {
  return (
    <div
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-heading)",
      }}
      className="min-h-screen flex flex-col transition-colors duration-300"
    >
      {/* STICKY HEADER WRAPPER */}
      <header
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Fallback style override
          borderBottomColor: "var(--border)",
        }}
        className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 bg-white/80 dark:bg-slate-900/80"
      >
        <Header />
      </header>

      {/* CORE CANVAS ELEMENT */}
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
