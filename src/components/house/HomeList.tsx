import { useContext } from "react";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import type { House } from "../../data";
import { HouseContext } from "../HouseContext";
import { HouseCard } from "./HouseCard";

type HouseContextType = {
  houses: House[];
  isLoading: boolean;
};

export function HomeList() {
  const context = useContext(HouseContext);

  if (!context) {
    return null;
  }

  const { houses, isLoading } = context as HouseContextType;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] w-full">
        <ImSpinner2
          style={{ color: "var(--button-bg)" }}
          className="animate-spin text-4xl"
        />
      </div>
    );
  }

  if (!houses.length) {
    return (
      <div
        style={{ color: "var(--text-paragraph)" }}
        className="text-center text-2xl font-semibold mt-24 opacity-60"
      >
        No verified properties found matching your search criteria.
      </div>
    );
  }

  return (
    <section className="my-12 w-full px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
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
