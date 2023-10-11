
import React, { useContext, useEffect, useState } from 'react';
import {  Form ,Button, OverlayTrigger, Tooltip, ProgressBar, Spinner, Row, Col, Card, ListGroup, Container} from 'react-bootstrap';
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
import deliveryCharge from '../../Formulas/deliveryCharge';
const BlankHoodie = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instruction: '',
    collectAmount: '',
    districts:'',
    zones:'',
    areas:'',
    quantity:0,
    productType:'Blank hoodie',
    orderDetailArr: [
      {
        color: 'Black',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Black.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
       printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo: null,
      },
      {
        color: 'Green',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Neon Green.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo: null,
      },
      {
        color: 'Nevy Blue',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Nevy Blue.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo: null,
      },  {
        color: 'Maroon',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Gray.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo: null,
      },{
        color: 'Maroon',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Red.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        printSide: '',
        printSize: '',
        printSizeBack: '',
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
   const [districts, setDistricts] = useState([]);
   const [zones, setZones] = useState([]);
   const [areas, setAreas] = useState([]);
   const [fileprogress, setFileProgress] = useState(0);
   const [imageprogress, setImageProgress] = useState(0);
   const [showAlert, setShowAlert] = useState(false);
   const [loading, setLoading] = useState(false);
   const [dbData, setDbData] = useState({});
   const [printSide, setPrintSide] = useState('');
   const [addbrandLogo, setAddBrandLogo] = useState(false);
   const [deliveryAreas, setDeliveryAreas] = useState('');
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
// fetch location dropdown data 
  // Fetch unique districts when the component mounts
  useEffect(() => {
    // axios.get('http://localhost:5000/unique-districts')
    axios.get('https://mserver.printbaz.com/unique-districts')
      .then(response => {
        setDistricts(response.data);
      })
      .catch(error => {
        console.error('Error fetching unique districts:', error);
      });
  }, []);
  useEffect(() => {
    if (formData?.districts) {
      // axios.get(`http://localhost:5000/zones?district=${encodeURIComponent(formData?.districts)}`)
      axios.get(`https://mserver.printbaz.com/zones?district=${encodeURIComponent(formData?.districts)}`)
        .then(response => {
          setZones(response.data);
          // console.log("response.data", response.data);
        })
        .catch(error => {
          console.error('Error fetching zones:', error);
          setZones([]);  // Optionally, clear zones if the fetch fails
        });
    } else {
      setZones([]); // Clear zones if the district is not selected
      setAreas([]); // Clear areas as well, as they depend on the zone
    }
  }, [formData?.districts]);
  
    // Fetch areas based on selected zone
    useEffect(() => {
      if (formData?.zones) {
        // axios.get(`http://localhost:5000/areas/${encodeURIComponent(formData?.zones)}`)
        axios.get(`https://mserver.printbaz.com/areas/${encodeURIComponent(formData?.zones)}`)
          .then(response => {
            setAreas(response.data);
          })
          .catch(error => {
            console.error('Error fetching areas:', error);
            setAreas([]);  // Optionally, clear areas if the fetch fails
          });
      } else {
        setAreas([]); // Clear areas if the zone is not selected
      }
    }, [formData?.zones]);

   

    // fetch delievryArea 
    useEffect(() => {
      if (formData?.districts && formData?.zones && formData?.areas) {
        // axios.get(`http://localhost:5000/deliveryAreaByLocation?District=${formData?.districts}&Zone=${formData?.zones}&Area=${formData?.areas}`)
        axios.get(`https://mserver.printbaz.com/deliveryAreaByLocation?District=${formData?.districts}&Zone=${formData?.zones}&Area=${formData?.areas}`)
          .then((res) => setDeliveryAreas(res.data.deliveryArea))
          .catch((error) => console.error('Error fetching deliveryArea:', error));
      }
    }, [formData?.districts ,formData?.zones , formData?.areas]);
  
  


  const d = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = d.toLocaleDateString("en-US", options);
 
    const navigate=useNavigate()
    const location=useLocation()
    const [inputs, setInputs] = useState([{ value: '' }]);
    const safeParseInt = (str) => {
      const value = parseInt(str);
      return isNaN(value) ? 0 : value;
  };
  
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const color = event.target.getAttribute('data-color');
    const size = event.target.getAttribute('data-size');
    const newOrderDetailArr = [...formData.orderDetailArr];

    let itemIndex = newOrderDetailArr.findIndex(item => item.color === color);

    if (name==="color" || name==="teshirtSize" || name==="quantityM" ||  name==="quantityL"|| name==="quantityXL"||  name==="quantityXXL"|| name==="printSize"|| name==="printSide" || name==="printSizeBack") {
        if (size) {
            newOrderDetailArr[itemIndex].teshirtSize = { ...newOrderDetailArr[itemIndex].teshirtSize, [size]: value };
        }
        newOrderDetailArr[itemIndex][name] = value;
    } else {
        setFormData({ ...formData, [name]: value });
        return;
    }
  
    // Compute grand total based on the newOrderDetailArr
    const newGrandQuantity = newOrderDetailArr.reduce((acc, item) => 
  acc + safeParseInt(item.quantityM) + 
        safeParseInt(item.quantityL) + 
        safeParseInt(item.quantityXL) + 
        safeParseInt(item.quantityXXL), 
0);
    
    // Update state
    setFormData(prevState => ({
        ...prevState,
        orderDetailArr: newOrderDetailArr,
        quantity: parseInt(newGrandQuantity)
    }));
}

  
   console.log("formData",formData);


formData?.orderDetailArr.forEach(item => {
  item.totalQuantity = safeParseInt(item.quantityM) + 
                       safeParseInt(item.quantityL) + 
                       safeParseInt(item.quantityXL) + 
                       safeParseInt(item.quantityXXL);
});

let perCategoryCost=0
  let printbazcost=0;
  let printbazcostbase;
  for  (var i = 0; i < formData?.orderDetailArr?.length; i++) {
    if (formData?.quantity &&formData?.orderDetailArr[i]?.totalQuantity ) {
        perCategoryCost=formData?.orderDetailArr[i]?.totalQuantity  * 500
        console.log("perCategoryCost",perCategoryCost);
        printbazcost +=perCategoryCost
      }
   }
    console.log("printbazCost",printbazcost);
    //  else {
    //   if(printbazcostbase){
      
    //     printbazcost= printbazcostbase;
    //   }
    //   else{
    //     printbazcost=0;
    //   }
    //   // or any default value you want to set
    // }
  
    // charge based on weight 
  // inside dhaka 
  const chargeForInSideZeroToP5=70;
  const chargeForInSidep5To1=80;
  const chargeForInSideoneTo2=90;
  const chargeForInSidetwoTo3=115;
  // outside dhaka 
  const chargeForOutSideZeroToP5=100;
  const chargeForOutSidep5To1=120;
  const chargeForOutSideoneTo2=150;
  const chargeForOutSidetwoTo3=175;
  const weightPerShirt=0.465;
  const extraInSideDhakaChange=15
  const extraOutSideDhakaChange=25
  let grandQuantity=formData?.quantity

  let deliveryFee = 0; // Initialize fees as 0

  // Check if grandQuantity is defined and greater than 0
  if (grandQuantity && grandQuantity > 0) {
    deliveryFee = deliveryCharge({
      grandQuantity: grandQuantity,
      weightPerShirt: weightPerShirt,
      chargeForInSideZeroToP5: chargeForInSideZeroToP5,
      chargeForInSidep5To1: chargeForInSidep5To1,
      chargeForInSideoneTo2: chargeForInSideoneTo2,
      chargeForInSidetwoTo3: chargeForInSidetwoTo3,
      chargeForOutSideZeroToP5: chargeForOutSideZeroToP5,
      chargeForOutSidep5To1: chargeForOutSidep5To1,
      chargeForOutSideoneTo2: chargeForOutSideoneTo2,
      chargeForOutSidetwoTo3: chargeForOutSidetwoTo3,
      extraInSideDhakaChange: extraInSideDhakaChange,
      extraOutSideDhakaChange: extraOutSideDhakaChange,
      deliveryAreas: deliveryAreas
    }).deliveryFee;
  }
  
  console.log("updated deliveryFee", deliveryFee);
  
    let recvMoney = 0;
    let costHandlingfee;
    let recvMoneyWithouthandling = 0;
    recvMoneyWithouthandling = Number(
      Math.ceil(formData.collectAmount - (printbazcost + deliveryFee))
    );
    // costHandlingfee = recvMoneyWithouthandling * 0.03;
    costHandlingfee = Number(formData.collectAmount * 0.03);
    recvMoney = recvMoneyWithouthandling - costHandlingfee;
   
    let suggestedCollectAmount = Math.ceil((1 + printbazcost + deliveryFee) / 0.97);
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
 const handleBack=()=>{
     navigate('/newOrdersWithOption')
 }
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
   

    orderDetailArr?.forEach((item, index) => {
  
      formData2.append(`color${index}`, item.color);
      formData2.append(`teshirtSize${index}`, item.teshirtSize);
      // Handle different sizes for quantity
  formData2.append(`quantityM${index}`, item.quantityM);
  formData2.append(`quantityL${index}`, item.quantityL);
  formData2.append(`quantityXL${index}`, item.quantityXL);
  formData2.append(`quantityXXL${index}`, item.quantityXXL);
  
      formData2.append(`printSize${index}`, "disabled");
      formData2.append(`printSide${index}`, "disabled");
  


      return item;
    });

    // formData2.append('filesAndImages', JSON.stringify(filesAndImagesArr)); // Append the filesAndImagesArr as a JSON string

    // Append the remaining form data
    formData2.append('orderDetailArr', JSON.stringify(orderDetailArr));
    formData2.append('name', formData.name);
    formData2.append('phone', formData.phone);
    formData2.append('address', formData.address);
    formData2.append('instruction', formData.instruction);
    formData2.append('category', "Blank Hoodie");
    formData2.append('districts', formData.districts);
    formData2.append('zones', formData.zones);
    formData2.append('areas', formData.areas);
    formData2.append('collectAmount', formData.collectAmount);
    formData2.append('quantity', formData.quantity);
    formData2.append('productType', formData.productType);
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
     fetch("https://mserver.printbaz.com/blankHoodieOrder",  //add this when upload  in main server 
    //  fetch("http://localhost:5000/blankHoodieOrder", //add this when work local server
     
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
 <h3 className='m-4'  style={{cursor:"pointer"}} onClick={handleBack}> <img style={{width:"20px"}} src='/images/left-arrow.png' alter="backTocategory"/>   Blank Hoodie</h3>
 <Form onSubmit={handleSubmit}  className="mb-4">

<Row xs={1} md={5} className="g-4 m-3">
 
{formData.orderDetailArr.map((item, index) => (
    <Col>
   <Card >
       <Card.Title className='m-auto p-3' style={{backgroundColor:"#001846",color:"white",width:"100%",textAlign:"center"}}>{item.color}
           <input data-color={item.color} name="color" type="hidden" value={item.color} />
       </Card.Title>
       <Card.Img variant="top" src={item?.categoryImg} />
       <ListGroup className="list-group-flush pl-0 pr-0">
           <ListGroup.Item className="d-flex align-items-center">
               <span value="m">M</span>
               <input 
                   data-size="m"
                   data-color={item.color}
                   name="quantityM"
                   type="number"
                   value={item.quantityM}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item>
           <ListGroup.Item className="d-flex align-items-center">
               <span value="L">L</span>
               <input 
                   data-size="L"
                   data-color={item.color}
                   name="quantityL"
                   type="number"
                   value={item.quantityL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item> 
            <ListGroup.Item className="d-flex align-items-center">
               <span value="XL">XL</span>
               <input 
                   data-size="XL"
                   data-color={item.color}
                   name="quantityXL"
                   type="number"
                   value={item.quantityXL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item>
           <ListGroup.Item className="d-flex align-items-center">
               <span value="XXL">XXL</span>
               <input 
                   data-size="XXL"
                   data-color={item.color}
                   name="quantityXXL"
                   type="number"
                   value={item.quantityXXL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item>  
       </ListGroup>
       
   </Card>
   </Col>

))}


</Row>
<hr />
<div className='row m-5'>
<div className="col-md-6">
                    <h3>Recipient Details</h3>
      <Row xs={1} md={2}>
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
                    </Row>
                   <Row xs={1} md={3}>
                    <Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">District</Form.Label>
                      <Form.Control
                        as="select"
                        name="districts"
                        value={formData.districts}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select District</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>
           <Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Zone</Form.Label>
                      <Form.Control
                        as="select"
                        name="zones"
                        value={formData.zones}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select Zone</option>
        {zones.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>
<Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Area</Form.Label>
                      <Form.Control
                        as="select"
                        name="areas"
                        value={formData.areas}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select Area</option>
        {areas.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>
                    </Row>


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
                  <div className="col-md-6 d-flex flex-column align-items-center ">            
<div style={{ width: '100%' }}>
                    <h3>Cost Of Order</h3>
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Total Quantity</label>
      
                      <h3>
                        {" "}
                        {/* <span style={{ fontSize: "" }}>&#2547;</span> {addbrandLogo ?parseInt(printbazcost+5):printbazcost} */}
                        <span style={{ fontSize: "" }}>{formData?.quantity}</span> 
                      </h3>
                    </div> <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Printbaz Cost</label>
      
                      <h3>
                        {" "}
                        {/* <span style={{ fontSize: "" }}>&#2547;</span> {addbrandLogo ?parseInt(printbazcost+5):printbazcost} */}
                        <span style={{ fontSize: "" }}>&#2547;</span> {printbazcost}
                      </h3>
                    </div>
      
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Delivery Fee</label>
      
                      <h3>
                        {" "}
                        <span style={{ fontSize: "" }}>&#2547;</span>{" "}
                        {deliveryFee}
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
                             value={ printbazcost && (deliveryFee) && suggestedCollectAmount ?suggestedCollectAmount : '' }
                             readOnly
                           />
                         </Form.Group>
                        
                    
                   
                     
                      </div>
                    </div>
                    
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Cash Handling fee</label>{" "}
                      <h3> 3%</h3>
                    </div>
      
                    {/* {formData?.quantity && formData?.orderDetailArr[0]?.printSize && formData?.collectAmount && ( */}
                      <div >
                        <div className="costOrder_Style">
                        <label htmlFor="printbazCost">You will receive</label>
                        <h3> {recvMoney>0 && parseInt(recvMoney)}</h3>
                        </div>
                       
                      
                        { formValid===true &&
    <p style={{color:"red",textAlign:"right"}}>{recvAmount}</p>
  }
                       
                      </div>
                    {/* )} */}
                  </div>
                  <Button  className='orderSubmit_btn' type="submit">
        Submit
      </Button>

      {/* <Button
                      type="reset"
                      style={{ backgroundColor: "gray", marginLeft: "10px" }}
                    >
                      Cancel
                    </Button> */}
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
<div className="row m-5">
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
 
          {/* new order all design will be here  */}
            {showAlert===true && (
          
<CustomAlert
message="Your order has been submitted"
message2="Please keep an eye on the order for further development."
onClose={() => setShowAlert(false)}


/>


)


}

 <Footer/>

          </div>
  
      );
};

export default BlankHoodie;

