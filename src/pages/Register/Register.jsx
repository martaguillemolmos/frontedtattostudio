import { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import CustomAlert from "../../common/Alert/CustomAlert";

export const Register = () => {
  const navigate = useNavigate();
  const rdxCredentials = useSelector(userData);

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

  //Utilizamos este useEffect para que, en el caso que alguien ya se haya logeado, no pueda acceder a esta vista.
  useEffect(() => {
    //Comprobamos si ya hay un token almacenado en Redux
    if (rdxCredentials?.credentials.token) {
      //Si ya contamos con un token, redirigimos al usuario a inicio.
      navigate("/");
    }
  }, [rdxCredentials, navigate]);

  return (
    <div className="registerDesign">
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
      Register: name, surname, phone, email, password
    </div>
  );
};
