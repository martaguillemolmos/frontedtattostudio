import { useSelector } from "react-redux";
import "./AppointmentSuperAdmin.css"
import { userData } from "../../userSlice";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getAllAppointments } from "../../../services/apiCalls";
import CardAppointments from "../../../common/CardAppointments/CardAppointments";

export const AppointmentSuperAdmin = () => {
    const navigate = useNavigate();
    const rdxToken = useSelector(userData);
    const [appointments, setAppointments] = useState([]);
    const [msgError, setMsgError] = useState("");


   useEffect (() => {
    console.log("aqui entra")
    if(rdxToken !== "" || {}){
        const token = rdxToken.credentials.token;
        const decoredToken =jwtDecode(token)
        console.log(decoredToken)
        if (decoredToken.role == "super_admin"){
            getAllAppointments(token)
            .then((results) => {
                setAppointments(results.data);
  
              })
              .catch((error) => {
                if (error.response && error.response.data) {
                  // Si tenemos un mensaje en response.data, lo mostramos
                  console.log(error);
                } else {
                  // Si no tenemos un mensaje en response.data
                  setMsgError("Hubo un error al cargar las citas.");
                }
              });
        } else {
            navigate ("/")
        }
    } else {
      console.log("redirigir")
        navigate ("/")
    }
   }, [rdxToken, navigate])

    return (
        <div className="appointmentsDesign">
      {appointments.length > 0 ? (
        <div className="appointmentsRoster">
          {appointments.map((appointments) => {
            return (
              <CardAppointments
              key={appointments.id}
              client={appointments.client}
              artist={`${appointments.workerAppointment.users.name} ${appointments.workerAppointment.users.surname}`}
              portfolio={appointments.portfolio.product_id}
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