import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);

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
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });
  };

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
                <div>
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
