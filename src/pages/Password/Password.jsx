import "./Password.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../userSlice";
import { useEffect, useState } from "react";
import { updatePassword } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/userful";
import CustomAlert from "../../common/Alert/CustomAlert";
import { InputPassword } from "../../common/PasswordField/PasswordField";
import { Button } from "@material-ui/core";

export const Password = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxToken = useSelector(userData);

  const [newPassword, setNewPassword] = useState({
    passwordOld: "",
    password: "",
  });
  const [newPasswordError, setNewPasswordError] = useState({
    passwordOld: "",
    password: "",
  });

  const passwordPattern = "^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]+$";

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

  useEffect(() => {
    if (rdxToken.credentials == "") {
      navigate("/");
    }
  }, [rdxToken]);

  const functionHandler = (e) => {
    setNewPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setNewPasswordError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const Update = () => {
    if (
      newPassword.password !== "" &&
      newPassword.passwordOld !== "" &&
      newPassword.password !== newPassword.passwordOld
    ) {
      const token = rdxToken.credentials.token;
      console.log(token);
      updatePassword(token, newPassword)
        .then(() => {
          //Añadir control Snackbar
          dispatch(logout({ credentials: "" }));
          navigate("/");
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
    console.log(newPassword);
  };

  return (
    <div className="passwordDesign">
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
      Modifica tu contraseña
      <CustomInput
        label={"Contraseña actual"}
        design={"inputDesign"}
        type={"password"}
        name={"passwordOld"}
        placeholder={""}
        value={""}
        maxLength={"12"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{newPasswordError.passwordOld}</div>
      <div className="newPassword">
      Introduce nueva contraseña
      <InputPassword
        required
        className="inputRegister"
        name={"password"}
        pattern={passwordPattern}
        label={"Nueva contraseña"}
        maxLength={"12"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{newPasswordError.password}</div>
      </div>
      <Button
              variant="contained"
              className="button"
              onClick={Update}
              style={{ textTransform: "none", fontFamily: "" }}
            >
              Cambiar contraseña
            </Button>
    
    </div>
  );
};
