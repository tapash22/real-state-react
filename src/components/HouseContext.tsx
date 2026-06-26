import React, { createContext, ReactNode, useEffect, useState } from "react";
import type { House } from "../data";
import { houseData } from "../data";

/* ----------------------------- */
export type HouseContextType = {
  houses: House[];
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  countries: string[];
  property: string;
  setProperty: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  prices: string[];
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  properties: string[];
  isLoading: boolean;
  handleClick: () => void;
};

/* ----------------------------- */
export const HouseContext = createContext<HouseContextType | undefined>(
  undefined,
);

export function HouseContextProvider({ children }: { children: ReactNode }) {
  const [houses, setHouses] = useState<House[]>(houseData);

  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);

  const [property, setProperty] = useState("");
  const [properties, setProperties] = useState<string[]>([]);

  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  /* ----------------------------- */
  useEffect(() => {
    const allCountries = houseData.map((h) => h.country);
    setCountries(["location any country", ...new Set(allCountries)]);
  }, []);

  useEffect(() => {
    const allProperties = houseData.map((h) => h.type);
    setProperties(["property any type", ...new Set(allProperties)]);
  }, []);

  // Fixed: Dynamically generate clean, readable pricing tier buckets based on database range
  useEffect(() => {
    const staticPriceTiers = [
      "All Prices",
      "100-300",
      "300-600",
      "600-900",
      "900-1500",
      "1500-3000",
      "3000+",
    ];
    setPrices(staticPriceTiers);
  }, []);

  /* ----------------------------- */
  const isDefault = (str: string) => str.toLowerCase().includes("any");

  const handleClick = () => {
    setIsLoading(true);

    const [min = 0, max = Infinity] = price.split(" ").map(Number);

    const filtered = houseData.filter((house) => {
      const housePrice = Number(house.price);

      const matchCountry = isDefault(country) || house.country === country;

      const matchProperty = isDefault(property) || house.type === property;

      const matchPrice =
        isDefault(price) || (housePrice >= min && housePrice <= max);

      return matchCountry && matchProperty && matchPrice;
    });

    setTimeout(() => {
      setHouses(filtered);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <HouseContext.Provider
      value={{
        houses,
        country,
        setCountry,
        countries,
        property,
        setProperty,
        price,
        setPrice,
        prices,
        properties,
        isLoading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}
