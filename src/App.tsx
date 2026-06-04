import { Route, Routes } from "react-router-dom";
import "./App.css";

//components
import { Footer } from "./components/Footer";
import Header from "./components/Header";

//pages

import AgentsDetails from "./pages/AgentsDetails";
import { Home } from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";

export default function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/agents/:id" element={<AgentsDetails />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>

      <Footer />
    </div>
  );
}
