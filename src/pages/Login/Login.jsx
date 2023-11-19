import "./Login.css";

import { useState, useEffect } from "react";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/userful";
import CustomAlert  from "../../common/Alert/CustomAlert";

//Importo Redux

import { useDispatch, useSelector } from "react-redux";  
import { login, userData } from "../userSlice";

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [credencialesError, setCredencialesError] = useState({
    emailError: null,
    passwordError: null,
  });

  const [alert, setAlert] = useState({
    show:false,
    title:'',
    message: '',
  });

  const alertHandler = (e) => {
    setAlert(e);
  }

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

  useEffect(()=>{
    //Comprobamos si ya hay un token almacenado en Redux
        if(rdxCredentials?.credentials.token){
          console.log(rdxCredentials)
          //Si ya contamos con un token, redirigimos al usuario a inicio.
          navigate("/profile");
        } 
      },[rdxCredentials, navigate]);
  

  //Declaramos la constante logMe para que, en caso de logearnos guarde el token y nos envíe al profile y por el contrario, nos muestre el error que nos impide hacerlo.
  const logMe = () => {
    console.log("errores",credencialesError);
    if(credencialesError.emailError != null && credencialesError.passwordError != null ){
      logUser(credenciales)
      .then((resultado) => {
        console.log(resultado);
        //Guardanos el token
        dispatch(login({ credentials: resultado.data}))
        //Una vez guardado el token,nos dirigimos a profile.
        setTimeout(() => {
          
          navigate("/profile");
        }, 500);
      })
      .catch((error) => {
        if (error.response.status !== 200){
          console.log(error.response.message)
          alertHandler({show:true, title:`Error ${error.response.status}`, message:`${error.response.data.message}`})
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

  return (
    <div className="loginDesign">
      <CustomAlert
      title={alert.title}
      showAlert={alert.show}
      message={alert.message}
      onClose={()=>alertHandler({
        show:false,
        title:'',
        message: ''
      })} 
      />
      <div className="inputCard">
        <div>Dirección de e-mail</div>
        <CustomInput
          design={"inputDesign"}
          type={"email"}
          name={"email"}
          placeholder={""}
          value={""}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div>{credencialesError.emailError}</div>
        <div>
          <div>Contraseña</div>
          <div>¿Has olvidado la contraseña?</div>
          </div>
        <CustomInput
          design={"inputDesign"}
          type={"password"}
          name={"password"}
          placeholder={""}
          value={""}
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
