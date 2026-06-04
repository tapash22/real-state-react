import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routesConfig";

export function AppRoutes() {
  // useRoutes reads your .ts schema array and outputs the matching UI layout
  const element = useRoutes(routesConfig);
  return element;
}
