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
import NavigationBar from '../Navbar/NavigationBar';
const TeeShirtCapingCalcForm = () => {
    let id = "teeShirtCampingId";
    let collections = "productValues";
    const [dbData, setDbData] = useState({});
    let globalValueId="allGlobalValuesId";
    const [price, setPrice] = useState();
    const { fetchedData } = useGetData(id, collections, dbData);
const {user}=useContext(AuthContext)
    const [quantity,setQuantity]=useState(1)
   
    const [printSize, setPrintSize] = useState("10 x 14");
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
    

    const price1to9_10x14=fetchedData?.printSize10x14?.price1to9_10x14;
    const price10to19_10x14=fetchedData?.printSize10x14?.price10to19_10x14;
    const price20to29_10x14=fetchedData?.printSize10x14?.price20to29_10x14;
    const price30to40_10x14=fetchedData?.printSize10x14?.price30to40_10x14;
    const price41to49_10x14=fetchedData?.printSize10x14?.price41to49_10x14;
    const price50Plus_10x14=fetchedData?.printSize10x14?.price50Plus_10x14;
    const price1to9_10x10=fetchedData?.printSize_10x10?.price1to9_10x10;
    const price10to19_10x10=fetchedData?.printSize_10x10?.price10to19_10x10;
    const price20to29_10x10=fetchedData?.printSize_10x10?.price20to29_10x10;
    const price30to40_10x10=fetchedData?.printSize_10x10?.price30to40_10x10;
    const price41to49_10x10=fetchedData?.printSize_10x10?.price41to49_10x10;
    const price50Plus_10x10=fetchedData?.printSize_10x10?.price50Plus_10x10;
    const price1to9_10x5=fetchedData?.printSize_10x5?.price1to9_10x5;
    const price10to19_10x5=fetchedData?.printSize_10x5?.price10to19_10x5;
    const price20to29_10x5=fetchedData?.printSize_10x5?.price20to29_10x5;
    const price30to40_10x5=fetchedData?.printSize_10x5?.price30to40_10x5;
    const price41to49_10x5=fetchedData?.printSize_10x5?.price41to49_10x5;
    const price50Plus_10x5=fetchedData?.printSize_10x5?.price50Plus_10x5;

    const price1to9_5X5=fetchedData?.printSize_5x5?.price1to9_5X5;
    const price10to19_5X5=fetchedData?.printSize_5x5?.price10to19_5X5;
    const price20to29_5X5=fetchedData?.printSize_5x5?.price20to29_5X5;
    const price30to40_5X5=fetchedData?.printSize_5x5?.price30to40_5X5;
    const price41to49_5X5=fetchedData?.printSize_5x5?.price41to49_5X5;
    const price50Plus_5X5=fetchedData?.printSize_5x5?.price50Plus_5X5;

    const price1to9_2p5X5=fetchedData?.printSize2p5X5?.price1to9_2p5X5;
    const price10to19_2p5X5=fetchedData?.printSize2p5X5?.price10to19_2p5X5;
    const price20to29_2p5X5=fetchedData?.printSize2p5X5?.price20to29_2p5X5;
    const price30to40_2p5X5=fetchedData?.printSize2p5X5?.price30to40_2p5X5;
    const price41to49_2p5X5=fetchedData?.printSize2p5X5?.price41to49_2p5X5;
    const price50Plus_2p5X5=fetchedData?.printSize2p5X5?.price50Plus_2p5X5;
   console.log("price1to9_10x14",price1to9_10x14);
   console.log("price10to19_10x14",price10to19_10x14);
   console.log("price20to29_10x14",price20to29_10x14);
   console.log("price30to40_10x14",price30to40_10x14);
   console.log("price41to49_10x14",price41to49_10x14);
   console.log("price50Plus_10x14",price50Plus_10x14);
   console.log("price1to9_10x10",price1to9_10x10);
   console.log("price10to19_10x10",price10to19_10x10);
   console.log("price20to29_10x10",price20to29_10x10);
   console.log("price30to40_10x10",price30to40_10x10);
   console.log("price41to49_10x10",price41to49_10x10);
   console.log("price50Plus_10x10",price50Plus_10x10);
   console.log("price1to9_10x5",price1to9_10x5);
   console.log("price10to19_10x5",price10to19_10x5);
   console.log("price20to29_10x5",price20to29_10x5);
   console.log("price30to40_10x5",price30to40_10x5);
   console.log("price41to49_10x5",price41to49_10x5);
   console.log("price50Plus_10x5",price50Plus_10x5);
   console.log("price1to9_5X5",price1to9_5X5);
   console.log("price10to19_5X5",price10to19_5X5);
   console.log("price20to29_5X5",price20to29_5X5);
   console.log("price30to40_5X5",price30to40_5X5);
   console.log("price41to49_5X5",price41to49_5X5);
   console.log("price50Plus_5X5",price50Plus_5X5);
   console.log("price1to9_2p5X5",price1to9_2p5X5);
   console.log("price10to19_2p5X5",price10to19_2p5X5);
   console.log("price20to29_2p5X5",price20to29_2p5X5);
   console.log("price30to40_2p5X5",price30to40_2p5X5);
   console.log("price41to49_2p5X5",price41to49_2p5X5);
   console.log("price50Plus_2p5X5",price50Plus_2p5X5);

    return (
<>
<NavigationBar/>

      
              <Container className="sbcalc  lg xs md  mt-4">
    {/* <GotoAnotherPathBtn path="/" className="section-title" title="Tee Shirt  Price Calculator"></GotoAnotherPathBtn> */}
           <h2>Tee Shirt Calculator</h2>
        <Table responsive>
     <thead>
       <tr >
 
        
           <th >PriceSize</th>
           <th >Pricefor (1-9pcs)</th>
           <th >Pricefor (10-19pcs)</th>
           <th >Pricefor (20-29pcs)</th>
           <th >Pricefor (30-40pcs)</th>
           <th >Pricefor (40-49pcs)</th>
           <th >Pricefor 50and50+pcs</th> 
      
       </tr>
     </thead>
     <tbody>
       <tr>
           <td>10 x 14</td>
           <td  >{price1to9_10x14}</td>
           <td>{price10to19_10x14}</td>  
           <td>{price20to29_10x14}</td>
           <td>{price30to40_10x14}</td>
           <td>{price41to49_10x14}</td>
           <td>{price50Plus_10x14}</td>
         
          
        
       </tr>
       <tr>
         <td>10 x 10</td>
       <td >{price1to9_10x10} </td>  
       <td >{price10to19_10x10} </td>
       <td >{price20to29_10x10} </td>
       <td >{price30to40_10x10} </td>
       <td >{price41to49_10x10} </td>
       <td >{price50Plus_10x10} </td>
          
        
       </tr>  
       <tr>
         <td>10 x 5</td>
       <td >{price1to9_10x5} </td>  
       <td >{price10to19_10x5} </td>
       <td >{price20to29_10x5} </td>
       <td >{price30to40_10x5} </td>
       <td >{price41to49_10x5} </td>
       <td >{price50Plus_10x5} </td>
          
        
       </tr>
         <tr>
         <td>5 x 5</td>
       <td >{price1to9_5X5} </td>  
       <td >{price10to19_5X5} </td>  
       <td >{price20to29_5X5} </td>
       <td >{price30to40_5X5} </td>
       <td >{price41to49_5X5} </td>
       <td >{price50Plus_5X5} </td>
          
        
       </tr>  <tr>
         <td>2.5 x 5</td>
       <td >{price1to9_2p5X5} </td>  
       <td >{price10to19_2p5X5} </td>  
       <td >{price20to29_2p5X5} </td>
       <td >{price30to40_2p5X5} </td>
       <td >{price41to49_2p5X5} </td>
       <td >{price50Plus_2p5X5} </td>
          
        
       </tr>
   
     </tbody>
   </Table>
          <hr className="mb-25"/>
          <div className="sbcalc sm lg xs md mx-auto my-auto p-2 ">
          <Form
                            className="sm lg xs md "
                            onSubmit={(e) => {
                                e.preventDefault();

                                setPrice((_) =>
                                    teeShirtFormula(
                                        quantity,
                                        printSize,
                                        price1to9_10x14,
                                        price10to19_10x14,
                                        price20to29_10x14,
                                        price30to40_10x14,
                                        price41to49_10x14,
                                        price50Plus_10x14,
                                        price1to9_10x10,
                                        price10to19_10x10,
                                        price20to29_10x10,
                                        price30to40_10x10,
                                        price41to49_10x10,
                                        price50Plus_10x10,
                                        price1to9_10x5,
                                        price10to19_10x5,
                                        price20to29_10x5,
                                        price30to40_10x5,
                                        price41to49_10x5,
                                        price50Plus_10x5,
                                        price1to9_5X5,
                                        price10to19_5X5,
                                        price20to29_5X5,
                                        price30to40_5X5,
                                        price41to49_5X5,
                                        price50Plus_5X5,
                                        price1to9_2p5X5,
                                        price10to19_2p5X5,
                                        price20to29_2p5X5,
                                        price30to40_2p5X5,
                                        price41to49_2p5X5,
                                        price50Plus_2p5X5
                                     
                                    )
                                );

                            }}
                        >
                            <Form.Group className="mb-3 Quantity w-50 m-auto" controlId="wccalcQuantity">
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
                                className="mb-3 Print Side w-50 m-auto"
                                controlId="wccalcPrintSide"
                            >
                                <Form.Label className="pr-2">Paper Size</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={printSize}
                                    onChange={(e) => {

                                        setPrintSize((_) => e.target.value);
                                    }}
                                   
                                    name="printSize"
                                >
                                    <option value="10 x 14">10 x 14</option>
                                    <option value="10 x 10">10 x 10</option>
                                    <option value="10 x 5">10 x 5</option>
                                    <option value="5 X 5">5 x 5</option>
                                    <option value="2.5 X 5">2.5 x 5</option>

                                </Form.Control>
                            </Form.Group>
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
          </div>
       
          
       
          
        </Container>
        </>  
    );
};

export default TeeShirtCapingCalcForm;