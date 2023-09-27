import React, { useState } from 'react';
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
    // Define a state variable to hold the current color
    const [customforRoundNeck, setCustomforRoundNeck] = useState('customRoundNeckBlack');
    const [forRoundNeck, setForRoundNeck] = useState('blankRoundNeckwhite');
    const [customDrop, setCustomDrop] = useState('customDropSholderbottleGreen');
    const [blankDropSholder, setBlankDropSholder] = useState('blankDropSholderMaroon');
    const [customHoodie, setCustomHoodie] = useState('customHoodieNevyBlue');
    const [blankHoodie, setBlankHoodie] = useState('BlankHoodieRed');
  
    // Define your color options with their corresponding image URLs
    const colorsBlankRoundNeck = {
      blankRoundNeckblack: '/images/categoryImgs/Round Neck Black.jpg',
      blankRoundNeckwhite: '/images/categoryImgs/Round Neck White.jpg',
      blankRoundNeckmaroon: '/images/categoryImgs/Round Neck Maroon.jpg',
      blankRoundNeckbottleGreen: '/images/categoryImgs/Round Neck Bottle Green.jpg',
    }; 
    
    const colorsCustomRoundNeck = {
      customRoundNeckBlack: '/images/categoryImgs/Round Neck Black Custom.jpg',
      customRoundNeckWhite: '/images/categoryImgs/Round Neck White Custom.jpg',
      customRoundNeckbottleGreen: '/images/categoryImgs/Round Neck Bottle Green Custom.jpg',
      customRoundNeckMaroon: '/images/categoryImgs/Round Neck Maroon Custom.jpg',


    }; 
     const colorsBlankDropSholder = {
      blankDropSholderBlack: '/images/categoryImgs/Drop Shoulder Black.jpg',
      blankDropSholderWhite: '/images/categoryImgs/Drop Shoulder White.jpg',
      blankDropSholderbottleGreen: '/images/categoryImgs/Drop Shoulder Bottle Green.jpg',
      blankDropSholderMaroon: '/images/categoryImgs/Drop Shoulder Maroon.jpg',


    }; 
      const colorsCustomDropSholder = {
      customDropSholderBlack: '/images/categoryImgs/Drop Shoulder Black Custom.jpg',
      customDropSholderWhite: '/images/categoryImgs/Drop Shoulder White Custom.jpg',
      customDropSholderbottleGreen: '/images/categoryImgs/Drop Shoulder Bottle Green Custom.jpg',
      customDropSholderMaroon: '/images/categoryImgs/Drop Shoulder Maroon Custom.jpg',


    }; 
       const colorsCustomHoodie = {
      customHoodieNevyBlue: '/images/categoryImgs/Hoodies Nevy Blue Custom.jpg',
      customHoodieBlack: '/images/categoryImgs/Hoodies Black Custom.jpg',
      customHoodieGray: '/images/categoryImgs/Hoodies Gray Custom.jpg',
      customHoodieRed: '/images/categoryImgs/Hoodies Red Custom.jpg',
      customHoodieNeonGreen: '/images/categoryImgs/Hoodies Neon Green Custom.jpg',
};  
     const colorsBlankHoodie = {
      BlankHoodieBlue: '/images/categoryImgs/Hoodies Nevy Blue.jpg',
      BlankHoodieBlack: '/images/categoryImgs/Hoodies Black.jpg',
      BlankHoodieGray: '/images/categoryImgs/Hoodies Gray.jpg',
      BlankHoodieRed: '/images/categoryImgs/Hoodies Red.jpg',
      BlankHoodieNeonGreen: '/images/categoryImgs/Hoodies Neon Green.jpg',


    };
    
     // Color mapping to valid CSS color values
  const colorMappingBlankRoundNeck = {
    blankRoundNeckwhite: 'white',
    blankRoundNeckblack: 'black',
    blankRoundNeckmaroon: 'maroon',
    blankRoundNeckbottleGreen: 'green',
   
  };
  const colorMappingCustomRoundNeck = {
    customRoundNeckBlack: 'black',
    customRoundNeckWhite: 'white',
    customRoundNeckbottleGreen: 'green',
    customRoundNeckMaroon: 'maroon', // You might want to find a more accurate color representation
   
  };
    const colorMappingBlankDropSholder = {
    blankDropSholderBlack: 'black',
    blankDropSholderWhite: 'white',
    blankDropSholderbottleGreen: 'green',
    blankDropSholderMaroon: 'maroon', // You might want to find a more accurate color representation
   
  };
    const colorMappingCustomDropSholder = {
    customDropSholderBlack: 'black',
    customDropSholderWhite: 'white',
    customDropSholderbottleGreen: 'green',
    customDropSholderMaroon: 'maroon', // You might want to find a more accurate color representation
   
  }; 
   const colorMappingCustomHoodie= {
   customHoodieNevyBlue:'#000080',
    customHoodieBlack:'black',
    customHoodieGray:'gray',
    customHoodieRed:'red',
    customHoodieNeonGreen:'green'
  };
    const colorMappingBlankHoodie= {
    BlankHoodieBlue:'#000080',
    BlankHoodieBlack:'black',
    BlankHoodieGray:'gray',
    BlankHoodieRed:'red',
    BlankHoodieNeonGreen:'green'
  };

    return (
        <div>
            <NavigationBar/>
         
            <Row xs={1} md={4} className="g-4 m-3">
          
        <Col >
        <Card >
        <Card.Img variant="top" src={colorsBlankRoundNeck[forRoundNeck]} />
        <Card.Body>
          <Card.Title style={{textAlign:"center"}}>Blank Round Neck</Card.Title>
          <div style={{display: 'flex', margin: '10px 0px',justifyContent:"center"}}>
            {/* Render color boxes */}
            {Object.keys(colorsBlankRoundNeck).map(color => (
              <div 
                key={color}
                onClick={() => setForRoundNeck(color)}
                style={{
                  width: '30px',
                  height: '30px',
                  border:"2px solid #e4e1e1",
                  backgroundColor: colorMappingBlankRoundNeck[color], // use colorMapping here
                  margin: '5px',
                  cursor: 'pointer'
                }}
              ></div>
            ))}
          </div>
          <Button onClick={handleClickBlankRoundNeck} style={{backgroundColor:"#07183e",border:"none"}} className="w-100"> Order Now</Button>
        </Card.Body>
      </Card>
        </Col>   
         <Col >
          <Card >
            <Card.Img variant="top" src={colorsCustomRoundNeck[customforRoundNeck]} />
            <Card.Body>
              <Card.Title style={{textAlign:"center"}}>Custom Round Neck</Card.Title>
               <div style={{display: 'flex', margin: '10px 0px',justifyContent:"center"}}>
            {/* Render color boxes */}
            {Object.keys(colorsCustomRoundNeck).map(color => (
              <div 
                key={color}
                onClick={() => setCustomforRoundNeck(color)}
                style={{
                  width: '30px',
                  height: '30px', border:"2px solid #e4e1e1",
                  backgroundColor: colorMappingCustomRoundNeck[color], // use colorMapping here
                  margin: '5px',
                  cursor: 'pointer'
                }}
              ></div>
            ))}
          </div>
              <Button onClick={handleClickNeworder} style={{backgroundColor:"#07183e",border:"none"}} className="w-100"> Order Now</Button>
            </Card.Body>
          </Card>
        </Col>  
          <Col >
          <Card >
            <Card.Img variant="top" src={colorsBlankDropSholder[blankDropSholder]}/>
            <Card.Body>
              <Card.Title style={{textAlign:"center"}}>Blank Drop Sholder</Card.Title>
               <div style={{display: 'flex', margin: '10px 0px',justifyContent:"center"}}>
            {/* Render color boxes */}
            {Object.keys(colorsBlankDropSholder).map(color => (
              <div 
                key={color}
                onClick={() => setBlankDropSholder(color)}
                style={{
                  width: '30px',
                  height: '30px', border:"2px solid #e4e1e1",
                  backgroundColor: colorMappingBlankDropSholder[color], // use colorMapping here
                  margin: '5px',
                  cursor: 'pointer'
                }}
              ></div>
            ))}
          </div>
              <Button onClick={handleClickBlankDropSholder} style={{backgroundColor:"#07183e",border:"none"}} className=" w-100 whiteColor"> Order Now</Button>
            </Card.Body>
          </Card>
        </Col>  
          <Col >
          <Card >
            <Card.Img variant="top" src={colorsCustomDropSholder[customDrop]} />
            <Card.Body>
              <Card.Title style={{textAlign:"center"}}>custom Drop Sholder</Card.Title>
               <div style={{display: 'flex', margin: '10px 0px',justifyContent:"center"}}>
            {/* Render color boxes */}
            {Object.keys(colorsCustomDropSholder).map(color => (
              <div 
                key={color}
                onClick={() => setCustomDrop(color)}
                style={{
                  width: '30px',
                  height: '30px', border:"2px solid #e4e1e1",
                  backgroundColor: colorMappingCustomDropSholder[color], // use colorMapping here
                  margin: '5px',
                  cursor: 'pointer'
                }}
              ></div>
            ))}
          </div>
              <Button onClick={handleClickCustomDropSholder}  style={{backgroundColor:"#07183e",border:"none"}} className="w-100 whiteColor"> Order Now</Button>
            </Card.Body>
          </Card>
        </Col>   
         <Col >
          <Card >
            <Card.Img variant="top" src={colorsBlankHoodie[blankHoodie]} />
            <Card.Body>
              <Card.Title style={{textAlign:"center"}}>Blank hoodie</Card.Title>
               <div style={{display: 'flex', margin: '10px 0px',justifyContent:"center"}}>
            {/* Render color boxes */}
            {Object.keys(colorsBlankHoodie).map(color => (
              <div 
                key={color}
                onClick={() => setBlankHoodie(color)}
                style={{
                  width: '30px',
                  height: '30px', border:"2px solid #e4e1e1",
                  backgroundColor: colorMappingBlankHoodie[color], // use colorMapping here
                  margin: '5px',
                  cursor: 'pointer'
                }}
              ></div>
            ))}
          </div>
              <Button onClick={handleClickBlankHoodie} style={{backgroundColor:"#07183e",border:"none"}} className=" w-100 whiteColor"> Order Now</Button>
            </Card.Body>
          </Card>
        </Col>   
         <Col >
          <Card >
            <Card.Img variant="top" src={colorsCustomHoodie[customHoodie]} />
            <Card.Body>
              <Card.Title style={{textAlign:"center"}}>Custom Hoodie</Card.Title>
               <div style={{display: 'flex', margin: '10px 0px',justifyContent:"center"}}>
            {/* Render color boxes */}
            {Object.keys(colorsCustomHoodie).map(color => (
              <div 
                key={color}
                onClick={() => setCustomHoodie(color)}
                style={{
                  width: '30px',
                  height: '30px', border:"2px solid #e4e1e1",
                  backgroundColor: colorMappingCustomHoodie[color], // use colorMapping here
                  margin: '5px',
                  cursor: 'pointer'
                }}
              ></div>
            ))}
          </div>
              <Button onClick={handleClickCustonHoodie} style={{backgroundColor:"#07183e",border:"none"}} className="w-100"> Order Now</Button>
            </Card.Body>
           
          </Card>
        </Col>
     
    </Row>
           
          
        </div>
    );
};

export default NewOrdersWithOption;