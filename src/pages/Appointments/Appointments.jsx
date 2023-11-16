import { useNavigate } from "react-router-dom";
import "./Appointments.css"
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useEffect } from "react";


export const Appointments = () => {
    //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
    const navigate = useNavigate();

    // Instanciamos Redux en lectura
     const rdxToken = useSelector(userData);

      //Utilizamos este useEffect para que, en el caso que alguien ya se haya logeado, no pueda acceder a esta vista.
        useEffect(()=>{
        //Comprobamos si ya hay un token almacenado en Redux
        if(!rdxToken?.credentials.token){
          console.log(rdxToken)
          //Si ya contamos con un token, redirigimos al usuario a inicio.
          navigate("/login");
        } 
      },[rdxToken, navigate]);

    return (
        <div className="appointmentDesign">
        Appointment   
        </div>
    )
}