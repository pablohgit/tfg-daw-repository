import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";

// Archivo que gestiona toda la app y archivo principal de enrutamientos
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatars" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
