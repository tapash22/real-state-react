import { useContext } from "react";
import { useParams } from "react-router-dom";
import { HouseContext } from "../HouseContext";
import { PropertySlider } from "./PropertySlider";

// Type configuration for expected route parameters
type RouteParams = {
  id: string;
};

type HouseContextType = {
  houses: any[]; // Using your data signature structure
  isLoading: boolean;
};

export default function PropertyDetails() {
  const { id } = useParams<RouteParams>();
  const context = useContext(HouseContext);

  if (!context) return null;

  const { houses, isLoading } = context as HouseContextType;

  if (isLoading) {
    return (
      <div className="p-16 text-center font-medium text-gray-500">
        Loading details...
      </div>
    );
  }

  const houseData = houses.find((house) => house.id === Number(id));

  if (!houseData) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center text-red-500 font-medium">
        Error: Property listing location could not be located. (ID: {id})
      </div>
    );
  }

  // --- GENERATE 10 IMAGE ASSETS FOR THE GALLERY ---
  // We collect your primary core images and fill out the rest using matching high-end interior URLs
  const baseImages = [houseData.imageLg, houseData.image].filter(Boolean); // Keeps only valid imported files

  const premiumPlaceholders = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", // Living room
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", // Kitchen
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80", // Modern Dining
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80", // Bedroom view
    "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=1200&q=80", // Lounge
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80", // Clean Kitchen Area
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80", // Luxury Bathroom
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", // Balcony/Light room
  ];

  // Combine them to make a rich array containing 10 pictures
  const propertyImages = [...baseImages, ...premiumPlaceholders].slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans text-gray-800">
      <nav className="text-xs text-gray-500 mb-4">
        {houseData.country} &gt; {houseData.address}
      </nav>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative">
        {/* LEFT COLUMN: Scrollable Info Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Reusable GSAP slider receiving dynamic item images */}
          <PropertySlider images={propertyImages} />

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              {houseData.name}
            </h1>
            <p className="text-sm text-gray-500 font-mono tracking-wide">
              {houseData.address}
            </p>

            <div className="text-2xl font-bold text-gray-900">
              ৳ {Number(houseData.price).toLocaleString()}
            </div>

            {/* Tags Grid Info */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="text-xs bg-gray-100 border text-gray-600 px-3 py-1.5 rounded-md font-medium">
                🛏 {houseData.bedroom} Bedrooms
              </span>
              <span className="text-xs bg-gray-100 border text-gray-600 px-3 py-1.5 rounded-md font-medium">
                🛁 {houseData.bathroom} Bathrooms
              </span>
              <span className="text-xs bg-gray-100 border text-gray-600 px-3 py-1.5 rounded-md font-medium">
                📐 {houseData.surface}
              </span>
              <span className="text-xs bg-gray-100 border text-gray-600 px-3 py-1.5 rounded-md font-medium">
                📅 Built in {houseData.year}
              </span>
            </div>

            <hr className="border-gray-100 my-4" />

            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed capitalize">
                {houseData.description}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Agent Contact Panel */}
        <div className="sticky top-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Listed by Agent
            </span>
            <div className="flex items-center gap-3 pt-1">
              <img
                src={houseData.agent.image}
                alt={houseData.agent.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-100"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm capitalize">
                  {houseData.agent.name}
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  Property Consultant
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href={`tel:${houseData.agent.phone}`}
              className="w-full bg-[#ff5a5f] hover:bg-[#e04f53] text-white text-center font-semibold py-3 rounded-lg transition shadow-sm block text-sm"
            >
              Call Agent ({houseData.agent.phone})
            </a>
            <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold py-3 rounded-lg transition text-sm">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
