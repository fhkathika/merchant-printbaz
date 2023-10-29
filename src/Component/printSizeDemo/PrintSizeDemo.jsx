import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';
import BackToTop from '../backToTop/BackToTop';

const PrintSizeDemo = () => {
  const demoImages=[
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 2.5 X 5.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 10.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 5.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 5 X 5.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 2.5 X 2.5.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck B 10 X 14'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
    {img:'/T-Shirt Size Picture/Round Neck/Round Neck F 10 X 14.jpg'},
  
  ]
    return (
      <>
      <NavigationBar/>
      <div style={{padding:"0px 4px"}} >
            <h1 style={{textAlign:"center",color:"orange",margin:"15px 0px"}}>Print size demo</h1>
          <hr />
          <Container  >
  <Row className='printSizeDemo'>
  <Col xs={6} md={4}  className="mt-25"  >
      
      <div  className="printSizeDemoCol" >
      <img src='/T-Shirt Size Picture/2.5X5.png' className='img-fluid' alt='2.5X5' />
      </div>
       
<div className='printSizeTextDiv'>
<p className='printSizeText'>print size:2.5X5</p>
</div>
    </Col>
    <Col xs={6} md={4} className="mt-25"  >
      
      <div  className="printSizeDemoCol" >
      <img src='/T-Shirt Size Picture/5X5.png' className='img-fluid' alt='5X5' />
      </div>
       
<div className='printSizeTextDiv'>
<p className='printSizeText'>print size :5X5</p>
</div>
    </Col> <Col xs={6} md={4}  className="mt-25" >
      
      <div  className="printSizeDemoCol" >
      <img src='/T-Shirt Size Picture/10X5.png' className='img-fluid' alt='10X5' />
      </div>
       
<div className='printSizeTextDiv'>
<p className='printSizeText'>print size:10X5</p>
</div>
    </Col> <Col xs={6} md={4}  className="mt-25" >
      
      <div  className="printSizeDemoCol" >
      <img src='/T-Shirt Size Picture/10X10.png' className='img-fluid' alt='10X10' />
      </div>
       
<div className='printSizeTextDiv'>
<p className='printSizeText'>print size:10X10</p>
</div>
    </Col> 
    <Col xs={6} md={4} className="mt-25"  >
      
      <div  className="printSizeDemoCol" >
      <img src='/T-Shirt Size Picture/10X14.png' className='img-fluid' alt='10X14' />
      </div>
       
<div className='printSizeTextDiv'>
<p className='printSizeText'>print size:10X14</p>
</div>
    </Col>
 
  </Row>


</Container>
     
        </div>
        <Footer/>
        <BackToTop/>
      </>
       
    );
};

export default PrintSizeDemo;