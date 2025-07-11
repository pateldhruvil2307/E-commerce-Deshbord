import React from 'react';
import Navbar from './Componets/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css';
import Footer from './Componets/Footer';
import Singup from './Componets/Singup';
import Priventcomponets from './Componets/Priventcomponets';
import Login from './Componets/Login';
import Products from './Componets/Product'
import Addproduct from './Componets/Addproduct';
import UpdateProduct from './Componets/Updateproduct';




function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Priventcomponets />} >   // only authenticated user can be acceess
            <Route path="/product" element={<Products />} />
            <Route path="/addproduct" element={<Addproduct />} />
            <Route path="/product/:id" element={<UpdateProduct />} />

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
