import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { LandlordRentProcess } from "../components/booking/LandlordRentProcess";
import TenantBookingProcess from "../components/booking/TenantBookingProcess";
import { SlidingToggle } from "../components/toggle/SlidingToggle";

type DateMode = "tenant" | "landlord";

export default function Pricing() {
  const [dateMode, setDateMode] = useState<DateMode>("tenant");
  const containerRef = useRef<HTMLDivElement>(null);

  // handle toggle effeect with gsap animation
  const handleToggleChange = (val: DateMode) => {
    if (val === dateMode) return;

    // 1. Fetch the elements
    const tenantEl = containerRef.current?.querySelector(".tenant-wrapper");
    const landlordEl = containerRef.current?.querySelector(".landlord-wrapper");

    // 2. Add a Type Guard check!
    // This satisfies TypeScript by guaranteeing both items exist past this point.
    if (!tenantEl || !landlordEl) return;

    // 3. Now you can safely pass them to GSAP without errors
    const tl = gsap.timeline({
      onComplete: () => setDateMode(val),
    });

    if (dateMode === "tenant") {
      tl.to(tenantEl, {
        opacity: 0,
        x: -20,
        duration: 0.2,
        ease: "power2.inOut",
      })
        .set(tenantEl, { display: "none" })
        .set(landlordEl, { display: "block", opacity: 0, x: 20 })
        .to(landlordEl, {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.out",
        });
    } else if (dateMode === "landlord") {
      tl.to(landlordEl, {
        opacity: 0,
        x: 20,
        duration: 0.2,
        ease: "power2.inOut",
      })
        .set(landlordEl, { display: "none" })
        .set(tenantEl, { display: "block", opacity: 0, x: -20 })
        .to(tenantEl, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
    }
  };

  // Ensure elements are set to their correct initial states on first load
  useLayoutEffect(() => {
    const tenantEl = containerRef.current?.querySelector(".tenant-wrapper");
    const landlordEl = containerRef.current?.querySelector(".landlord-wrapper");

    if (!tenantEl || !landlordEl) return;

    if (dateMode === "tenant") {
      gsap.set(tenantEl, { display: "block", opacity: 1, x: 0 });
      gsap.set(landlordEl, { display: "none", opacity: 0, x: 20 });
    } else {
      gsap.set(landlordEl, { display: "block", opacity: 1, x: 0 });
      gsap.set(tenantEl, { display: "none", opacity: 0, x: -20 });
    }
  }, [dateMode]);

  return (
    <section className="my-8 lg:my-16 w-full px-8 lg:px-16 transition-colors duration-300 flex flex-col justify-center items-center ">
      <div className="w-full flex flex-col justify-center items-center text-center space-y-3 lg:max-w-6xl lg:mx-auto ">
        <h2
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
        >
          Pricing
        </h2>

        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
        >
          Learn about the benefits of using HousingAnywhere
        </h3>
        <div className="w-full lg:w-1/2 h-auto p-4">
          <SlidingToggle<DateMode>
            selectedValue={dateMode}
            onChange={handleToggleChange}
            options={[
              { value: "tenant", label: "For tenants" },
              { value: "landlord", label: "For landlord" },
            ]}
          />
        </div>
      </div>

      {/* Persistent DOM Container to host both views safely during GSAP sequences */}
      <div
        ref={containerRef}
        className="w-full flex justify-center items-center p-5 min-h-[400px] overflow-hidden relative"
      >
        <div className="tenant-wrapper w-full">
          <TenantBookingProcess />
        </div>
        <div className="landlord-wrapper w-full">
          <LandlordRentProcess />
        </div>
      </div>
    </section>
  );
}
