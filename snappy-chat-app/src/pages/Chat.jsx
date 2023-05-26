import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import "../styles/ChatStyles.scss";
import { allUsersRoute, host } from "../utils/APIRoutes";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

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
        setIsLoaded(true);
      }
    }
    getUserFromLocalStorage();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  /**
   * Hook que checkea si hay seteado un usuario actual y si no tiene avatar
   * lo lleva a seleccione su avatar y si tiene avatar, llama al servicio con su id
   * para retornar todos los demas usuarios
   */
  useEffect(() => {
    async function fetchUsers() {
      if (currentUser) {
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

  return (
    <>
      <div className="chat-container">
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handlerChatChange}></Contacts>
          {isLoaded && currentChat === undefined ? (
            <Welcome contacts={contacts} currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}
