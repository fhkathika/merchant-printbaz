import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import "../css/styles.css"

const CustomAlert = ({ message,message2, onClose }) => {
  useEffect(() => {
    // const timeoutId = setTimeout(() => {
    //   onClose();
    // }, 4000); // Hide the alert box after 3 seconds

    // return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <>
      <div className="alert-overlay" onClick={onClose} />
     <div className="alert-box">
       <div onClick={onClose} >
       <img className='cancelImg'  src='/images/cancel.png' alt='cancel'/>
      
       </div>
     
       <div>
    <img src='/images/checked.png' alt='alert message'/>
    
    <h2>{message}</h2>
        <span style={{color:"white"}}>{message2}</span>
        <span></span>
        </div>
      </div>
    </>
  );
};

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomAlert;
