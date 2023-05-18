import { collection, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { db } from '../../firebase.config';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CustomAlert from '../../alertBox/CustomAlert';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import emailjs from '@emailjs/browser';
import SendRegisterConfirmationEmail from '../confirmationMailRegister/SendRegisterConfirmationEmail';

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
  const [showAlert, setShowAlert] = useState(false);
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

  const handleChange=(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    // const handleSubmit = async(e) => {
    //   e.preventDefault();
    //   if (!formData.bkashAccount && !formData.nagadAccount && !formData.rocketAccount &&
    //     !(formData.bankName && formData.accountName && formData.accountNumber && formData.routingNumber && formData.branchName)) {
    //     alert("Please choose at least one payment system");
    //     return;
    // }
    // const storageInstance = getStorage();
    // let imageURL=''
    // if (formData.brandLogo) {
    //   const imageRef = ref(storageInstance, formData.brandLogo.name);
    //   await uploadBytes(imageRef, formData.brandLogo);
    //    imageURL = await getDownloadURL(imageRef);
  
    //   // Add the image download URL to the formData object
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     brandLogoURL: imageURL
    //   }));
    // }
  
    //   const promises = [];
    //  Promise.all(promises)
    //     .then(() => {
    //       const newProduct = {
    //         name:formData.name,
    //         fbPageLink:formData.fbPageLink,
    //         fbAccount:formData.fbAccount,
    //         phone:formData.phone,
    //         whatsapp:formData.whatsapp,
    //         address:formData.address,
    //         email:formData.email,
    //         password:formData.password,
    //         businessDuration:formData.businessDuration,
    //         brandName:formData.brandName,
    //         brandLogo:imageURL,
    //         bankName:formData.bankName,
    //         accountName:formData.accountName,
    //         accountNumber:formData.accountNumber,
    //         routingNumber:formData.routingNumber,
    //         branchName:formData.branchName,
    //         bkashAccount:formData.bkashAccount,
    //         nagadAccount:formData.nagadAccount,
    //         rocketAccount:formData.rocketAccount,
            
    //         createdAt: Timestamp.now().toDate(),
    //         id: Date.now(),
    //       };
    //       const articleRef = collection(db, "resellerInfo");
    //       const docRef = doc(articleRef, "resellerId");
    
    //       return getDoc(docRef).then((doc) => {
    //         if (doc.exists()) {
    //           const resellerInfoArr = doc.data().resellerInfoArr || [];
    //           const newresellerInfoArr = [...resellerInfoArr, newProduct];
    
    //           return updateDoc(docRef, {
    //             resellerInfoArr: newresellerInfoArr,
    //           }).then(() => {
    //             // Call SendRegisterConfirmationEmail function
    //             SendRegisterConfirmationEmail(newProduct);
    //           });;
    //         } else {
    //           return setDoc(docRef, {
    //             resellerInfoArr: [newProduct],
    //           });
    //         }
    //       });
          
    //     })
    //     .then(() => {
    //       setShowAlert(true);
      
    //       // alert("Article added successfully", { type: "success" });
    //       setFormData({
    //         name: "",
    //         fbPageLink: "",
    //         fbAccount: "",
    //         phone:"",
    //         whatsapp:"",
    //         address:"",
    //         email:"",
    //         password:"",
    //         businessDuration:"",
    //         brandName:"",
    //         brandLogo:"",
    //         bankName:"",
    //         accountName:"",
    //         accountNumber:"",
    //         routingNumber:"",
    //         branchName:"",
    //         bkashAccount:"",
    //         nagadAccount:"",
    //         rocketAccount:"",
    //         resellerInfoArr: newresellerInfoArr,
    //       });
         
    //     //  navigate("/login")
    //     })
    //     .catch((err) => {
    //       alert("Error adding article", { type: "error" });
    //     });
    // };

   //// send data  server side
    const handleSubmit = async(e) => {
      e.preventDefault();
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
      
          // navigate("/login")
        }else if (data.message === 'User registered successfully!') {
          setShowAlert(true);
          // Handle success case
          // You can show a success message or redirect to a different page
          // alert("User registered successfully!");
        } else {
          // Handle other error cases
          alert("Error registering user: " + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error registering user: " + error.message);
      });
      
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
    <Form.Control
      type="password"
      name="password"
      value={formData.password}
      placeholder=" password"
      required
      onChange={(e) => handleChange(e)}
    />
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
  <Form.Group className="mb-3" controlId="formBasicPhone">
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
  </Form.Group> 
  <Form.Group className="mb-3" controlId="formBasicWhatsapp">
    <Form.Label style={{textAlign:"left"}}>Whatsapp Number</Form.Label>
    <Form.Control
      type="number"
      maxLength="10"
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
      type="number"
      maxLength="10"
      name="bkashAccount"
      value={formData.bkashAccount}
      placeholder="enter bkash number"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
   <Form.Group className="mb-3 mt-3" controlId="formBasicBkashAccount" style={{display:displayRocketNone}}>
    <Form.Label style={{textAlign:"left"}}>Rocket <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
      type="number"
      maxLength="10"
      name="rocketAccount"
      value={formData.rocketAccount}
      placeholder="enter rocket number"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>
    <Form.Group className="mb-3 mt-3" controlId="formBasicBkashAccount" style={{display:displayNagadNone}}>
    <Form.Label style={{textAlign:"left"}}>Nagad <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control

      type="number"
       maxLength="10"
      name="nagadAccount"
      value={formData.nagadAccount}
      placeholder="enter nagad number"
      
      onChange={(e) => handleChange(e)}
    />
  </Form.Group>

<Button type="submit" style={{backgroundColor:"#124"}}>Submit</Button>
      </Form>
          </Col>
      

      </Row>
      {showAlert && (
<CustomAlert
message="Your request has been received successfully. We will verify the info and get back to you within 48 hours."
onClose={() => setShowAlert(false)}


/>
)

}

  </Container>
    );
};

export default Register;