import { useNavigate } from "react-router-dom";
import "./Appointments.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import {
  getAppointmentsByUserId,
  createAppointment,
} from "../../services/apiCalls";
import CardAppointments from "../../common/CardAppointments/CardAppointments";
import { validator } from "../../services/userful";
import { CustomInput } from "../../common/CustomInput/CustomInput";
// import { setAppointment } from "../appointmentSlice";

export const Appointments = () => {
  console.log("entra aquí")
  //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
  const navigate = useNavigate();
  //Declaramos esta constante, que nos permitirá leer el contenido.
  // const dispatch = useDispatch();
  // Instanciamos Redux en lectura
  const rdxToken = useSelector(userData);
  //Aquí recuperamos solo el token
  const token = rdxToken.credentials.token;

  const [appointments, setAppointments] = useState([]);

  //Declaramos un Hook con los elementos que vamos a solicitar:
  const [newAppointment, setNewAppointment] = useState({
    portfolio_id: 0,
    date: "",
  });
  const [newAppointmentError, setNewAppointmentError] = useState({
    portfolio: "",
    date: "",
  });
  const [msgError, setMsgError] = useState("");

  const functionHandler = (e) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setNewAppointmentError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };
  //Utilizamos este useEffect para que, en el caso que alguien ya se haya logeado, no pueda acceder a esta vista.
  useEffect(() => {
    console.log("entra aquí")
    // Comprobamos si ya hay un token almacenado en Redux
    if (token) {
      // Comprobamos que el array de appointments sea menor a 0.
      if (appointments.length === 0) {
        // Entonces, nos solicitamos a través del token las citas de dicho usuario.
        getAppointmentsByUserId(token)
          .then((results) => {
            setAppointments(results.data);
            //Guardamos la información a través del Slice.
            // dispatch(setAppointment(results.data));
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
      }
    } else {
      // Si no contamos con un token, redirigimos al usuario a login.
      navigate("/login");
    }
  }, [token, appointments, navigate]);

  const createNewAppointment = () => {
    console.log("datos", newAppointment);
    if (
      newAppointmentError != "")
     {
      const data = {
        ...newAppointment,
      };
      createAppointment(data)
        .then((resultado) => {
          console.log("entramos aquí",resultado);
          //Guardaríamos la información
          // dispatch(setAppointment,{ resultado });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
      <div className="newAppointment">
        <div>Portfolio_id</div>
        <CustomInput
          design={"inputDesign"}
          type={"number"}
          name={"portfolio_id"}
          placeholder={""}
          value={""}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div>{newAppointmentError.portfolio_id}</div>
        <div>Fecha</div>
        <CustomInput
          design={"inputDesign"}
          type={"text"}
          name={"date"}
          placeholder={""}
          value={""}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div>{newAppointmentError.date}</div>
        <div className="buttonSubmit" onClick={createNewAppointment}>
          Crea tu cita
        </div>
      </div>
    </div>
  );
};
