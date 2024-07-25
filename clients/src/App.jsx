import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AboutUs from "./components/about/AboutUs";
import Dashboard from "./components/dashboard/Dashboard";
import Account from "./components/account/Account";
import Contact from "./components/contact/Contact";
import DetailsPage from "./components/details/DetailsPage";
import Carts from "./components/carts/Carts";
import { AuthProvider } from "./contex/Authcontext";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:id" element={<DetailsPage />} />
            <Route path="/carts" element={<Carts />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
