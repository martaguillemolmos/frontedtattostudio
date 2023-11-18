import { useNavigate } from "react-router-dom";
import "./Appointments.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import {
  getAppointmentsByUserId,
} from "../../services/apiCalls";
import CardAppointments from "../../common/CardAppointments/CardAppointments";
import { jwtDecode } from "jwt-decode";
// import { setAppointment } from "../appointmentSlice";

export const Appointments = () => {
  console.log("entra aquí")
  const navigate = useNavigate();
  const rdxToken = useSelector(userData);
  
 
  const [appointments, setAppointments] = useState([]);
  const [msgError, setMsgError] = useState("");

  //Utilizamos este useEffect para que, en el caso que alguien ya se haya logeado, no pueda acceder a esta vista.
  useEffect(() => {
    if(rdxToken !== ""){
      const token = rdxToken.credentials.token;
      const decoredToken = jwtDecode(token)
      console.log(decoredToken)
      if (decoredToken !== "super_admin" && appointments.length === 0){
          getAppointmentsByUserId(token)
            .then((results) => {
              setAppointments(results.data);

            })
            .catch((error) => {
              if (error.response && error.response.data) {
                // Si tenemos un mensaje en response.data, lo mostramos
                setMsgError(error.response.data);
              } else {
                // Si no tenemos un mensaje en response.data
                setMsgError("Hubo un error al cargar las citas.");
              }
            });
      } else {
        navigate("/appointment");
      }
    } else {
      // Si no contamos con un token, redirigimos al usuario a login.
      navigate("/login");
    }
  }, [rdxToken, appointments, navigate]);
  

  return (
    <div className="appointmentsDesign">
      {appointments.length > 0 ? (
        <div className="appointmentsRoster">
          {appointments.map((appointments) => {
            return (
              <CardAppointments
                key={appointments.id}
                client={appointments.client}
                artist={appointments.artist}
                portfolio={appointments.portfolio_id}
                date={appointments.date}
                status_appointment={appointments.status_appointment}
                is_active={appointments.is_active}
              />
            );
          })}
        </div>
      ) : (
        <div>{msgError}</div>
      )}
      </div>
  );
};
