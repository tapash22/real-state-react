import "./App.css";
import { Routes, Route } from "react-router-dom";

//components
import Header from './components/Header';
import Footer from './components/Footer';

//pages

import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails'
import SignupForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import AgentsDetails from './pages/AgentsDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='/agents/:id' element={<AgentsDetails />} />
        <Route path='/signin' element={<SignInForm />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
