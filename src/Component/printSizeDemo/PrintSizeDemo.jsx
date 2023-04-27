import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const PrintSizeDemo = () => {
    return (
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
    );
};

export default PrintSizeDemo;