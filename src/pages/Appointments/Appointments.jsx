import { useNavigate } from "react-router-dom";
import "./Appointments.css"
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import { getAppointmentsByUserId } from "../../services/apiCalls";


export const Appointments = () => {
    //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
    const navigate = useNavigate();

    // Instanciamos Redux en lectura
    const rdxToken = useSelector(userData);
    //Aquí recuperamos solo el token
    const token = rdxToken.credentials.token
    
    const [appointments, setAppointments] = useState ([])

      //Utilizamos este useEffect para que, en el caso que alguien ya se haya logeado, no pueda acceder a esta vista.
        useEffect(()=>{
        //Comprobamos si ya hay un token almacenado en Redux
        if(token){
        //Comprobamos que el array de appointments sea menor a 0.
         if(appointments.length === 0){
            //Entonces, nos solicitamos a través del token las citas de dicho usuario.
            getAppointmentsByUserId(token)
            .then ((results) => {
                setAppointments(results.data)
            })
            .catch ((error) => console.log (error))
         }
        } else {
        //Si no contamos con un token, redirigimos al usuario a login.
          navigate("/login");
        }
      },[appointments]);

    return (
        <div className="appointmentDesign">
        Appointment   
        </div>
    )
}