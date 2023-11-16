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

  //Instanciar Redux en escritura
  
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

  const [isEnabled, setIsEnabled] = useState(true);

  const [originalProfile, setOriginalProfile] = useState(false);

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
          setOriginalProfile(results.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [rdxToken]);

  //Guardamos de nuevo todos los datos, independientemente de si se modifican o no.
  const sendData = () => {
    if (profileChange()) {
      console.log(profile);
      const userId = profile.id;

      updateUser(rdxToken.credentials.token, userId, profile)
        .then(() => {
          console.log(`Enhorabuena, ${profile.name}, los cambios se han realizado con éxito.`);
        })
        .catch((error) => {
          console.log("Aquí quiero recuperar el error de la base de datos.", error);
        });
      setTimeout(() => {
        setIsEnabled(true);
      }, 1000);
    }else {
        console.log(`${profile.name}, no se han actualizado los campos porque no se ha modificado ningún campo.`);
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

  const desactiveAccount = () => {
    return(
      profile.is_active = false
    )
  }
  

  return (
    <div className="profileDesign">
      Información básica
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
      Información de contacto
      <div>Teléfono</div>
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
      <div> 

        Contraseña
        <div>Si eligues una contraseña segura, ayudas a proteger tu cuenta.
          <div>Cambiar contraseña</div>
        </div>

        Otras opciones
        <div>Desactiva tu cuenta 
          <div className="deleteAccount" onClick={() => desactiveAccount}>Desactivar</div></div>
        
      </div>
    </div>
  );
};
