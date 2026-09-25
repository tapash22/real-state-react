import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { FaChevronDown, FaRegBell } from "react-icons/fa";
import { Dropdown } from "../dropdown/Dropdown";

interface FilterBarProps {
  isOpen: boolean;
  onClose: () => void;

  /*
   * NEW
   */
  onApply: () => void;
  onClear: () => void;

  isMobile: boolean;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  localPrice: string;
  setLocalPrice: (value: string) => void;

  localProperty: string;
  setLocalProperty: (value: string) => void;

  priceList: string[];
  propertyList: string[];
}

export function FilterBar({
  isOpen,
  onClose,
  onApply,
  onClear,
  isMobile,
  activeTab,
  setActiveTab,
  localPrice,
  setLocalPrice,
  localProperty,
  setLocalProperty,
  priceList,
  propertyList,
}: FilterBarProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  // const tabs = ["Anyone", "Students", "Professionals", "Families"];

  /*
   * Prevent body scrolling while drawer is open.
   */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /*
   * OPEN ANIMATION
   */
  useLayoutEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;

    const panel = panelRef.current;

    if (!overlay || !panel) return;

    /*
     * Kill previous animations.
     */
    gsap.killTweensOf([overlay, panel]);

    /*
     * Initial state.
     */
    gsap.set(overlay, {
      opacity: 0,
    });

    gsap.set(panel, {
      x: isMobile ? 0 : 500,
      y: isMobile ? 500 : 0,
    });

    /*
     * Overlay
     */
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    /*
     * Drawer
     */
    gsap.to(panel, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    });

    /*
     * Cleanup
     */
    return () => {
      gsap.killTweensOf([overlay, panel]);
    };
  }, [isOpen, isMobile]);

  /*
   * CLOSE DRAWER
   */
  const closeDrawer = () => {
    const overlay = overlayRef.current;

    const panel = panelRef.current;

    if (!overlay || !panel) {
      onClose();
      return;
    }

    gsap.killTweensOf([overlay, panel]);

    const timeline = gsap.timeline({
      onComplete: onClose,
    });

    timeline
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        0,
      )
      .to(
        panel,
        {
          x: isMobile ? 0 : 500,
          y: isMobile ? 500 : 0,
          duration: 0.3,
          ease: "power3.in",
        },
        0,
      );
  };

  /*
   * Don't render closed drawer.
   */
  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-end
        justify-end
        bg-black/40
        backdrop-blur-[2px]
      "
    >
      {/* =========================================================
          OVERLAY
          ========================================================= */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={closeDrawer}
        className="
          absolute
          inset-0
          z-0
          cursor-default
          bg-transparent
        "
      />

      {/* =========================================================
          DRAWER PANEL
          ========================================================= */}
      <div
        ref={panelRef}
        className={`
          relative
          z-10
          w-full
          bg-[var(--bg)]
          p-2
          font-sans
          select-none
          shadow-2xl
          md:p-5

          ${
            isMobile
              ? `
                max-h-[85vh]
                rounded-t-2xl
                overflow-y-auto
              `
              : `
                h-full
                max-w-[420px]
                overflow-y-auto
                border-l
                border-[var(--border)]
              `
          }
        `}
      >
        {/* =======================================================
            UPPER SECTION
            ======================================================= */}
        <div
          className="
            flex
            w-full
            flex-col
            justify-between
            gap-4
          "
        >
          {/* =====================================================
              FILTER INTERACTIVE AREA
              ===================================================== */}
          <div
            className="
              flex
              h-full
              w-full
              flex-col
              justify-start
              space-y-5
              text-sm
              text-[var(--text)]
            "
          >
            {/* ===================================================
                SELECTED TAB + ALERT
                =================================================== */}
            <div
              className="
                hidden
                w-full
                items-center
                justify-between
                gap-4
                md:flex
              "
            >
              <p
                className="
                  text-sm
                  font-semibold
                  tracking-wider
                  text-[var(--text)]
                "
              >
                <span>Selected Tabs :</span>{" "}
                <span className="text-[var(--muted)]">{activeTab}</span>
              </p>

              <button
                type="button"
                className="
                  flex
                  w-auto
                  cursor-pointer
                  items-center
                  justify-between
                  gap-2
                  rounded-lg
                  border
                  border-[var(--border)]
                  px-3
                  py-2
                  shadow-sm
                  shadow-[var(--primary)]
                  transition-colors
                  duration-200
                "
              >
                <FaRegBell size={16} className="text-[var(--primary)]" />

                <span
                  className="
                    text-sm
                    font-normal
                    tracking-wide
                    text-[var(--text)]
                  "
                >
                  Get alerts
                </span>
              </button>
            </div>

            {/* ===================================================
                FILTER DROPDOWNS
                =================================================== */}
            <div
              className="
                flex
                w-full
                flex-col
                justify-start
                space-y-5
              "
            >
              {/* =================================================
                  PRICE RANGE
                  ================================================= */}
              <Dropdown
                selectedValue={localPrice}
                onSelect={setLocalPrice}
                options={priceList}
                label="Price Range"
                DropdrownIcon={FaChevronDown}
                smallSize={true}
                showValue={true}
              />

              {/* =================================================
                  PROPERTY TYPE
                  ================================================= */}
              <Dropdown
                selectedValue={localProperty}
                onSelect={setLocalProperty}
                options={propertyList}
                label="Property Type"
                DropdrownIcon={FaChevronDown}
                smallSize={true}
                showValue={true}
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            ACTION BUTTONS
            ======================================================= */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-[var(--border)]
            pt-5
          "
        >
          {/* CLEAR */}
          <button
            type="button"
            onClick={onClear}
            className="
              w-full
              cursor-pointer
              rounded-lg
              border
              border-[var(--border)]
              px-4
              py-2.5
              text-sm
              font-semibold
              tracking-wide
              text-[var(--text)]
              transition-all
              duration-200
              hover:border-[var(--primary)]
              hover:text-[var(--primary)]
            "
          >
            Clear
          </button>

          {/* APPLY */}
          <button
            type="button"
            onClick={onApply}
            className="
              w-full
              cursor-pointer
              rounded-lg
              bg-[var(--primary)]
              px-4
              py-2.5
              text-sm
              font-semibold
              tracking-wide
              text-white
              transition-all
              duration-200
              hover:opacity-90
            "
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
