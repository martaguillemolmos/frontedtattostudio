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
    if(rdxToken !== ""){
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
                  setMsgError(error.response.data);
                } else {
                  // Si no tenemos un mensaje en response.data
                  setMsgError("Hubo un error al cargar las citas.");
                }
              });
        } else {
            navigate ("/")
        }
    } else {
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