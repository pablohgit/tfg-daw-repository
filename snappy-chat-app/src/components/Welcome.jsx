import React from "react";
import WelcomeRobot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
  /**
   * return del arhivo html con funcionalidad js
   */
  return (
    <>
      <div className="welcome-container">
        <img src={WelcomeRobot} alt="Robot" />
        <h1>
          Bienvenido, <span>{currentUser.username}</span>
          {/* Bienvenido, <span>Usuario</span> */}
        </h1>
        <h3>Seleccione alguien con quien hablar y comienza hacer amistades</h3>
      </div>
    </>
  );
}
