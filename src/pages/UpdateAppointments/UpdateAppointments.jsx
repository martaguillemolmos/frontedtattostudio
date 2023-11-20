// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { userData } from "../userSlice";
// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { validator } from "../../services/userful";
// import { updateAppointmentUser } from "../../services/apiCalls";
// import { CustomInput } from "../../common/CustomInput/CustomInput";

// export const UpdateAppointments = () => {
//     console.log("entra?")
//   const navigate = useNavigate();
//   const rdxToken = useSelector(userData);
//   const [appointment, setAppointment] = useState({
//     id: "",
//     date: "",
//   });
//   const [appointmentError, setAppointmentError] = useState({
//     idError: "",
//     dateError: "",
//   });

//   const functionHandler = (e) => {
//     setAppointment((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const errorCheck = (e) => {
//     let error = "";
//     error = validator(e.target.name, e.target.value);
//     setAppointmentError((prevState) => ({
//       ...prevState,
//       [e.target.name + "Error"]: error,
//     }));
//   };

//   useEffect(() => {
//     if (rdxToken !== "") {
//       const token = rdxToken.credentials.token;
//       const decoredToken = jwtDecode(token);
//       console.log(decoredToken);
//     } else {
//       navigate("/");
//     }
//   }, [rdxToken]);

//   const Update = () => {
//     if (appointment.id !== "" && appointment.status_appointment !== "")
//       updateAppointmentUser(appointment, rdxToken)
//         .then((results) => [console.log(results)])
//         .catch((error) => console.log(error));
//   };

//   return (
//     <div>
//       Identificador cita:
//       <CustomInput
//         design={"inputDesign"}
//         type={"text"}
//         name={"id"}
//         placeholder={""}
//         value={""}
//         functionProp={functionHandler}
//         functionBlur={errorCheck}
//       />
//       <div>{appointmentError.idError}</div>
//       Fecha:
//       <CustomInput
//         design={"inputDesign"}
//         type={"date"}
//         name={"date"}
//         placeholder={""}
//         value={""}
//         functionProp={functionHandler}
//         functionBlur={errorCheck}
//       />
//       <div>{appointmentError.dateError}</div>
//       <div className="buttonSubmit" onClick={Update}>
//         Modificar cita
//       </div>
//     </div>
//   );
// };
