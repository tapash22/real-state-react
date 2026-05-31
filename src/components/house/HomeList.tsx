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
      <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[200px]" />
    );
  }

  if (!houses.length) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48">Not found</div>
    );
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {houses.map((house) => (
            <Link to={`/property/${house.id}`} key={house.id}>
              <HouseCard house={house} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
