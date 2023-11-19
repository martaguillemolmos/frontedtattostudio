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
import { TabBar } from "../../common/TabBar/TabBar";
// import { setAppointment } from "../appointmentSlice";

export const Appointments = () => {
  const navigate = useNavigate();
  const rdxToken = useSelector(userData);
  
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([])
  const [msgError, setMsgError] = useState("");
  const [tabValue, setTabValue] = useState('null');
  const customTabs = [
    { label: 'Todos', value: 'null'},
    { label: 'Aprobadas', value: 'approved' },
    { label: 'Pendientes', value: 'pending'  },
    { label: 'Canceladas', value: 'canceled'  },
    { label: 'Finalizadas', value: 'made'  },
  ];

  const handlerTab = (event, newValue) => {
    setTabValue(newValue);
    if( newValue === 'null'){

      setAppointments(allAppointments);
      return
    }

    const filterAppointments = allAppointments.filter( appo => appo.status_appointment === newValue )
    setAppointments(filterAppointments);
  
  };

  //Utilizamos este useEffect para que, en el caso que alguien ya se haya logeado, no pueda acceder a esta vista.
  useEffect(() => {
    if(rdxToken !== ""){
      const token = rdxToken.credentials.token;
      const decoredToken = jwtDecode(token)
      if (decoredToken !== "super_admin" && appointments.length === 0){
          getAppointmentsByUserId(token)
            .then((results) => {
              if(Array.isArray(results.data)){
                setAllAppointments(results.data);
                setAppointments(results.data)
                console.log(results.data)
              } else {
                setMsgError("No tienes citas agendadas")
              }
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
  }, [rdxToken]);
  

  return (
    <>
    <TabBar tabs={customTabs} value={tabValue} handler={handlerTab} />
     <div className="appointmentsDesign">
      {appointments.length > 0 ? (
        <div className="appointmentsRoster">
          {appointments.map((appointment) => {
            return (

              <CardAppointments
                key={appointment.id}
                client={appointment.client}
                artist={`${appointment.workerAppointment.users.name} ${appointment.workerAppointment.users.surname}`}
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
      </div>
    </>
   
  );
};
