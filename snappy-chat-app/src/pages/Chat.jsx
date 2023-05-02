import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import "../styles/ChatStyles.scss";
import { allUsersRoute } from "../utils/APIRoutes";

/**
 * Este es el principio del contenedor de chat
 * @returns una sintaxis en HTML que es la que se muestra en pantalla con toda la funcionalidad
 */
export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  /**
   * Hook que checkea si existe un usuario existente en el localStorage y
   * si existe, lo setea como usuario actual
   */
  useEffect(() => {
    async function getUserFromLocalStorage() {
      if (!localStorage.getItem("snappy-chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem("snappy-chat-app-user")));
      }
    }
    getUserFromLocalStorage();
  }, [navigate]);

  /**
   * Hook que checkea si hay seteado un usuario actual y si no tiene avatar
   * lo lleva a seleccione su avatar y si tiene avatar, llama al servicio con su id
   * para retornar todos los demas usuarios
   */
  useEffect(() => {
    async function fetchUsers() {
      if (currentUser) {
        console.log(currentUser);
        if (currentUser.isAvatarImageSet) {
          const res = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          if (res.status === 200) {
            setContacts(res.data);
          } else {
            navigate("/setAvatars");
          }
        }
      }
    }
    fetchUsers();
  }, [currentUser, navigate]);

  /**
   * Metodo que setea el nuevo chat que selecciones
   * @param {*} chat
   */
  const handlerChatChange = (chat) => {
    setCurrentChat(chat);
  };

  /**
   * return del arhivo html con funcionalidad js
   */
  return (
    <>
      <div className="chat-container">
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handlerChatChange}></Contacts>
          <Welcome currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
