import React from "react";
import WelcomeRobot from "../assets/robot.gif";

export default function Welcome({ contacts, currentUser }) {
  return (
    <>
      <div className="welcome-container">
        <img src={WelcomeRobot} alt="Robot" />
        <h1>
          Bienvenido, <span>{currentUser.username}</span>
        </h1>
        {contacts.length === 0 ? (
          <h3>Lo sentimos, no existen usuarios registrados con los que puedas hablar</h3>
        ) : (
          <h3>Seleccione alguien con quien hablar y comienza hacer amistades</h3>
        )}
      </div>
    </>
  );
}
