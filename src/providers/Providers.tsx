import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HouseContextProvider } from "../components/HouseContext";
import { ThemeProvider } from "./ThemeProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <HouseContextProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </HouseContextProvider>
    </ThemeProvider>
  );
}
