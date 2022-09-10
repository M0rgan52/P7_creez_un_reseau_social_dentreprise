import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";


const index = () => {
    return (
        <BrowserRouter>
           <Routes>
                <Route path="/"  element={<Home/>} />
                <Route path="/profil"  element={<Profil/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
    
        </BrowserRouter>
    );
};

export default index;