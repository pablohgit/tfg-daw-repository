import Picker from "emoji-picker-react";
import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  /**
   * Metodo que setea a true o false la variable showEmojiPicker
   */
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  /**
   * Metodo que mezcla los mensajes con los emojis seleccionados
   * @param {*} event
   * @param {*} emojiObject
   */
  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  /**
   * Metodo que envia los datos del msg al padre y setea los mensajes a vacios
   * @param {*} event
   */
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  /**
   * return del arhivo html con funcionalidad js
   */
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
