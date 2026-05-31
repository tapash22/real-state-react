import { BrowserRouter } from "react-router-dom";
import HouseContextProvider from "../components/HouseContext";

const Providers = ({ children }) => {
  return (
    <HouseContextProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </HouseContextProvider>
  );
};

export default Providers;
