import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export const ExampleModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal.Root opened={opened} onClose={close} title="Solicitar cita">
      <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>Modal content</Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
}