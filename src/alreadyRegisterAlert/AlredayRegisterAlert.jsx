

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


const AlredayRegisterAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000); // Hide the alert box after 3 seconds

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <>
      <div className="alert-overlay" onClick={onClose} />
      <div className="alert-box">
     
        <h2>{message}</h2>
      </div>
    </>
  );
};

AlredayRegisterAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlredayRegisterAlert;
