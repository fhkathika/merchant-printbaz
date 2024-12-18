import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import UpdateValue from '../../Buttons/UpdateValue';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import teeShirtFormula from '../../Formulas/teeShirtFormula';
import { useGetData } from "../../hooks/useGetData";
import  "../../css/styles.css"
import Login from '../login/Login';
import Register from '../login/Register';
import { Link } from 'react-router-dom';
import useGetTshirtPrice from '../../hooks/useGetTshirtPrice';
import teeshirtCalcultorPrice from '../../Formulas/teeshirtCalcultorPrice';
import NavigationBar from '../Navbar/NavigationBar';
import Footer from '../footer/Footer';
import BackToTop from '../backToTop/BackToTop';
const TeeShirtCapingCalcForm = () => {
    let id = "teeShirtCampingId";
    let collections = "productValues";
    const {tshirtPrice}=useGetTshirtPrice()
    const [dbData, setDbData] = useState({});
    let globalValueId="allGlobalValuesId";
    const [price, setPrice] = useState();
    console.log("price",price)
    const { fetchedData } = useGetData(id, collections, dbData);
const {user}=useContext(AuthContext)
    const [quantity,setQuantity]=useState(1)
  
    const [printSize, setPrintSize] = useState("10 x 14");
    const [printSizeBack, setPrintSizeBack] = useState("10 x 14");
  
    function closePopup() {
        document.getElementById("popup1").style.display = "none";
      }
      const [display, setDisplay] = useState('flex');
      const [displayNone, setDisplayNone] = useState('none');
      const showRegister = () => {
        setDisplay('none');
        setDisplayNone('block')
      }
       const showLogin = () => {
        setDisplay('block');
        setDisplayNone('none')
      }
    

const customRoundNeckFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Round Neck")
const customDropSholderFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Drop Sholder")
const customHoodieFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Hoodie")
const blankRoundNeckFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Round Neck")
console.log("blankRoundNeckFilter..........",blankRoundNeckFilter)
const blankDropSholderFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Drop Sholder")
const blankHoodieFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Hoodie")
const customDropSholderinputFilter=customDropSholderFilter?.find(thsirt => thsirt.printSizeFront === printSize)
const customHoodieBackinputFilter=customHoodieFilter?.find(thsirt => thsirt.printSizeBack === printSizeBack)


const [selectProductType, setSelectProductType] = useState('Round Neck');
const [printSide, setPrintSide] = useState('frontSide');

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'productType-filter':
        setSelectProductType(value);
        break; 
      default:
        break;
    }
    
  };
   
 
    return (
<div>

<NavigationBar/>
      
              <Container className="sbcalc  lg xs md  mt-4">
  
              
          
           <div className="panel-title seals_report_title mb-4">
                    <h2>{selectProductType} Calculator <span style={{float: 'right'}}>    <select 
        id="productType-filter" 
        value={selectProductType} 
        className="form-control mr-5" 
        onChange={(e) => handleInputChange(e)} 
        style={{ maxWidth: '150px' }}  // Adjust the width value accordingly
    >
        <option value='Round Neck'>Round Neck</option>
        <option value="Drop Sholder">Drop Sholder</option>
        <option value="Hoodie">Hoodie</option>
        <option value="Blank Round Neck">Blank Round Neck</option>
        <option value="Blank Drop Sholder">Blank Drop Sholder</option>
        <option value="Blank Hoodie">Blank Hoodie</option>
    </select></span></h2>
               
                  </div>
        <Table>
     <thead>
       <tr >
 
        {
          selectProductType==="Blank Round Neck" ||
          selectProductType==="Blank Drop Sholder" ||
          selectProductType==="Blank Hoodie" ?
          <th > Price</th>
          :
          <>
           <th >Print Size (in inches)</th>
          <th >With front side print cost</th>
          {/* <th >Back side Price</th> */}
          </>
         
        }
          
      
       </tr>
     </thead>
     {
         selectProductType==="Round Neck" &&
         <tbody>
         {
             customRoundNeckFilter   
             ?.sort((a, b) => Number(a.frontSideprice) - Number(b.frontSideprice))?.map(roundNeck=>
                <tr>
                <td>{roundNeck?.printSizeFront}</td>
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
               
             
            </tr>
                )
         }
      
       
   
     </tbody>
     }   {
         selectProductType==="Drop Sholder" &&
         <tbody>
         {
             customDropSholderFilter   // Convert prices to numbers and sort
             ?.sort((a, b) => Number(a.frontSideprice) - Number(b.frontSideprice))?.map(roundNeck=>
                <tr>
                <td>{roundNeck?.printSizeFront}</td>
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
            </tr>
                )
         }
     
     </tbody>
     }   {
         selectProductType==="Hoodie" &&
         <tbody>
         {
             customHoodieFilter   // Convert prices to numbers and sort
             ?.sort((a, b) => Number(a.frontSideprice) - Number(b.frontSideprice))?.map(roundNeck=>
                <tr>
                <td>{roundNeck?.printSizeFront}</td>
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
               
             
            </tr>
                )
         }
      
       
   
     </tbody>
     }  {
         selectProductType==="Blank Round Neck" &&
         <tbody>
         {
             blankRoundNeckFilter.map(roundNeck=>
                <tr>
                {/* <td>{roundNeck?.printSizeFront}</td> */}
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
               
             
            </tr>
                )
         }
      
       
   
     </tbody>
     }  {
         selectProductType==="Blank Drop Sholder" &&
         <tbody>
         {
             blankDropSholderFilter.map(roundNeck=>
                <tr>
                {/* <td>{roundNeck?.printSizeFront}</td> */}
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
               
             
            </tr>
                )
         }
      
       
   
     </tbody>
     }  {
         selectProductType==="Blank Hoodie" &&
         <tbody>
         {
             blankHoodieFilter.map(roundNeck=>
                <tr>
                {/* <td>{roundNeck?.printSizeFront}</td> */}
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
               
             
            </tr>
                )
         }
       </tbody>
     }
   
   </Table>
          <hr className="mb-25"/>
        
      {
        (selectProductType==="Round Neck" ||
        selectProductType==="Drop Sholder"||
        selectProductType==="Hoodie") &&
        <Row className='printSizeDemo'>
        <Col xs={12} md={8}  className="mt-25" >
                <Form
                                  className="sm lg xs md "
                                  onSubmit={(e) => {
                                      e.preventDefault();
      
                                      setPrice((_) =>
                                          teeshirtCalcultorPrice(
                                              quantity,
                                              printSize,
                                              printSizeBack,
                                              customRoundNeckFilter,
                                              customDropSholderFilter,
                                              customHoodieFilter,
                                              blankRoundNeckFilter,
                                              blankDropSholderFilter,
                                              blankHoodieFilter,
                                              selectProductType,
                                              printSide
                                           
                                          )
                                      );
      
                                  }}
                              >
                                  <Form.Group className="mb-3 Quantity w-100 " controlId="wccalcQuantity">
                                      <Form.Label >Quantity</Form.Label>
                                   
                                      <Form.Control
                                          name="quantity"
                                          type="number"
                                          onChange={(data) => setQuantity((_) => data.target.value)}
                                          value={quantity}
                                          placeholder="Enter Quantity"
                                          min="1"
                                          
                                      />
      
                                  
                                  </Form.Group>
                                  <Form.Group
                            className="mb-3 Print Side w-100 "
                            controlId="wccalcPrintSide"
                          >
                            <Form.Label className="pr-2">Print side</Form.Label>
                            <Form.Control
                              as="select"
                              value={printSide}
                              onChange={(e) => 
                                  setPrintSide(e.target.value)
                              }
                              name="printSide"
                            
                            >
                             <option value="">select print side</option> 
                              <option value="frontSide">Front Side</option>
                              <option value="backSide">Back Side</option>
                              <option value="bothSide">Both Side</option>
                            </Form.Control>
                          </Form.Group>
                          {
                           ( printSide==="frontSide" ) &&
                            <Form.Group
                            className="mb-3 Print Side w-100 "
                            controlId="wccalcPrintSide">
                            <Form.Label className="pr-2">Print Size</Form.Label>
                            <Form.Control
                              as="select"
                              value={printSize}
                              onChange={(e) => {
                                 setPrintSize(()=>e.target.value);
                              }}
                              name="printSize"
                             >
                             {/* <option value="">select print size</option> 
                              <option value="10 x 14">10″ x 14″</option>
                              <option value="10 x 10">10″ x 10″</option>
                              <option value="10 x 5">10″ x 5″</option>
                              <option value="5 X 5">5″ x 5″</option>
                              <option value="2.5 X 5">2.5″ x 5″</option>
                              <option value="2.5 X 2.5">2.5″ x 2.5″</option> */}
                               {
                                selectProductType==="Hoodie" ||selectProductType==="Drop Sholder" ?
                                <>
                                  <option value="">select print size</option> 
                                <option value="11.7 x 16.5 (A3)"> 11.7″ x 16.5″ (A3)</option>
                                <option value="10 x 14">10″ x 14″</option>
                                <option value="10 x 10 (A4)">10″ x 10″ (A4)</option>
                                <option value="10 x 5">10″ x 5″</option>
                                <option value="5 x 5">5″ x 5″</option>
                                <option value="2.5 x 5">2.5″ x 5″</option>
                                <option value="2.5 x 2.5">2.5″ x 2.5″</option>
                                </>
                              
                                :
                                <>
                                   <option value="">select print size</option> 
                                <option value="10 x 14">10″ x 14″</option>
                                <option value="10 x 10">10″ x 10″</option>
                                <option value="10 x 5">10″ x 5″</option>
                                <option value="5 x 5">5″ x 5″</option>
                                <option value="2.5 x 5">2.5″ x 5″</option>
                                <option value="2.5 x 2.5">2.5″ x 2.5″</option>
                                </>
                             
                            }
                            </Form.Control>
                          </Form.Group>
      }
                          {
                           printSide==="bothSide" && 
                            <>
      
      <Form.Group
                            className="mb-3 Print Side w-100 "
                            controlId="wccalcPrintSide"
                          >
                            <Form.Label className="pr-2">Print Size front</Form.Label>
                            <Form.Control
                              as="select"
                              value={printSize}
                              onChange={(e) => {
                                 setPrintSize((_)=>e.target.value);
                              }}
                              name="printSize"
                            > 
                            {
                                selectProductType==="Hoodie" ||selectProductType==="Drop Sholder" ?
                                <>
                                  <option value="">select print size</option> 
                                <option value="11.7 x 16.5 (A3)"> 11.7″ x 16.5″ (A3)</option>
                                <option value="10 x 14">10″ x 14″</option>
                                <option value="10 x 10 (A4)">10″ x 10″ (A4)</option>
                                <option value="10 x 5">10″ x 5″</option>
                                <option value="5 x 5">5″ x 5″</option>
                                <option value="2.5 x 5">2.5″ x 5″</option>
                                <option value="2.5 x 2.5">2.5″ x 2.5″</option>
                                </>
                              
                                :
                                <>
                                   <option value="">select print size</option> 
                                <option value="10 x 14">10″ x 14″</option>
                                <option value="10 x 10">10″ x 10″</option>
                                <option value="10 x 5">10″ x 5″</option>
                                <option value="5 x 5">5″ x 5″</option>
                                <option value="2.5 x 5">2.5″ x 5″</option>
                                <option value="2.5 x 2.5">2.5″ x 2.5″</option>
                                </>
                             
                            }
                             {/* <option value="">select print size</option> 
                              <option value="10 x 14">10″ x 14″</option>
                              <option value="10 x 10">10″ x 10″</option>
                              <option value="10 x 5">10″ x 5″</option>
                              <option value="5 X 5">5″ x 5″</option>
                              <option value="2.5 X 5">2.5″ x 5″</option>
                              <option value="2.5 X 2.5">2.5″ x 2.5″</option> */}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group
                          className="mb-3 Print Side w-100 "
                          controlId="wccalcPrintSide"
                        >
                          <Form.Label className="pr-2">Print Size back</Form.Label>
                          <Form.Control
                            as="select"
                            name="printSizeBack"
                            value={printSizeBack}
                            onChange={(e) => {
                               setPrintSizeBack((_)=>e.target.value);
                            }}
                           
                          >
                           {/* <option value="">select print size</option> 
                            <option value="10 x 14">10″ x 14″</option>
                            <option value="10 x 10">10″ x 10″</option>
                            <option value="10 x 5">10″ x 5″</option>
                            <option value="5 X 5">5″ x 5″</option>
                            <option value="2.5 X 5">2.5″ x 5″</option>
                            <option value="2.5 X 2.5">2.5″ x 2.5″</option> */}
                             {
                                selectProductType==="Hoodie" ||selectProductType==="Drop Sholder" ?
                                <>
                                  <option value="">select print size</option> 
                                <option value="11.7 x 16.5 (A3)"> 11.7″ x 16.5″ (A3)</option>
                                <option value="10 x 14">10″ x 14″</option>
                                <option value="10 x 10 (A4)">10″ x 10″ (A4)</option>
                                <option value="10 x 5">10″ x 5″</option>
                                <option value="5 x 5">5″ x 5″</option>
                                <option value="2.5 x 5">2.5″ x 5″</option>
                                <option value="2.5 x 2.5">2.5″ x 2.5″</option>
                                </>
                              
                                :
                                <>
                                   <option value="">select print size</option> 
                                <option value="10 x 14">10″ x 14″</option>
                                <option value="10 x 10">10″ x 10″</option>
                                <option value="10 x 5">10″ x 5″</option>
                                <option value="5 x 5">5″ x 5″</option>
                                <option value="2.5 x 5">2.5″ x 5″</option>
                                <option value="2.5 x 2.5">2.5″ x 2.5″</option>
                                </>
                             
                            }
                          </Form.Control>
                        </Form.Group>
                            </>
                           
                          }
      
      {
                           ( printSide==="backSide" ) &&
                            <Form.Group
                            className="mb-3 Print Side w-75 m-auto"
                            controlId="wccalcPrintSide">
                            <Form.Label className="pr-2">Print Size</Form.Label>
                            <Form.Control
                              as="select"
                              value={printSize}
                              onChange={(e) => {
                                 setPrintSize(()=>e.target.value);
                              }}
                              name="printSize"
                             >
                             {/* <option value="">select print size</option> 
                              <option value="10 x 14">10″ x 14″</option>
                              <option value="10 x 10">10″ x 10″</option>
                              <option value="10 x 5">10″ x 5″</option>
                              <option value="5 X 5">5″ x 5″</option>
                              <option value="2.5 X 5">2.5″ x 5″</option>
                              <option value="2.5 X 2.5">2.5″ x 2.5″</option> */}
                               {
                                selectProductType==="Hoodie" ||selectProductType==="Drop Sholder" ?
                                <>
                                  <option value="">select print size</option> 
                                <option value="11.7 x 16.5 (A3)"> 11.7″ x 16.5″ (A3)</option>
                                <option value="10 x 14">10″ x 14″</option>
                                <option value="10 x 10 (A4)">10″ x 10″ (A4)</option>
                                <option value="10 x 5">10″ x 5″</option>
                                <option value="5 x 5">5″ x 5″</option>
                                <option value="2.5 x 5">2.5″ x 5″</option>
                                <option value="2.5 x 2.5">2.5″ x 2.5″</option>
                                </>
                              
                                :
                                <>
                                   <option value="">select print size</option> 
                                   <option value="11.7 x 16.5 (A3)"> 11.7″ x 16.5″ (A3)</option>
                                <option value="10 x 14">10″ x 14″</option>
                                <option value="10 x 10">10″ x 10″</option>
                                <option value="10 x 5">10″ x 5″</option>
                                <option value="5 x 5">5″ x 5″</option>
                                <option value="2.5 x 5">2.5″ x 5″</option>
                                <option value="2.5 x 2.5">2.5″ x 2.5″</option>
                                </>
                             
                            }
                            </Form.Control>
                          </Form.Group>
      }
                                
                               <div style={{textAlign:"center",marginTop:"30px"}}>
                               <Button style={{backgroundColor:"#124"}}  type="submit">
                                      CheckPrice
                                  </Button>
                               </div>
                               
                                  {setPrice && (
                                      <p className="pt-4 " style={{textAlign:"center"}}>
                                          Your Grand Total is :   <span style={{fontSize:"22px",fontWeight:"600",color:"orange"}}>{price?.totalPrice} </span> BDT <br />
                                          Unit price is :  <span style={{fontSize:"22px",fontWeight:"600",color:"orange"}}>{price?.unitPrice}</span> BDT
                                      </p>
                                  )}
                              </Form>
                </Col>
                {
                  printSize==="10 x 14" &&   selectProductType==="Round Neck" && printSide==="frontSide" &&
                
                  <Col  xs={12} md={4} className="mt-25"  >
                    
                    <div  className="printSizeDemoCol" >
                    <img src="https://i.ibb.co/g7n7TZQ/Round-Neck-F-10-X-14.jpg" className='img-fluid' alt='10X14' />
                    </div>
                     
              <div className='printSizeTextDiv'>
              <p className='printSizeText'>print size:10X14</p>
              </div>
                  </Col>
                }
                {
                  printSize==="2.5 x 5" &&selectProductType==="Round Neck" && printSide==="frontSide" &&
                  <Col xs={12} md={4}  className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/xL3q0nJ/Round-Neck-F-2-5-X-5.jpg" className='img-fluid' alt='2.5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size:2.5X5</p>
            </div>
                </Col>
                } {
                  printSize==="10 x 10" && selectProductType==="Round Neck" && printSide==="frontSide" &&
                  <Col xs={12} md={4}  className="mt-25" >
            
            <div  className="printSizeDemoCol" >
            <img  src="https://i.ibb.co/BNLYGK4/Round-Neck-F-10-X-10.jpg" className='img-fluid' alt='10X10' />
            </div>
             
      <div className='printSizeTextDiv'>
      <p className='printSizeText'>print size:10X10</p>
      </div>
          </Col> 
                } {
                  printSize==="10 x 5" && selectProductType==="Round Neck" && printSide==="frontSide" &&
                  <Col xs={12} md={4}  className="mt-25" >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/8mXpGDT/Round-Neck-F-10-X-5.jpg" className='img-fluid' alt='10X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size:10X5</p>
            </div>
                </Col> 
                }
                 {
                  printSize==="5 x 5" && selectProductType==="Round Neck" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/7NjsN7V/Round-Neck-F-5-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size :5X5</p>
            </div>
                </Col> 
                } {
                  printSize==="2.5 x 2.5" && selectProductType==="Round Neck" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/cxLWxLV/Round-Neck-F-2-5-X-2-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5X2.5</p>
            </div>
                </Col> 
                }  
                {/* round neck back side  */}
                {
                  printSize==="10 x 14" &&   selectProductType==="Round Neck" && printSide==="backSide" &&
                
                  <Col  xs={12} md={4} className="mt-25"  >
                    
                    <div  className="printSizeDemoCol" >
                    <img src="https://i.ibb.co/jzCSLm4/Round-Neck-B-10-X-14.jpg" className='img-fluid' alt='10X14' />
                    </div>
                     
              <div className='printSizeTextDiv'>
              <p className='printSizeText'>print size:10X14</p>
              </div>
                  </Col>
                }
                {
                  printSize==="2.5 x 5" &&selectProductType==="Round Neck" && printSide==="backSide" &&
                  <Col xs={12} md={4}  className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/VVNydtF/Round-Neck-B-2-5-X-5.jpg" className='img-fluid' alt='2.5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size:2.5X5</p>
            </div>
                </Col>
                } {
                  printSize==="10 x 10" && selectProductType==="Round Neck" && printSide==="backSide" &&
                  <Col xs={12} md={4}  className="mt-25" >
            
            <div  className="printSizeDemoCol" >
            <img src="https://i.ibb.co/ZXs96Xt/Round-Neck-B-10-X-10.jpg" className='img-fluid' alt='10X10' />
            </div>
             
      <div className='printSizeTextDiv'>
      <p className='printSizeText'>print size:10X10</p>
      </div>
          </Col> 
                } {
                  printSize==="10 x 5" && selectProductType==="Round Neck" && printSide==="backSide" &&
                  <Col xs={12} md={4}  className="mt-25" >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/BZQX21W/Round-Neck-B-10-X-5.jpg" className='img-fluid' alt='10X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size:10X5</p>
            </div>
                </Col> 
                }
                 {
                  printSize==="5 x 5" && selectProductType==="Round Neck" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/K7LGn3J/Round-Neck-B-5-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size :5X5</p>
            </div>
                </Col> 
                } {
                  printSize==="2.5 x 2.5" && selectProductType==="Round Neck" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/wBp0XWK/Round-Neck-B-2-5-X-2-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 X 2.5</p>
            </div>
                </Col> 
                } 
      
                {/* hoodie front side  */}
                
                  {
                  printSize==="10 x 14" &&   selectProductType==="Hoodie" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/BLphCC2/Hoodies-F-10-X-14.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 X 14</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="10 x 10 (A4)" &&   selectProductType==="Hoodie" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/RgGRccm/Hoodies-F-10-X-10.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 X 10</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="10 x 5" &&   selectProductType==="Hoodie" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/drgVQsf/Hoodies-F-10-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 x 5</p>
            </div>
                </Col> 
                } 
                 {/* {
                  printSize==="11.7 x 16.5 (A3)" &&   selectProductType==="Hoodie" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src='/T-Shirt Size Picture/Hoodies/Hoodies F 10 X 14.jpg' className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 11.7 x 16.5 (A3)</p>
            </div>
                </Col> 
                }  */}
                 {
                  printSize==="5 x 5" &&   selectProductType==="Hoodie" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/Mpyy9Xn/Hoodies-F-5-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 5 x 5</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="2.5 x 5" &&   selectProductType==="Hoodie" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/x1M5Drs/Hoodies-F-2-5-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 x 5</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="2.5 x 2.5" &&   selectProductType==="Hoodie" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/3CVLxk9/Hoodies-F-2-5-X-2-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 x 2.5</p>
            </div>
                </Col> 
                } 
               
        {/* hoodie back side  */}
                
        {
                  printSize==="10 x 14" &&   selectProductType==="Hoodie" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/NZKG5Xx/Hoodies-B-10-X-14.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 X 14</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="10 x 10 (A4)" &&   selectProductType==="Hoodie" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/jDdd1pW/Hoodies-B-10-X-10.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 X 10</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="10 x 5" &&   selectProductType==="Hoodie" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/Zm6T4nS/Hoodies-B-10-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 x 5</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="11.7 x 16.5 (A3)" &&   selectProductType==="Hoodie" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/pdm0D4C/Hoodies-B-11-7-X-16-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 11.7 x 16.5 (A3)</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="5 x 5" &&   selectProductType==="Hoodie" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/xDYJhvW/Hoodies-B-5-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 5 x 5</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="2.5 x 5" &&   selectProductType==="Hoodie" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/TwQpwYv/Hoodies-B-2-5-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 x 5</p>
            </div>
                </Col> 
                } 
                 {
                  printSize==="2.5 x 2.5" &&   selectProductType==="Hoodie" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/3mGkgXj/Hoodies-B-2-5-X-2-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 x 2.5</p>
            </div>
                </Col> 
                }
                
                {/* Drop sholder front side  */}
                
                {
                  printSize==="11.7 x 16.5 (A3)" &&   selectProductType==="Drop Sholder" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/F4fqhVH/Drop-Sholder-F-11-7-X-16-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 11.7 x 16.5 (A3)</p>
            </div>
                </Col> 
                }     {
                  printSize==="10 x 14" &&   selectProductType==="Drop Sholder" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/xjLc8qt/Drop-Sholder-F-10-X-14.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 x 14</p>
            </div>
                </Col> 
                }   
                       {
                  printSize==="10 x 10 (A4)" &&   selectProductType==="Drop Sholder" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src='https://i.ibb.co/61KcTNN/Drop-Sholder-F-10-X-10.jpg' className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 x 10 (A4)</p>
            </div>
                </Col> 
                } {
                  printSize==="10 x 5" &&   selectProductType==="Drop Sholder" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/HxyYMGW/Drop-Sholder-F-10-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 x 5</p>
            </div>
                </Col> 
                }     {
                  printSize==="5 x 5" &&   selectProductType==="Drop Sholder" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/KKphwBk/Drop-Sholder-F-5-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 5 x 5</p>
            </div>
                </Col> 
                }     {
                  printSize==="2.5 x 5" &&   selectProductType==="Drop Sholder" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/F4nr3hS/Drop-Sholder-F-2-5-X-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 x 5</p>
            </div>
                </Col> 
                }  
                 {
                  printSize==="2.5 x 2.5" &&   selectProductType==="Drop Sholder" && printSide==="frontSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/DKDmzsW/Drop-Sholder-F-2-5-X-2-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 x 2.5</p>
            </div>
                </Col> 
                } 
      
                {/* Drop sholder back side  */}
                
                {
                  printSize==="11.7 x 16.5 (A3)" &&   selectProductType==="Drop Sholder" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/w6zt19W/Drop-Sholder-B-11-7-X-16-5.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 11.7 x 16.5 (A3)</p>
            </div>
                </Col> 
                }     {
                  printSize==="10 x 14" &&   selectProductType==="Drop Sholder" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src="https://i.ibb.co/ZLSxWvz/Drop-Sholder-B-10-X-14.jpg" className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 x 14</p>
            </div>
                </Col> 
                }     {
                  printSize==="11.7 x 16.5 (A3)" &&   selectProductType==="Drop Sholder" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src='https://i.ibb.co/w6zt19W/Drop-Sholder-B-11-7-X-16-5.jpg' className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 11.7 x 16.5 (A3)</p>
            </div>
                </Col> 
                }     {
                  printSize==="10 x 10 (A4)" &&   selectProductType==="Drop Sholder" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src='https://i.ibb.co/qNHM8yp/Drop-Sholder-B-10-X-10.jpg' className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 x 10 (A4)</p>
            </div>
                </Col> 
                } {
                  printSize==="10 x 5" &&   selectProductType==="Drop Sholder" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src='https://i.ibb.co/9NQ3KfP/Drop-Sholder-B-10-X-5.jpg' className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 10 x 5</p>
            </div>
                </Col> 
                }     {
                  printSize==="5 x 5" &&   selectProductType==="Drop Sholder" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src='https://i.ibb.co/cD4bJvh/Drop-Sholder-B-5-X-5.jpg' className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 5 x 5</p>
            </div>
                </Col> 
                }     {
                  printSize==="2.5 x 5" &&   selectProductType==="Drop Sholder" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src='https://i.ibb.co/9sYThfJ/Drop-Sholder-B-2-5-X-5.jpg' className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 x 5</p>
            </div>
                </Col> 
                }  
                 {
                  printSize==="2.5 x 2.5" &&   selectProductType==="Drop Sholder" && printSide==="backSide" &&
                  <Col xs={12} md={4} className="mt-25"  >
            
                  <div  className="printSizeDemoCol" >
                  <img src='https://i.ibb.co/wsFdX75/Drop-Sholder-B-2-5-X-2-5.jpg' className='img-fluid' alt='5X5' />
                  </div>
                   
            <div className='printSizeTextDiv'>
            <p className='printSizeText'>print size : 2.5 x 2.5)</p>
            </div>
                </Col> 
                } 
                
       
        </Row>
      }
      

      {
     ( selectProductType==="Blank Round Neck" ||
      selectProductType==="Blank Drop Sholder" ||
      selectProductType==="Blank Hoodie")  &&
        <Row className='printSizeDemo'>
        <Col xs={12} md={8}  className="mt-25" >
                <Form
                                  className="sm lg xs md "
                                  onSubmit={(e) => {
                                      e.preventDefault();
      
                                      setPrice((_) =>
                                          teeshirtCalcultorPrice(
                                              quantity,
                                              printSize,
                                              printSizeBack,
                                              customRoundNeckFilter,
                                              customDropSholderFilter,
                                              customHoodieFilter,
                                              blankRoundNeckFilter,
                                              blankDropSholderFilter,
                                              blankHoodieFilter,
                                              selectProductType,
                                              printSide,
                                              tshirtPrice
                                           
                                          )
                                      );
      
                                  }}
                              >
                                  <Form.Group className="mb-3 Quantity w-100 " controlId="wccalcQuantity">
                                      <Form.Label >Quantity</Form.Label>
                                   
                                      <Form.Control
                                          name="quantity"
                                          type="number"
                                          onChange={(data) => setQuantity((_) => data.target.value)}
                                          value={quantity}
                                          placeholder="Enter Quantity"
                                          min="1"
                                          
                                      />
      
                                  
                                  </Form.Group>
                                 
      
    
                                
                               <div style={{textAlign:"center",marginTop:"30px"}}>
                               <Button style={{backgroundColor:"#124"}}  type="submit">
                                      CheckPrice
                                  </Button>
                               </div>
                               
                                  {setPrice && (
                                      <p className="pt-4 " style={{textAlign:"center"}}>
                                          Your Grand Total is :   <span style={{fontSize:"22px",fontWeight:"600",color:"orange"}}>{Number(price?.totalPrice)} </span> BDT <br />
                                          Unit price is :  <span style={{fontSize:"22px",fontWeight:"600",color:"orange"}}>{Number(price?.unitPrice)}</span> BDT
                                      </p>
                                  )}
                              </Form>
                </Col>
               
                
               
               
               
                {/* Drop sholder front side  */}
          
                
       
        </Row>
      } 
 </Container>
        <Footer/>
        <BackToTop/>
        </div>  
    );
};

export default TeeShirtCapingCalcForm;

