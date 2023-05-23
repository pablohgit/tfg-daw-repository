import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  /**
   * Hook que setea el usuario y el avatar
   */
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  /**
   * Metodo que cambia de chat y setea el usuario seleccionado
   * @param {*} contact
   * @param {*} index
   */
  const changeCurrentChat = async (contact, index) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  /**
   * return del arhivo html con funcionalidad js
   */
  return (
    <>
      {currentUserName && currentUserImage && (
        <div className="contacts-container">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Snappy Chat</h3>
          </div>
          <div className="contacts">
            {contacts.length === 0 ? (
              <div className="null-contacts">No existen otros usuarios registrados</div>
            ) : (
              contacts.map((contact, index) => {
                return (
                  <div
                    key={index}
                    className={`contact ${index === currentSelected ? "selected" : ""}`}
                    onClick={() => changeCurrentChat(contact, index)}>
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUser.username}</h2>
            </div>
            <Logout />
          </div>
        </div>
      )}
    </>
  );
}
