import { createContext, ReactNode, useCallback, useMemo } from "react";
import type { House } from "../data";
import { useAppData } from "../hooks/useAppData";

export type HouseContextType = {
  houses: House[];
  countries: string[];
  properties: string[];
  prices: string[];
  isLoading: boolean;
  // Get a single property by ID
  getHouseById: (id: string | number) => House | undefined;
};

export const HouseContext = createContext<HouseContextType | undefined>(
  undefined,
);

export function HouseContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useAppData();

  const houses = useMemo(() => data?.houseData ?? [], [data?.houseData]);

  /* Filter Options */
  const countries = useMemo(() => {
    return [
      "location any country",
      ...new Set(houses.map((house) => house.country)),
    ];
  }, [houses]);

  const properties = useMemo(() => {
    return ["property any type", ...new Set(houses.map((house) => house.type))];
  }, [houses]);

  const prices = useMemo(() => {
    return data?.staticPriceTiers ?? [];
  }, [data?.staticPriceTiers]);

  /* Get Property By ID */
  const getHouseById = useCallback(
    (id: string | number) => {
      return houses.find((house) => String(house.id) === String(id));
    },
    [houses],
  );

  return (
    <HouseContext.Provider
      value={{
        houses,
        countries,
        properties,
        prices,
        isLoading,
        getHouseById,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}
