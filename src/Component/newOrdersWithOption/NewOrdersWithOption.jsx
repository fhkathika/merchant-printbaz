import React from 'react';
import NavigationBar from '../Navbar/NavigationBar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const NewOrdersWithOption = () => {
  const navigate=useNavigate()
  const handleClickNeworder=()=>{
    navigate("/newOrder")
  } 
   const handleClickCustomDropSholder=()=>{
    navigate("/customDropSholder")
  } 
   const handleClickBlankRoundNeck=()=>{
    navigate("/blankRoundNeck")
  }
   const handleClickBlankDropSholder=()=>{
    navigate("/blankDropSholder")
  }  
  const handleClickCustonHoodie=()=>{
    navigate("/custonHoodie")
  }
  const handleClickBlankHoodie=()=>{
    navigate("/blankHoodie")
  }
    return (
        <div>
            <NavigationBar/>
         
            <Row xs={1} md={4} className="g-4 m-3">
        <Col >
          <Card onClick={handleClickBlankRoundNeck}> 
            <Card.Img variant="top" src="/images/categoryImgs/Round Neck White.jpg" />
            <Card.Body>
              <Card.Title>Blank Round Neck</Card.Title>
              
              <Button   style={{backgroundColor:"#07183e",border:"none"}} className="w-100">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>   
         <Col >
          <Card onClick={handleClickNeworder}>
            <Card.Img variant="top" src="/images/categoryImgs/Round Neck Black Custom.jpg" />
            <Card.Body>
              <Card.Title>Custom Round Neck</Card.Title>
              
              <Button  style={{backgroundColor:"#07183e",border:"none"}} className="w-100">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>  
          <Col >
          <Card onClick={handleClickBlankDropSholder}>
            <Card.Img variant="top" src="/images/categoryImgs/Drop Shoulder Bottle Green.jpg" />
            <Card.Body>
              <Card.Title>Blank Drop Sholder</Card.Title>
              
              <Button  style={{backgroundColor:"#07183e",border:"none"}} className=" w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>  
          <Col >
          <Card onClick={handleClickCustomDropSholder}>
            <Card.Img variant="top" src="/images/categoryImgs/Drop Shoulder Maroon Custom.jpg" />
            <Card.Body>
              <Card.Title>custom Drop Sholder</Card.Title>
            
              <Button  style={{backgroundColor:"#07183e",border:"none"}} className="w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>   
         <Col >
          <Card onClick={handleClickBlankHoodie}>
            <Card.Img variant="top" src="/images/categoryImgs/Hoodies Red.jpg" />
            <Card.Body>
              <Card.Title>Blank hoodie</Card.Title>
             
              <Button style={{backgroundColor:"#07183e",border:"none"}} className=" w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>   
         <Col >
          <Card onClick={handleClickCustonHoodie}>
            <Card.Img variant="top" src="/images/categoryImgs/Hoodies Nevy Blue Custom.jpg" />
            <Card.Body>
              <Card.Title>Custom Hoodie</Card.Title>
              <Button style={{backgroundColor:"#07183e",border:"none"}} className="w-100">Buy Now</Button>
            </Card.Body>
           
          </Card>
        </Col>
     
    </Row>
           
          
        </div>
    );
};

export default NewOrdersWithOption;