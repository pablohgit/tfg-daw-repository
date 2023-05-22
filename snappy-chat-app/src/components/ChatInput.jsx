import Picker from "emoji-picker-react";
import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <div className="chatInput-container">
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <input type="text" placeholder="Escriba el mensaje a enviar" onChange={(e) => setMsg(e.target.value)} value={msg} />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </div>
    </>
  );
}