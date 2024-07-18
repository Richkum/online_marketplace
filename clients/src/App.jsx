import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AboutUs from "./components/about/AboutUs";
import Auth from "./components/authentication/Auth";
import ProductsPage from "./components/products/ProductsPage";
import Account from "./components/account/Account";
import Contact from "./components/contact/Contact";
import DetailsPage from "./components/details/DetailsPage";
import Carts from "./components/carts/Carts";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/carts" element={<Carts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
