import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HouseContextProvider } from "../components/HouseContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <HouseContextProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </HouseContextProvider>
  );
}
