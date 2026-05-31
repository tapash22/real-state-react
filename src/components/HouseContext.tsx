import React, { createContext, ReactNode, useEffect, useState } from "react";
import { houseData } from "../data";

/* -----------------------------
  Types
------------------------------ */

export interface House {
  id?: number | string;
  country: string;
  type: string;
  price: string;
}

type HouseContextType = {
  houses: House[];
  country: string;
  setcountry: React.Dispatch<React.SetStateAction<string>>;
  countries: string[];
  property: string;
  setProperty: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  properties: string[];
  isLoading: boolean;
  handelClick: () => void;
};

/* -----------------------------
  Context
------------------------------ */

export const HouseContext = createContext<HouseContextType | undefined>(
  undefined,
);

/* -----------------------------
  Provider Props
------------------------------ */

interface Props {
  children: ReactNode;
}

/* -----------------------------
  Provider
------------------------------ */

export function HouseContextProvider({ children }: Props) {
  const [houses, setHouses] = useState<House[]>(houseData as House[]);

  const [country, setcountry] = useState<string>("location any country");
  const [countries, setCountries] = useState<string[]>([]);

  const [property, setProperty] = useState<string>("property any type");
  const [properties, setProperties] = useState<string[]>([]);

  const [price, setPrice] = useState<string>("0 1000000");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* -----------------------------
    Load countries
  ------------------------------ */
  useEffect(() => {
    const allCountry = (houseData as House[]).map((h) => h.country);
    const uniqueCountries = ["location any country", ...new Set(allCountry)];
    setCountries(uniqueCountries);
  }, []);

  /* -----------------------------
    Load properties
  ------------------------------ */
  useEffect(() => {
    const allProperties = (houseData as House[]).map((h) => h.type);
    const uniqueProperties = ["property any type", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, []);

  /* -----------------------------
    Helpers
  ------------------------------ */
  const isDefault = (str: string) => str.toLowerCase().includes("any");

  const handelClick = (): void => {
    setIsLoading(true);

    const [min, max] = price.split(" ").map((p) => parseInt(p));
    const minPrice = min || 0;
    const maxPrice = max || Infinity;

    const newHouses = (houseData as House[]).filter((house) => {
      const housePrice = parseInt(house.price);

      const matchCountry = isDefault(country)
        ? true
        : house.country === country;

      const matchProperty = isDefault(property)
        ? true
        : house.type === property;

      const matchPrice = isDefault(price)
        ? true
        : housePrice >= minPrice && housePrice <= maxPrice;

      return matchCountry && matchProperty && matchPrice;
    });

    setTimeout(() => {
      setHouses(newHouses.length ? newHouses : []);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        houses,
        country,
        setcountry,
        countries,
        property,
        setProperty,
        price,
        setPrice,
        properties,
        isLoading,
        handelClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}
