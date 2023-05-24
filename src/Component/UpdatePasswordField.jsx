import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UpdatePasswordField = () => {
    const navigate=useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const token = window.location.pathname.split('/').pop();
      
        fetch(`http://localhost:5000/reset/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password })
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Password has been reset.') {
            alert('Your password has been reset, you can now log in with your new password.');
            navigate("/login");
          } else {
            alert('Error resetting password: ' + data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error resetting password: ' + error.message);
        });
      };
      
      

    return (
        <div  className="alert-box">
{/*       
        <form onSubmit={handleSubmit}>
            <input type="password" id="password" name="password" placeholder="Enter your new password" required />
            <button type="submit">Submit New Password</button>
        </form> */}

        <Form onSubmit={handleSubmit}>   
      

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{color:"white"}}>Enter your new password</Form.Label>
          <Form.Control
          type="password" id="password" name="password" placeholder="Enter your new password" required
          />
        </Form.Group>
    
        <Button className='resetPassSubmitBtnCOlor' type="submit">Submit New Password</Button>
       
    
      </Form>
        </div>
    );
};

export default UpdatePasswordField;