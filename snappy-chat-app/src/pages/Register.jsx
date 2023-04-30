import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import { registerRoute } from "../utils/APIRoutes";
import "./styles/RegisterStyles.scss";

/**
 * Constantes que establecen los valores por defecto de los campos
 * del formulario
 */
const STARTED_VALUES = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

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
 * Este es el principio del formulario de registro
 * @returns una sintaxis en HTML que es la que se muestra en pantalla con toda la funcionalidad
 */
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(STARTED_VALUES);

  /**
   * Evento que se ejecuta cuando el usuario pulsa el boton de registrar
   * es el metodo que se encarga de hacer las validaciones y de enviar los datos por medio del APIRoutes
   * @param {*} event
   */
  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (handlerValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password
      });
      if (data.status === true) {
        localStorage.setItem("snappy-chat-app-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.msg, TOAST_OPTIONS);
      }
    }
  };

  /**
   * Metodo que restablece los valores del formulario con los nuevos
   * valores que el usuario inserta
   * @param {*} event
   */
  const handlerChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  /**
   * Metodo que hace las validaciones de todos los campos y retorna
   * un boolean al @method handlerSubmit
   * @returns un true o false dependiende de si los campos del
   * formulario cumplen los requisitos que estan impuestos por la
   * aplicaciones
   */
  const handlerValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if ((username, email, password, confirmPassword === "")) {
      toast.error("Some fields are empty, you need fill to continue the register.", TOAST_OPTIONS);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater that 3 characters.", TOAST_OPTIONS);
      return false;
    } else if (password.length + 1 <= 8) {
      toast.error("Password should be greater or equal that 8 characters.", TOAST_OPTIONS);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm password should be same.", TOAST_OPTIONS);
      return false;
    }
    return true;
  };

  /**
   * return del arhivo html con funcionalidad js
   */
  return (
    <>
      <div className="form-register">
        <form onSubmit={(event) => handlerSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snappy Chat</h1>
          </div>
          <input type="text" placeholder="Usuario" name="username" onChange={(event) => handlerChange(event)} min="3" />
          <input type="email" placeholder="Email" name="email" onChange={(event) => handlerChange(event)} />
          <input type="password" placeholder="Password" name="password" onChange={(event) => handlerChange(event)} />
          <input type="password" placeholder="Confirmar password" name="confirmPassword" onChange={(event) => handlerChange(event)} />
          <button type="submit">Crear usuario</button>
          <span>
            ¿Ya tienes una cuenta? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
