import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  /**
   * Hook que obtiene y setea los mensajes mediante una llamada post al servidor con los params de quien lo ha enviado y quien lo va a recibir
   */
  useEffect(() => {
    async function fetchData() {
      console.log(`chat: ${currentChat._id} - user: ${currentUser._id}`);
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id
      });
      console.log(response);
      setMessages(response.data);
    }
    if (currentChat && currentUser) {
      fetchData();
    }
  }, [currentChat]);

  /**
   * Metodo que emite la señal send-msg que escucha el servidor, se ejecuta un post donde se guardan los mensajes en el servidor y se van seteando los mensajes
   * @param {*} msg
   */
  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg
    });

    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  /**
   * Hook que modifica el arrivalMessage
   */
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  /**
   * Hook que modifica los messages con los previos
   */
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  /**
   * Hook que modifica el scroll mientras cambien los mensajes
   */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <div className="chat-container-composite">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
              </div>
              <div className="username">
                <h1>{currentChat.username}</h1>
              </div>
            </div>
          </div>
          <div className="messages-container">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                    <div className="content ">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
}
