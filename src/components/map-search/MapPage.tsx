import { useState } from "react";
import { MapBounds, MapItem } from "../../types/types";
import { MapPanel } from "./MapPanel";

const bangladeshCenter: [number, number] = [23.685, 90.3563];

export const MapPage = () => {
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // 7 district sample data (Bangladesh landmarks)
  const properties: MapItem[] = [
    {
      id: 1,
      name: "Dhaka",
      lat: 23.8103,
      lng: 90.4125,
    },
    {
      id: 2,
      name: "Chattogram",
      lat: 22.3569,
      lng: 91.7832,
    },
    {
      id: 3,
      name: "Sylhet",
      lat: 24.8949,
      lng: 91.8687,
    },
    {
      id: 4,
      name: "Khulna",
      lat: 22.8456,
      lng: 89.5403,
    },
    {
      id: 5,
      name: "Rajshahi",
      lat: 24.3745,
      lng: 88.6042,
    },
    {
      id: 6,
      name: "Barishal",
      lat: 22.701,
      lng: 90.3535,
    },
    {
      id: 7,
      name: "Rangpur",
      lat: 25.7439,
      lng: 89.2752,
    },
  ];

  const handleBoundsChange = (b: MapBounds) => {
    setBounds(b);
    console.log("Map bounds:", b);
  };

  return (
    <section className="my-5 lg:my-16 w-full px-8 lg:px-16  transition-colors duration-300">
      {/* HEADER */}
      <div className="py-3 text-center space-y-1">
        <h2
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
        >
          Explore cities
        </h2>

        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
        >
          Your next base could be here
        </h3>
      </div>
      <div className="flex justify-center items-center p-2 lg:p-4 ">
        <div className="space-y-2 grid grid-cols-7 gap-4 w-1/2 ">
          {properties.map((item) => (
            <p
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={` flex justify-center items-center p-3 rounded-xs cursor-pointer transition  font-semibold text-[var(--text)]
                  ${
                    hoveredId === item.id
                      ? "border-b-2 leading-4 border-violet-500 border-opacity-100"
                      : "border-b-2 leading-4 border-violet-500 border-opacity-0"
                  }`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
      {/* 🗺️ MAP CONTAINER (70vh) */}
      <div className="w-full h-[70vh] border-2 rounded-xl">
        <MapPanel
          properties={properties}
          center={bangladeshCenter}
          initialCenter={bangladeshCenter}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          onBoundsChange={handleBoundsChange}
        />
      </div>
    </section>
  );
};
