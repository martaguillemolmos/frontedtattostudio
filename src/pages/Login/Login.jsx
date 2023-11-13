import "./Login.css";

import { useState } from "react";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/userful";

export const Login = () => {
  const navigate = useNavigate();

  // Declaramos las credenciales que vamos a solicitar para poder realizar el login.
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  //Declaramos las credenciales que vamos a solicitar junto + Error.
  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  });

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };
  const logMe = () => {
    logUser(credenciales)
      .then((resultado) => {
        console.log(resultado);
        //Aqui guardaría el token........

        //Una vez guardado el token....nos vamos a home....
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const registerMe = () => {
        setTimeout(() => {
          navigate("/register");
        }, 500);
    
  };
  return (
    <div className="loginDesign">
      <div className="inputCard">
        <CustomInput
          design={"inputDesign"}
          type={"email"}
          name={"email"}
          placeholder={""}
          // value={}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div>{credencialesError.emailError}</div>
        <CustomInput
          design={"inputDesign"}
          type={"password"}
          name={"password"}
          placeholder={""}
          // value={}
          functionProp={functionHandler}
          autocomplete="on"
          functionBlur={errorCheck}
        />
        <div>{credencialesError.passwordError}</div>

        <div className="buttonSubmit" onClick={logMe}>
          Iniciar sesión
        </div>

        <div className="newAccount">
          <div>----------¿Eres nuevo?----------</div>
          <div className="buttonSubmit" onClick={registerMe}>
          Crea tu cuenta
        </div>
        </div>
      </div>
    </div>
  );
};
