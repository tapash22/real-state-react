import React, { createContext, useEffect, useState } from "react";
import  houseData  from '../data';

export const HouseContext = createContext();


function HouseContextProvider({ children }) {
  const [houses, setHouses] = useState(houseData);
  const [country, setcountry] = useState("location");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState(" property ");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState(" price");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allCountry = houseData.map((house) => {
      return house.country;
    });
    const uniqueCountrys = ["location any country", ...new Set(allCountry)];
    setCountries(uniqueCountrys);
  }, []);

  useEffect(() => {
    const allProperties = houseData.map((house) => {
      return house.type;
    });
    const uniqueProperties = [
      "location any country",
      ...new Set(allProperties),
    ];
    setProperties(uniqueProperties);
  }, []);

  const handelClick = () => {
    setIsLoading(true);
    // console.log(country,property,price);
    const isDefault = (str) => {
      return str.split(" ").includes("any");
    };
    // console.log(country);
    // console.log(price);
    // console.log(property);

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = houseData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }

      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      if (!isDefault(country) && !isDefault(property)) {
        return house.country === country && house.type === property;
      }

      if (!isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      if (isDefault(property) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    setTimeout(() => {
      return (newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
      setIsLoading(false));
    }, 1000);

    return newHouses;
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
        isLoading,
        properties,
        setPrice,
        handelClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}

export default HouseContextProvider;
