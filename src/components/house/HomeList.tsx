import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { House } from "../../data";
import { NoProperties } from "../empty/NoProperties";
import { HouseContext } from "../HouseContext";
import { GsapLoader } from "../loader/GsapLoader";
import { HouseCard } from "./HouseCard";

type HouseContextType = {
  houses: House[];
  isLoading: boolean;
  property: string;
};

export function HomeList() {
  const context = useContext(HouseContext);
  const [searchValue, setSearchValue] = useState<string | null>("House");
  const { houses, isLoading, property } = context as HouseContextType;

  // 1. RUN ALL HOOKS UNCONDITIONALLY AT THE TOP
  useEffect(() => {
    // Safely check if context and houses exist before running log logic
    if (context && (context as HouseContextType).houses?.length !== 0) {
      if (property === "property any type") {
        setSearchValue("Try To Best");
      } else {
        setSearchValue(property);
      }

      console.log(
        "Loaded active data count:",
        (context as HouseContextType).houses.length,
      );
    }
  }, [context, property]);

  if (!context) {
    return null;
  }

  if (isLoading) {
    return <GsapLoader searchType={searchValue} />;
  }

  if (!houses.length) {
    return <NoProperties />;
  }

  return (
    <section className="my-16 w-full px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-stretch">
        {houses.map((house) => (
          <Link
            to={`/property/${house.id}`}
            key={house.id}
            className="no-underline block focus:outline-none"
          >
            <HouseCard house={house} />
          </Link>
        ))}
      </div>
    </section>
  );
}
