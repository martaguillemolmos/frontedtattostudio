import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import "./Modal.css"
export const ExampleModal = ({allProducts, productId}) => {
  const [opened, { open, close }] = useDisclosure(false);
  console.log("alProducts", allProducts);
  console.log("prodcutId", productId)
  return (
    <>
      <Modal.Root opened={opened} onClose={close} title="Solicitar cita">
      <Modal.Overlay />
        <Modal.Content className='modalContent'>
          <Modal.Header className='modal_header'>
            <Modal.Title className='modal_headerTitle'>Modal title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className='modal_content'>Modal content</Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
}