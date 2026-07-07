import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { LandlordRentProcess } from "../components/booking/LandlordRentProcess";
import TenantBookingProcess from "../components/booking/TenantBookingProcess";
import { SectionHeader } from "../components/header-section/SectionHeader";
import { ClippedBottomCurveImage } from "../components/show-case/ClippedBottomCurveImage";
import { SlidingToggle } from "../components/toggle/SlidingToggle";

type DateMode = "tenant" | "landlord";

export default function Pricing() {
  const [dateMode, setDateMode] = useState<DateMode>("tenant");
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const handleToggleChange = (val: DateMode) => {
    if (val === dateMode || isAnimating.current) return;

    const tenantEl = containerRef.current?.querySelector(".tenant-wrapper");
    const landlordEl = containerRef.current?.querySelector(".landlord-wrapper");
    if (!tenantEl || !landlordEl) return;

    isAnimating.current = true;

    // A unified fast timeline matching the 200ms (0.2s) toggle transition speed
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    if (dateMode === "tenant") {
      tl.to(tenantEl, { opacity: 0, x: -15, duration: 0.15, ease: "power1.in" })
        .set({}, { onComplete: () => setDateMode(val) }) // State flips right as the pill moves
        .set(tenantEl, { display: "none" })
        .set(landlordEl, { display: "block", x: 15, opacity: 0 })
        .to(landlordEl, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: "power1.out",
        });
    } else {
      tl.to(landlordEl, {
        opacity: 0,
        x: 15,
        duration: 0.15,
        ease: "power1.in",
      })
        .set({}, { onComplete: () => setDateMode(val) })
        .set(landlordEl, { display: "none" })
        .set(tenantEl, { display: "block", x: -15, opacity: 0 })
        .to(tenantEl, { opacity: 1, x: 0, duration: 0.2, ease: "power1.out" });
    }
  };

  useLayoutEffect(() => {
    const tenantEl = containerRef.current?.querySelector(".tenant-wrapper");
    const landlordEl = containerRef.current?.querySelector(".landlord-wrapper");
    if (!tenantEl || !landlordEl) return;

    if (dateMode === "tenant") {
      gsap.set(tenantEl, { display: "block", opacity: 1, x: 0 });
      gsap.set(landlordEl, { display: "none", opacity: 0, x: 15 });
    } else {
      gsap.set(landlordEl, { display: "block", opacity: 1, x: 0 });
      gsap.set(tenantEl, { display: "none", opacity: 0, x: -15 });
    }
  }, [dateMode]);

  return (
    <section className="relative w-full h-full ">
      <div className="absolute inset-0 w-full h-full bg-[var(--bg)] z-0">
        <ClippedBottomCurveImage />
      </div>
      <div className="lg:py-16 w-full px-5 lg:px-16 transition-colors duration-300 flex flex-col justify-center items-center h-full">
        {/* header section */}
        <SectionHeader
          tagTitle="Pricing"
          headerTitle="Learn about the benefits of using HousingAnywhere"
        >
          <div className="w-full lg:w-1/2 h-auto p-2 lg:p-5">
            <SlidingToggle<DateMode>
              selectedValue={dateMode}
              onChange={handleToggleChange}
              options={[
                { value: "tenant", label: "For tenants" },
                { value: "landlord", label: "For landlord" },
              ]}
            />
          </div>
        </SectionHeader>
        {/* header section */}

        {/* body seciton */}

        {/* Persistent DOM Container to host both views safely during GSAP sequences */}
        <div
          ref={containerRef}
          className="w-full flex justify-center items-center p-5 lg:p-16  min-h-[400px] overflow-hidden relative"
        >
          <div className="tenant-wrapper w-full flex justify-center items-center ">
            <TenantBookingProcess />
          </div>
          <div className="landlord-wrapper w-full flex justify-center items-center ">
            <LandlordRentProcess />
          </div>
        </div>

        {/* body seciton */}
      </div>
    </section>
  );
}
