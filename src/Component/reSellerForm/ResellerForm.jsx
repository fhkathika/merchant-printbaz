import { collection, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { db } from '../../firebase.config';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CustomAlert from '../../alertBox/CustomAlert';
const ResellerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    fbPageLink: "",
    fbAccount: "",
    phone:"",
    whatsapp:"",
    address:"",
    email:"",
    businessDuration:"",
    bankName:"",
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
  let newresellerInfoArr=[]
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.bkashAccount && !formData.nagadAccount && !formData.rocketAccount &&
        !(formData.bankName && formData.accountName && formData.accountNumber && formData.routingNumber && formData.branchName)) {
        alert("Please choose at least one payment system");
        return;
    }
    
      // if (formData.bkashAccount || formData.nagadAccount || formData.rocketAccount|| (formData.bankName &&
      //   formData.accountName &&
      //   formData.accountNumber &&
      //   formData.routingNumber &&
      //   formData.branchName)) {
      //   alert("Please choose one payment system");
      //   return;
      // }
     
      const promises = [];
      const newImageUrls = [];
    
     
      Promise.all(promises)
        .then(() => {
          const newProduct = {
            name:formData.name,
            fbPageLink:formData.fbPageLink,
            fbAccount:formData.fbAccount,
            phone:formData.phone,
            whatsapp:formData.whatsapp,
            address:formData.address,
            email:formData.email,
            businessDuration:formData.businessDuration,
            bankName:formData.bankName,
            accountName:formData.accountName,
            accountNumber:formData.accountNumber,
            routingNumber:formData.routingNumber,
            branchName:formData.branchName,
            bkashAccount:formData.bkashAccount,
            nagadAccount:formData.nagadAccount,
            rocketAccount:formData.rocketAccount,
            createdAt: Timestamp.now().toDate(),
            id: Date.now(),
          };
          const articleRef = collection(db, "resellerInfo");
          const docRef = doc(articleRef, "resellerId");
    
          return getDoc(docRef).then((doc) => {
            if (doc.exists()) {
              const resellerInfoArr = doc.data().resellerInfoArr || [];
              const newresellerInfoArr = [...resellerInfoArr, newProduct];
    
              return updateDoc(docRef, {
                resellerInfoArr: newresellerInfoArr,
              });
            } else {
              return setDoc(docRef, {
                resellerInfoArr: [newProduct],
              });
            }
          });
        })
        .then(() => {
          setShowAlert(true);
          // alert("Article added successfully", { type: "success" });
          setFormData({
            name: "",
            fbPageLink: "",
            fbAccount: "",
            phone:"",
            whatsapp:"",
            address:"",
            email:"",
            businessDuration:"",
            bankName:"",
            accountName:"",
            accountNumber:"",
            routingNumber:"",
            branchName:"",
            bkashAccount:"",
            nagadAccount:"",
            rocketAccount:"",
            resellerInfoArr: newresellerInfoArr,
          });
      
        })
        .catch((err) => {
          alert("Error adding article", { type: "error" });
        });
    };
    return (
        <Container className='sbcalc  lg xs md mt-4'>
            <h3 style={{textAlign:"center"}}>Reseller Form</h3>
            <Row>
                <Col sm={6} className="m-auto">
                <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label style={{textAlign:"left"}}>Name</Form.Label>
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
          <Form.Label style={{textAlign:"left"}}>Phone Number</Form.Label>
          <Form.Control
             type="number"
             maxLength="10"
            name="phone"
            value={formData.phone}
            placeholder="facebook page link"
            onChange={(e) => handleChange(e)}
         
            required
          />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label style={{textAlign:"left"}}>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            placeholder="enter address"
            onChange={(e) => handleChange(e)}
            required
          />
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="formBasicfbaAccount">
          <Form.Label style={{textAlign:"left"}}>Facebook Profile Link</Form.Label>
          <Form.Control
            type="text"
            name="fbAccount"
            value={formData.fbAccount}
            placeholder="facebook account link"
            required
            onChange={(e) => handleChange(e)}
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

       
      
    
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{textAlign:"left"}}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            placeholder="enter address"
            required
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessDuration">
          <Form.Label style={{textAlign:"left"}}>Duration of Business</Form.Label>
          <Form.Control
            type="text"
            name="businessDuration"
            value={formData.businessDuration}
            placeholder="enter business duration"
            onChange={(e) => handleChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicfbPage">
          <Form.Label style={{textAlign:"left"}}>Facebook Page Link</Form.Label>
          <Form.Control
            type="text"
            name="fbPageLink"
            value={formData.fbPageLink}
            placeholder="facebook page link"
         
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
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
          <Form.Label style={{textAlign:"left"}}>Bank Name:</Form.Label>
          <Form.Control
         
            type="text"
            name="bankName"
            value={formData.bankName}
            placeholder="enter bank name"
            
            onChange={(e) => handleChange(e)}
          />
        </Form.Group> 
         <Form.Group className="mb-3" controlId="formBasicBankAccountName">
          <Form.Label style={{textAlign:"left"}}>Account Name :</Form.Label>
          <Form.Control
         
            type="text"
            name="accountName"
            value={formData.accountName}
            placeholder="enter account name"
            
            onChange={(e) => handleChange(e)}
          />
        </Form.Group> 
          <Form.Group className="mb-3" controlId="formBasicBankAccountNumber">
          <Form.Label style={{textAlign:"left"}}>Account Number :</Form.Label>
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
          <Form.Label style={{textAlign:"left"}}>Branch Name:</Form.Label>
          <Form.Control
         
            type="text"
            name="branchName"
            value={formData.branchName}
            placeholder="enter branch name"
            
            onChange={(e) => handleChange(e)}
          />
        </Form.Group> 
       
        <Form.Group className="mb-3" controlId="formBasicBankRoutingNumber">
          <Form.Label style={{textAlign:"left"}}>Routing Number :</Form.Label>
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
          <Form.Label style={{textAlign:"left"}}>Bkash Number</Form.Label>
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
          <Form.Label style={{textAlign:"left"}}>Rocket</Form.Label>
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
          <Form.Label style={{textAlign:"left"}}>Nagad</Form.Label>
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
    message2=""
    onClose={() => setShowAlert(false)}
  />
)}

        </Container>
    );
};

export default ResellerForm;