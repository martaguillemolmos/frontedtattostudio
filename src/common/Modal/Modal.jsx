import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import "./Modal.css";
import { useState } from "react";
import Select from "react-select";
import { validator } from "../../services/userful";
import { CustomInput } from "../CustomInput/CustomInput";
import CustomAlert from "../Alert/CustomAlert";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import dayjs from "dayjs";
import { createAppointment } from "../../services/apiCalls";
// import { Calendar } from '@mantine/core';

// Función para deshabilitar fines de semana
// const disableWeekends = (date) => {
//   const day = date.getDay();
//   return day === 0 || day === 6; // Domingo es 0, sábado es 6
// };

// Uso del componente Calendar con la función de deshabilitar fines de semana


export const ExampleModal = ({ allProducts, productValue }) => {
  const searchWorkers = allProducts
    .filter((product) => product.product_id == productValue)
    .map((value) => ({
      label: value.workerAppointment.users.name,
      value: value.id.toString(),
    }));
  const [opened, { open, close }] = useDisclosure(false);
  const [profolioId, setPortfolioId] = useState("");

  const rdxToken = useSelector(userData);

  const [date, setDate] = useState({
    date: "",
  });

  console.log(date, "este es date");

  const [dateError, setDateError] = useState({
    date: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
  });
  const alertHandler = (e) => {
    setAlert(e);
  };
  const functionHandler = (e) => {
    setDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setDateError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const handlerSetValue = (id) => {
    if (id) {
      setPortfolioId(+id.value);
    }
  };

  const handlerCita = () => {
    if (!date.date || dateError.data) {
      setAlert({
        show: true,
        title: "Error de fecha",
        message: "Por favor, ingrese una fecha válida.",
      });
      return;
    }

    const formatDate = dayjs(date.date).toISOString();

    console.log("CREAREMOS LA CITA", profolioId, formatDate);

    const bodyAppointment = {
      portfolio_id: profolioId,
      date: formatDate,
    };

    console.log("aquí deebría estar infor", bodyAppointment);

    if (Object.keys(bodyAppointment).length > 0) {
      console.log("así se comprueba si esta vacio o no, aquí no");
      const token = rdxToken.credentials.token;
      console.log("yo soy tu token", token);

      createAppointment(token, bodyAppointment)
        .then((resp) => {
          console.log(resp);
        })
        .catch((er) => console.log(er));
    }
  };
  // Función para deshabilitar fines de semana


  return (
    <>
      <Modal.Root opened={opened} onClose={close} title="Solicitar cita">
        <Modal.Overlay />
        <Modal.Content className="modalContent">
          <Modal.Header className="modal_header">
            <Modal.Title className="modal_headerTitle">Cita</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className="modal_content">
            <Select options={searchWorkers} onChange={handlerSetValue} />
          </Modal.Body>
          <Modal.Body className="modal_content">
            <CustomAlert
              title={alert.title}
              showAlert={alert.show}
              message={alert.message}
              onClose={() =>
                alertHandler({
                  show: false,
                  title: "",
                  message: "",
                })
              }
            />
            <div>Fecha</div>

            {/* <Calendar
  disableWeekends={true}
/> */}
             <CustomInput
              design={"inputDesign"}
              type={"datetime-local"}
              name={"date"}
              placeholder={""}
              value={""}
              functionProp={functionHandler}
              functionBlur={errorCheck}
            /> 
            <div>{dateError.date}</div>
            <Button disabled={!date && !profolioId} onClick={handlerCita}>
              Crear cita
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
};
