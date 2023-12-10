
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

const OrderSubmitDoneAlert = ({ message,message2, onClose }) => {
  useEffect(() => {
    // const timeoutId = setTimeout(() => {
    //   onClose();
    // }, 4000); // Hide the alert box after 3 seconds

    // return () => clearTimeout(timeoutId);
  }, [onClose]);
  const navigate=useNavigate()
  const goToOrder=()=>{
    navigate('/myOrders')
  }
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
        <button  className='mt-3 p-2' style={{textAlign:"center",color:"white",fontSize:"14px"}}onClick={goToOrder} id="neonShadow">View Orders</button>
      </div>
    </>
  );
};

OrderSubmitDoneAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderSubmitDoneAlert;
