import "./StatusAppointment.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { updateAppointmentWorker } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/userful";

export const StatusAppointment = () => {
    const navigate = useNavigate();
    const rdxToken = useSelector(userData);
    const [status, setStatus] = useState({
        id: "",
        status_appointment: "",
    })
    const [statusError, setStatusError] = useState({
        id: "",
        status_appointment: "",
    })

    const functionHandler = (e) => {
        setStatus((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        setStatusError((prevState) => ({
          ...prevState,
          [e.target.name + "Error"]: error,
        }));
      };
    useEffect (() => {
        if(rdxToken !== ""){
            const token = rdxToken.credentials.token;
            const decoredToken = jwtDecode(token)
            console.log(decoredToken)
            if (decoredToken.role == "admin"){
            console.log("Admin")
            } else {
                navigate ("/")
            }
        } else {
            navigate ("/")
        }
       }, [rdxToken])

    const changeStatus = () => {
        updateAppointmentWorker(rdxToken.credentials.token, status)
        .then(() =>{
            console.log("Cambios guardados")
        })
        .catch ((error) => {
            console.log(error)
        })
    }


    return(
        <div className="status">
        Modificar estado cita:
        <div>Identificador de la cita</div>
        <CustomInput
          design={"inputDesign"}
          type={"text"}
          name={"id"}
          placeholder={""}
          value={""}
          maxLength={"4"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div>{statusError.id}</div>
        <div>Estado</div>
      <CustomInput
        design={"inputDesign"}
        type={"text"}
        name={"status_appointment"}
        placeholder={""}
        value={""}
        maxLength={"10"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div>{statusError.status_appointment}</div>
      <div className="editDesign" onClick={() => changeStatus()}>
        Modifica cita
    </div>
        </div>
    )
}