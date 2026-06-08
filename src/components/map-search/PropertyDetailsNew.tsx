import { useContext } from "react";
import { useParams } from "react-router-dom";
import { HouseContext } from "../HouseContext";
import { PropertySlider } from "./PropertySlider";

// Type configurations updated to mirror the new structured JSON model
type BookingDates = {
  checkIn: string;
  checkOut: string;
};

type Pricing = {
  monthlyRent: number;
  currency: string;
  includesBills: boolean;
  depositRequired: boolean;
  tenantProtectionFee: number;
  initialTotalToConfirm: number;
  calculationBasis: string;
};

type PropertyDetailsType = {
  type: string;
  roomSizeSqm: number;
  totalPropertySizeSqm: number;
  isFurnished: boolean;
  totalCapacity: number;
  currentHousematesCount: number;
  housematesGender: string;
};

type Landlord = {
  id: string;
  name: string;
  type: string;
  isVerified: boolean;
  isExcellentLandlord: boolean;
  rating: number;
  totalReviews: number;
  confirmedRentals: number;
  responseTime: string;
  responseRatePercent: number;
  joinedDate: string;
  languagesSpoken: string[];
  totalListings: number;
  descriptionSnippet: string;
};

type HouseData = {
  id: string;
  title: string;
  address: {
    street: string;
    houseNumber: string;
    neighborhood: string;
    city: string;
    country: string;
  };
  status: string;
  registrationPossible: {
    required: boolean;
    localTerm: string;
  };
  bookingDates: BookingDates;
  pricing: Pricing;
  propertyDetails: PropertyDetailsType;
  facilitiesAndAmenities: Record<string, boolean>;
  houseRulesAndPreferences: {
    allowedAgeRange: { min: number; max: number };
    genderPreference: string;
    preferredTenantTypes: string[];
    suitableForCouples: boolean;
    playingMusicalInstruments: string;
    petsAllowed: boolean;
    smokingAllowed: boolean;
  };
  cancellationPolicy: {
    type: string;
    rules: Array<{ timeframe: string; refund: string }>;
    notes: string;
  };
  landlord: Landlord;
  imageLg?: string; // Kept for backwards fallback compatibility
  image?: string;
};

type HouseContextType = {
  houses: HouseData[];
  isLoading: boolean;
};

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const context = useContext(HouseContext);

  if (!context) return null;

  const { houses, isLoading } = context as HouseContextType;

  if (isLoading) {
    return (
      <div className="p-16 text-center font-medium text-gray-500">
        Loading listing details...
      </div>
    );
  }

  // Look up directly via string ID matching the new JSON setup
  const houseData = houses.find((house) => house.id === id);

  if (!houseData) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center text-red-500 font-medium">
        Error: Property listing location could not be located. (ID: {id})
      </div>
    );
  }

  // Use property images if defined or fall back gracefully to asset placeholders
  const baseImages = [houseData.imageLg, houseData.image].filter(
    Boolean,
  ) as string[];
  const premiumPlaceholders = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", // Kitchen
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80", // Luxury Bathroom
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", // Living room
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80", // Bedroom
  ];
  const propertyImages =
    baseImages.length > 0 ? baseImages : premiumPlaceholders;

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans text-gray-800 antialiased">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-gray-500 mb-4 font-medium">
        Madrid &gt; Rooms &gt; {houseData.address.street}
      </nav>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative">
        {/* LEFT COLUMN: Scrollable Info Area */}
        <div className="md:col-span-2 space-y-8">
          <PropertySlider images={propertyImages} />

          {/* Heading Content */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {houseData.address.street}
              </h1>
              {houseData.status && (
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded">
                  ⚡ {houseData.status}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs bg-gray-50 border text-gray-600 px-3 py-1.5 rounded-full font-medium">
                🏠 {houseData.propertyDetails.type}
              </span>
              <span className="text-xs bg-gray-50 border text-gray-600 px-3 py-1.5 rounded-full font-medium">
                🛏️ Bedroom: {houseData.propertyDetails.roomSizeSqm} m²
              </span>
              <span className="text-xs bg-gray-50 border text-gray-600 px-3 py-1.5 rounded-full font-medium">
                📐 Property: {houseData.propertyDetails.totalPropertySizeSqm} m²
              </span>
              <span className="text-xs bg-gray-50 border text-gray-600 px-3 py-1.5 rounded-full font-medium">
                👥 Space for {houseData.propertyDetails.totalCapacity} people
              </span>
              <span className="text-xs bg-gray-50 border text-gray-600 px-3 py-1.5 rounded-full font-medium">
                👥 {houseData.propertyDetails.currentHousematesCount} housemates
                ({houseData.propertyDetails.housematesGender})
              </span>
            </div>

            {houseData.registrationPossible.required && (
              <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3.5 text-xs text-blue-800 leading-relaxed">
                ⚠️{" "}
                <strong>
                  Check if you can register at this address (
                  {houseData.registrationPossible.localTerm}):
                </strong>{" "}
                Depending on how long you're staying in Spain, you may have to
                register your house address with the local municipality.
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Facilities & Amenities Block */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-3">
              Facilities and amenities
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600">
              {Object.entries(houseData.facilitiesAndAmenities).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 ${!value ? "line-through text-gray-400" : ""}`}
                  >
                    <span>{value ? "✓" : "✕"}</span>
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* House Rules & Preferences Block */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-3">
              House rules and preferences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100 text-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-gray-400 font-medium">Age:</span>{" "}
                  <span className="font-semibold text-gray-800">
                    {houseData.houseRulesAndPreferences.allowedAgeRange.min} -{" "}
                    {houseData.houseRulesAndPreferences.allowedAgeRange.max}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Gender:</span>{" "}
                  <span className="font-semibold text-gray-800 capitalize">
                    {houseData.houseRulesAndPreferences.genderPreference}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">
                    Suitable for couples:
                  </span>{" "}
                  <span className="font-semibold text-gray-800">
                    {houseData.houseRulesAndPreferences.suitableForCouples
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-400 font-medium">
                    Pets allowed:
                  </span>{" "}
                  <span className="font-semibold text-gray-800">
                    {houseData.houseRulesAndPreferences.petsAllowed
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">
                    Smoking allowed:
                  </span>{" "}
                  <span className="font-semibold text-gray-800">
                    {houseData.houseRulesAndPreferences.smokingAllowed
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">
                    Musical Instruments:
                  </span>{" "}
                  <span className="font-semibold text-gray-800 capitalize">
                    {
                      houseData.houseRulesAndPreferences
                        .playingMusicalInstruments
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Cancellation Policy Block */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Cancellation policy
            </h3>
            <div className="border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                📅 {houseData.cancellationPolicy.type}
              </div>
              <ul className="text-xs space-y-2 list-disc list-inside text-gray-600">
                {houseData.cancellationPolicy.rules.map((rule, idx) => (
                  <li key={idx}>
                    <strong className="text-gray-800">{rule.timeframe}</strong>{" "}
                    – {rule.refund}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-gray-400 pt-1 border-t border-gray-100">
                {houseData.cancellationPolicy.notes}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Application & Landlord Panel */}
        <div className="sticky top-6 space-y-4">
          {/* Booking Widget */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-gray-900">
                  €{houseData.pricing.monthlyRent}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {" "}
                  / month
                </span>
              </div>
              <span className="text-[11px] text-gray-400 underline cursor-pointer font-medium">
                {houseData.pricing.includesBills
                  ? "includes bills"
                  : "bills excluded"}
              </span>
            </div>

            {/* Stay Target Dates Block */}
            <div className="border border-gray-200 rounded-lg p-3 text-center bg-gray-50/40">
              <div className="text-xs font-bold text-gray-700 flex items-center justify-center gap-2">
                📅{" "}
                {new Date(houseData.bookingDates.checkIn).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" },
                )}{" "}
                –{" "}
                {new Date(houseData.bookingDates.checkOut).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" },
                )}
              </div>
            </div>

            {/* Price Calculations breakdown layout */}
            <div className="text-xs space-y-2.5 pt-1 text-gray-600">
              <div className="flex justify-between">
                <span>First month's rent</span>
                <span className="font-semibold text-gray-900">
                  €{houseData.pricing.monthlyRent}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tenant Protection fee</span>
                <span className="font-semibold text-gray-900">
                  €{houseData.pricing.tenantProtectionFee}
                </span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-1">
                <span>To confirm stay</span>
                <span>€{houseData.pricing.initialTotalToConfirm}</span>
              </div>
            </div>

            <button className="w-full bg-[#ff5a5f] hover:bg-[#e04f53] text-white text-center font-bold py-3 rounded-lg transition shadow-sm text-sm tracking-wide">
              Apply to rent
            </button>
          </div>

          {/* Landlord Micro Summary Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700 border">
                {houseData.landlord.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1">
                  {houseData.landlord.name}
                  {houseData.landlord.isExcellentLandlord && (
                    <span className="text-emerald-600 text-[10px]">
                      ★ Excellent
                    </span>
                  )}
                </h4>
                <p className="text-[11px] text-gray-400 font-medium">
                  {houseData.landlord.type} • ★ {houseData.landlord.rating}/5 (
                  {houseData.landlord.totalReviews} reviews)
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2 italic leading-normal">
              "{houseData.landlord.descriptionSnippet}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
