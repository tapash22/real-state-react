import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { House } from "../data";
import { useAppData } from "../hooks/useAppData";
// import { houseData } from "../data";
/* ----------------------------- */
export type HouseContextType = {
  houses: House[];

  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  countries: string[];

  property: string;
  setProperty: React.Dispatch<React.SetStateAction<string>>;
  properties: string[];

  price: string;
  prices: string[];
  setPrice: React.Dispatch<React.SetStateAction<string>>;

  isLoading: boolean;

  handleClick: () => void;

  // Get a single property by ID
  getHouseById: (id: string | number) => House | undefined;
};

/* ----------------------------- */
export const HouseContext = createContext<HouseContextType | undefined>(
  undefined,
);

export function HouseContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading: isDataLoading } = useAppData();

  const [country, setCountry] = useState("");
  const [property, setProperty] = useState("");
  const [price, setPrice] = useState("");

  const [filters, setFilters] = useState({
    country: "",
    property: "",
    price: "",
  });

  const houseData = useMemo(() => data?.houseData ?? [], [data?.houseData]);

  /* Filter Options */
  const countries = useMemo(() => {
    return [
      "location any country",
      ...new Set(houseData.map((house) => house.country)),
    ];
  }, [houseData]);

  const properties = useMemo(() => {
    return [
      "property any type",
      ...new Set(houseData.map((house) => house.type)),
    ];
  }, [houseData]);

  const prices = data?.staticPriceTiers ?? [];

  /* Helpers */
  const isDefault = useCallback((value: string) => {
    const normalizedValue = value.toLowerCase().trim();

    return (
      normalizedValue === "" ||
      normalizedValue.includes("any") ||
      normalizedValue === "all prices"
    );
  }, []);

  /* Filter Houses */
  const houses = useMemo(() => {
    const { country, property, price } = filters;

    let min = 0;
    let max = Infinity;

    /* Price filter */

    if (!isDefault(price)) {
      if (price.endsWith("+")) {
        min = Number(price.replace("+", ""));
      } else {
        const [minPrice = 0, maxPrice = Infinity] = price
          .split("-")
          .map(Number);

        min = minPrice;
        max = maxPrice;
      }
    }

    return houseData.filter((house) => {
      /* Country */

      const matchCountry = isDefault(country) || house.country === country;

      /* Property type */

      const matchProperty = isDefault(property) || house.type === property;

      /* Price */

      const housePrice = Number(house.price);

      const matchPrice =
        isDefault(price) || (housePrice >= min && housePrice <= max);

      return matchCountry && matchProperty && matchPrice;
    });
  }, [houseData, filters, isDefault]);

  /* Apply Filters */
  const handleClick = () => {
    setFilters({
      country,
      property,
      price,
    });
  };

  /* Get Property By ID */
  const getHouseById = useCallback(
    (id: string | number) => {
      return houseData.find((house) => String(house.id) === String(id));
    },
    [houseData],
  );

  /* Loading */
  const isLoading = isDataLoading;

  return (
    <HouseContext.Provider
      value={{
        houses,

        country,
        setCountry,
        countries,

        property,
        setProperty,
        properties,

        price,
        setPrice,
        prices,

        isLoading,

        handleClick,
        getHouseById,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}
