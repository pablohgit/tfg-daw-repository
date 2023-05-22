import React from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

export default function ChatContainer({ currentChat }) {
  const handleSendMsg = async (msg) => {
    alert(msg);
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
          <Messages />
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
}
