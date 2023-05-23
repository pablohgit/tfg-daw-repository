import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import "../styles/LoginStyles.scss";
import { loginRoute } from "../utils/APIRoutes";

const STARTED_VALUES = {
  username: "",
  password: ""
};

const TOAST_OPTIONS = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: false,
  theme: "dark"
};

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState(STARTED_VALUES);

  useEffect(() => {
    if (localStorage.getItem("snappy-chat-app-user")) {
      navigate("/");
    }
  }, []);

  /**
   * Evento que se ejecuta cuando el usuario pulsa el boton de logear
   * es el metodo que se encarga de hacer las validaciones y de enviar los datos por medio del APIRoutes
   * @param {*} event
   */
  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (handlerValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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
    const { username, password } = values;
    if (username.length === "") {
      toast.error("Usuario y Password son requeridos.", TOAST_OPTIONS);
      return false;
    } else if (password === "") {
      toast.error("Usuario y Password son requeridos.", TOAST_OPTIONS);
      return false;
    }
    return true;
  };

  /**
   * return del arhivo html con funcionalidad js
   */
  return (
    <>
      <div className="form-login">
        <form onSubmit={(event) => handlerSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snappy Chat</h1>
          </div>
          <input type="text" placeholder="Usuario" name="username" onChange={(event) => handlerChange(event)} />
          <input type="password" placeholder="Password" name="password" onChange={(event) => handlerChange(event)} />
          <button type="submit">Iniciar Sesion</button>
          <span>
            ¿No tienes una cuenta? <Link to="/registro">Registrate</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
