import React from 'react';
import { Alert as AlertDismissable } from 'react-bootstrap';

const Alert = props => {
  const { showAlert, message, variant, handleShowAlert } = props;
  return (
    <AlertDismissable show={showAlert} variant={variant} dismissible onClose={handleShowAlert}>
      {message}
    </AlertDismissable>
  );
};

export default Alert;
