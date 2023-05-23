import axios from "axios";
import { Buffer } from "buffer";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../assets/loader.gif";
import "../styles/SetAvatarStyles.scss";
import { setAvatarRoute } from "../utils/APIRoutes";

/**
 * Opciones de la libreria de banners de React --> ReactToatify
 */
const TOAST_OPTIONS = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: false,
  theme: "dark"
};

/**
 * Este es el principio del seteo de avatar
 * @returns una sintaxis en HTML que es la que se muestra en pantalla con toda la funcionalidad
 */
export default function SetAvatar() {
  const api_url = "https://api.dicebear.com/6.x/avataaars/svg?backgroundColor=997af0&mouth=smile&eyebrows=default&eyes=surprised&radius=50&seed=";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  /**
   * Hook que checkea si existe un usuario existente en el localStorage
   */
  useEffect(() => {
    if (!localStorage.getItem("snappy-chat-app-user")) {
      navigate("/login");
    }
  });

  /**
   * Function que checkea si el usuario ha seleccionado algun avatar, si no aparece un error y si si ha seleccionado un avatar se procede a la llamada post del servidor
   * si todo ha salido correcto se redirigue a la pantalla de chat
   */
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Por favor, seleccione un avatar", TOAST_OPTIONS);
    } else {
      const user = await JSON.parse(localStorage.getItem("snappy-chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar]
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("snappy-chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error al configurar el avatar, Por favor intentalo de nuevo", TOAST_OPTIONS);
      }
    }
  };

  /**
   * Metodo que llama a fetchApiUrl para refrescar el array de avatares
   */
  const refreshAvatars = () => {
    fetchApiUrl();
  };

  /**
   * Metodo que llama a la api con un numero aleatorio y mediante un loop se genera 4 veces
   * se le pasa la respuesta a un buffer, se establece su tipado al buffer y una vez cuando el lopp acaba
   * se setea los avatares con la data y se seta el loader a falso
   */
  async function fetchApiUrl() {
    const data = [];
    for (let i = 0; i <= 4; i++) {
      const image = await axios.get(`${api_url}${Math.round(Math.random() * 1000)}`);
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }

  /**
   * Hook que llama al metodo fetchApiUrl para generar el los avatares
   */
  useEffect(() => {
    fetchApiUrl();
  }, []);

  /**
   * return del arhivo html con funcionalidad js
   */
  return (
    <>
      {isLoading ? (
        <div className="set-avatars-container">
          <img src={Loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="set-avatars-container">
          <div className="title-container">
            <h1>Selecciona un avatar para tu perfil!!</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div key={index + 1} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                </div>
              );
            })}
          </div>
          <div className="buttons-container">
            <button className="submit-btn" onClick={async () => await setProfilePicture()}>
              Establecer como foto de perfil
            </button>
            <button className="submit-btn" onClick={refreshAvatars}>
              Cambiar avatares
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
