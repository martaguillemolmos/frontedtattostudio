import "./Profile.css";
import { useEffect, useState } from "react";

// //Importamos Redux
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { profileUser } from "../../services/apiCalls";
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

  return (
    <div className="profileDesign">

      <div>Nombre</div>
      <CustomInput
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
        design={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={""}
        value={profile.email}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
    <div>{profileError.emailError}</div>

    </div>

  );
};
