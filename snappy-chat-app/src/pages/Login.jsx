import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";
import "./styles/styles.scss";

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

  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (handlerValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });
      if (data.status === true) {
        localStorage.setItem("snappy-chat-app user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.msg, TOAST_OPTIONS);
      }
    }
  };

  const handlerChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

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

  return (
    <>
      <div className="FormRegister">
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
