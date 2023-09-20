import React from 'react';
import NavigationBar from '../Navbar/NavigationBar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, Container } from 'react-bootstrap';
const NewOrdersWithOption = () => {
    return (
        <div>
            <NavigationBar/>
         
            <Row xs={1} md={4} className="g-4 m-3">
        <Col >
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Black Round Neck</Card.Title>
              
              <Button style={{backgroundColor:"#07183e",border:"none"}} className="w-100">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Custom Round Neck</Card.Title>
              
              <Button style={{backgroundColor:"#07183e",border:"none"}} className="w-100">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Blank Drop Sholder</Card.Title>
              
              <Button style={{backgroundColor:"#07183e",border:"none"}} className=" w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>custom Drop Sholder</Card.Title>
            
              <Button style={{backgroundColor:"#07183e",border:"none"}} className="w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Blank hoodie</Card.Title>
             
              <Button style={{backgroundColor:"#07183e",border:"none"}} className=" w-100 whiteColor">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>    <Col >
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
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