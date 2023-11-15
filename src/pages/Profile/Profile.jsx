import "./Profile.css";
import { useEffect, useState } from "react";

// //Importamos Redux
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

//Importamos las rutas
import { profileUser, updateUser } from "../../services/apiCalls";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/userful";

export const Profile = () => {
  // Instanciamos Redux en lectura
  const rdxToken = useSelector(userData);
  // Creamos un Hook con las propiedades que queremos mostrar en pantalla del perfil
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    phone: 0,
    email: "",
  });

  const [profileError, setProfileError] = useState({
    nameError: "",
    surnameError: "",
    phoneError: "",
    emailError: "",
  });

  const [isEnabled, setIsEnabled] = useState(true);

  const functionHandler = (e) => {
    setProfile((prevState) => ({
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

  useEffect(() => {
    if (rdxToken) {
      // Realizamos la solicitud a la API con el token almacenado en Redux
      profileUser(rdxToken.credentials.token)
        .then((results) => {
          setProfile(results.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [rdxToken]);
 
  const sendData = () => {
    console.log(profile)
    const userId = profile.id;

    updateUser (rdxToken.credentials.token, userId, profile)
    .then (() =>{
    console.log("Cambios enviado correctamente");
    })
    . catch((error) => {
        console.log("Error al enviar", error)
    })
    setTimeout(() => {
      setIsEnabled(true);
    }, 1000);
  };

  return (
    <div className="profileDesign">
    Datos de contacto:
      <div>Nombre</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"text"}
        name={"name"}
        placeholder={""}
        value={profile.name}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{profileError.nameError}</div>

      <div>Apellidos</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"text"}
        name={"surname"}
        placeholder={""}
        value={profile.surname}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{profileError.surnameError}</div>

      <div>Teléfono</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"number"}
        name={"phone"}
        placeholder={""}
        min={600000000}
        max={900000000}
        value={profile.phone}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{profileError.phoneError}</div>

      <div>Dirección de e-mail</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={""}
        value={profile.email}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{profileError.emailError}</div>
      {isEnabled ? (
        <div className="editDesign" onClick={() => setIsEnabled(!isEnabled)}>
          Edita tus datos
        </div>
      ) : (
        <div className="sendDesign" onClick={() => sendData()}>
          Enviar cambios
        </div>
      )}

    </div>
  );
};
