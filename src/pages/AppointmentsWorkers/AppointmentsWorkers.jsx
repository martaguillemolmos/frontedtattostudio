import { useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// // import CardAppointments from "../../../common/CardAppointments/CardAppointments";
// // import { TabBar } from "../../../common/TabBar/TabBar";
// import { getAppointmentsByWorkerId } from "../../services/apiCalls";

export const AppointmentWorkers = () => {
    // const navigate = useNavigate();
    const rdxToken = useSelector(userData);
    // const [appointments, setAppointments] = useState([]);
    // const [allAppointments, setAllAppointments] = useState([])
    // const [msgError, setMsgError] = useState("");
//     const [tabValue, setTabValue] = useState('null');
//     const customTabs = [
//       { label: 'Todos', value: 'null'},
//       { label: 'Aprobadas', value: 'approved' },
//       { label: 'Pendientes', value: 'pending'  },
//       { label: 'Canceladas', value: 'canceled'  },
//       { label: 'Finalizadas', value: 'made'  },
//     ];

//     const handlerTab = (event, newValue) => {
//       setTabValue(newValue);
//       if( newValue === 'null'){
  
//         setAppointments(allAppointments);
//         return
//       }
  
//       const filterAppointments = allAppointments.filter( appo => appo.status_appointment === newValue )
//       setAppointments(filterAppointments);
    
//     };
   useEffect (() => {
    console.log("aqui entra")
    if(rdxToken !== ""){
      console.log("aqui tambien 1")
        const token = rdxToken.credentials.token;
        console.log(token)
        // const decoredToken =jwtDecode(token)
        // console.log(decoredToken)
        // if (decoredToken.role == "admin"){
        //     getAppointmentsByWorkerId(token)
        //     .then((results) => {
        //       if(Array.isArray(results.data)){
        //         setAllAppointments(results.data);
        //         setAppointments(results.data)
        //         console.log(results.data)
        //       } else {
        //         setMsgError("No tienes citas agendadas")
        //       }
        //     })
        //       .catch((error) => {
        //         if (error.response && error.response.data) {
        //           // Si tenemos un mensaje en response.data, lo mostramos
        //           console.log(error);
        //         } else {
        //           // Si no tenemos un mensaje en response.data
        //           setMsgError("Hubo un error al cargar las citas.");
        //         }
        //       });
        // } else {
        //     navigate ("/")
        }
    })

    return (
      <>
      Hola
      {/* <TabBar tabs={customTabs} value={tabValue} handler={handlerTab} />
       <div className="appointmentsDesign">
      {appointments.length > 0 ? (
        <div>
         {appointments.map((results) => {
              return (
                <CardAppointments
                key={results.id}
                id={results.id}
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
      )
    : (
      <div>{msgError}</div>
    )}
      </div> */}
      </>
      
  );
};