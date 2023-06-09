import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  /**
   * Metodo que limpia el localStorage y reenvia al usuario al login
   */
  const handlerClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="logout-container" onClick={handlerClick}>
        <BiPowerOff />
      </div>
    </>
  );
}
