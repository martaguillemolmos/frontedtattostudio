import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import "./Modal.css"
import { useState } from 'react';
import Select from 'react-select'

export const ExampleModal = ({allProducts, productValue}) => {
  const searchWorkers = allProducts.filter(product => product.product_id == productValue).map(value => ({ label: value.workerAppointment.users.name, value: value.id.toString() }));
  const [opened, { open, close }] = useDisclosure(false);
  const [ profolioId, setPortfolioId ] = useState('');

  const handlerSetValue = (id) => {
    if(id){
      setPortfolioId(+id.value);
    }
  }

  const handlerCita = () => {
    console.log("CREAREMOS LA CITA", profolioId)
  }

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
          <Select options={searchWorkers} onChange={handlerSetValue} />
      </Modal.Body>
          <Modal.Body className='modal_content'>
            {/* //AQUI VA EL CALENDARIO */}
          <Button onClick={handlerCita}>Crear cita</Button>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
}