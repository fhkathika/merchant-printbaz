import React, { useState,useRef, useEffect } from 'react';
import NavigationBar from '../Navbar/NavigationBar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, Container, Overlay, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import BackToTop from '../backToTop/BackToTop';
const NewOrdersWithOption = () => {
  const navigate=useNavigate()
  const handleClickNeworder=()=>{
    navigate("/newOrder")
    window.location.reload();
  } 
   const handleClickCustomDropSholder=()=>{
    navigate("/customDropSholder")
    window.location.reload();
  } 
   const handleClickBlankRoundNeck=()=>{
    navigate("/blankRoundNeck")
    window.location.reload();
  }
   const handleClickBlankDropSholder=()=>{
    navigate("/blankDropSholder")
    window.location.reload();
  }  
  const handleClickCustonHoodie=()=>{
    navigate("/custonHoodie")
    window.location.reload();
  }
  const handleClickBlankHoodie=()=>{
    navigate("/blankHoodie")
    window.location.reload();
  }

  useEffect(() => {
    const backtotop = document.querySelector('.back-to-top');
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    toggleBacktotop();
    window.addEventListener('scroll', toggleBacktotop);
    return () => {
      window.removeEventListener('scroll', toggleBacktotop);
    };
  }, []);
    // Define a state variable to hold the current color
    const target = useRef(null);
    const [customforRoundNeck, setCustomforRoundNeck] = useState('customRoundNeckBlack');
    const [forRoundNeck, setForRoundNeck] = useState('blankRoundNeckwhite');
    const [customDrop, setCustomDrop] = useState('customDropSholderbottleGreen');
    const [blankDropSholder, setBlankDropSholder] = useState('blankDropSholderMaroon');
    const [customHoodie, setCustomHoodie] = useState('customHoodieNevyBlue');
    const [blankHoodie, setBlankHoodie] = useState('BlankHoodieRed');
    const [show, setShow] = useState(false);
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
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  function copyText(event, id) {
    const cardBack = event.currentTarget.closest('.card-back');
    
    if (!cardBack) return;
    
    const textToCopy = cardBack.querySelector('ul').innerText;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setActiveTooltipId(id);
          setTimeout(() => {
            setActiveTooltipId(null);
          }, 1000);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}


    return (
        <div>
            <NavigationBar/>
         
            <Row xs={2} md={4} className=" g-3 mobile-row-adjustment">
          
        <Col className='mobile-col-adjustment'>
        <Card className="baseCard">
        <div className="card_newOrder">
        <div className="card-inner">
            <div className="card-front">
               <Card.Img className="cardImg"  src={colorsBlankRoundNeck[forRoundNeck]} />
            </div>
            <div class="card-back ">
            {/* <div class="blurred-bg" ></div>  */}
    <ul>
        <li><span>Fabric Quality:</span> Knitted and Dyed, Cotton</li>
        <li><span>GSM:</span> 180</li>
        <li>Matching 1/1 Ribs</li>
        <li>Regular fit</li>
        {/* <li>No print</li> */}
        <li>No print <p style={{visibility:"hidden"}}>Custom high-quality </p></li>
       
        <li className="highlight">NO MINIMUM</li>
    </ul>
    <button onClick={(e)=>copyText(e,"copyButton1")} ref={target} id="copyButton1">
    <Overlay target={target.current} show={activeTooltipId === "copyButton1"} placement="top">
        {(props) => (
          <Tooltip id="tooltip" {...props}>
           copied!
          </Tooltip>
        )}
      </Overlay> 
    </button>
             
    
  
</div>

        </div>
    </div>
        <Card.Body>
          <Card.Title  className='cardTitle' style={{textAlign:"center"}}>Blank Round Neck</Card.Title>
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
         <Col className='mobile-col-adjustment'>
          <Card className="baseCard" >
          <div className="card_newOrder">
        <div className="card-inner">
            <div className="card-front">
            <Card.Img className="cardImg" src={colorsCustomRoundNeck[customforRoundNeck]} />
            </div>
            <div class="card-back">
            {/* <div class="blurred-bg" ></div>  */}
    <ul>
        <li><span>Fabric Quality:</span> Knitted and Dyed, Cotton</li>
        <li><span>GSM:</span> 180</li>
        <li>Matching 1/1 Ribs</li>
        <li>Regular fit</li>
        <li><p>Custom high-quality DTF print available</p></li>
        <li className="highlight">NO MINIMUM</li>

       
    </ul>
    <button onClick={(e)=>copyText(e,"copyButton1")} ref={target} id="copyButton1">
    <Overlay target={target.current} show={activeTooltipId === "copyButton1"} placement="top">
        {(props) => (
          <Tooltip id="tooltip" {...props}>
           copied!
          </Tooltip>
        )}
      </Overlay> 
    </button>
             
    
  
</div>
        </div>
    </div>
            
            <Card.Body>
              <Card.Title className='cardTitle' style={{textAlign:"center"}}>Custom Round Neck</Card.Title>
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
          <Col className='mobile-col-adjustment' >
          <Card className="baseCard">
          <div className="card_newOrder">
        <div className="card-inner">
            <div className="card-front">
            <Card.Img className="cardImg" src={colorsBlankDropSholder[blankDropSholder]}/>
            </div>
            <div class="card-back">
            {/* <div class="blurred-bg" ></div>  */}
    <ul>
        <li><span>Fabric Quality:</span>Knitted and Dyed, Cotton</li>
        <li><span>GSM:</span> 190+</li>
        <li>Matching 1/1 Ribs</li>
        <li>Regular fit</li>
        <li>No print <p style={{visibility:"hidden"}}>Custom high-quality </p></li>
        <li className="highlight">NO MINIMUM</li>
    </ul>
    <button onClick={copyText} ref={target} id="copyButton3"></button>
</div>
        </div>
    </div>
            
            <Card.Body>
              <Card.Title className='cardTitle' style={{textAlign:"center"}}>Blank Drop Sholder</Card.Title>
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
          <Col className='mobile-col-adjustment'>

          <Card className="baseCard">
          <div class="card_newOrder">
        <div class="card-inner">
            <div class="card-front">
            <Card.Img className="cardImg" src={colorsCustomDropSholder[customDrop]} />
            </div>
             <div class="card-back">
            {/* <div class="blurred-bg" ></div>  */}
    <ul>
        <li><span>Fabric Quality:</span> Knitted and Dyed, Cotton</li>
        <li><span>GSM:</span> 190+</li>
        <li>Matching 1/1 Ribs</li>
        <li>Regular fit</li>
        <li><p>Custom high-quality DTF print available</p></li>
        <li className="highlight">NO MINIMUM</li>
    </ul>
    <button onClick={copyText} ref={target} id="copyButton4"></button>
</div>
        </div>
    </div>
            
            
            <Card.Body>
              <Card.Title className='cardTitle' style={{textAlign:"center"}}>custom Drop Sholder</Card.Title>
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
         <Col className='mobile-col-adjustment'>
          <Card className="baseCard">
           
            <div class="card_newOrder">
        <div class="card-inner">
            <div class="card-front">
            <Card.Img className="cardImg" src={colorsBlankHoodie[blankHoodie]} />
            </div>
            <div class="card-back">
            {/* <div class="blurred-bg" ></div>  */}
    <ul>
        <li><span>Fabric Quality:</span>  Knitted and Dyed, Cotton Fleece</li>
        <li><span>GSM:</span> 300+</li>
        <li>Matching 1/1 Ribs</li>
        <li>Pullover Regular fit </li>
        <li>Kangaroo Pocket </li>
        <li>No print <p style={{visibility:"hidden"}}>Custom high-quality </p></li>
        {/* <li>--</li> */}
        <li className="highlight">NO MINIMUM</li>
    </ul>
    <button onClick={copyText} ref={target} id="copyButton5"></button>
</div>
        </div>
    </div>
            <Card.Body>
              <Card.Title className='cardTitle' style={{textAlign:"center",marginBottom:"10px"}}>Blank Hoodie</Card.Title>
              
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
         <Col className='mobile-col-adjustment'>
          <Card className="baseCard">
          <div class="card_newOrder">
        <div class="card-inner">
            <div class="card-front">
            <Card.Img src={colorsCustomHoodie[customHoodie]} />
            </div>
            <div class="card-back">
            {/* <div class="blurred-bg" ></div>  */}
    <ul>
        <li><span>Fabric Quality:</span>  Knitted and Dyed, Cotton Fleece</li>
        <li><span>GSM:</span> 300+</li>
        <li>Matching 1/1 Ribs</li>
        <li>Pullover Regular fit </li>
        <li>Kangaroo Pocket </li>
        <li><p>Custom high-quality DTF print available</p> </li>
        <li className="highlight">NO MINIMUM</li>
    </ul>
    <button onClick={copyText} ref={target} id="copyButton6"></button>
</div>
        </div>
    </div>
            
           
            <Card.Body>
            
              <Card.Title  className='cardTitle' style={{textAlign:"center",marginBottom:"10px"}}>Custom Hoodie</Card.Title>
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
    <Footer/>
 <BackToTop/>
        </div>
    );
};

export default NewOrdersWithOption;