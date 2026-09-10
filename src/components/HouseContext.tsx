import { createContext, ReactNode, useCallback, useMemo } from "react";
import type { House } from "../data";
import { useAppData } from "../hooks/useAppData";
// import { houseData } from "../data";
/* ----------------------------- */
export type HouseContextType = {
  houses: House[];
  countries: string[];
  properties: string[];
  prices: string[];
  isLoading: boolean;

  // Get a single property by ID
  getHouseById: (id: string | number) => House | undefined;
  // country: string;
  // setCountry: React.Dispatch<React.SetStateAction<string>>;

  // property: string;
  // setProperty: React.Dispatch<React.SetStateAction<string>>;

  // price: string;
  // setPrice: React.Dispatch<React.SetStateAction<string>>;

  // handleClick: () => void;
};

/* ----------------------------- */
export const HouseContext = createContext<HouseContextType | undefined>(
  undefined,
);

export function HouseContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useAppData();

  // const [country, setCountry] = useState("");
  // const [property, setProperty] = useState("");
  // const [price, setPrice] = useState("");

  // const [filters, setFilters] = useState({
  //   country: "Select your place",
  //   property: "Select type",
  //   price: "Choose your price",
  // });

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

  /* Helpers */
  // const isDefault = useCallback((value: string) => {
  //   if (!value) return true;
  //   const normalizedValue = value.toLowerCase().trim();

  //   return (
  //     normalizedValue === "" ||
  //     normalizedValue.includes("any") ||
  //     normalizedValue.includes("select") ||
  //     normalizedValue.includes("choose") ||
  //     normalizedValue === "all prices" ||
  //     normalizedValue === "all types"
  //   );
  // }, []);

  /* Filter Houses */
  // const houses = useMemo(() => {
  //   const { country, property, price } = filters;

  //   let min = 0;
  //   let max = Infinity;

  //   /* Price filter */

  //   if (!isDefault(price)) {
  //     if (price.endsWith("+")) {
  //       min = Number(price.replace("+", ""));
  //     } else {
  //       const [minPrice = 0, maxPrice = Infinity] = price
  //         .split("-")
  //         .map(Number);

  //       min = minPrice;
  //       max = maxPrice;
  //     }
  //   }

  //   return houseData.filter((house) => {
  //     /* Country */

  //     const matchCountry = isDefault(country) || house.country === country;

  //     /* Property type */

  //     const matchProperty = isDefault(property) || house.type === property;

  //     /* Price */

  //     const housePrice = Number(house.price);

  //     const matchPrice =
  //       isDefault(price) || (housePrice >= min && housePrice <= max);

  //     return matchCountry && matchProperty && matchPrice;
  //   });
  // }, [houseData, filters, isDefault]);

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
