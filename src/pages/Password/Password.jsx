import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../userSlice";
import { useEffect, useState } from "react";
import { updatePassword } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/userful";

export const Password = () => {
  const navigate = useNavigate();
  const rdxToken = useSelector(userData);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState({
    passwordOld: "",
    password: "",
  });
  const [newPasswordError, setNewPasswordError] = useState({
    passwordOld: "",
    password: "",
  });
  useEffect(() => {
    if (rdxToken == "") {
      navigate("/login");
    }
  }, [rdxToken, navigate]);

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
        .then((results) => {
          const { message } = results.data;
          setMessage(message);
          if (message != "") {
            setTimeout(() => {
              dispatch(logout({ credentials: "" }));
              navigate("/");
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(newPassword);
  };

  return (
    <>
      Contraseña actual
      <CustomInput
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
      Nueva contraseña
      <CustomInput
        design={"inputDesign"}
        type={"text"}
        name={"password"}
        placeholder={""}
        value={""}
        maxLength={"12"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{newPasswordError.password}</div>
      <div className="linkButtonDesign" onClick={() => Update()}>
        Cambiar contraseña
      </div>
    </>
  );
};
