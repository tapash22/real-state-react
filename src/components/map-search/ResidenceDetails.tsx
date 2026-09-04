import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import React, { useMemo, useRef, useState } from "react";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import { FaCoffee, FaSun } from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { MdGroup } from "react-icons/md";
import { TbListTree } from "react-icons/tb";
import { ResidenceData, RoomUnit, SORT_OPTIONS } from "../../data";
import { ExpandableContent } from "../accordion/ExpandableContent";
import { HighlightCard } from "../card/HighlightCard";
import { PromoCard } from "../card/PromoCard";
import { RoomUnitCard } from "../card/RoomUnitCard";
import { RoomUnitDetailDrawer } from "../drawer/RoomUnitDetailDrawer";
import { Dropdown } from "../dropdown/Dropdown";

gsap.registerPlugin(Flip);

interface ResidenceDetailsProps {
  data: ResidenceData;
  onShowUnitDetails?: (unit: RoomUnit) => void;
}

const ResidenceDetails: React.FC<ResidenceDetailsProps> = ({
  data,
  onShowUnitDetails,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<RoomUnit | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [sortOption, setSortOption] = useState<string>("Recommended");

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Sort room units based on selected dropdown value
  const sortedRoomUnits = useMemo(() => {
    if (!data?.roomUnits) return [];

    const units = [...data.roomUnits];

    switch (sortOption) {
      case "Lowest price":
        return units.sort((a, b) => a.pricePerMonth - b.pricePerMonth);

      case "Highest price":
        return units.sort((a, b) => b.pricePerMonth - a.pricePerMonth);

      case "Availability":
        return units.sort(
          (a, b) =>
            new Date(a.availableFrom).getTime() -
            new Date(b.availableFrom).getTime(),
        );

      case "Recommended":
      default:
        return units;
    }
  }, [data?.roomUnits, sortOption]);

  // Smoothly animate card reordering without height collapse or layout jumps
  useGSAP(
    () => {
      if (!cardsContainerRef.current) return;

      const cards =
        cardsContainerRef.current.querySelectorAll(".room-unit-card");
      if (!cards.length) return;

      // 1. Capture the initial state of the layout
      const state = Flip.getState(cards);

      // 2. Animate positions cleanly without absolute position collapse
      Flip.from(state, {
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.04,
        scale: false, // Prevents unintended inner card distortion
        absolute: false, // Keeps flex/grid spacing intact to prevent jumping
        onStart: () => {
          // Keeps container height stable during transform calculations
          if (cardsContainerRef.current) {
            cardsContainerRef.current.style.minHeight = `${cardsContainerRef.current.offsetHeight}px`;
          }
        },
        onComplete: () => {
          // Clean up minHeight after animation finishes
          if (cardsContainerRef.current) {
            cardsContainerRef.current.style.minHeight = "";
          }
        },
      });
    },
    { dependencies: [sortedRoomUnits], scope: cardsContainerRef },
  );

  if (!data) return null;

  const initialPromos = data.promotions?.slice(0, 1) || [];
  const hiddenPromos = data.promotions?.slice(1) || [];
  const hasMorePromos = hiddenPromos.length > 0;

  return (
    <div className="bg-transparent font-sans">
      {/* Header Section */}
      <header className="space-y-3 py-3">
        <h1 className="text-2xl font-bold text-[var(--text)] flex items-center">
          <FaHouseChimneyUser size={28} className="text-[var(--text)] mr-2" />
          {data.title}
        </h1>
        <p className="text-sm text-[var(--text)] flex items-center">
          <MdGroup size={24} className="text-[var(--muted)] ml-1 mr-1" />{" "}
          <strong className="text-[var(--muted)]">
            {data.tenantCount} tenants
          </strong>{" "}
          have successfully called this place home
        </p>
      </header>

      {/* About Section */}
      <section className="py-3 space-y-3">
        <h2 className="text-lg font-bold text-[var(--text)] border-b-2 border-[var(--border)] leading-10">
          About this Student residence
        </h2>

        {/* Cleaning Info */}
        <div className="flex items-start gap-1 text-sm text-[var(--muted)]">
          <BsFillSuitDiamondFill size={16} className="text-orange-500 " />
          <p>{data.cleaningInfo}</p>
        </div>

        {/* Reusable Expandable Block using PromoCard */}
        {hasMorePromos ? (
          <ExpandableContent
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
            previewContent={
              <div className="space-y-4">
                {initialPromos.map((promo, index) => (
                  <PromoCard key={index} Icon={FaSun} promo={promo} />
                ))}
              </div>
            }
            hiddenContent={
              <div className="space-y-4 pt-4">
                {hiddenPromos.map((promo, index) => (
                  <PromoCard key={index} Icon={FaSun} promo={promo} />
                ))}
              </div>
            }
          />
        ) : (
          <div className="space-y-4">
            {initialPromos.map((promo, index) => (
              <PromoCard key={index} Icon={FaSun} promo={promo} />
            ))}
          </div>
        )}
      </section>
      {/* About Section end*/}

      {/* Highlights Section */}
      <section className="py-3 space-y-3">
        <h2 className="text-lg font-bold text-[var(--text)] leading-10 border-b-2 border-[var(--border)]">
          Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.highlights?.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} />
          ))}
        </div>
      </section>
      {/* Highlights Section end*/}

      {/* Services Section */}
      <section className="py-3 space-y-3 border-b-2 border-[var(--border)]">
        <h2 className="text-lg font-bold text-[var(--text)] border-b-2 border-[var(--border)] leading-10">
          Services
        </h2>
        <PromoCard
          title="General"
          Icon={FaCoffee}
          items={data.services?.general}
        />
      </section>
      {/* Services Section end*/}

      {/* Available Places Section */}
      <section className="py-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--text)]">
            Available places
          </h2>
          {/* Using your existing Dropdown component without any code modifications */}
          <Dropdown
            selectedValue={sortOption}
            onSelect={(value) => setSortOption(value)}
            options={SORT_OPTIONS}
            label="Recommended"
            Icon={TbListTree}
            smallSize={true}
            showValue={true}
          />
        </div>

        {/* Room Units Rendered with sortedRoomUnits (Animated Cards Container) */}
        {/* Animated Cards Container */}
        <div ref={cardsContainerRef} className="space-y-4">
          {sortedRoomUnits && sortedRoomUnits.length > 0 ? (
            sortedRoomUnits.map((unit) => (
              <div
                key={unit.id}
                data-flip-id={unit.id}
                className="room-unit-card transform-gpu"
              >
                <RoomUnitCard
                  unit={unit}
                  onShowDetails={(u) => {
                    setSelectedUnit(u);
                    setIsDrawerOpen(true);
                    if (onShowUnitDetails) onShowUnitDetails(u);
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">
              No available rooms found for this residence.
            </p>
          )}
        </div>
        {/* Room Units Rendered with sortedRoomUnits end*/}
      </section>

      {/* Available Places Section end*/}

      {/* details dialog show into right side of the screen */}
      <RoomUnitDetailDrawer
        unit={selectedUnit}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedUnit(null);
        }}
      />
      {/* details dialog show into right side of the screen end*/}
    </div>
  );
};

export default ResidenceDetails;
