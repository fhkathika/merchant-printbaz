import React, { useContext, useEffect, useState } from 'react';
import {  Form ,Button, OverlayTrigger, Tooltip, ProgressBar, Spinner, Row, Col, Card, ListGroup, Container, Alert} from 'react-bootstrap';
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
import tshirtFormulaCustomDropSholder from '../../Formulas/tshirtFormulaCustomDropSholder';
import deliveryCharge from '../../Formulas/deliveryCharge';
import BackToTop from '../backToTop/BackToTop';
import RecipientDetail from '../recipientDetail/RecipientDetail';
import backsiideFormulaDropSholderHoodie from '../../Formulas/backsiideFormulaDropSholderHoodie';
import useDynamicBckSidePrice from '../../hooks/useDynamicBckSidePrice';
import useGetTshirtPrice from '../../hooks/useGetTshirtPrice';
import useDynamicFrontSidePrice from '../../hooks/useDynamicFrontSidePrice';
const CustomDropSholder = () => {
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
    productType:'custom Drop Sholder',
    orderDetailArr: [
      {
        color: 'Black',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Drop Shoulder Black Custom.jpg",
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
        color: 'White',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Drop Shoulder White Custom.jpg",
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
        color: 'Bottle Green',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Drop Shoulder Bottle Green Custom.jpg",
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
        categoryImg:"/images/categoryImgs/Drop Shoulder Maroon Custom.jpg",
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
   const [alert, setAlert] = useState(false);
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
    const {dynamicBackPrices} = useDynamicBckSidePrice();
    const {dynamicFrontPrices} = useDynamicFrontSidePrice();
    const { tshirtPrice } = useGetTshirtPrice();
    
    let price_11p7x16p5=tshirtPrice[6]?.frontSideprice
    let price_10x14=tshirtPrice[7]?.frontSideprice
    let price_10x10=tshirtPrice[8]?.frontSideprice
    let price_10x5=tshirtPrice[9]?.frontSideprice
    let price_5X5=tshirtPrice[10]?.frontSideprice
    let price_2p5X5=tshirtPrice[11]?.frontSideprice
    let price_2p5X2p5=tshirtPrice[12]?.frontSideprice
    console.log("dynamicFrontPrices",dynamicFrontPrices)
console.log("price_11p7x16p5",price_11p7x16p5)
console.log("price_10x14",price_10x14)
console.log("price_10x10",price_10x10)
console.log("price_10x5",price_10x5)
console.log("price_5X5",price_5X5)
console.log("price_2p5X5",price_2p5X5)
console.log("price_2p5X2p5",price_2p5X2p5)

let backSideDtfprice_11p7x16p5=tshirtPrice[6]?.backSideprice
let backSideDtfprice_10x14=tshirtPrice[7]?.backSideprice
let backSideDtfprice_10x10=tshirtPrice[8]?.backSideprice
let backSideDtfprice_10x5=tshirtPrice[9]?.backSideprice
let backSideDtfprice_5X5=tshirtPrice[10]?.backSideprice
let backSideDtfprice_2p5X5=tshirtPrice[11]?.backSideprice
let backSideDtfprice_2p5X2p5=tshirtPrice[12]?.backSideprice
let additionalCost=tshirtPrice[0]?.additionalCost
console.log("backSideDtfprice_11p7x16p5",backSideDtfprice_11p7x16p5)
console.log("backSideDtfprice_10x14",backSideDtfprice_10x14)
console.log("backSideDtfprice_10x10",backSideDtfprice_10x10)
console.log("backSideDtfprice_10x5",backSideDtfprice_10x5)
console.log("backSideDtfprice_5X5",backSideDtfprice_5X5)
console.log("backSideDtfprice_2p5X5",backSideDtfprice_2p5X5)
console.log("backSideDtfprice_2p5X2p5",backSideDtfprice_2p5X2p5)
console.log("additionalCost",additionalCost)
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

const [addBrandLogoArray, setAddBrandLogoArray] = useState([]);
   console.log("formData",formData);
  const handleFileChange = (event, index) => {
    const { name, files } = event.target;
    const updatedBrandLogoArray = [...addBrandLogoArray];
    if (name==="file" || name==="image" || name==="brandLogo") {
      if (name === "brandLogo") {
        updatedBrandLogoArray[index] = files && files.length > 0;
        setAddBrandLogoArray(updatedBrandLogoArray);
    }
      // const fieldName = name.split('.')[1];
      const newOrderDetailArr = [...formData.orderDetailArr];
       // Change from a single file to an array of files
      newOrderDetailArr[index][[event.target.name]] =Array.from(files);
      setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
  
    }
  };


formData?.orderDetailArr.forEach(item => {
  item.totalQuantity = safeParseInt(item.quantityM) + 
                       safeParseInt(item.quantityL) + 
                       safeParseInt(item.quantityXL) + 
                       safeParseInt(item.quantityXXL);
});

let updatedPrintbazcost=0
  let printbazcost=0;
  let printbazcostbase=0;
  for  (var i = 0; i < formData?.orderDetailArr?.length; i++) {
    if (
      formData?.quantity &&
      formData?.orderDetailArr[i]?.totalQuantity &&
      formData?.orderDetailArr[i]?.printSize &&
      price_11p7x16p5 &&
      price_10x14 &&
      price_10x10 &&
      price_10x5 &&
      price_5X5 &&
      price_2p5X5 &&
      price_2p5X2p5 
     
    ) 
    {
      const totalPrice = tshirtFormulaCustomDropSholder(
        formData?.quantity,
        formData?.orderDetailArr[i]?.totalQuantity,
        formData?.orderDetailArr[i]?.printSize,
        price_11p7x16p5,
        price_10x14,
        price_10x10,
        price_10x5,
        price_5X5,
        price_2p5X5,
        price_2p5X2p5
      ).totalPrice;
   // back side dtf cost plus additional cost 
   let backSidePrintCost =backsiideFormulaDropSholderHoodie(
    formData?.quantity,
    formData?.orderDetailArr[i]?.totalQuantity,
    formData?.orderDetailArr[i]?.printSizeBack,
    formData?.orderDetailArr[i]?.printSide,
    backSideDtfprice_11p7x16p5,
    backSideDtfprice_10x14,
    backSideDtfprice_10x10,
    backSideDtfprice_10x5,
    backSideDtfprice_5X5,
    backSideDtfprice_2p5X5,
    backSideDtfprice_2p5X2p5,
    additionalCost,

  ).backDtfAndAdditionalCost;
  console.log("backSidePrintCost",backSidePrintCost)
      let totalQuantity = formData?.orderDetailArr[i]?.totalQuantity;
      // backSidePrintCost += totalQuantity * 130;
      // if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="11.7 x 16.5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 160
      // } 
      // if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="10 x 14" ){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 125
      // }
      // else if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="10 x 10"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 68
      // } else if(formData?.orderDetailArr[i]?.printSide==="bothSide" &&formData?.orderDetailArr[i]?.printSizeBack==="10 x 5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 39
      // } else if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="5 x 5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 25
      // }
      // else if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="2.5 x 5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 18
      // }  else if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="2.5 X 2.5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 14
      // }
      
      // At this point, backSidePrintCost contains the total cost for the current item's back side print
      
      // if(addbrandLogo===true){
      //   // printbazcost=parseInt(printbazcostbase+5)
        
      //   printbazcostbase = Number(totalPrice)+backSidePrintCost+(5*formData?.orderDetailArr[i]?.totalQuantity);
      //   printbazcost += printbazcostbase;
      //   const test=printbazcost+backSidePrintCost
      //   console.log("printbazcost",printbazcost)
      //   console.log("backSidePrintCost",backSidePrintCost)
      //   console.log("test",test)
      // }
      // else{
      //   printbazcostbase = Number(totalPrice) + backSidePrintCost;
      //   printbazcost +=printbazcostbase;
      
      //   console.log("printbazcost",printbazcost)
      //   console.log("backSidePrintCost",backSidePrintCost)
      // }

      if(addBrandLogoArray[i]){
        // printbazcost=parseInt(printbazcostbase+5)
        let brandLogoCost=5*formData?.orderDetailArr[i]?.totalQuantity
        printbazcostbase = Number(totalPrice)+backSidePrintCost+brandLogoCost;
        console.log("brandLogoCost",brandLogoCost);
        console.log("prinbazcostbaze", Number(totalPrice)+backSidePrintCost ,"+",brandLogoCost);
        printbazcost += printbazcostbase;
        const test=printbazcost+backSidePrintCost
      console.log("addbrandLogo",addbrandLogo);
      }
      else{
        printbazcostbase = Number(totalPrice) + Number(backSidePrintCost);
        printbazcost += printbazcostbase;
      
        console.log("printbazcost",printbazcost)
        console.log("printbazcostbase",printbazcostbase)
        console.log("backSidePrintCost",backSidePrintCost)
        console.log("totalPrice",totalPrice)
      }
    }
    //  else {
    //   if(printbazcostbase){
      
    //     printbazcost= printbazcostbase;
    //   }
    //   else{
    //     printbazcost=0;
    //   }
    //   // or any default value you want to set
    // }
  }
  //  delivery fee functions 
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
  const weightPerShirt=0.205;
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
  if(formData?.quantity===0){
    setAlert(true)
    return
  }
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
      }    if (item.brandLogo) {
        item.brandLogo.forEach((brandLogo, brandLogoIndex) => {
          formData2.append(`brandLogo${index}_${brandLogoIndex}`, brandLogo); // Append each image
        });
      }
        // Append brandLogo

//   if (item.brandLogo) {
//     formData2.append(`brandLogo${index}`, item.brandLogo);
// }
  if (Object.keys(fileAndImageData).length) {
        filesAndImagesArr.push(fileAndImageData);
      }

      formData2.append(`color${index}`, item.color);
      formData2.append(`teshirtSize${index}`, item.teshirtSize);
      // Handle different sizes for quantity
  formData2.append(`quantityM${index}`, item.quantityM);
  formData2.append(`quantityL${index}`, item.quantityL);
  formData2.append(`quantityXL${index}`, item.quantityXL);
  formData2.append(`quantityXXL${index}`, item.quantityXXL);
  
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
    formData2.append('category', "Custom Drop Sholder");
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
     fetch("https://mserver.printbaz.com/customDropSholderOrder",  //add this when upload  in main server 
    //  fetch("http://localhost:5000/customDropSholderOrder", //add this when work local server
     
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
<Row className='m-auto'>
  <Col xs={12} md={12} className='mt-5  mb-2  '>

  <h3 className='headerName'   style={{cursor:"pointer"}}  onClick={handleBack}><span style={{cursor:"pointer"}} > <img style={{width:"20px"}} src='/images/left-arrow.png' alter="backTocategory"/></span>   Custom Drop Sholder</h3>
  </Col>
</Row>

 <Form onSubmit={handleSubmit}  className="mb-4">

 <table class="size_table">
<thead>
  <tr>
    <th class="tg-0lax_title tg-0lax">SIZE</th>
    <th class="tg-0lax_title tg-0lax">M</th>
    <th class="tg-0lax_title tg-0lax">L</th>
    <th class="tg-0lax_title tg-0lax">XL</th>
    <th class="tg-0lax_title tg-0lax">XXL</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">CHEST</td>
    <td class="tg-0lax">42</td>
    <td class="tg-0lax">44</td>
    <td class="tg-0lax">46</td>
    <td class="tg-0lax">48</td>
  </tr>
  <tr>
    <td class="tg-0lax">LENGHT</td>
    <td class="tg-0lax">27</td>
    <td class="tg-0lax">28</td>
    <td class="tg-0lax">29</td>
    <td class="tg-0lax">30</td>
  </tr>
  <tr>
    <td class="tg-0lax">SHOULDER</td>
    <td class="tg-0lax">8</td>
    <td class="tg-0lax">8.5</td>
    <td class="tg-0lax">9</td>
    <td class="tg-0lax">9.5</td>
  </tr>
  <tr>
    <td class="tg-0lax">SLEEVE</td>
    <td class="tg-0lax">8.5</td>
    <td class="tg-0lax">9</td>
    <td class="tg-0lax">9.5</td>
    <td class="tg-0lax">9.8</td>
  </tr>
</tbody>
</table>

<Row className="g-2 m45 m_1responsive700">

{formData.orderDetailArr.map((item, index) => (
  <Col xs={6} md={3}>
  
   <Card  className="">
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
                   type="text"
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
                   type="text"
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
                   type="text"
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
                   type="text"
                   value={item.quantityXXL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item>  
       </ListGroup>
       <Card.Body>
       <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print side</Form.Label>
                      <Form.Control
                        as="select"
                        data-color={item.color}
                        value={item.printSide}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSide"
                        required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                        
                        
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
                        data-color={item.color}
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                      >
                        <option value="">select print size</option> 
                        <option value="11.7 x 16.5">11.7″ x 16.5″(A3)</option>
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″(A4)</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                        <option value="2.5 X 2.5">2.5″ x 2.5″</option>
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
                        data-color={item.color}
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                      >
                       <option value="">select print size</option> 
                       <option value="11.7 x 16.5">11.7″ x 16.5″(A3)</option>
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″(A4)</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                        <option value="2.5 X 2.5">2.5″ x 2.5″</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                    className="mb-3 Print Side w-100 m-auto"
                    controlId="wccalcPrintSide"
                  >
                    <Form.Label className="pr-2">Print Size back</Form.Label>
                    <Form.Control
                      as="select"
                      data-color={item.color}
                      name="printSizeBack"
                      value={item?.printSizeBack}
                      onChange={(e) => {
                         handleInputChange(e,index);
                      }}
                     
                      required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                    >
                     <option value="">select print size</option> 
                     <option value="11.7 x 16.5">11.7″ x 16.5″(A3)</option>
                      <option value="10 x 14">10″ x 14″</option>
                      <option value="10 x 10">10″ x 10″(A4)</option>
                      <option value="10 x 5">10″ x 5″</option>
                      <option value="5 X 5">5″ x 5″</option>
                      <option value="2.5 X 5">2.5″ x 5″</option>
                      <option value="2.5 X 2.5">2.5″ x 2.5″</option>
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
                   required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                   accept=".ai,.eps,.psd,.pdf,.svg,.png"
                   multiple
                 />
                 <p className='uploadFilePlaceholder' style={{color:"gray"}}>upload .ai,.eps,.psd,.pdf,.svg,.png file</p>
               </Form.Group>
               {fileprogress === 0 ? null : (
    <ProgressBar now={fileprogress} label={`${fileprogress}%`} />
     )}
               <Form.Group controlId="formFile" className="mb-3">
                 <Form.Label>Upload Mockup/T-Shirt Demo Picture</Form.Label>
                 <Form.Control
                   type="file"
                   name="image"
                  
                   required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
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
onChange={(e) => handleFileChange(e, index)}
/>
</Form.Group>
       </Card.Body>
   </Card>
   </Col>
))}


</Row>

<RecipientDetail 
formData={formData}
handleInputChange={handleInputChange}
areas={areas}
districts={districts}
zones={zones}
printbazcost={printbazcost}
deliveryFee={deliveryFee}
suggestedCollectAmount={suggestedCollectAmount}
recvMoney={recvMoney}
formValid={formValid}
recvAmount={recvAmount}
alert={alert}
/>
<div className="col-md-12 d-flex flex-column align-items-center ">   

          
                  <Button  className='orderSubmit_btn' type="submit">
        Submit
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




</Form>            
<div className="row m45 m_1responsive700 mb-3">
                <div className="col-12">
                  <h3>Terms and Conditions</h3>
                  <ul>
                    <li>
                      সকাল ১১ টার পরে প্লেইস করা অর্ডার পরের দিন থেকে শিডিউল করা হবে।
                    </li>
                    <li>
                      ভিন্ন ডেলিভারি এড্রেসে ডেলিভারি এর জন্য অবশ্যই “New Order”
                      ক্রিয়েট করতে হবে।{" "}
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
                  <span style={{fontWeight:"bold"}}>
                    {" "}
                    ফেইক কাস্টোমার অথবা রিটার্নের ব্যপারে সতর্ক থাকুন। রিটার্নের
                    খরচ ব্র্যান্ডকেই বিয়ার করতে হবে এবং অত্যাধিক (৩ পিস+) আনপেইড
                    রিটার্নের ক্ষেত্রে একাউন্ট সাস্পেন্ডেড হতে পারে
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
<BackToTop/>
          </div>
  
      );
};

export default CustomDropSholder;

