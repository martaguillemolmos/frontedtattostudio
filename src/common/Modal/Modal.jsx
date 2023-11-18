import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import "./Modal.css"
// import { CustomInput } from '../CustomInput/CustomInput';
// import { useState } from 'react';
// import { validator } from '../../services/userful';
// import dayjs from 'dayjs';
// import { useNavigate } from 'react-router-dom';

export const ExampleModal = ({allProducts, productId}) => {
  // const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  const productValue = productId;
  console.log("alProducts", allProducts);
  console.log("prodcutId", productId);
  const searchWorkers = allProducts.filter(product => product.product_id == productValue).map(value=>  ({ workers:value.workerAppointment.users, portfolioId: value.id}))
  console.log(searchWorkers)
  // const [appoitmentData, setAppointmentData] = useState({
  //   portfolio_id: "",
  //   date: "",
  // });

  // const [appoitmentDataError, setAppointmentDataError] = useState({
  //   portfolio_id: "",
  //   date: "",
  // });

  // const [portfolioId, setPortfolioId] = useState ([])

  // const functionHandler = (e) => {
  //   setPortfolioId((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const errorCheck = (e) => {
  //   let error = "";
  //   error = validator(e.target.name, e.target.value);
  //   setAppointmentDataError((prevState) => ({
  //     ...prevState,
  //     [e.target.name + "Error"]: error,
  //   }));
  // };

   //Registrar una nueva cita.
  //  const createAppointment = () => {
  //   console.log("datos", appoitmentData);
  //   if (appoitmentDataError != ""){
  //       const data = {
  //           ...appoitmentData,
  //           date: dayjs(appoitmentData.date)
  //       }
        
  //       registerUser(data)
  //       .then((resultado => {
  //           console.log(resultado)
  //            //Guardanos la cita
  //           setTimeout(() => {
  //             navigate("/profile");
  //           }, 500);

  //       }))
  //       .catch((error) => {
  //         if (error.response.status !== 200) {
  //           console.log(error.response);
  //           alertHandler({
  //             show: true,
  //             title: `Error ${error.response.status}`,
  //             message: `${error.response.data}`,
  //           });
  //        }
  //       });
  //   }
  // };

  return (
    <>
      <Modal.Root opened={opened} onClose={close} title="Solicitar cita">
      <Modal.Overlay/>
        <Modal.Content className='modalContent'>
          <Modal.Header className='modal_header'>
            <Modal.Title className='modal_headerTitle'>Cita</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className='modal_content'>
            {/* <CustomInput
        design={"inputDesign"}
        type={"text"}
        name={"portfolio_id"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      /> */}
      </Modal.Body>
          <Modal.Body className='modal_content'>Modal content</Modal.Body>

        </Modal.Content>
      </Modal.Root>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
}