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
    return (
        <div>
            <NavigationBar/>
         
            <Row xs={1} md={4} className="g-4 m-3">
        <Col >
          <Card>
            <Card.Img variant="top" src="/images/categoryImgs/Round Neck Black.jpg" />
            <Card.Body>
              <Card.Title>Black Round Neck</Card.Title>
              
              <Button style={{backgroundColor:"#07183e",border:"none"}} className="w-100">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="/images/categoryImgs/Round Neck Bottle Green Custom.jpg" />
            <Card.Body>
              <Card.Title>Custom Round Neck</Card.Title>
              
              <Button onClick={handleClickNeworder} style={{backgroundColor:"#07183e",border:"none"}} className="w-100">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="/images/categoryImgs/Drop Shoulder Black.jpg" />
            <Card.Body>
              <Card.Title>Blank Drop Sholder</Card.Title>
              
              <Button  style={{backgroundColor:"#07183e",border:"none"}} className=" w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="/images/categoryImgs/Drop Shoulder Maroon Custom.jpg" />
            <Card.Body>
              <Card.Title>custom Drop Sholder</Card.Title>
            
              <Button onClick={handleClickCustomDropSholder} style={{backgroundColor:"#07183e",border:"none"}} className="w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="/images/categoryImgs/Hoodies Nevy Blue.jpg" />
            <Card.Body>
              <Card.Title>Blank hoodie</Card.Title>
             
              <Button style={{backgroundColor:"#07183e",border:"none"}} className=" w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
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