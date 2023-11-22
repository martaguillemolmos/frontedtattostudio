import "./Login.css";

import { useState, useEffect } from "react";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/userful";
import CustomAlert from "../../common/Alert/CustomAlert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

//Importo Redux

import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { SnackbarCustom } from "../../common/Snackbar/Snackbar";
import { InputPassword } from "../../common/PasswordField/PasswordField";
import { SimpleContainer } from "../../common/Container/Container";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);

  //Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handlerCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [credencialesError, setCredencialesError] = useState({
    emailError: null,
    passwordError: null,
  });

  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
  });

  const alertHandler = (e) => {
    setAlert(e);
  };

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

  useEffect(() => {
    //Comprobamos si ya hay un token almacenado en Redux
    console.log("entra aqui");
    if (rdxCredentials?.credentials.token) {
      console.log(rdxCredentials);
      // setSnackbarOpen(false);
      //Si ya contamos con un token, redirigimos al usuario a inicio.
      navigate("/profile");
    }
  });

  //Declaramos la constante logMe para que, en caso de logearnos guarde el token y nos envíe al profile y por el contrario, nos muestre el error que nos impide hacerlo.
  const logMe = () => {
    console.log("errores", credencialesError);
    if (
      credenciales.email != "" &&
      credenciales.password != "" &&
      credencialesError.emailError == "" &&
      credencialesError.passwordError == ""
    ) {
      logUser(credenciales)
        .then((resultado) => {
          console.log(resultado);
          setSnackbarOpen(true);
          setSnackbarMessage(resultado.data.message);
          dispatch(login({ credentials: resultado.data }));
          console.log("Mensajito", resultado.data.message);
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        })
        .catch((error) => {
          if (error.response.status !== 200) {
            console.log(error.response.message);
            alertHandler({
              show: true,
              title: `Error ${error.response.status}`,
              message: `${error.response.data.message}`,
            });
          }
        });
    }
  };

  //Declaramos esta constante, para que, en caso de pulsar sobre el botón que contiene "Crea tu cuenta", nos rediriga a registro.
  const registerMe = () => {
    setTimeout(() => {
      navigate("/register");
    }, 500);
  };

  const passwordPattern = "^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]+$";

  return (
    <div className="loginDesign">
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
      <SimpleContainer>
        {
          <div className="contentInput">
            <div className="titleLogin">Iniciar sesión</div>
            <div className="divInputs">
              <CustomInput
                required
                className="inputRegister"
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
              <div>{credencialesError.emailError}</div>
              <InputPassword
                required
                className="inputRegister"
                name={"password"}
                pattern={passwordPattern}
                label={"Password"}
                maxLength={"12"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
              />
              <div>{credencialesError.passwordError}</div>
            </div>
            <Button
              variant="contained"
              className="button"
              onClick={logMe}
              style={{ textTransform: "none", fontFamily: "" }}
            >
              Iniciar sesión
            </Button>
            <div className="createAccount">
              <Divider>¿Eres nuevo?</Divider>
            </div>
            <div>
              <Button
                variant="contained"
                className="button"
                onClick={registerMe}
                style={{ textTransform: "none", fontFamily: "" }}
              >
                Crea tu cuenta
              </Button>
            </div>
          </div>
        }
      </SimpleContainer>
      {snackbarOpen ? (
        <SnackbarCustom
          open={snackbarOpen}
          handleClose={handlerCloseSnack}
          message={snackbarMessage}
        />
      ) : null}
    </div>
  );
};
