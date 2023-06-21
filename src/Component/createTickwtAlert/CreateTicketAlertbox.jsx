

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


const CreateTicketAlertbox = ({ message, onClose,closeCreateTicketPopup }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
      closeCreateTicketPopup()
    }, 1000); // Hide the alert box after 1 seconds

    return () => clearTimeout(timeoutId);
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
