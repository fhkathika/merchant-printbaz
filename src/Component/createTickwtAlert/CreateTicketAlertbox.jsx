

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


const CreateTicketAlertbox = ({ message, onClose,closeCreateTicketPopup }) => {
  useEffect(() => {
    console.log("Running effect");
    const timeoutId = setTimeout(() => {
      console.log("Running setTimeout");
      onClose();
    }, 1000);
  
    return () => {
      console.log("Running cleanup");
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <>
      <div className="alert-overlay" onClick={onClose} />
      <div className="ticket-alert-box">
       
        <h2>{message}</h2>
      </div>
    </>
  );
};

CreateTicketAlertbox.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateTicketAlertbox;
