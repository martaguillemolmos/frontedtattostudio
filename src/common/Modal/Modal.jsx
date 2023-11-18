import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import "./Modal.css"

export const ExampleModal = ({allProducts, productId}) => {

  const [opened, { open, close }] = useDisclosure(false);
  const productValue = productId;
  console.log("alProducts", allProducts);
  console.log("prodcutId", productId);

    const searchWorkers = allProducts.filter(product => product.product_id == productValue).map(value => ({ workers: value.workerAppointment.users, portfolioId: value.id }));
    console.log(searchWorkers);

 
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
    
      </Modal.Body>
          <Modal.Body className='modal_content'>Modal content</Modal.Body>

        </Modal.Content>
      </Modal.Root>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
}