
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';


const ResetPasswordField = () => {
    const handlinputEmailToResetPass =(e)=>{
        e.preventDefault();
 
        const email = e.target.email.value;
      
        fetch('http://localhost:5000/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Password reset email sent.') {
            alert('Check your email for a link to reset your password.');
          } else {
            alert('Error resetting password: ' + data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error resetting password: ' + error.message);
        });
      }

  return (
 
 
      <div className='alert-box'>
        {/* <img src='/images/checked.png' alt='alert message'/> */}
        {/* <h4 style={{color:"white"}}>Enter Your Registered Password</h4>
        <form onSubmit={handlinputEmailToResetPass}>
  <input type="email" id="email" name="email" placeholder="Enter your email address" required />
  <br />

</form> */}

<Form onSubmit={handlinputEmailToResetPass}>   
      

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{color:"white"}}>Enter Your Registered Email</Form.Label>
          <Form.Control
           type="email" id="email" name="email" placeholder="Enter your email address" required 
          />
        </Form.Group>
    
        <Button className='resetPassSubmitBtnCOlor' type="submit">Send Email</Button>
       
    
      </Form>
      </div>
 
  );
};

export default ResetPasswordField;
