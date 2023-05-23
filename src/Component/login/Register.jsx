import { collection, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row, Spinner } from 'react-bootstrap';
import { db } from '../../firebase.config';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CustomAlert from '../../alertBox/CustomAlert';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, StorageError, uploadBytes } from 'firebase/storage';
import emailjs from '@emailjs/browser';
import SendRegisterConfirmationEmail from '../confirmationMailRegister/SendRegisterConfirmationEmail';
import AlredayRegisterAlert from '../../alreadyRegisterAlert/AlredayRegisterAlert';

const Register = ({closePopup}) => {
  const [formData, setFormData] = useState({
    name: "",
    fbPageLink: "",
    fbAccount: "",
    phone:"",
    whatsapp:"",
    address:"",
    email:"",
    password:"",
    businessDuration:"",
    brandName:"",
    bankName:"",
    brandLogo:"",
    accountName:"",
    accountNumber:"",
    routingNumber:"",
    branchName:"",
    bkashAccount:"",
    nagadAccount:"",
    rocketAccount:"",
  

  });
  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState('');

  
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [prevRegisterAlert, setPrevRegisterAlert] = useState(false);
  const [error, SetError] = useState('');
  const [display, setDisplay] = useState('block');
  const [displayNone, setDisplayNone] = useState('none');
  const [displayRocketNone, setDisplayRocketNone] = useState('none');
  const [displayNagadNone, setDisplayNagadNone] = useState('none');
  const navigate=useNavigate()
const showForm= () => {
  setDisplay('block');
  setDisplayNone('none')
  setDisplayRocketNone('none')
  setDisplayNagadNone('none')
}
const showBkash= () => {
  setDisplay('none');
  setDisplayNone('block');
  setDisplayRocketNone('none')
  setDisplayNagadNone('none')

}
const showRocket= () => {
  setDisplay('none');
  setDisplayNone('none')
  setDisplayRocketNone('block')
  setDisplayNagadNone('none')

}
const showNagad= () => {
  setDisplay('none');
  setDisplayNone('none');
  setDisplayRocketNone('none')
  setDisplayNagadNone('block')

}
// validate password

const validatePassword = (password) => {
  // reset error message before each validation
  

  // check for minimum length
  if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      return false;
  }

  // check for maximum length
  if (password.length > 100) {
      setPasswordError('Password must be less than 100 characters.');
      return false;
  }

  // check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter.');
      return false;
  }

  // check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter.');
      return false;
  }

  // check for at least one number
  if (!/[0-9]/.test(password)) {
      setPasswordError('Password must contain at least one number.');
      return false;
  }

  // check for at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError('Password must contain at least one special character: ! @ # $ % ^ & *');
      return false;
  }

  // password is valid
  setPasswordError("valid password")
  return true;
};
const handleChange=(e)=>{
  const { name, value } = e.target;

  // validate password if the changed field is 'password'
  if (name === 'password') {
    validatePassword(value);
  }

  setFormData({ ...formData, [name]: value });
}

  const handleFileChange = (e) => {
    const { name, value } = e.target;
  
    if (e.target.type === "file") {
      // let targetDivName = e.target.name
      // let output = document.getElementById(targetDivName);
      // output.src = URL.createObjectURL(e.target.files[0]);
      // output.onload = function () {
      //   URL.revokeObjectURL(output.src); // free memory
      // };
      formData[name] = e.target.files[0];
    setFormData({...formData});
    console.log(formData);
  };
}

  let newresellerInfoArr=[]
  
   //// send data  server side
    const handleSubmit = async(e) => {
      e.preventDefault();
      setIsLoading(true)
      try{
        if (!formData.bkashAccount && !formData.nagadAccount && !formData.rocketAccount &&
          !(formData.bankName && formData.accountName && formData.accountNumber && formData.routingNumber && formData.branchName)) {
          alert("Please choose at least one payment system");
          return;
        }
      
        // Generate the timestamp
        const createdAt = new Date();
      
        // Define the new product
        const newProduct = {
          name: formData.name,
          fbPageLink: formData.fbPageLink,
          fbAccount: formData.fbAccount,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          address: formData.address,
          email: formData.email,
          password: formData.password,
          businessDuration: formData.businessDuration,
          brandName: formData.brandName,
          bankName: formData.bankName,
          accountName: formData.accountName,
          accountNumber: formData.accountNumber,
          routingNumber: formData.routingNumber,
          branchName: formData.branchName,
          bkashAccount: formData.bkashAccount,
          nagadAccount: formData.nagadAccount,
          rocketAccount: formData.rocketAccount,
          createdAt: createdAt,
          id: createdAt.getTime(),
        };
      
        // Create a new FormData object
        const data = new FormData();
      
        // Append all fields to the FormData object
        Object.keys(newProduct).forEach(key => {
          data.append(key, newProduct[key]);
        });
      
        // Append the file to the FormData object
        data.append('brandLogo', formData.brandLogo);
      
        // Submit the data to the server
        fetch('http://localhost:5000/register', {
          method: 'POST',
          body: data
        })
        .then(response => response.json())
        .then(data => {
          console.log("data.message",data.message);
          if (data.message === 'User registered successfully! Approval status is currently false.') {
            // Reset form fields
          
            setFormData({
              name: "",
              fbPageLink: "",
              fbAccount: "",
              phone:"",
              whatsapp:"",
              address:"",
              email:"",
              password:"",
              businessDuration:"",
              brandName:"",
              bankName:"",
              accountName:"",
              accountNumber:"",
              routingNumber:"",
              branchName:"",
              bkashAccount:"",
              nagadAccount:"",
              rocketAccount:"",
            });
        
          navigate("/login")
          }else if (data.message === 'User registered successfully!') {
            SendRegisterConfirmationEmail(newProduct);
            setShowAlert(true);
            // const regEmail={email:formData.email}
        
         
            // Handle success case
            // You can show a success message or redirect to a different page
            // alert("User registered successfully!");
          } else {
            // Handle other error cases
            SetError(data.message);
            setPrevRegisterAlert(true)
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          SetError( error.message)
          setPrevRegisterAlert(true)
         
          
        });
      } catch (error) {
    console.error('API error:', error.message);
  }
  finally {
    setIsLoading(false); // Set loading status to false
  }
     
   
    };
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    return (
      <Container className='sbcalc  lg xs md mt-4'>
      <h3 style={{textAlign:"center"}}>Registration </h3>
      <Row>
          <Col sm className="m-auto">
          <Form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
                      <h3>Basic Information</h3>
                    </div>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label style={{textAlign:"left"}}>Email <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
      type="email"
      name="email"
      value={formData.email}
      placeholder="enter address"
      required
      onChange={(e) => handleChange(e)}
    />
  </Form.Group> 
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label style={{textAlign:"left"}}>Password <span style={{color:"red"}}>*</span></Form.Label>
  <div style={{display:"flex"}}>
    <Form.Control
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={formData.password}
      placeholder=" password"
      required
      onChange={(e) => handleChange(e)}
      isInvalid={!!passwordError}
    />

    <Button
      variant="outline-secondary"
      className="password-toggle-button"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? "show" : "hide"}
    </Button>
   
  </div>
  <Form.Control.Feedback type="invalid">
    {passwordError}
  </Form.Control.Feedback>
  <span>{passwordError}</span>
</Form.Group>

  <div className="form-group">
                      <h3>Personal Information</h3>
                    </div>
          <Form.Group className="mb-3" controlId="formBasicName">
        
    <Form.Label style={{textAlign:"left"}}>Name <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
      type="text"
      name="name"
      placeholder="Enter name"
      value={formData.name}
      onChange={(e) => handleChange(e)}
      required
    />
  </Form.Group>
  {/* <Form.Group className="mb-3" controlId="formBasicPhone">
    <Form.Label style={{textAlign:"left"}}>Phone Number <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
       type="number"
       maxLength="10"
      name="phone"
      value={formData.phone}
      placeholder="Phone number"
      onChange={(e) => handleChange(e)}
   
      required
    />
  </Form.Group>  */}

  <Form.Group className="mb-3" controlId="formBasicPhone">
  <Form.Label style={{textAlign:"left"}}>Phone Number <span style={{color:"red"}}>*</span></Form.Label>
  <Form.Control
    type="tel"
    pattern="[0-9]{11}"
    name="phone"
    value={formData.phone}
    placeholder="Phone number"
    onChange={(e) => handleChange(e)}
    required
  />
  <Form.Text className="text-muted">
    Please enter a 11-digit phone number.
  </Form.Text>
</Form.Group>
  <Form.Group className="mb-3" controlId="formBasicWhatsapp">
    <Form.Label style={{textAlign:"left"}}>Whatsapp Number</Form.Label>
    <Form.Control
   type="tel"
   pattern="[0-9]{11}"
      name="whatsapp"
      value={formData.whatsapp}
      placeholder="enter whatsapp number"
     
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
 
  <Form.Group className="mb-3" controlId="formBasicfbaAccount">
    <Form.Label style={{textAlign:"left"}}>Facebook/Instagram Profile Link <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
      type="text"
      name="fbAccount"
      value={formData.fbAccount}
      placeholder="facebook/instagram account link"
      required
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicBusinessDuration">
    <Form.Label style={{textAlign:"left"}}>Duration of Business <span style={{color:"red"}}>*</span> <span style={{color:"gray"}}>( example: 6month)</span></Form.Label>
    <Form.Control
      type="text"
      name="businessDuration"
      value={formData.businessDuration}
      placeholder="enter business duration"
      onChange={(e) => handleChange(e)}
      required
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicAddress">
    <Form.Label style={{textAlign:"left"}}>Address <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
      type="text"
      name="address"
      value={formData.address}
      placeholder="enter address"
      onChange={(e) => handleChange(e)}
      required
    />
  </Form.Group>

  <div className="form-group">
                      <h3>Branding Information</h3>
                    </div>
  <Form.Group className="mb-3" controlId="formBasicBrandName">
    <Form.Label style={{textAlign:"left"}}>Brand Name <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
      type="text"
      name="brandName"
      value={formData.brandName}
      placeholder="brandName"
      required
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>  

  <Form.Group className="mb-3" controlId="formBasicfbPage">
    <Form.Label style={{textAlign:"left"}}>Facebook/Instagram Page Link</Form.Label>
    <Form.Control
      type="text"
      name="fbPageLink"
      value={formData.fbPageLink}
      placeholder="facebook page link"
   
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Brand logo</Form.Label>
                      <Form.Control
                        type="file"
                        name="brandLogo"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e)}
                      />
                    </Form.Group>
  {/* <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Brand Logo</Form.Label>
                      <Form.Control
                        type="file"
                        name="brandLogo"
                        onChange={handleFileChange}
                        // accept="image/*"
                      />
                    </Form.Group> */}

 


  <div className="form-group">
                      <h3>Payment Information</h3>
                    </div>
 
  <DropdownButton  id="dropdown-basic-button" title="Payment Method">
<Dropdown.Item onClick={showForm}>Bank</Dropdown.Item>
<Dropdown.Item onClick={showBkash}>Bkash</Dropdown.Item>
<Dropdown.Item onClick={showRocket}>Rocket</Dropdown.Item>
<Dropdown.Item onClick={showNagad}>Nagad</Dropdown.Item>
</DropdownButton>
 
  <Row className='mt-4'  style={{display:display}}>
  <Form.Label style={{textAlign:"left"}}>Bank Account Detail</Form.Label>
    <Col sm>
    <Form.Group className="mb-3" controlId="formBasicBankName">
    <Form.Label style={{textAlign:"left"}}>Bank Name: <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
   
      type="text"
      name="bankName"
      value={formData.bankName}
      placeholder="enter bank name"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group> 
   <Form.Group className="mb-3" controlId="formBasicBankAccountName">
    <Form.Label style={{textAlign:"left"}}>Account Name :<span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
   
      type="text"
      name="accountName"
      value={formData.accountName}
      placeholder="enter account name"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group> 
    <Form.Group className="mb-3" controlId="formBasicBankAccountNumber">
    <Form.Label style={{textAlign:"left"}}>Account Number : <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
   
      type="number"
      name="accountNumber"
      value={formData.accountNumber}
      placeholder="enter account number"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
 
  
  
  </Col>
    <Col sm>
 

  <Form.Group className="mb-3" controlId="formBasicBranchName">
    <Form.Label style={{textAlign:"left"}}>Branch Name: <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
   
      type="text"
      name="branchName"
      value={formData.branchName}
      placeholder="enter branch name"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group> 
 
  <Form.Group className="mb-3" controlId="formBasicBankRoutingNumber">
    <Form.Label style={{textAlign:"left"}}>Routing Number : <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
   
      type="number"
      name="routingNumber"
      value={formData.routingNumber}
      placeholder="enter routing number"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
    </Col>
  </Row>
   
   <Form.Group className="mb-3 mt-3" controlId="formBasicBkashAccount" style={{display:displayNone}}>
    <Form.Label style={{textAlign:"left"}}>Bkash Number <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
       type="tel"
       pattern="[0-9]{11}"
      name="bkashAccount"
      value={formData.bkashAccount}
      placeholder="enter bkash number"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
   <Form.Group className="mb-3 mt-3" controlId="formBasicBkashAccount" style={{display:displayRocketNone}}>
    <Form.Label style={{textAlign:"left"}}>Rocket <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
       type="tel"
       pattern="[0-9]{11}"
    
      name="rocketAccount"
      value={formData.rocketAccount}
      placeholder="enter rocket number"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
    <Form.Group className="mb-3 mt-3" controlId="formBasicBkashAccount" style={{display:displayNagadNone}}>
    <Form.Label style={{textAlign:"left"}}>Nagad <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
  type="tel"
  pattern="[0-9]{11}"
      name="nagadAccount"
      value={formData.nagadAccount}
      placeholder="enter nagad number"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>

<Button type="submit" style={{backgroundColor:"#124"}}>Submit</Button>
      
{
  isLoading===true &&(
    <>
     <div className="alert-overlay"  />
       <div className="alert-box" >
     
         <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
         
         <h2>Please wait!</h2>
       </div>
    </>
  )
  
} 
      </Form>
          </Col>
      

      </Row>
      {showAlert && (
<CustomAlert
message="Your request has been received successfully. We will verify the info and get back to you within 48 hours."
onClose={() => {
  setShowAlert(false);

}}

/>
)

} 

{prevRegisterAlert && (
<AlredayRegisterAlert
message={error}
onClose={() => {
  setPrevRegisterAlert(false);

}}

/>
)

}
  </Container>
    );
};

export default Register;