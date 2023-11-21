import { useEffect, useState } from "react";
import "./Register.css";

import CustomAlert from "../../common/Alert/CustomAlert";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/userful";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
//Importo Redux
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { Button } from "@mui/material";
import { InputPassword } from "../../common/PasswordField/PasswordField";

export const Register = () => {
  //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
  const navigate = useNavigate();

  //Declaramos esta constante, que nos permitirá leer el contenido.
  const dispatch = useDispatch();

  const rdxCredentials = useSelector(userData);

  // Declaramos las credenciales que vamos a solicitar para poder realizar el register.
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    phone: 0,
    email: "",
    password: "",
  });

  const [registerDataError, setRegisterDataError] = useState({
    nameError: "",
    surnameError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
  });

  //Declaramos los atributos del objeto que controla la alerta.
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
  });

  //Declaramos la función alert, para que pueda mutar su estado dependiendo del evento.
  const alertHandler = (e) => {
    setAlert(e);
  };

  const functionHandler = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setRegisterDataError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  useEffect(() => {
    //Comprobamos si ya hay un token almacenado en Redux
    if (rdxCredentials?.credentials.token) {
      //Si ya contamos con un token, redirigimos al usuario a inicio.
      navigate("/");
    }
  }, [rdxCredentials, navigate]);

  //Registrar nuevos usuarios.
  const createUser = () => {
    console.log("datos", registerData);
    if (registerDataError != "") {
      const data = {
        ...registerData,
        phone: parseInt(registerData.phone),
      };

      registerUser(data)
        .then((resultado) => {
          console.log("guardamos token", resultado);
          //Guardanos el token
          dispatch(login({ credentials: resultado.data }));
          setTimeout(() => {
            navigate("/profile");
          }, 500);
        })
        .catch((error) => {
          if (error.response.status !== 200) {
            console.log(error.response);
            alertHandler({
              show: true,
              title: `Error ${error.response.status}`,
              message: `${error.response.data}`,
            });
          }
        });
    }
  };

  const passwordPattern = "^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]+$";

  return (
    <div className="registerDesign">
      <div className="contentRegister">
        <div className="alertDesign">
          <CustomAlert
            title={alert.title}
            showAlert={alert.show}
            message={alert.message}
            onClose={() =>
              alertHandler({
                show: false,
                title: "",
                message: "",
              })
            }
          />
        </div>
        <div className="inputCardRegister">
          Crear cuenta
          <CustomInput
            label={"Nombre"}
            design={"inputDesign"}
            type={"text"}
            name={"name"}
            placeholder={""}
            value={""}
            maxLength={"25"}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div>{registerDataError.nameError}</div>

          <CustomInput
            label={"Apellidos"}          
            design={"inputDesign"}
            type={"text"}
            name={"surname"}
            placeholder={""}
            value={""}
            maxLength={"25"}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div>{registerDataError.surnameError}</div>

          <CustomInput
            label={"Teléfono"}
            design={"inputDesign"}
            type={"tel"}
            name={"phone"}
            placeholder={""}
            min={600000000}
            max={900000000}
            value={""}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div>{registerDataError.phoneError}</div>

          <CustomInput
            label={"Dirección de e-mail"}
            design={"inputDesign"}
            type={"email"}
            name={"email"}
            placeholder={""}
            value={""}
            maxLength={"50"}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div>{registerDataError.emailError}</div>

          <InputPassword
            className="inputRegister"
            name={"password"}
            pattern={passwordPattern}
            label={"Password"}
            maxLength={"12"}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <InputPassword
            className="inputRegister"
            name={"password"}
            pattern={passwordPattern}
            label={"Confirma tu contraseña"}
            maxLength={"12"}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div>{registerDataError.passwordError}</div>
          <Button variant="contained" className ="button" onClick={createUser} style={{ textTransform: 'none', fontFamily:'' }}>Crea tu cuenta</Button>
          </div>
        </div>
      </div>
  );
};
