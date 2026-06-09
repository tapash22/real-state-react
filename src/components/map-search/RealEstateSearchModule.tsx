import { useCallback, useEffect, useState } from "react";
import { MapBounds, Property } from "../../types/types";
import { ListPanel } from "./ListPanel";
import { MapPanel } from "./MapPanel";
import { styles } from "./styles";
import { mockDatabaseFetch } from "./utils";

const CENTRAL_DATABASE: Property[] = [
  {
    id: 1,
    title: "Student residence in Calle de San Bernardo",
    price: 786,
    lat: 40.4255,
    lng: -3.7075,
    rating: 4.8,
    type: "Social hub",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
  },
  {
    id: 2,
    title: "Private room in Calle de Batalla de Brunete",
    price: 420,
    lat: 40.4012,
    lng: -3.6985,
    rating: 3.4,
    type: "3 housemates",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400",
  },
  {
    id: 3,
    title: "Private room in Calle del Aliso, Getafe",
    price: 390,
    lat: 40.305,
    lng: -3.731,
    rating: 4.7,
    type: "3 housemates",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400",
  },
  {
    id: 4,
    title: "Luxury Apartment near Retiro Park",
    price: 1066,
    lat: 40.4153,
    lng: -3.6749,
    rating: 4.9,
    type: "Entire apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
  },
];

export default function RealEstateSearchModule() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBoundsChange = useCallback((bounds: MapBounds) => {
    setMapBounds(bounds);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const networkLatency = setTimeout(() => {
      const results = mockDatabaseFetch(mapBounds, CENTRAL_DATABASE);
      setFilteredProperties(results);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(networkLatency);
  }, [mapBounds]);

  // use with api implement

  //   useEffect(() => {
  //   if (!mapBounds) return;
  //   setIsLoading(true);

  //   // Example backend API integration
  //   axios.get('/api/v1/rentals/search', {
  //     params: {
  //       north: mapBounds.north,
  //       south: mapBounds.south,
  //       east: mapBounds.east,
  //       west: mapBounds.west
  //     }
  //   })
  //   .then((response) => {
  //     setFilteredProperties(response.data.listings);
  //   })
  //   .catch((error) => console.error("Search fetch failed", error))
  //   .finally(() => setIsLoading(false));

  // }, [mapBounds]);

  const hasProperties = filteredProperties.length > 0;

  return (
    <div style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      {/* MAP WRAPPER CONTAINER */}
      <div
        style={isMobile ? styles.mobileMapWrapper : styles.desktopMapWrapper}
        className="border-8 border-(--border) rounded-lg shadow-lg"
      >
        <MapPanel
          properties={filteredProperties} // Corrected reference to feed dynamic layout updates back
          initialCenter={[40.4167, -3.7037]}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          onBoundsChange={handleBoundsChange}
        />

        {/* Floating warning alert badge on Mobile Map Viewports */}
        {isMobile && !isLoading && !hasProperties && (
          <div style={styles.mobileEmptyState}>
            📍 No rentals found in this area. Zoom out to discover spaces!
          </div>
        )}
      </div>

      {/* LIST PANEL WRAPPER CONTAINER */}
      {isMobile ? (
        hasProperties && (
          <div style={styles.mobileListWrapper}>
            <ListPanel
              properties={filteredProperties}
              isLoading={isLoading}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              isMobile={true}
            />
          </div>
        )
      ) : (
        <div style={styles.desktopListWrapper}>
          <ListPanel
            properties={filteredProperties}
            isLoading={isLoading}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            isMobile={false}
          />
        </div>
      )}
    </div>
  );
}
