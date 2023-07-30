
import React, { useContext, useState } from 'react';
import {  Form ,Button, OverlayTrigger, Tooltip, ProgressBar, Spinner} from 'react-bootstrap';
import { db, storage } from '../../firebase.config';
import { useGetData } from "../../hooks/useGetData";
import teeShirtFormula from "../../Formulas/teeShirtFormula";
import NavigationBar from '../Navbar/NavigationBar';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import CustomAlert from '../../alertBox/CustomAlert';
import SendOrderConfirmationEmail from '../../confirmationMailOrder/SendOrderConfirmationEmail';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../footer/Footer';

const NewOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instruction: '',
    collectAmount: '',
    area: '',
    orderDetailArr: [
      {
        color: '',
        teshirtSize: '',
        quantity: '',
        printSide:'',
        printSize: '',
        printSizeBack:'',
        file: null,
        image: null,
        brandLogo: null,
      },
    ],
  });
    let id = "resellerOrdersId";
   let collections = "resellerInfo";
   let idPrice = "teeShirtCampingId";
   let collectionsPrice = "productValues";
   const [fileprogress, setFileProgress] = useState(0);
   const [imageprogress, setImageProgress] = useState(0);
   const [showAlert, setShowAlert] = useState(false);
   const [loading, setLoading] = useState(false);
   const [dbData, setDbData] = useState({});
   const [printSide, setPrintSide] = useState('');
   const [addbrandLogo, setAddBrandLogo] = useState('');
   const { fetchedData, searchProduct, setSearchProduct } = useGetData(
     idPrice,
     collectionsPrice,
     dbData
   );
  const {user}=useContext(AuthContext);
  const userEmail=user?.email
  const [isLoading, setIsLoading] = useState(false);
  const [recvAmount,setRecvAmount]=useState()
  const [formValid, setFormValid] = useState(false);


  const d = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = d.toLocaleDateString("en-US", options);
  
    const price1to9_10x14 = fetchedData?.printSize10x14?.price1to9_10x14;
    const price10to19_10x14 = fetchedData?.printSize10x14?.price10to19_10x14;
    const price20to29_10x14 = fetchedData?.printSize10x14?.price20to29_10x14;
    const price30to40_10x14 = fetchedData?.printSize10x14?.price30to40_10x14;
    const price41to49_10x14 = fetchedData?.printSize10x14?.price41to49_10x14;
    const price50Plus_10x14 = fetchedData?.printSize10x14?.price50Plus_10x14;
    const price1to9_10x10 = fetchedData?.printSize_10x10?.price1to9_10x10;
    const price10to19_10x10 = fetchedData?.printSize_10x10?.price10to19_10x10;
    const price20to29_10x10 = fetchedData?.printSize_10x10?.price20to29_10x10;
    const price30to40_10x10 = fetchedData?.printSize_10x10?.price30to40_10x10;
    const price41to49_10x10 = fetchedData?.printSize_10x10?.price41to49_10x10;
    const price50Plus_10x10 = fetchedData?.printSize_10x10?.price50Plus_10x10;
    const price1to9_10x5 = fetchedData?.printSize_10x5?.price1to9_10x5;
    const price10to19_10x5 = fetchedData?.printSize_10x5?.price10to19_10x5;
    const price20to29_10x5 = fetchedData?.printSize_10x5?.price20to29_10x5;
    const price30to40_10x5 = fetchedData?.printSize_10x5?.price30to40_10x5;
    const price41to49_10x5 = fetchedData?.printSize_10x5?.price41to49_10x5;
    const price50Plus_10x5 = fetchedData?.printSize_10x5?.price50Plus_10x5;
  
    const price1to9_5X5 = fetchedData?.printSize_5x5?.price1to9_5X5;
    const price10to19_5X5 = fetchedData?.printSize_5x5?.price10to19_5X5;
    const price20to29_5X5 = fetchedData?.printSize_5x5?.price20to29_5X5;
    const price30to40_5X5 = fetchedData?.printSize_5x5?.price30to40_5X5;
    const price41to49_5X5 = fetchedData?.printSize_5x5?.price41to49_5X5;
    const price50Plus_5X5 = fetchedData?.printSize_5x5?.price50Plus_5X5;
  
    const price1to9_2p5X5 = fetchedData?.printSize2p5X5?.price1to9_2p5X5;
    const price10to19_2p5X5 = fetchedData?.printSize2p5X5?.price10to19_2p5X5;
    const price20to29_2p5X5 = fetchedData?.printSize2p5X5?.price20to29_2p5X5;
    const price30to40_2p5X5 = fetchedData?.printSize2p5X5?.price30to40_2p5X5;
    const price41to49_2p5X5 = fetchedData?.printSize2p5X5?.price41to49_2p5X5;
    const price50Plus_2p5X5 = fetchedData?.printSize2p5X5?.price50Plus_2p5X5;
  
    const navigate=useNavigate()
    const location=useLocation()
    const [inputs, setInputs] = useState([{ value: '' }]);


  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    if (name==="color" || name==="teshirtSize" || name==="quantity" || name==="printSize"|| name==="printSide" || name==="printSizeBack") {
     
      // const fieldName = name.split('.')[1];
      const newOrderDetailArr = [...formData.orderDetailArr];
      newOrderDetailArr[index][event.target.name]=event.target.value;
      setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
   
      }
   else {
        setFormData({ ...formData, [name]: value });
        // setSum(formData.reduce((total, input) => total + Number(input.value), 0));
   
      }
    } 
   
  const handleFileChange = (event, index) => {
    const { name, files } = event.target;
    if (name==="file" || name==="image") {
      // const fieldName = name.split('.')[1];
      const newOrderDetailArr = [...formData.orderDetailArr];
       // Change from a single file to an array of files
      newOrderDetailArr[index][[event.target.name]] =Array.from(files);
      setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
    
    }
  };

  const addField = () => {
    setFormData({
      ...formData,
      orderDetailArr: [
        ...formData.orderDetailArr,
        { color: null, teshirtSize: null, quantity: null, printSize: null,printSizeBack:"", file: null, image: null },
      ],
    });
  };
// remove field
const removeField = (index) => {
  setFormData({
    ...formData,
    orderDetailArr: formData.orderDetailArr.filter((_, i) => i !== index),
  });
};
let updatedPrintbazcost=0
  let printbazcost=0;
  let printbazcostbase;
  for  (var i = 0; i < formData?.orderDetailArr?.length; i++) {
    if (
      formData?.orderDetailArr[i]?.quantity &&
      formData?.orderDetailArr[i]?.printSize &&
      price1to9_10x14 &&
      price10to19_10x14 &&
      price20to29_10x14 &&
      price30to40_10x14 &&
      price41to49_10x14 &&
      price50Plus_10x14 &&
      price1to9_10x10 &&
      price10to19_10x10 &&
      price20to29_10x10 &&
      price30to40_10x10 &&
      price41to49_10x10 &&
      price50Plus_10x10 &&
      price1to9_10x5 &&
      price10to19_10x5 &&
      price20to29_10x5 &&
      price30to40_10x5 &&
      price41to49_10x5 &&
      price50Plus_10x5 &&
      price1to9_5X5 &&
      price10to19_5X5 &&
      price20to29_5X5 &&
      price30to40_5X5 &&
      price41to49_5X5 &&
      price50Plus_5X5 &&
      price1to9_2p5X5 &&
      price10to19_2p5X5 &&
      price20to29_2p5X5 &&
      price30to40_2p5X5 &&
      price41to49_2p5X5 &&
      price50Plus_2p5X5
    ) 
    {
      const totalPrice = teeShirtFormula(
        formData?.orderDetailArr[i]?.quantity,
        formData?.orderDetailArr[i]?.printSize,
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
      ).totalPrice;
      let backSidePrintCost=0
      if(formData?.orderDetailArr[i]?.printSizeBack==="10 x 14"){
        backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 130
      }
      else if(formData?.orderDetailArr[i]?.printSizeBack==="10 x 10"){
        backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 100
      } else if(formData?.orderDetailArr[i]?.printSizeBack==="10 x 5"){
        backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 50
      } else if(formData?.orderDetailArr[i]?.printSizeBack==="5 X 5"){
        backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 30
      }
      else if(formData?.orderDetailArr[i]?.printSizeBack==="2.5 X 5"){
        backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 15
      }
      console.log("formData?.orderDetailArr[i]?.printSizeBack",(formData?.orderDetailArr[i]?.quantity * 80));

  printbazcostbase = Number(totalPrice)+backSidePrintCost;
  printbazcost += printbazcostbase;
  // console.log("printbazcost",Number(printbazcost),"+",printbazcostbase)
    } else {
      if(printbazcostbase){
        printbazcost= printbazcostbase;
      }
      else{
        printbazcost=0;
      }
      // or any default value you want to set
    }
  }
    let deliveryFeeInsideDhaka = 0;
    const baseDeliveryFee = 70;
    const additionalDeliveryFee = 15;
    let QuantityBase=0
    let totalQuantity=0;

    let deliveryFeeOutSideDhaka = 0;
    const baseDeliveryFeeOutSideDhaka = 100;
    const additionalDeliveryFeeOutSideDhaka = 25;
    for  (var j = 0; j < formData?.orderDetailArr?.length; j++) {
      QuantityBase=Number( formData?.orderDetailArr[j]?.quantity)
      totalQuantity =Number(QuantityBase+totalQuantity)
   
   
    if (formData?.orderDetailArr[j]?.quantity > 0) {
      // Calculate the number of groups of 5 items in the order
      const groups = Math.floor(totalQuantity/ 5);
  
      // Calculate the remainder
      const remainder = totalQuantity % 5;
  
      // Calculate the delivery fee
      if (groups === 0) {
        deliveryFeeInsideDhaka = baseDeliveryFee;
      } else if (remainder === 0) {
        deliveryFeeInsideDhaka =
          baseDeliveryFee + (groups - 1) * additionalDeliveryFee;
      } else {
        deliveryFeeInsideDhaka = baseDeliveryFee + groups * additionalDeliveryFee;
      }
    }
  
  // outside dhaka
  
    if (formData?.orderDetailArr[j]?.quantity > 0) {
      // Calculate the number of groups of 5 items in the order
      const groups = Math.floor(totalQuantity / 5);
  
      // Calculate the remainder
      const remainder = totalQuantity % 5;
  
      // Calculate the delivery fee
      if (groups === 0) {
        deliveryFeeOutSideDhaka = baseDeliveryFeeOutSideDhaka;
      } else if (remainder === 0) {
        deliveryFeeOutSideDhaka =
          baseDeliveryFeeOutSideDhaka +
          (groups - 1) * additionalDeliveryFeeOutSideDhaka;
      } else {
        deliveryFeeOutSideDhaka =
          baseDeliveryFeeOutSideDhaka +
          groups * additionalDeliveryFeeOutSideDhaka;
      }
    }
    }
    let deliveryFee;
    if (formData.area === "outside dhaka") {
      deliveryFee = deliveryFeeOutSideDhaka;
    } else {
      deliveryFee = deliveryFeeInsideDhaka;
    }
  
    let recvMoney = 0;
    let costHandlingfee;
    let recvMoneyWithouthandling = 0;
    recvMoneyWithouthandling = Number(
      Math.ceil(formData.collectAmount - (printbazcost + deliveryFee))
    );
    // costHandlingfee = recvMoneyWithouthandling * 0.02;
    costHandlingfee = Number(formData.collectAmount * 0.02);
    recvMoney = recvMoneyWithouthandling - costHandlingfee;
   
    let suggestedCollectAmount = Math.ceil((1 + printbazcost + deliveryFee) / 0.98);
    // console.log("recvMoney",recvMoney)
    // console.log("suggestedCollectAmount",suggestedCollectAmount)
    const validateForm = () => {
      if (recvMoney < 0) {
        setFormValid(true);
        setRecvAmount("Received money cannot be less than 0.");
        return true;
      } else {
        setFormValid(false);
        return false;
      }
    };
 
// foe mongodb new
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true)
    // Validate the form here
    if (validateForm()) {
      setIsLoading(false) // Set loading status to false if form is invalid
      return; // Exit the function if form is invalid
    }
  
  try {
    const formData2 = new FormData();
    const orderDetailArr = formData.orderDetailArr || [];
    const filesAndImagesArr = [];

    orderDetailArr?.forEach((item, index) => {
      const fileAndImageData = {};
      // console.log("item.brandLogo",item.brandLogo);
      if (item.file) {
        item.file.forEach((file, fileIndex) => {
          formData2.append(`file${index}_${fileIndex}`, file); // Append each file
        });
      }
      
      if (item.image) {
        item.image.forEach((image, imageIndex) => {
          formData2.append(`image${index}_${imageIndex}`, image); // Append each image
        });
      }
        // Append brandLogo

  if (item.brandLogo) {
    formData2.append(`brandLogo${index}`, item.brandLogo);
}



      if (Object.keys(fileAndImageData).length) {
        filesAndImagesArr.push(fileAndImageData);
      }

      formData2.append(`color${index}`, item.color);
      formData2.append(`teshirtSize${index}`, item.teshirtSize);
      formData2.append(`quantity${index}`, item.quantity);
      formData2.append(`printSize${index}`, item.printSize);
      formData2.append(`printSide${index}`, item.printSide);
  


      return item;
    });

    formData2.append('filesAndImages', JSON.stringify(filesAndImagesArr)); // Append the filesAndImagesArr as a JSON string

    // Append the remaining form data
    formData2.append('orderDetailArr', JSON.stringify(orderDetailArr));
    formData2.append('name', formData.name);
    formData2.append('phone', formData.phone);
    formData2.append('address', formData.address);
    formData2.append('instruction', formData.instruction);
    formData2.append('area', formData.area);
    formData2.append('collectAmount', formData.collectAmount);
    formData2.append('printbazcost', printbazcost);
    formData2.append('deliveryFee', deliveryFee);
    formData2.append('recvMoney', recvMoney);
    formData2.append('orderStatus', 'Pending');
    formData2.append('paymentStatus', 'Unpaid');
    formData2.append('createdAt', formattedDate);
    // formData2.append('id',orderId);
    formData2.append('userMail', userEmail);

    formData2.append('clientName', user?.name);
    formData2.append('clientbrandName', user?.brandName);
    // formData2.append('clientbrandLogoURL', user?.brandLogoURL);
    formData2.append('clientPhone', user?.phone);
 
    const response = await
     fetch("https://mserver.printbaz.com/submitorder",  //add this when upload  in main server 
    //  fetch("http://localhost:5000/submitorder", //add this when work local server
     
     {
      method: "POST",
      body: formData2,
    });
    if (response.ok) {
      const result = await response.json();
      // console.log("Success:", result.insertedId);
      // console.log('API response:', response);
      const orderConfirmationData = { id: result.insertedId, userMail: userEmail };
      SendOrderConfirmationEmail(orderConfirmationData); // Send email confirmation
    
      setShowAlert(true);
    } else {
      throw new Error('API error: ' + response.status);
    }
  } catch (error) {
    console.error('API error:', error.message);
  }
  finally {
    setIsLoading(false); // Set loading status to false
  }
};


    return (
          <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Order</title>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            />
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n    /* General styles */\nbody {\n  font-family: 'Arial', sans-serif;\n  background-color: #f8f9fa;\n  margin: 0;\n  padding: 0;\n}\n\nh1, h3 {\n  font-weight: bold;\n}\n\n.row {\n  margin: 0 auto;\n}\n\n.navbar {\n  background-color: #001846 !important;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 20px;\n  padding-left: 40px !important;\n}\n\n.navbar-brand img {\n  width: 150px;\n}\n\n.nav-link {\n  color: #ffffff !important;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.nav-link:hover {\n  background-color: #ffffff;\n  color: #001846 !important;\n}\n.dropdown{\n  padding-left: 1200px;\n}\n\n.dropdown-menu {\n  margin-left: 1120px;\n  \n}\n\n.new-order {\n  margin: 0 10% 0 10%;\n}\n\n/* Form styles */\nform {\n  margin-bottom: 30px;\n}\n\nlabel {\n  font-weight: 600;\n}\n\ninput[type=\"number\"] {\n  -moz-appearance: textfield;\n}\n\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n\n/* Buttons */\nbutton {\n  margin-right: 10px;\n}\n\n.add-field {\n  margin-left: 5px;\n}\n\n/* Terms and conditions */\np {\n  text-align: justify;\n  line-height: 1.5;\n  margin-left: 15px;\n  margin-right: 15px;\n}\n\n  ",
              }}
            />
      
            <NavigationBar />
            {loading===true && (
<>
<div className="alert-overlay"  />
<div className="alert-box" >
  <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
 
  <h2>Please wait!</h2>
</div>
</>
)}
            <div className="new-order" style={{marginBottom:"50px"}}>
              <div className="row mt-5">
                <div className="col-12">
                  <h1>New Order</h1>
                </div>
              </div>
              <Form onSubmit={handleSubmit}  className="mb-4">
                <div className="row mt-5">
                  {/* 1st Column */}
                  <div className="col-md-4">
                    <h3>Recipient Details</h3>
      
                    <Form.Group className="mb-3">
                      <Form.Label>Recipient's Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control"
                        id="recipientName"
                        onChange={(e) =>  handleInputChange(e)}
                        required
                        placeholder="Enter Name"
                      />
                    </Form.Group>
      
                    <Form.Group className="mb-3">
                      <Form.Label>Recipient's Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        pattern="[0-9]{11}"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientPhone"
                        required
                        placeholder="Enter recipient number"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Delivery Area</Form.Label>
                      <Form.Control
                        as="select"
                        name="area"
                        value={formData.area}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                        <option value="">select area</option>
                        <option value="inside dhaka">Inside Dhaka</option>
                        <option value="outside dhaka">Outside Dhaka</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 ">
                      <Form.Label>Recipient's/Delivery Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientAddress"
                        required
                        placeholder="Enter recipient address"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label> Special Instructions</Form.Label>
                      {["bottom"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Any specific request for
                              production, branding or delivery
                            </Tooltip>
                          }
                        >
                          <span variant="secondary" className="info_icon">
                            <img
                              style={{
                                marginLeft: "5px",
                                width: "15px",
                                height: "15px",
                              }}
                              src="/images/info.png"
                              alt="info"
                            />
                          </span>
                        </OverlayTrigger>
                      ))}
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="instruction"
                        value={formData.instruction}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientAddress"
                        style={{ height: "150px" }}
                        placeholder=""
                      />
                    </Form.Group>
                  </div>
                  {/* 2nd Column */}
                  <div className="col-md-4">
                    <div className="costOrder_Style">
                    <h3>Order Details</h3>
                    <Button onClick={addField} className="addButtonStyle">+</Button>
                    </div>
                 
                    {formData.orderDetailArr.map((item, index) => (
                      <>
                      
                      {
                        index !==0 && <div className='flex'> 
                        <h5 style={{color:"orange"}}>0 {index+1}</h5>
                          <Button className="addButtonStyle" onClick={() => removeField(index)}>-</Button>
                          </div>
                      }
                     
                     
                      <hr style={{color:"orang !important"}} />
                    <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Color</Form.Label>
                      <Form.Control
                        as="select"
                        name="color"
                        required
                        value={item.color}
                        onChange={(e) =>  handleInputChange(e,index)}
                      >
                        <option value="">select color</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                      </Form.Control>
                    </Form.Group>
      
                    <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Tee Shirt Size</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.teshirtSize}
                        required
                        onChange={(e) =>  handleInputChange(e,index)}
                        name="teshirtSize"
                      >
                        <option value="">select tee shirt size</option>
                        <option value="m">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </Form.Control>
                    </Form.Group>
      
                    <Form.Group
                      className="mb-3 Quantity w-100 m-auto"
                      controlId="wccalcQuantity"
                    >
                      <Form.Label>Quantity</Form.Label>
      
                      <Form.Control
                        name="quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                           handleInputChange(e,index)
                        }}
                        required
                        placeholder="Enter Quantity"
                        min="1"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print side</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.printSide}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSide"
                        required
                      >
                       <option value="">select print side</option> 
                        <option value="frontSide">Front Side</option>
                        <option value="backSide">Back Side</option>
                        <option value="bothSide">Both Side</option>
                      </Form.Control>
                    </Form.Group>
                    {
                     ( item.printSide==="frontSide" || item.printSide==="backSide") &&
                      <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print Size</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required
                      >
                       <option value="">select print size</option> 
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                      </Form.Control>
                    </Form.Group>
}
                    {
                      item.printSide==="bothSide" && 
                      <>

<Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print Size front</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required
                      >
                       <option value="">select print size</option> 
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                    className="mb-3 Print Side w-100 m-auto"
                    controlId="wccalcPrintSide"
                  >
                    <Form.Label className="pr-2">Print Size back</Form.Label>
                    <Form.Control
                      as="select"
                      value={item.printSizeBack}
                      onChange={(e) => {
                         handleInputChange(e,index);
                      }}
                      name="printSizeBack"
                      required
                    >
                     <option value="">select print size</option> 
                      <option value="10 x 14">10″ x 14″</option>
                      <option value="10 x 10">10″ x 10″</option>
                      <option value="10 x 5">10″ x 5″</option>
                      <option value="5 X 5">5″ x 5″</option>
                      <option value="2.5 X 5">2.5″ x 5″</option>
                    </Form.Control>
                  </Form.Group>
                      </>
                     
                    }
                   
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Main File</Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                       
                        onChange={(e) => handleFileChange(e, index)} 
                        required
                        accept=".ai,.eps,.psd,.pdf,.svg,.png"
                        multiple
                      />
                      <span style={{color:"gray"}}>upload .ai,.eps,.psd,.pdf,.svg,.png file</span>
                    </Form.Group>
                    {fileprogress === 0 ? null : (
         <ProgressBar now={fileprogress} label={`${fileprogress}%`} />
          )}
         
                    
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Mockup/T-Shirt Demo Picture</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                       
                        required
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index)}
                        multiple
                      />
                    </Form.Group>
                    {imageprogress === 0 ? null : (
         <ProgressBar now={imageprogress} label={`${imageprogress}%`} />
          )}

<Form.Group controlId="formBrandLogo" className="mb-3">
  <Form.Label>Upload Your Brand Logo (optional)</Form.Label>
  <Form.Control
    type="file"
    name="brandLogo"
    accept="image/jpeg, image/png"
    onChange={(e) => {
      const orderDetailArrCopy = [...formData.orderDetailArr];
      orderDetailArrCopy[0].brandLogo = e.target.files[0];  // Change 0 with the index of the order detail item being updated
      const hasBrandLogo = e.target.files.length > 0;
      setAddBrandLogo(hasBrandLogo)
   
      setFormData({ ...formData, orderDetailArr: orderDetailArrCopy });
    }}
  />
</Form.Group>

         
                     </>
                     ))}
                  </div>
                  {/* 3rd Column */}
                  <div className="col-md-4">
                    <h3>Cost Of Order</h3>
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Printbaz Cost</label>
      
                      <h3>
                        {" "}
                        <span style={{ fontSize: "" }}>&#2547;</span> {addbrandLogo ?parseInt(printbazcost+5):printbazcost}
                      </h3>
                    </div>
      
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Delivery Fee</label>
      
                      <h3>
                        {" "}
                        <span style={{ fontSize: "" }}>&#2547;</span>{" "}
                        {formData.area === "outside dhaka"
                          ? deliveryFeeOutSideDhaka
                          : deliveryFeeInsideDhaka}
                      </h3>
                    </div>
                    <div>

                    <div  className="costOrder_Style">
                    <Form.Group className="mb-3 ">
                      <Form.Label>Amount to Collect</Form.Label>
                      {["bottom"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                             Amount of money you want the
                              receiver will pay; Must include delivery fee
                            </Tooltip>
                          }
                        >
                          <span variant="secondary" className="info_icon">
                            <img
                              style={{
                                marginLeft: "5px",
                                width: "15px",
                                height: "15px",
                              }}
                              src="/images/info.png"
                              alt="info"
                            />
                          </span>
                        </OverlayTrigger>
                      ))}
                    
                      <Form.Control
                        type="number"
                        name="collectAmount"
                        value={formData.collectAmount}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);;
                        }}
                        required
                        placeholder=""
                      />
                    </Form.Group>
                   
                           <Form.Group className="mb-3 ">
                           <Form.Label>Minimum Amount to Collect</Form.Label>
                          
                           <Form.Control
                             type="number"
                             name="collectAmount"
                             value={ printbazcost && ( deliveryFeeOutSideDhaka ||deliveryFeeInsideDhaka) && suggestedCollectAmount ?suggestedCollectAmount : '' }
                             readOnly
                           />
                         </Form.Group>
                        
                    
                   
                     
                      </div>
                    </div>
                    
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Cash Handling fee</label>{" "}
                      <h3> 2%</h3>
                    </div>
      
                    {formData?.orderDetailArr[0]?.quantity && formData?.orderDetailArr[0]?.printSize && formData?.collectAmount && (
                      <div >
                        <div className="costOrder_Style">
                        <label htmlFor="printbazCost">You will receive</label>
                        <h3> {parseInt(recvMoney)}</h3>
                        </div>
                       
                      
                        { formValid===true &&
    <p style={{color:"red",textAlign:"right"}}>{recvAmount}</p>
  }
                       
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-5">{/* 1st Column */}</div>
      
                <div className="row mt-5">
                  <div className="col-12">
                    <Button type="submit" style={{ backgroundColor: "#124" }}>
                      Submit
                    </Button>
      
                    <Button
                      type="reset"
                      style={{ backgroundColor: "gray", marginLeft: "10px" }}
                    >
                      Cancel
                    </Button>
                    {
  isLoading===true &&(
    <>
     <div className="alert-overlay"  />
       <div className="alert-box" >
     
         <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
         
         <h2>Please wait!</h2>
       </div>
    </>
  )
  
}
                  </div>
                </div>
              </Form>
      
              <div className="row mt-5">
                <div className="col-12">
                  <h3>Terms and Conditions</h3>
                  <ul>
                    <li>
                      সকাল ১১ টার পরে প্লেইস করা অর্ডার পরের দিন থেকে শিডিউল করা হবে।
                    </li>
                    <li>
                      ঢাকার ভিতরে ৫ পিসের বেশি ডেলিভারি এর ক্ষেত্রে পরবর্তী প্রতি ৫
                      পিসে ১৫ টাকা করে ডেলিভারি ফি যোগ হবে। (যেমনঃ ঢাকার ভিতরে ৫ পিসের
                      ডেলিভারি ফি ৭০ টাকা, ১০ পিসের ডেলিভারি ফি ৮৫ টাকা, ১৫ পিসের ১০০
                      টাকা ইত্যাদি)
                    </li>
                    <li>
                      ঢাকার বাহিরে ৫ পিসের বেশি ডেলিভারির ক্ষেত্রে পরবর্তী প্রতি ৫
                      পিসে ২৫ টাকা করে ডেলিভারি ফি যোগ হবে।{" "}
                    </li>
                    <li>
                      ভিন্ন ডেলিভারি এড্রেসে ডেলিভারি এর জন্য অবশ্যই “New Order”
                      ক্রিয়েট করতে হবে।{" "}
                    </li>
                    <li>
                      একই ডেলিভারি এড্রেসে একের অধিক কাস্টম টিশার্ট ডেলিভারি এর জন্য
                      “+” বাটন ব্যবহার করা যাবে।{" "}
                    </li>
                    <li>
                      প্রোমোশনাল এড অন্সঃ হ্যাংটাগ, ব্র্যান্ড লেবেল, থ্যাংক ইউ কার্ড,
                      অথবা স্পেশাল নোটসহ ডেলিভারি এর জন্য অবশ্যই আলাদা ইনভয়েসিং করা
                      হবে। (কাস্টমার কেয়ারে যোগাযোগ করতে হবে)
                    </li>
                    <li>
                      সঠিক প্রিন্ট সাইজ সিলেক্ট করতে হবে এবং মেইন ফাইলে প্রিন্ট সাইজ
                      উল্লিখিত থাকতে হবে। (যেমনঃ 2.5” x 2” সাইজের কোন প্রিন্ট থাকলে
                      সেটার জন্য 2.5” x 5” এর প্রিন্টিং প্যারামিটার সিলেক্ট করতে হবে)
                    </li>
                    <li>
                      একই টিশার্টে একের অধিক প্রিন্টের রিকোয়ারমেন্ট থাকলেঃ ১। অবশ্যই
                      Special Instructions বক্সে লিখে দিতে হবে ২। মকআপ দিতে হবে ৩।
                      অর্ডার প্লেইস করার পর ১ ঘন্টার ভিতরে কাস্টমার সার্ভিসে কল করে
                      জানাতে হবে। ৪। বিল এডজাস্ট করে নিতে হবে।
                    </li>
                  </ul>
                  <span>
                    {" "}
                    *** ফেইক কাস্টোমার অথবা রিটার্নের ব্যপারে সতর্ক থাকুন। রিটার্নের
                    খরচ ব্র্যান্ডকেই বিয়ার করতে হবে এবং অত্যাধিক (৩ পিস+) আনপেইড
                    রিটার্নের ক্ষেত্রে একাউন্ট সাস্পেন্ডেড হতে পারে***
                  </span>
                </div>
              </div>
            </div>
            {showAlert===true && (
          
<CustomAlert
message="Your order has been submitted successfully."
onClose={() => setShowAlert(false)}


/>


)


}

 <Footer/>

          </div>
  
      );
};

export default NewOrder;

