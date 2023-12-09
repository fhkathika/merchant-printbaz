import React, { useContext, useEffect, useState } from 'react';
import  '../../css/productStyles.css'
import {  Form ,Button, OverlayTrigger, Tooltip, ProgressBar, Spinner, Row, Col, Card, ListGroup, Container, Nav, Tabs, Tab} from 'react-bootstrap';
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
import useFilterValueBasedonCategory from '../../hooks/useFilterValueBasedonCategory';
import ProductInfoTab from '../productInfoTab/ProductInfoTab';
const CustomHoodie = () => {
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
    productType:'Custom hoodie',
    orderDetailArr: [
      {
        color: 'Black',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/VDp04Mx/Hoodies-Black-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
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
        categoryImg:"https://i.ibb.co/v36RXc6/Hoodies-Neon-Green-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
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
        categoryImg:"https://i.ibb.co/JjFmL11/Hoodies-Nevy-Blue-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo: null,
      }, 
       {
        color: 'Gray',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/NKhyMyp/Hoodies-Gray-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo: null,
      }, 
      {
        color: 'Red',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/MRf1tBD/Hoodies-Red-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
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
  const [alert, setAlert] = useState(false);

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
    const { tshirtPrice } = useGetTshirtPrice();
    const {dynamicFrontPrices} = useDynamicFrontSidePrice();
    const {
      customHoodieinputFront11p7X16p5,
      customHoodieinputFront10X14,
      customHoodieinputFront10X10,
      customHoodieinputFront10X5,
      customHoodieinputFront5X5,
      customHoodieinputFront2p5X5,
      customHoodieinputFront2p5X2p5,
      customHoodieinputBack11p7X16p5,
      customHoodieinputBack10X14,
      customHoodieinputBack10X10,
      customHoodieinputBack10X5,
      customHoodieinputBack5X5,
      customHoodieinputBack2p5X5,
      customHoodieinputBack2p5X2p5}=useFilterValueBasedonCategory()
    let price_11p7x16p5=customHoodieinputFront11p7X16p5?.frontSideprice
    let price_10x14=customHoodieinputFront10X14?.frontSideprice
    let price_10x10=customHoodieinputFront10X10?.frontSideprice
    let price_10x5=customHoodieinputFront10X5?.frontSideprice
    let price_5X5=customHoodieinputFront5X5?.frontSideprice
    let price_2p5X5=customHoodieinputFront2p5X5?.frontSideprice
    let price_2p5X2p5=customHoodieinputFront2p5X2p5?.frontSideprice

//     let backSideDtfprice_11p7x16p5=150
// let backSideDtfprice_10x14=113
// let backSideDtfprice_10x10=57
// let backSideDtfprice_10x5=29
// let backSideDtfprice_5X5=15
// let backSideDtfprice_2p5X5=8
// let backSideDtfprice_2p5X2p5=4
// let additionalCost=10


let backSideDtfprice_11p7x16p5=customHoodieinputBack11p7X16p5?.backSideprice
let backSideDtfprice_10x14=customHoodieinputBack10X14?.backSideprice
let backSideDtfprice_10x10=customHoodieinputBack10X10?.backSideprice
let backSideDtfprice_10x5=customHoodieinputBack10X5?.backSideprice
let backSideDtfprice_5X5=customHoodieinputBack5X5?.backSideprice
let backSideDtfprice_2p5X5=customHoodieinputBack2p5X5?.backSideprice
let backSideDtfprice_2p5X2p5=customHoodieinputBack2p5X2p5?.backSideprice
console.log(" hoodie ............. backSideDtfprice_11p7x16p5",backSideDtfprice_11p7x16p5)
let additionalCost=tshirtPrice[0]?.additionalCost

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

    if (name==="color" || name==="teshirtSize" || name==="quantityM" ||  name==="quantityL"|| name==="quantityXL"||  name==="quantityXXL"|| name==="quantityXXXL"|| name==="printSize"|| name==="printSide" || name==="printSizeBack") {
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
        safeParseInt(item.quantityXXL)+ 
        safeParseInt(item.quantityXXXL), 
0);
    
    // Update state
    setFormData(prevState => ({
        ...prevState,
        orderDetailArr: newOrderDetailArr,
        quantity: parseInt(newGrandQuantity)
    }));
}

  
   console.log("formData",formData);
  // const handleFileChange = (event, index) => {
  //   const { name, files } = event.target;
  //   if (name==="file" || name==="image" || name==="brandLogo") {
  //     // const fieldName = name.split('.')[1];
  //     const newOrderDetailArr = [...formData.orderDetailArr];
  //      // Change from a single file to an array of files
  //     newOrderDetailArr[index][[event.target.name]] =Array.from(files);
  //     setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
    
  //   }
  // };
  const [addBrandLogoArray, setAddBrandLogoArray] = useState([]);
  const handleFileChange = (event, index) => {
    const { name, files } = event.target;
    const updatedBrandLogoArray = [...addBrandLogoArray];
    if (name==="file" || name==="image" || name==="brandLogo") {
      if (name === "brandLogo") {
        updatedBrandLogoArray[index] = files && files.length > 0;;
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
                       safeParseInt(item.quantityXXL)+
                       safeParseInt(item.quantityXXXL);
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
      // if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="11.7 x 16.5" ){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 160
      // }
      // if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="10 x 14" ){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 125
      // }
      // else if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="10 x 10"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 68
      // } else if( formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="10 x 5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 39
      // } else if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="5 X 5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 25
      // }
      // else if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="2.5 X 5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 18
      // }
      //  else if(formData?.orderDetailArr[i]?.printSide==="bothSide" && formData?.orderDetailArr[i]?.printSizeBack==="2.5 X 2.5"){
      //   backSidePrintCost+= formData?.orderDetailArr[i]?.totalQuantity * 15
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
  if(formData?.quantity<=0){
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
    formData2.append('category', "Custom Hoodie");
    formData2.append('districts', formData.districts);
    formData2.append('zones', formData.zones);
    formData2.append('areas', formData.areas);
    formData2.append('collectAmount', formData.collectAmount);
    formData2.append('quantity', formData.quantity);
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
     fetch("https://mserver.printbaz.com/submitCustomHoodieOrder",  //add this when upload  in main server 
    //  fetch("http://localhost:5000/submitCustomHoodieOrder", //add this when work local server
     
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
          
            <hr />
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
  <Col xs={12} md={12} className='mt-5  mb-2 '>

  <h3 className='headerName'  style={{cursor:"pointer"}}  onClick={handleBack}><span style={{cursor:"pointer"}} > <img style={{width:"20px"}} src='/images/left-arrow.png' alter="backTocategory"/></span>   Custom Hoodie</h3>
  </Col>
</Row>
<ProductInfoTab />
 <Form onSubmit={handleSubmit}  className="mb-4">

 {/* <table class="size_table">
<thead>
  <tr>
    <th class="tg-0lax_title tg-0lax">SIZE</th>
    <th class="tg-0lax_title tg-0lax">XS</th>
    <th class="tg-0lax_title tg-0lax">M</th>
    <th class="tg-0lax_title tg-0lax">L</th>
    <th class="tg-0lax_title tg-0lax">XL</th>
    <th class="tg-0lax_title tg-0lax">XXL</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">CHEST</td>
    <td class="tg-0lax">13.5</td>
    <td class="tg-0lax">40</td>
    <td class="tg-0lax">42</td>
    <td class="tg-0lax">44</td>
    <td class="tg-0lax">45</td>
  </tr>
  <tr>
    <td class="tg-0lax">LENGHT</td>
    <td class="tg-0lax">18</td>
    <td class="tg-0lax">27</td>
    <td class="tg-0lax">28</td>
    <td class="tg-0lax">29</td>
    <td class="tg-0lax">29</td>
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
     
       <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={item?.categoryImg} />
                
             
                {index === 3 && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)', // 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <h1 style={{fontWeight:"700"}}>Out of stock</h1> 
                    </div>
                )}
            </div>
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
                        {
                          index === 3 ?
                          <>
                          <option value="">select print size</option> 
                          <option value="11.7 x 16.5">11.7″ x 16.5″(A3) <spna > (Out of stock)</spna></option>
                          <option value="10 x 14">10″ x 14″  <spna > (Out of stock)</spna></option>
                          <option value="10 x 10">10″ x 10″(A4) <spna > (Out of stock)</spna></option>
                          <option value="10 x 5">10″ x 5″ <spna > (Out of stock)</spna></option>
                          <option value="5 X 5">5″ x 5″ <spna > (Out of stock)</spna></option>
                          <option value="2.5 X 5">2.5″ x 5″ <spna > (Out of stock)</spna></option>
                          <option value="2.5 X 2.5">2.5″ x 2.5″ <spna > (Out of stock)</spna></option>
                          </>
                          :
                          <>
                          <option value="">select print size</option> 
                          <option value="11.7 x 16.5">11.7″ x 16.5″(A3)</option>
                          <option value="10 x 14">10″ x 14″</option>
                          <option value="10 x 10">10″ x 10″(A4)</option>
                          <option value="10 x 5">10″ x 5″</option>
                          <option value="5 X 5">5″ x 5″</option>
                          <option value="2.5 X 5">2.5″ x 5″</option>
                          <option value="2.5 X 2.5">2.5″ x 2.5″</option>
                          </>
                        }
                     
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
                        {
                            index === 0 ?
                            <>
                            <option value="">select print size</option> 
                            <option value="11.7 x 16.5">11.7″ x 16.5″(A3) <spna > (Out of stock)</spna></option>
                             <option value="10 x 14">10″ x 14″ <spna > (Out of stock)</spna></option>
                             <option value="10 x 10">10″ x 10″(A4) <spna > (Out of stock)</spna></option>
                             <option value="10 x 5">10″ x 5″ <spna > (Out of stock)</spna></option>
                             <option value="5 X 5">5″ x 5″ <spna > (Out of stock)</spna></option>
                             <option value="2.5 X 5">2.5″ x 5″ <spna > (Out of stock)</spna></option>
                             <option value="2.5 X 5">2.5″ x 2.5″ <spna > (Out of stock)</spna></option>
                             </>
                             :
                             <>
                             <option value="">select print size</option> 
                             <option value="11.7 x 16.5">11.7″ x 16.5″(A3)</option>
                              <option value="10 x 14">10″ x 14″</option>
                              <option value="10 x 10">10″ x 10″(A4)</option>
                              <option value="10 x 5">10″ x 5″</option>
                              <option value="5 X 5">5″ x 5″</option>
                              <option value="2.5 X 5">2.5″ x 5″</option>
                              <option value="2.5 X 5">2.5″ x 2.5″</option>
                              </>
                        }
                       
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
                      {
                          index === 0 ?
                          <>
                          <option value="">select print size</option> 
                          <option value="11.7 x 16.5">11.7″ x 16.5″(A3) <spna style={{color:"red"}} > (Out of stock)</spna></option>
                           <option value="10 x 14">10″ x 14″ <spna > (Out of stock)</spna></option>
                           <option value="10 x 10">10″ x 10″(A4) <spna > (Out of stock)</spna></option>
                           <option value="10 x 5">10″ x 5″ <spna > (Out of stock)</spna></option>
                           <option value="5 X 5">5″ x 5″ <spna > (Out of stock)</spna></option>
                           <option value="2.5 X 5">2.5″ x 5″ <spna > (Out of stock)</spna></option>
                           <option value="2.5 X 2.5">2.5″ x 2.5″ <spna > (Out of stock)</spna></option>
                           </>
                           :
                           <>
                           <option value="">select print size</option> 
                           <option value="11.7 x 16.5">11.7″ x 16.5″(A3)</option>
                            <option value="10 x 14">10″ x 14″</option>
                            <option value="10 x 10">10″ x 10″(A4)</option>
                            <option value="10 x 5">10″ x 5″</option>
                            <option value="5 X 5">5″ x 5″</option>
                            <option value="2.5 X 5">2.5″ x 5″</option>
                            <option value="2.5 X 2.5">2.5″ x 2.5″</option>
                            </>
                      }
                    
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


</Row> */}

<div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/*====== Title ======*/}
        <title>Printbaz | Product Preview</title>
        {/*====== Favicon Icon ======*/}
        <link rel="shortcut icon" href="https://media.discordapp.net/attachments/1128921638977683526/1163824367923368007/Logo-01.jpg?ex=6565e4e8&is=65536fe8&hm=1708566566dde136fc9b7940d92367098c9c3eebe0283875d0f452ff0dbe4ad0&=&width=612&height=612" type="image/png" />
        {/*====== Bootstrap CSS ======*/}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" />
        {/*====== Style CSS ======*/}
       
        {/*====== Main ======*/}
        <section className="mainProduct">
          <div className="container">
            {/*====== Product Area ======*/}
            <div className="row">
              <div className="col-lg-5">
                {/*====== Product Image ======*/}
                <div className="row">
                  <div className="col-12">
                    <div className="productMainImg active show" id="preview1">
                      <img src="https://i.ibb.co/VDp04Mx/Hoodies-Black-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="productMoreImg" id="preview2">
                      <img src="https://i.ibb.co/v36RXc6/Hoodies-Neon-Green-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="productMoreImg">
                      <img src="https://i.ibb.co/JjFmL11/Hoodies-Nevy-Blue-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="productMoreImg">
                      <img src="https://i.ibb.co/NKhyMyp/Hoodies-Gray-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="productMoreImg">
                      <img src="https://i.ibb.co/MRf1tBD/Hoodies-Red-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                </div>
              </div>
              {/*====== Product Information ======*/}
              <div className="col-lg-7">
                <div className="productInformation">
                  {/*====== Product Title ======*/}
                  <div className="productTitle">
                    <h2>Custom Hoodie</h2>
                  </div>
                  {/*====== Product Color/Size/Files/Price/Button ======*/}
                  <div className="productColorSizeRow1">
                    {/*====== Product Color/Size/Files ======*/}
                    <div className="row">
                      <h5>Product Size/Color</h5>
                      <div className="col-lg-8 productSizeRow1">
                        <div className="accordion" id="accordionExample">
                       

{formData.orderDetailArr.map((item, index) => (
  <div className="accordion-item" key={index}>
    <h2 className="accordion-header" id={`heading${index}`}>
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
        {item.color}
        <input data-color={item.color} name="color" type="hidden" value={item.color} />
      </button>
    </h2>
    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
    <div className="accordion-body">
     <div className="productSizeColor">
       <div className="productSize">
         <h6 value="m">M</h6>
         <input 
                   data-size="m"
                   data-color={item.color}
                   name="quantityM"
                   type="text"
                   value={item.quantityM}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
       </div>
       <div className="productSize">
         <h6 value="L">L</h6>
         <input 
                   data-size="L"
                   data-color={item.color}
                   name="quantityL"
                   type="text"
                   value={item.quantityL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
       </div>
       <div className="productSize">
         <h6 value="XL">XL</h6>
         <input 
                   data-size="XL"
                   data-color={item.color}
                   name="quantityXL"
                   type="text"
                   value={item.quantityXL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
       </div>
       <div className="productSize">
         <h6 value="XXL">2XL</h6>
         <input 
                   data-size="XXL"
                   data-color={item.color}
                   name="quantityXXL"
                   type="text"
                   value={item.quantityXXL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
       </div>
       <div className="productSize">
         <h6 value="XXXL">3XL</h6>
         <input 
                   data-size="XXXL"
                   data-color={item.color}
                   name="quantityXXXL"
                   type="text"
                   value={item.quantityXXXL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
       </div>
     </div>
     <div className="productPrintSizeAndFiles">
       <label htmlFor="formFile" className="form-label fileUploadTitle">Print
         Side</label>
       <select className="form-select" aria-label="Default select example"
        data-color={item.color}
        value={item.printSide}
        onChange={(e) => {
           handleInputChange(e,index);
        }}
        name="printSide"
        required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL || item.quantityXXXL}
        
       >
         <option selected>Select Print Side</option>
         <option value="frontSide">Front Side</option>
         <option value="backSide">Back Side</option>
         <option value="bothSide">Both Side</option>
       </select>
       {
 ( item.printSide==="frontSide" || item.printSide==="backSide") &&
 <>
 <label htmlFor="formFile" className="form-label fileUploadTitle">Front
 Side
 Print Size</label>
<select className="form-select" aria-label="Default select example"
 data-color={item.color}
 value={item.printSize}
 onChange={(e) => {
    handleInputChange(e,index);
 }}
 name="printSize"
 required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
>
 <option selected>Select Print Size</option>
 
                          {/* <option value="">select print size</option>  */}
                          <option value="11.7 x 16.5">11.7″ x 16.5″(A3)</option>
                          <option value="10 x 14">10″ x 14″</option>
                          <option value="10 x 10">10″ x 10″(A4)</option>
                          <option value="10 x 5">10″ x 5″</option>
                          <option value="5 X 5">5″ x 5″</option>
                          <option value="2.5 X 5">2.5″ x 5″</option>
                          <option value="2.5 X 2.5">2.5″ x 2.5″</option>
                        
</select>
</>
       }
        {
                      item.printSide==="bothSide" && 
      <>
       <label htmlFor="formFile" className="form-label fileUploadTitle">Back
         Side
         Print Size</label>
       <select className="form-select" aria-label="Default select example" data-color={item.color}
                      name="printSizeBack"
                      value={item?.printSizeBack}
                      onChange={(e) => {
                         handleInputChange(e,index);
                      }}
                     
                      required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}>
         <option selected>Select Print Size</option>
      
                           {/* <option value="">select print size</option>  */}
                           <option value="11.7 x 16.5">11.7″ x 16.5″(A3)</option>
                            <option value="10 x 14">10″ x 14″</option>
                            <option value="10 x 10">10″ x 10″(A4)</option>
                            <option value="10 x 5">10″ x 5″</option>
                            <option value="5 X 5">5″ x 5″</option>
                            <option value="2.5 X 5">2.5″ x 5″</option>
                            <option value="2.5 X 2.5">2.5″ x 2.5″</option>
                            
       </select>
       </>
}
       <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
         Design File</label>
       <input className="form-control" type="file"
                   name="file"
                  
                   onChange={(e) => handleFileChange(e, index)} 
                   required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL || item.quantityXXXL}
                   accept=".ai,.eps,.psd,.pdf,.svg,.png"
                   multiple />
       <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
         Mockup File</label>
       <input className="form-control"  type="file"
                   name="image"
                  
                   required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL ||  item.quantityXXXL}
                   accept="image/*"
                   onChange={(e) => handleFileChange(e, index)}
                   multiple />
       <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
         Brand Logo File</label>
       <input className="form-control" type="file"
name="brandLogo"
accept="image/jpeg, image/png"
onChange={(e) => handleFileChange(e, index)}/>
     </div>
   </div>
    </div>
  </div>
))}


                          {/* <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                White
                              </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                              <div className="accordion-body">
                                <div className="productSizeColor">
                                  <div className="productSize">
                                    <h6>M</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>L</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>XL</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>2XL</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>3XL</h6>
                                    <input type="number" />
                                  </div>
                                </div>
                                <div className="productPrintSizeAndFiles">
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Print
                                    Side</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Side</option>
                                    <option value={1}>Front Side</option>
                                    <option value={2}>Back Side</option>
                                    <option value={3}>Broth Side</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Front
                                    Side
                                    Print Size</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Size</option>
                                    <option value={1}>2.5 X 2.5 In</option>
                                    <option value={2}>2.5 X 5 In</option>
                                    <option value={3}>5 X 5 In</option>
                                    <option value={4}>10 X 5 In</option>
                                    <option value={5}>10 X 10 In</option>
                                    <option value={6}>10 X 14 In</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Back
                                    Side
                                    Print Size</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Size</option>
                                    <option value={1}>2.5 X 2.5 In</option>
                                    <option value={2}>2.5 X 5 In</option>
                                    <option value={3}>5 X 5 In</option>
                                    <option value={4}>10 X 5 In</option>
                                    <option value={5}>10 X 10 In</option>
                                    <option value={6}>10 X 14 In</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Design File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Mockup File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Brand Logo File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Maroon
                              </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                              <div className="accordion-body">
                                <div className="productSizeColor">
                                  <div className="productSize">
                                    <h6>M</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>L</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>XL</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>2XL</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>3XL</h6>
                                    <input type="number" />
                                  </div>
                                </div>
                                <div className="productPrintSizeAndFiles">
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Print
                                    Side</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Side</option>
                                    <option value={1}>Front Side</option>
                                    <option value={2}>Back Side</option>
                                    <option value={3}>Broth Side</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Front
                                    Side
                                    Print Size</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Size</option>
                                    <option value={1}>2.5 X 2.5 In</option>
                                    <option value={2}>2.5 X 5 In</option>
                                    <option value={3}>5 X 5 In</option>
                                    <option value={4}>10 X 5 In</option>
                                    <option value={5}>10 X 10 In</option>
                                    <option value={6}>10 X 14 In</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Back
                                    Side
                                    Print Size</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Size</option>
                                    <option value={1}>2.5 X 2.5 In</option>
                                    <option value={2}>2.5 X 5 In</option>
                                    <option value={3}>5 X 5 In</option>
                                    <option value={4}>10 X 5 In</option>
                                    <option value={5}>10 X 10 In</option>
                                    <option value={6}>10 X 14 In</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Design File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Mockup File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Brand Logo File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFour">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Bottle Green
                              </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                              <div className="accordion-body">
                                <div className="productSizeColor">
                                  <div className="productSize">
                                    <h6>M</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>L</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>XL</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>2XL</h6>
                                    <input type="number" />
                                  </div>
                                  <div className="productSize">
                                    <h6>3XL</h6>
                                    <input type="number" />
                                  </div>
                                </div>
                                <div className="productPrintSizeAndFiles">
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Print
                                    Side</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Side</option>
                                    <option value={1}>Front Side</option>
                                    <option value={2}>Back Side</option>
                                    <option value={3}>Broth Side</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Front
                                    Side
                                    Print Size</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Size</option>
                                    <option value={1}>2.5 X 2.5 In</option>
                                    <option value={2}>2.5 X 5 In</option>
                                    <option value={3}>5 X 5 In</option>
                                    <option value={4}>10 X 5 In</option>
                                    <option value={5}>10 X 10 In</option>
                                    <option value={6}>10 X 14 In</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Back
                                    Side
                                    Print Size</label>
                                  <select className="form-select" aria-label="Default select example">
                                    <option selected>Select Print Size</option>
                                    <option value={1}>2.5 X 2.5 In</option>
                                    <option value={2}>2.5 X 5 In</option>
                                    <option value={3}>5 X 5 In</option>
                                    <option value={4}>10 X 5 In</option>
                                    <option value={5}>10 X 10 In</option>
                                    <option value={6}>10 X 14 In</option>
                                  </select>
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Design File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Mockup File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                  <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
                                    Brand Logo File</label>
                                  <input className="form-control" type="file" id="formFile" />
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    {/*====== Product Price ======*/}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="productPrice">
                          <h5>Product Price</h5>
                          <h6>{printbazcost} Tk</h6>
                          <p>Per Unit {formData?.quantity ?Number(printbazcost/Number(formData?.quantity)):0} Tk</p>
                        </div>
                      </div>
                    </div>
                    {/*====== Product Button ======*/}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="productButton">
                          <button>Buy Now</button>
                          <button>Add To Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></section>
        {/*====== Bootstrap js ======*/}
      </div>

{/* <RecipientDetail 
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
/> */}
 
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

export default CustomHoodie;

