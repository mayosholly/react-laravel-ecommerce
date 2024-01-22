import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import Navbar from "./NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
        <Navbar />
              
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
          </Routes>
            
          </div>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
