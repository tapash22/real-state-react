import { useContext } from "react";
import { HouseContext } from "../components/HouseContext";

export function useHouseContext() {
  const context = useContext(HouseContext);

  if (!context) {
    throw new Error("useHouseContext must be used inside HouseContextProvider");
  }

  return context;
}
