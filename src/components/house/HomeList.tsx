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
    <div className="my-10 w-full px-10">
      <div className="flex flex-row justify-center items-center gap-10 p-5">
        {houses.map((house) => (
          <Link to={`/property/${house.id}`} key={house.id}>
            <HouseCard house={house} />
          </Link>
        ))}
      </div>
    </div>
  );
}
