
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const AlertMessage=({message,showAlert,setShowAlert})=> {


  if (showAlert) {
    return (
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading style={{textAlign:"center"}}>{message}</Alert.Heading>
     
      </Alert>
    );
  }
  return 
}

export default AlertMessage;