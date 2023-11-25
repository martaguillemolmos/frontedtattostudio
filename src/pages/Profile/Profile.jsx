import "./Profile.css";
import { useEffect, useState } from "react";

// //Importamos Redux
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

//Importamos las rutas
import {
  profileUser,
  profileWorker,
  updateUser,
} from "../../services/apiCalls";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/userful";

import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { Button } from "@mui/material";
import { LetterAvatars } from "../../common/Avatar/Avatar";

export const Profile = () => {
  //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
  const navigate = useNavigate();
  // Instanciamos Redux en lectura
  const rdxToken = useSelector(userData);

  const inicial = rdxToken.credentials.name ? rdxToken.credentials.name.charAt(0) : '';

  // Creamos un Hook con las propiedades que queremos mostrar en pantalla del perfil
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    phone: 0,
    email: "",
    is_active: true,
  });

  const [profileError, setProfileError] = useState({
    nameError: "",
    surnameError: "",
    phoneError: "",
    emailError: "",
    is_active: "",
  });

  const [infWorker, setInfWorker] = useState({
    formation: "",
    experience: "",
  });

  const [infWorkerError, setInfWorkerError] = useState({
    formation: "",
    experience: "",
  });

  const [isEnabled, setIsEnabled] = useState(true);

  const [originalProfile, setOriginalProfile] = useState(false);

  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const functionHandlerWorker = (e) => {
    setInfWorker((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setProfileError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const errorCheckWorker = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setInfWorkerError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  

  useEffect(() => {
    if (rdxToken.credentials !== "") {
      console.log("token", rdxToken);
      const token = rdxToken.credentials.token;
      const decoredToken = jwtDecode(token);
      console.log("aqui tambien");
      console.log("hola", decoredToken);
  
      profileUser(token)
        .then((results) => {
          console.log("aquí results", results);
          setProfile(results.data.data);
          setOriginalProfile(results.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
      if (decoredToken.role == "admin") {
        console.log("eres admin")
        profileWorker(token)
          .then((results) => {
            console.log(infWorker);
            console.log("wokr", results)
            setInfWorker(results.data);
            console.log("este es el data del worker", results.data);
          })
          .catch((error) => {
            console.error(error);
          });
        return;
      }
    } else {
      //Si no contamos con un token, redirigimos al usuario a inicio.
      navigate("/");
    }
  }, [rdxToken, navigate]);

  const sendData = () => {
    if (profileChange()) {
      const userId = profile.id;

      updateUser(rdxToken.credentials.token, userId, profile)
        .then(() => {
          console.log(
            `Enhorabuena, ${profile.name}, los cambios se han realizado con éxito.`
          );
        })
        .catch((error) => {
          console.log(
            "Aquí quiero recuperar el error de la base de datos.",
            error
          );
        });
      setTimeout(() => {
        setIsEnabled(true);
      }, 1000);
    } else {
      console.log(
        `${profile.name}, no se han actualizado los campos porque no se ha modificado ningún campo.`
      );
      profileChange(false);
    }
    setIsEnabled(true);
  };

  const profileChange = () => {
    return (
      profile.name !== originalProfile.name ||
      profile.surname !== originalProfile.surname ||
      profile.phone !== originalProfile.phone ||
      profile.email !== originalProfile.email
    );
  };

  return (
    <div className="profileDesign">
      <div className="contentProfile">
       <div className="cabecera">
      <div className="avatar">
      <LetterAvatars initial={inicial} />
      </div>
      <div className="infoCabecera">
      <p className="p">Perfil</p>
      <h2>{profile.name} {profile.surname}</h2>

      </div>
      
      </div>
      <div className="inforProfile">
      <div className="inforUser">
      Información básica
      <CustomInput
        disabled={isEnabled}
        display ={"flex"}
        design={"inputDesign"}
        type={"text"}
        name={"name"}
        placeholder={""}
        value={profile.name}
        maxLength={"25"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{profileError.nameError}</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"text"}
        name={"surname"}
        placeholder={""}
        maxLength={"25"}
        value={profile.surname}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{profileError.surnameError}</div>
      </div> 
      <div className="inforUser">
      Información de contacto
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"tel"}
        name={"phone"}
        placeholder={""}
        min={600000000}
        max={900000000}
        value={profile.phone}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{profileError.phoneError}</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={""}
        maxLength={"50"}
        value={profile.email}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{profileError.emailError}</div>
      </div>
      </div>
      </div>
      {isEnabled ? (
        <Button
         variant="contained"
         className="button"
         onClick={() => setIsEnabled(!isEnabled)}
         style={{ textTransform: "none", fontFamily: "" }}
       >
         Edita tus datos
       </Button>
  
      ) : (
        <Button
         variant="contained"
         className="button"
         onClick={() => sendData()}
         style={{ textTransform: "none", fontFamily: "" }}
       >
         Enviar cambios
       </Button>
      
      )}
      <div>
        <div className="password">
          Contraseña
          <LinkButton path={"/password"} title={"Modificar contraseña"} />
        </div>
      </div>

 
      <div className="inforWorker">
       Datos del trabajador
        <CustomInput
          disabled={true}
          design={"inputDesign"}
          type={"text"}
          name={"formation"}
          placeholder={""}
          maxLength={"200"}
          value={infWorker.formation}
          functionProp={functionHandlerWorker}
          functionBlur={errorCheckWorker}
        />
        <div>{infWorkerError.formation}</div>

        <CustomInput
          disabled={true}
          design={"inputDesign"}
          type={"text"}
          name={"experience"}
          placeholder={""}
          maxLength={"200"}
          value={infWorker.experience}
          functionProp={functionHandlerWorker}
          functionBlur={errorCheckWorker}
        />
      
        <div>{infWorkerError.experience}</div>
        </div>
    </div>
  );
};
