import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import App from "./App";
import Home from "./home";
import Bonus from "./bonus";
import { CookiesProvider } from "react-cookie";

function Auth() {
    return (
        <div className="App">
            <CookiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="home" element={<Home />} />
                        <Route path="bonus" element={<Bonus />} />
                    </Routes>
                </BrowserRouter>
            </CookiesProvider>
        </div>
    );
}

export default Auth;