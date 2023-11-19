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
    if(rdxToken !== ""){
      console.log("aqui tambien 1")
        const token = rdxToken.credentials.token;
        const decoredToken =jwtDecode(token)
        console.log(decoredToken)
        if (decoredToken.role == "super_admin"){
            getAllAppointments(token)
            .then((results) => {
                setAppointments(results.data);
                console.log("esto es results", results)
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
      <>
       <div className="appointmentsDesign">
      Hola!
      {appointments.length > 0 ? (
        <div>Sí
          <div>
            {appointments.map((results) => {
              return (
                <CardAppointments
                key={results.id}
                client={results.client}
                artist={results.artist}
                portfolio={results.portfolio.product_id}
                date={results.date}
                status_appointment={results.status_appointment}
                is_active={results.is_active}
              />
              )
            })}
          </div>
        </div>
      )
    : (
      <div>Mal</div>
    )}
      </div>
      {/* <div className="appointmentsDesign">
      {appointments.length > 0 ? (
        <div className="appointmentsRoster">
          {appointments.map((appointment) => {
            return (
              <CardAppointments
              key={appointment.id}
              client={appointment.client}
              artist={`${appointment.workerAppointment.users.name} ${appointments.workerAppointment.users.surname}`}
              portfolio={appointment.portfolio.product_id}
              date={appointment.date}
              status_appointment={appointment.status_appointment}
              is_active={appointment.is_active}
              />
            );
          })}
        </div>
      ) : (
        <div>{msgError}</div>
      )}
      </div> */}
      </>
      
  );
};