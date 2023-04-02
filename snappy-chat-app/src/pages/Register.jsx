import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import { registerRoute } from "../utils/APIRoutes";
import "./styles/styles.scss";

const STARTED_VALUES = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const TOAST_OPTIONS = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: false,
  theme: "dark"
};

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(STARTED_VALUES);

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
        localStorage.setItem("snappy-chat-app user", JSON.stringify(data.user));
      } else {
        toast.error(data.msg, TOAST_OPTIONS);
      }
      navigate("/");
    }
  };

  const handlerChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handlerValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if ((username, email, password, confirmPassword === "")) {
      toast.error("Some fields are empty, you need fill to continue the register.", TOAST_OPTIONS);
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

  return (
    <>
      <div className="FormRegister">
        <form onSubmit={(event) => handlerSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snappy Chat</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={(event) => handlerChange(event)} />
          <input type="email" placeholder="Email" name="email" onChange={(event) => handlerChange(event)} />
          <input type="password" placeholder="Password" name="password" onChange={(event) => handlerChange(event)} />
          <input type="password" placeholder="Confirm password" name="confirmPassword" onChange={(event) => handlerChange(event)} />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

// const FormContainer = styled.div``;
//   // height: 100vh;
//   // width: 100vw;
//   // display: flex;
//   // flex-direction: column;
//   // justify-content: center;
//   // gap: 1rem;
//   // align-items: center;
//   // background-color: #131324;
//   // .brand {
//   //   display: flex;
//   //   align-items: center;
//   //   gap: 1rem;
//   //   justify-content: center;
//   //   img {
//   //     height: 5rem;
//   //   }
//   //   h1 {
//   //     color: white;
//   //     text-transform: uppercase;
//   //   }
//   // }
//   // form {
//   //   display: flex;
//   //   flex-direction: column;
//   //   gap: 2rem;
//   //   background-color: #00000076;
//   //   border-radius: 2rem;
//   //   padding: 3rem 5rem;
//   //   input {
//   //     background-color: transparent;
//   //     padding: 1rem;
//   //     border: 0.1rem solid #4e0eff;
//   //     border-radius: 0.4rem;
//   //     color: white;
//   //     width: 100%;
//   //     font-size: 1rem;
//   //     &:focus {
//   //       border: 0.1rem solid #997af0;
//   //       outline: none;
//   //     }
//   //   }
//   //   button {
//   //     background-color: #4e0eff;
//   //     color: white;
//   //     padding: 1rem 2rem;
//   //     border: none;
//   //     font-weight: bold;
//   //     cursor: pointer;
//   //     border-radius: 0.4rem;
//   //     font-size: 1rem;
//   //     text-transform: uppercase;
//   //     transition: 0.5s ease-in-out;
//   //     &:hover {
//   //       background-color: #997af0;
//   //     }
//   //   }
//   //   span {
//   //     color: white;
//   //     text-transform: uppercase;
//   //     a {
//   //       color: #997af0;
//   //       text-decoration: none;
//   //       font-weight: bold;
//   //     }
//   //   }
//   // }
// `;

export default Register;
