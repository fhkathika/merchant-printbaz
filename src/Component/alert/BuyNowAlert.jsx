
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import "../../css/productStyles.css"
import { useNavigate } from 'react-router-dom';

const BuyNowAlert = ({ message, onClose }) => {
  useEffect(() => {
    // const timeoutId = setTimeout(() => {
    //   onClose();
    // }, 4000); // Hide the alert box after 3 seconds

    // return () => clearTimeout(timeoutId);
  }, [onClose]);
const navigate=useNavigate()
  const goToCart=()=>{
    navigate('/checkout')
     window.location.reload();
  }
  return (
    <>
      <div className="alert-overlay" onClick={onClose} >
     <div className="alert-box">
       <div onClick={onClose} >
       <img className='cancelImg'  src='/images/cancel.png' alt='cancel'/>
      
       </div>
     
       <div>
    <img src='/images/checked.png' alt='alert message'/>
    
    <h2>{message}</h2>
        {/* <span style={{color:"white"}}>{message2}</span> */}
        <span></span>
        <button onClick={goToCart} id="neonShadow">Go To checkout</button>
        </div>
      </div>
      </div>
    </>
  );
};

BuyNowAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BuyNowAlert;
