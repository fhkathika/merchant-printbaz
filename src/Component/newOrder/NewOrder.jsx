import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row ,Button, OverlayTrigger, Tooltip, ProgressBar, Spinner} from 'react-bootstrap';
import { db, storage } from '../../firebase.config';
import { useGetData } from "../../hooks/useGetData";
import teeShirtFormula from "../../Formulas/teeShirtFormula";
import NavigationBar from '../Navbar/NavigationBar';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import CustomAlert from '../../alertBox/CustomAlert';
import SendOrderConfirmationEmail from '../../confirmationMailOrder/SendOrderConfirmationEmail';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instruction: '',
    collectAmount: '',
    area: '',
    resellerOrderArr: [],
    orderDetailArr: [
      {
        color: '',
        teshirtSize: '',
        quantity: '',
        printSize: '',
        file: '',
        image: '',
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
   const { fetchedData, searchProduct, setSearchProduct } = useGetData(
     idPrice,
     collectionsPrice,
     dbData
   );
  //  const [quantity, setQuantity] = useState(1);
  const {user}=useContext(AuthContext);
  const userEmail=user?.email
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
    // console.log("collectAmount", collectAmount);
    const navigate=useNavigate()
    const location=useLocation()
    const [inputs, setInputs] = useState([{ value: '' }]);

    // const handleInputChange = (index, event) => {
    //   const values = [...inputs];
    //   values[index].value = event.target.value;
    //   setInputs(values);
    //   setSum(values.reduce((total, input) => total + Number(input.value), 0));
  
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    if (name==="color" || name==="teshirtSize" || name==="quantity" || name==="printSize") {
      console.log(value)
      // const fieldName = name.split('.')[1];
      const newOrderDetailArr = [...formData.orderDetailArr];
      newOrderDetailArr[index][event.target.name]=event.target.value;
      setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
      console.log(newOrderDetailArr);
      }
   else {
        setFormData({ ...formData, [name]: value });
        // setSum(formData.reduce((total, input) => total + Number(input.value), 0));
        console.log('order address',formData);
      }
    } 
   
  const handleFileChange = (event, index) => {
    const { name, files } = event.target;
    if (name==="file" || name==="image") {
      // const fieldName = name.split('.')[1];
      const newOrderDetailArr = [...formData.orderDetailArr];
      newOrderDetailArr[index][[event.target.name]] = files[0];
      setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
      console.log('Updated Order State:', formData);
    }
  };

  const addField = () => {
    setFormData({
      ...formData,
      orderDetailArr: [
        ...formData.orderDetailArr,
        { color: null, teshirtSize: null, quantity: null, printSize: null, file: null, image: null },
      ],
    });
  };
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

       printbazcostbase = Number(totalPrice);
				printbazcost += printbazcostbase;
        console.log("printbazcost",Number(printbazcost),"+",printbazcostbase)
			
   
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
     console.log("testQuantity",totalQuantity);
   
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
    costHandlingfee = recvMoneyWithouthandling * 0.02;
    recvMoney = recvMoneyWithouthandling - costHandlingfee;
    console.log("recvMoney",recvMoney)
  
    
    const handleSubmit = async (event) => {
      event.preventDefault();
    setLoading(true)
      // Upload files and images to Firebase Storage
      const storageInstance = getStorage();
      const promises = formData.orderDetailArr.map(async (item) => {
        let fileURL = null;
        let imageURL = null;
    
        if (item.file) {
          const fileRef = ref(storageInstance, item.file.name);
        
          // Track progress for file upload
          const fileUploadTask = uploadBytesResumable(fileRef, item.file);
        
          fileUploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFileProgress(progress);
          });
        
          await fileUploadTask;
        
          fileURL = await getDownloadURL(fileRef);
        }
    
        if (item.image) {
          const imageRef = ref(storageInstance, item.image.name);
        
          // Track progress for image upload
          const imageUploadTask = uploadBytesResumable(imageRef, item.image);
        
          imageUploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageProgress(progress);
          });
        
          await imageUploadTask;
        
          imageURL = await getDownloadURL(imageRef);
        }
        return { ...item, file: fileURL, image: imageURL };
      });
      const orderDetailArr = await Promise.all(promises);
    
      // Create a new object with the order details, excluding any File objects
      const sanitizedOrder = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        instruction: formData.instruction,
        
        area: formData.area,
        resellerOrderArr: formData.resellerOrderArr,
        orderDetailArr: orderDetailArr?.map((item) => ({
          color: item.color,
          teshirtSize: item.teshirtSize,
          quantity: item.quantity,
          printSize: item.printSize,
          file: item.file,
          image: item.image,
        })),
        collectAmount: formData.collectAmount,
          printbazcost: printbazcost,
          deliveryFee: deliveryFee,
          recvMoney: recvMoney,
          orderStatus: "Pending",
          paymentStatus: "Unpaid",
          createdAt: formattedDate,
          id: Date.now(),
          userMail:userEmail
      };
      //send order into mongodb
      try {
        // Send the sanitized order data to the MongoDB API endpoint
        const response = await axios.post('/submitorder', sanitizedOrder);
        console.log('MongoDB response:', response.data);
      } catch (error) {
        console.error('Error sending data to MongoDB:', error);
        // Handle error here
      }
    
      // Get the existing orders array from Firestore
      const docRef = doc(db, "resellerInfo", "resellerOrdersId");
      const docSnap = await getDoc(docRef);
      const ordersArray = docSnap.exists() ? docSnap.data().orders : [];
      console.log('Sanitized Order:', sanitizedOrder);
      // Add the sanitized order object to the existing orders array
      ordersArray.push(sanitizedOrder);
    
      // Update order data in Firestore
      await setDoc(docRef, { orders: ordersArray });
       SendOrderConfirmationEmail(sanitizedOrder);
      setShowAlert(true);
      setLoading(false)
      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        instruction: "",
        collectAmount: "",
        area: "",
        resellerOrderArr: [],
        orderDetailArr: [
          {
            color: "",
            teshirtSize: "",
            quantity: "",
            printSize: "",
            file: "",
            image: "",
          },
        ],
        printbazcost: 350,
        amountToCollect: "",
        deliveryFee: 70,
        recvAmount: "",
      });
      setFileProgress(0);
      setImageProgress(0);
    };


// const handleSubmit = async () => {
//   try {
//     // Prepare the data to be sent to the backend API
//     const orderDetailArr = formData.orderDetailArr.map((item) => ({
//       color: item.color,
//       teshirtSize: item.teshirtSize,
//       quantity: item.quantity,
//       printSize: item.printSize,
//       file: item.file,
//       image: item.image,
//     }));

//     const orderData = {
//       // Include the necessary order data properties
//       name: formData.name,
//       phone: formData.phone,
//       address: formData.address,
//       instruction: formData.instruction,
      
//       area: formData.area,
//       resellerOrderArr: formData.resellerOrderArr,
//       orderDetailArr: orderDetailArr?.map((item) => ({
//         color: item.color,
//         teshirtSize: item.teshirtSize,
//         quantity: item.quantity,
//         printSize: item.printSize,
//         file: item.file,
//         image: item.image,
//       })),
//       collectAmount: formData.collectAmount,
//         printbazcost: printbazcost,
//         deliveryFee: deliveryFee,
//         recvMoney: recvMoney,
//         orderStatus: "Pending",
//         paymentStatus: "Unpaid",
//         createdAt: formattedDate,
//         id: Date.now(),
//         userMail:userEmail
//     };

//     // Make a POST request to the backend API endpoint
//     const response = await axios.post('/submitorder', orderData);

//     // Handle the response if needed
//     console.log('API response:', response.data);
//   } catch (error) {
//     // Handle errors that occur during the request
//     console.error('API error:', error);
//   }
// };


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
            <div className="new-order">
              <div className="row mt-5">
                <div className="col-12">
                  <h1>New Order</h1>
                </div>
              </div>
              <Form onSubmit={handleSubmit} className="mb-4">
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
                        type="number"
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
                        <option default>select area</option>
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
                      <h5 style={{color:"orange"}}>0 {index+1}</h5>
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
                        <option default>select color</option>
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
                        <option default>select tee shirt size</option>
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
                        <option default>select print size</option>
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Main File</Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        onChange={(e) => handleFileChange(e, index)} 
                        required
                        accept=".ai,.eps"
                      />
                      <span style={{color:"gray"}}>upload .ai or eps file</span>
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
                      />
                    </Form.Group>
                    {imageprogress === 0 ? null : (
         <ProgressBar now={imageprogress} label={`${imageprogress}%`} />
          )}
         
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
                        <span style={{ fontSize: "" }}>&#2547;</span> {printbazcost}
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
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Cash Handling fee</label>{" "}
                      <h3> 2%</h3>
                    </div>
      
                    {formData?.orderDetailArr[0]?.quantity && formData?.orderDetailArr[0]?.printSize && formData?.collectAmount && (
                      <div className="costOrder_Style">
                        <label htmlFor="printbazCost">You will receive</label>
                        <h3> {parseInt(recvMoney)}</h3>
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

          </div>
  
      );
};

export default NewOrder;

