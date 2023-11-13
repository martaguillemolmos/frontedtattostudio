import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';


function CustomAlert ({title, message, showAlert, onClose}) {

  const icon = <IconInfoCircle />;
  return (
    <div>
      {showAlert == true && (
        <Alert variant="light" color="red" withCloseButton title={title} icon={icon} onClose={onClose}>
        {message}
      </Alert>
      )}
    </div>

  );
}
export default CustomAlert;