import { useCallback, useEffect, useState } from "react";

export interface UserLocationState {
  location: [number, number] | null;
  error: string | null;
  isLoading: boolean;
  getUserLocation: () => void;
}

export function useUserLocation(): UserLocationState {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return { location, error, isLoading, getUserLocation };
}
