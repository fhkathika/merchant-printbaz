import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartProvider';
import axios from 'axios';
import RecipientDetail from '../recipientDetail/RecipientDetail';
import { Button, Form, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import deliveryCharge from '../../Formulas/deliveryCharge';
import NavigationBar from '../Navbar/NavigationBar';
import OrderSubmitDoneAlert from '../alert/OrderSubmitDoneAlert';
import ConfirmOrderAlert from '../alert/ConfirmOrderAlert';
import AuthProvider, { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
  const { setFormData,setCartItems,editCartItem,cartItems} = useContext(CartContext);
  const {user,logoutUser}=useContext(AuthContext);
  const mycartItems = cartItems?.filter(item => item?.userRegId === user?._id);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fetchCartItems,setFetchCartItems]=useState([])
  const [noPaymentSystem, setNoPaymentSystem] = useState(false);
  const navigate=useNavigate()
  // State to hold handlers
const [confirmHandlers, setConfirmHandlers] = useState({ onConfirm: () => {}, onClose: () => {} });
const id=user?._id
const fetchOrders = async () => {
  try {
      // const response = await fetch(`http://localhost:5000/getCartItemsbyregid/${id}`);
      const response = await fetch(`https://mserver.printbaz.com/getCartItemsbyregid/${id}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFetchCartItems(data);
  } catch (error) {
      console.error('Error fetching orders:', error);
  }
};
useEffect(()=>{fetchOrders()},[fetchCartItems])
  function removeEmptyArraysFromObject(obj) {
    const newObj = { ...obj }; // Start with a shallow copy of the object
    Object.keys(newObj).forEach(key => {
      if (Array.isArray(newObj[key]) && newObj[key].length === 0) {
        delete newObj[key]; // Remove the property if it's an empty array
      }
    });
    
    return newObj;
  }
  const backtoCart=()=>{
    navigate('/addToCart')
  }
 const copyCartOrders=mycartItems?.map(items=>removeEmptyArraysFromObject(items))

  const currentDate = new Date();
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};
// Now format it using the above method
const formattedDate = currentDate.toLocaleString('en-US', options).replace(',', ' at');

  const [formDataSelected,setFormDataSelected]=useState( {
    name: '',
    lastName:'',
    companyName:'',
    phone: '',
    email:user?.email,
    regId:user?._id,
    address: '',
    instruction: '',
    districts:'',
    zones:'',
    areas:'',
    grandQuantity:0,
    grandCost:0,
    deliveryFee:0,
    discount:0,
    collectAmount:'',
   
    orderCreatedAt:formattedDate,
    paymentSystem:'',
    orderStatus:'Pending',
    paymentStatus:'Unpaid',
    selectedItemsDetailArr: [
    
     
    ],
    
  
  })

  const [districts, setDistricts] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]); 
  const [formValid, setFormValid] = useState(false);
  const [deliveryAreas, setDeliveryAreas] = useState('');
  const [totalDelivFee, setTotalDelivFee] = useState('');
  const [recvAmount,setRecvAmount]=useState()
  // Convert it to a Date object

  const safeParseInt = (str) => {
    const value = parseInt(str);
    return isNaN(value) ? 0 : value;
};

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
    if (formDataSelected?.districts) {
      // axios.get(`http://localhost:5000/zones?district=${encodeURIComponent(formDataSelected?.districts)}`)
      axios.get(`https://mserver.printbaz.com/zones?district=${encodeURIComponent(formDataSelected?.districts)}`)
        .then(response => {
          setZones(response.data);
        })
        .catch(error => {
          console.error('Error fetching zones:', error);
          setZones([]);  // Optionally, clear zones if the fetch fails
        });
    } else {
      setZones([]); // Clear zones if the district is not selected
      setAreas([]); // Clear areas as well, as they depend on the zone
    }
  }, [formDataSelected?.districts]);
  
    // Fetch areas based on selected zone
    useEffect(() => {
      if (formDataSelected?.zones) {
        // axios.get(`http://localhost:5000/areas/${encodeURIComponent(formDataSelected?.zones)}`)
        axios.get(`https://mserver.printbaz.com/areas/${encodeURIComponent(formDataSelected?.zones)}`)
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
    }, [formDataSelected?.zones]);

  
    // fetch delievryArea 
    useEffect(() => {
      if (formDataSelected?.districts && formDataSelected?.zones && formDataSelected?.areas) {
      
        // axios.get(`http://localhost:5000/deliveryAreaByLocation?District=${formDataSelected?.districts}&Zone=${formDataSelected?.zones}&Area=${formDataSelected?.areas}`)
        axios.get(`https://mserver.printbaz.com/deliveryAreaByLocation?District=${formDataSelected?.districts}&Zone=${formDataSelected?.zones}&Area=${formDataSelected?.areas}`)
          .then((res) => setDeliveryAreas(res.data.deliveryArea))
          .catch((error) => console.error('Error fetching deliveryArea:', error));
      }
    }, [formDataSelected?.districts ,formDataSelected?.zones , formDataSelected?.areas]);
  
const allCustomRoundNeckProducts = fetchCartItems?.filter(obj => 
  obj.orderDetailArr.some(item => item.productType === "Custom Round Neck tshirt")
);

const allCustomDropSholderProducts = fetchCartItems?.filter(obj => 
  obj.orderDetailArrCustomDropSholder.some(dropSholder => dropSholder.productType === 'custom Drop Sholder')
);
const allCustomHoodieProducts = fetchCartItems?.filter(obj => 
  obj.orderDetailArrCustomHoodie.some(hoodie => hoodie?.productType === 'Custom hoodie')
);
const allBlankRoundNeckProducts = fetchCartItems?.filter(obj => 
  obj.orderDetailArrBlankRoundNeck.some(blankRoundNeck => blankRoundNeck.productType === 'Blank Round Neck')
);
const allBlankDropSholderProducts = fetchCartItems?.filter(obj => 
  obj.orderDetailArrBlankDropSholder.some(blankDropSholder => blankDropSholder.productType === 'Blank Drop Sholder')
);
const allBlankHoodieProducts = fetchCartItems?.filter(obj => 
  obj.orderDetailArrBlankHoodie.some(blankHoodie => blankHoodie.productType === 'Blank Hoodie')
);

const [showContent, setShowContent] = useState(false);

const handleMouseEnter = () => {
  setShowContent(true);
};

const handleMouseLeave = () => {
  setShowContent(false);
};
// get individual product cost and quantity 
const [individualCostCustomRoundNeckProductCost, setIndividualProductCost] = useState(0);
const [individualCustomRoundNeckQuantity, setIndividualProductQuantity] = useState(0);
const [individualCustomDropSholdProductCost, setIndividualCustomDropSholdProductCost] = useState(0);
const [individualCustomDropSholdQuantity, setIndividualCustomDropSholdQuantity] = useState(0);
const [individualCustomHoodieProductCost, setindividualCustomHoodieProductCost] = useState(0);
const [individualCustomHoodieQuantity, setIndividualCustomHoodieQuantity] = useState(0);
const [individualBlankRoundNeckProductCost, setIndividualBlankRoundNeckProductCost] = useState(0);
const [individualBlankRoundNeckQuantity, setIndividualBlankRoundNeckQuantity] = useState(0);
const [individualBlankDropSholProductCost, setIndividualBlankDropSholProductCost] = useState(0);
const [individualBlankDropSholQuantity, setIndividualBlankDropSholQuantity] = useState(0);
const [individualBlankHoodieProductCost, setIndividualBlankHoodieProductCost] = useState(0);
const [individualBlankHoodieQuantity, setIndividualBlankHoodieQuantity] = useState(0);
let totalTshit=individualCustomRoundNeckQuantity+individualBlankRoundNeckQuantity
let totalDropSholder=individualCustomDropSholdQuantity+individualBlankDropSholQuantity
let totalHoodie=individualCustomHoodieQuantity+individualBlankHoodieQuantity


let totalOrderItemQuantity=mycartItems?.reduce((acc, item) => 
acc + safeParseInt(item.quantity) , 0);

const getIndividualProductCostSumAndQuantity=(indiviaualFilterProduct)=>{

   const productCost = indiviaualFilterProduct?.reduce((total, item) => {
    return total + item.printbazcost;
  }, 0);
 const productQuantity = indiviaualFilterProduct?.reduce((acc, item) => 
acc + safeParseInt(item.quantity) , 0);
// setIndividualProductCost(productCost)
// setIndividualProductQuantity(productQuantity)
return{productQuantity,productCost}
}

useEffect(()=>{
  if(allCustomRoundNeckProducts) {
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allCustomRoundNeckProducts)
    setIndividualProductCost( productCost)
    setIndividualProductQuantity(productQuantity)
  
  }
  if(allCustomDropSholderProducts) {
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allCustomDropSholderProducts)
    setIndividualCustomDropSholdProductCost(productCost)
    setIndividualCustomDropSholdQuantity(productQuantity)
  }
  if(allCustomHoodieProducts) {
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allCustomHoodieProducts)
  
    setindividualCustomHoodieProductCost(productCost)
    setIndividualCustomHoodieQuantity(productQuantity)
  }
  if(allBlankRoundNeckProducts) {
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allBlankRoundNeckProducts)
    setIndividualBlankRoundNeckProductCost(productCost)
    setIndividualBlankRoundNeckQuantity(productQuantity)
  }
  if(allBlankDropSholderProducts) {
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allBlankDropSholderProducts)
    setIndividualBlankDropSholProductCost(productCost)
    setIndividualBlankDropSholQuantity(productQuantity)
  }
  if(allBlankHoodieProducts) {
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allBlankHoodieProducts)
  
    setIndividualBlankHoodieProductCost(productCost)
    setIndividualBlankHoodieQuantity(productQuantity)
  }

},[allCustomRoundNeckProducts,allCustomDropSholderProducts,allCustomHoodieProducts,allBlankRoundNeckProducts,allBlankDropSholderProducts,allBlankHoodieProducts])

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
  const weightPerShirt=0.18;
  const weightPerHoodie=0.465;
  const weightPerDropSholder=0.205;
  const extraInSideDhakaChange=15
  const extraOutSideDhakaChange=25
  let grandQuantity=totalOrderItemQuantity

  let deliveryFee = 0; // Initialize fees as 0

  // Check if grandQuantity is defined and greater than 0
  if (grandQuantity && grandQuantity > 0) {
    deliveryFee = deliveryCharge({
      grandQuantity: grandQuantity,
      weightPerShirt: weightPerShirt,
      weightPerHoodie:weightPerHoodie,
      weightPerDropSholder:weightPerDropSholder,
      totalTshit:totalTshit,
      totalDropSholder:totalDropSholder,
      totalHoodie:totalHoodie,
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
  const allProductsPrintbazCost = mycartItems?.reduce((total, item) => {
    return total + item.printbazcost;
}, 0);
let addeDiscount=0 //here discount finction will be added later
if(formDataSelected.paymentSystem === "bkashNagadRocket"){
  let calculateDiscount=formDataSelected.grandCost*0.1
  if(calculateDiscount<=50){
    addeDiscount=calculateDiscount
  }
  else{
    addeDiscount=50
  }
}let recvMoney = 0;
let costHandlingfee;
let recvMoneyWithouthandling = 0;
recvMoneyWithouthandling = Number(
  // Math.ceil(formDataSelected.collectAmount - (formDataSelected?.printbazcost + deliveryFee))
  Math.ceil(formDataSelected.collectAmount - (formDataSelected?.grandCost))
);
// costHandlingfee = recvMoneyWithouthandling * 0.03;
costHandlingfee = Number(formDataSelected.collectAmount * 0.03);
// recvMoney = recvMoneyWithouthandling - costHandlingfee;
if(formDataSelected.collectAmount===0){
  recvMoney = 0;
}
else{
  recvMoney = recvMoneyWithouthandling;
}


let suggestedCollectAmount = Math.ceil((1 + formDataSelected?.grandCost) / 0.97);
const validateForm = () => {
  if (recvMoney < 0 &&formDataSelected.paymentSystem === "cashOnDelivery" ) {
    setFormValid(true);
    setRecvAmount("Received money cannot be less than 0.");
    return true;
  } else {
    setFormValid(false);
    return false;
  }
};

let orderTotalCalculation=mycartItems?.reduce((total, item) => {
  return total + item.printbazcost;
}, 0)+deliveryFee-Number(addeDiscount);

let orderTotal=Math.ceil(orderTotalCalculation+(orderTotalCalculation*0.03))

const handleInputChange = (event, index) => {
  const { name, value } = event.target;
  const color = event.target.getAttribute('data-color');
  const size = event.target.getAttribute('data-size');
  const newOrderDetailArr =[...formDataSelected?.selectedItemsDetailArr];

 
    setFormDataSelected({ ...formDataSelected, [name]: value });
   
 
}

const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;
  if (checked && formDataSelected.paymentSystem === "bkashNagadRocket") {
      setFormDataSelected(prevState => ({
          ...prevState,
          paymentSystem: name,
          grandCost:orderTotal,
          discount:addeDiscount
         
      }));
  } 
  if (checked) {
      setFormDataSelected(prevState => ({
          ...prevState,
          paymentSystem: name,
          grandCost:orderTotal,
          discount:addeDiscount
      }));
  } 
  
  else {
      // If the checkbox is unchecked, clear the paymentSystem
      setFormDataSelected(prevState => ({
          ...prevState,
          paymentSystem: '',
      }));
  }
};

const getToBeOrerDetail=()=>{
 const newItems = copyCartOrders.flatMap(cartItem => {
  // Extract and transform relevant arrays from cartItem
  return Object.entries(cartItem).flatMap(([key, value]) => {
    if (key.includes("orderDetailArr") && Array.isArray(value)) {
      return [{
        productType: key, // or derive the product type based on your logic
        perItemQuantity: cartItem.quantity,
        printbazcost: cartItem.printbazcost,
        individualProductArr: value.map(individualItem => ({
          ...individualItem // Assuming the structure matches individualProductArr
        }))
      }];
    }
    return [];
  });
});


  // Use setFormDataSelected to update the state
  setFormDataSelected(prevFormData => ({
    ...prevFormData, // Copy all the existing state
    selectedItemsDetailArr: [
      // ...prevFormData?.selectedItemsDetailArr,
      ...newItems.filter(item => item?.productType !== '' && item?.individualProductArr.length > 0)

    ],
    grandQuantity:grandQuantity,
     grandCost:orderTotal,
      deliveryFee:deliveryFee,
      discount:addeDiscount
  }));
}
useEffect(()=>{getToBeOrerDetail()},[formDataSelected])
const handleConfirmOrder = () => {
  return new Promise((resolve) => {
    const handleConfirm = () => {
      resolve(true); // User confirmed
      setIsConfirmAlertOpen(false); // Close the alert
    };

    const handleClose = () => {
      resolve(false); // User cancelled
      setIsConfirmAlertOpen(false); // Close the alert
    };

    // Set state to render the ConfirmOrderAlert component
    setIsConfirmAlertOpen(true);

    // Pass these handlers to the ConfirmOrderAlert component
    setConfirmHandlers({ onConfirm: handleConfirm, onClose: handleClose });
  });
};

const handleSubmitOrder=async(e)=>{
  e.preventDefault()
 if (validateForm()) {
  setIsLoading(false) // Set loading status to false if form is invalid
  return; // Exit the function if form is invalid
}
 // Check if a payment system is selected
 if (!formDataSelected.paymentSystem) {
  setNoPaymentSystem(true);
  return;
}
 const isConfirmed = await handleConfirmOrder(); // Wait for user's decision
  if (!isConfirmed) {
    return; // Exit if user cancels
  }
  
  setIsLoading(true); // Start loading before the fetch request
  getToBeOrerDetail()
  // Create a FormData object to handle files
  const formDataSendOrdertoServer = new FormData();

 
 // Iterate over each item in selectedItemsDetailArr
 formDataSelected.selectedItemsDetailArr?.forEach((item, index) => {
  // Iterate over each individual product in individualProductArr
  item?.individualProductArr?.forEach((product, productIndex) => {
    // Append file and image IDs if they exist
    if (product?.file?.fileId) {
      formDataSendOrdertoServer.append(`file${index}_${productIndex}`, product.file.fileId);
    }
    if (product?.image?.fileId) {
      formDataSendOrdertoServer.append(`image${index}_${productIndex}`, product.image.fileId);
    }

    formDataSendOrdertoServer.append(`color${index}_${productIndex}`, product.color);
    formDataSendOrdertoServer.append(`productType${index}_${productIndex}`, product.productType);
    formDataSendOrdertoServer.append(`teshirtSize${index}_${productIndex}`, product.teshirtSize);
    formDataSendOrdertoServer.append(`quantityM${index}_${productIndex}`, product.quantityM);
    formDataSendOrdertoServer.append(`quantityL${index}_${productIndex}`, product.quantityL);
    formDataSendOrdertoServer.append(`quantityXL${index}_${productIndex}`, product.quantityXL);
    formDataSendOrdertoServer.append(`quantityXXL${index}_${productIndex}`, product.quantityXXL);
    formDataSendOrdertoServer.append(`quantityXXXL${index}_${productIndex}`, product.quantityXXXL);
    formDataSendOrdertoServer.append(`printSize${index}_${productIndex}`, product.printSize);
    formDataSendOrdertoServer.append(`printSizeBack${index}_${productIndex}`, product.printSizeBack);
    formDataSendOrdertoServer.append(`printSide${index}_${productIndex}`, product.printSide);
    formDataSendOrdertoServer.append(`totalQuantity${index}_${productIndex}`, product.totalQuantity);
  });
  formDataSendOrdertoServer.append(`printbazcost${index}`,item.printbazcost);
  formDataSendOrdertoServer.append(`quantity${index}`,item.quantity);
});
  formDataSendOrdertoServer.append('selectedItemsDetailArr', JSON.stringify(formDataSelected?.selectedItemsDetailArr)); // Add your data as a JSON string
  formDataSendOrdertoServer.append("name",formDataSelected?.name);
  formDataSendOrdertoServer.append("lastName",formDataSelected?.lastName);
  formDataSendOrdertoServer.append("companyName",formDataSelected?.companyName);
  formDataSendOrdertoServer.append("phone",formDataSelected?.phone);
  formDataSendOrdertoServer.append("userMail",user?.email);
  formDataSendOrdertoServer.append("regId",user?._id);
  formDataSendOrdertoServer.append('createdAt', formattedDate);
 
  formDataSendOrdertoServer.append('clientName', user?.name);
  formDataSendOrdertoServer.append('clientbrandName', user?.brandName);
  formDataSendOrdertoServer.append("address",formDataSelected?.address);
  formDataSendOrdertoServer.append("instruction",formDataSelected?.instruction);
  formDataSendOrdertoServer.append("districts",formDataSelected?.districts);
  formDataSendOrdertoServer.append("zones",formDataSelected?.zones);
  formDataSendOrdertoServer.append("areas",formDataSelected?.areas);
  formDataSendOrdertoServer.append("grandQuantity",formDataSelected?.grandQuantity);
  formDataSendOrdertoServer.append("grandCost",formDataSelected?.grandCost);
  formDataSendOrdertoServer.append("printbazcost",allProductsPrintbazCost);
  formDataSendOrdertoServer.append("deliveryFee",formDataSelected?.deliveryFee);
  formDataSendOrdertoServer.append("discount",formDataSelected?.discount);
  formDataSendOrdertoServer.append("collectAmount",formDataSelected?.collectAmount);
  formDataSendOrdertoServer.append("recvMoney",recvMoney);
  formDataSendOrdertoServer.append("orderCreatedAt",formDataSelected?.orderCreatedAt);
  formDataSendOrdertoServer.append("paymentSystem",formDataSelected?.paymentSystem);
  formDataSendOrdertoServer.append("orderStatus",formDataSelected?.orderStatus);
  formDataSendOrdertoServer.append("paymentStatus",formDataSelected?.paymentStatus);
  formDataSendOrdertoServer.append('createdAt', formattedDate);

  
    try {
      // const response = await fetch('http://localhost:5000/sendOrder', {
      const response = await fetch('https://mserver.printbaz.com/sendOrder', {
        method: 'POST',
        body: formDataSendOrdertoServer
      });
  // Clear cartItems from state and localStorage on successful submission
  setCartItems([]); // Assuming setCartItems is your state updater function for cart items
  localStorage.removeItem('cartItems'); // Clear cart items from localStorage
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
       
  // Update the cart items in the database
  // await fetch(`http://localhost:5000/deleteAllCartItems`, {
await fetch(`https://mserver.printbaz.com/deleteAllCartItems`, {
    method: 'DELETE',
  });

      setShowAlert(true)
     setFormDataSelected( 
      {
        name: '',
        lastName:'',
        companyName:'',
        phone: '',
        email:'',
        address: '',
        instruction: '',
        districts:'',
        zones:'',
        areas:'',
        grandQuantity:0,
        grandCost:0,
        deliveryFee:0,
        discount:0,
        orderCreatedAt:formattedDate,
        selectedItemsDetailArr: [
         
         
        ],
        
      
      })
      // You can add additional logic here based on the response
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error (e.g., show an error message to the user)
    }

    finally {
      setIsLoading(false); // Set loading status to false
    }

 
}


  return (
    <>
     
        <div>
        <title>Printbaz</title>
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <NavigationBar/>
        {/*====== Favicon Icon ======*/}
        <link rel="shortcut icon" href="https://media.discordapp.net/attachments/1128921638977683526/1163824367923368007/Logo-01.jpg?ex=6565e4e8&is=65536fe8&hm=1708566566dde136fc9b7940d92367098c9c3eebe0283875d0f452ff0dbe4ad0&=&width=612&height=612" type="image/png" />
        {/*====== Bootstrap CSS ======*/}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" />
        <style dangerouslySetInnerHTML={{__html: "\n    /* Blocks */\n    .site-blocks-cover {\n      background-size: cover;\n      background-repeat: no-repeat;\n      background-position: center center;\n    }\n\n    .site-blocks-cover,\n    .site-blocks-cover .row {\n      min-height: 600px;\n      height: calc(100vh - 174px);\n    }\n\n    .site-blocks-cover h1 {\n      font-size: 30px;\n      font-weight: 900;\n      color: #000;\n    }\n\n    @media (min-width: 768px) {\n      .site-blocks-cover h1 {\n        font-size: 50px;\n      }\n    }\n\n    .site-blocks-cover p {\n      color: #333333;\n      font-size: 20px;\n      line-height: 35px;\n    }\n\n    .site-blocks-cover .intro-text {\n      font-size: 16px;\n      line-height: 1.5;\n    }\n\n    .site-blocks-1 {\n      border-bottom: 1px solid #edf0f5;\n    }\n\n    .site-blocks-1 .divider {\n      position: relative;\n    }\n\n    .site-blocks-1 .divider:after {\n      content: \"\";\n      position: absolute;\n      height: 100%;\n      width: 1px;\n      right: 10px;\n      background: #edf0f5;\n    }\n\n    .site-blocks-1 .divider:last-child:after {\n      display: none;\n    }\n\n    .site-blocks-1 .icon span {\n      position: relative;\n      color: #012652;\n      top: -10px;\n      font-size: 50px;\n      display: inline-block;\n    }\n\n    .site-blocks-1 .text h2 {\n      color: #25262a;\n      letter-spacing: .05em;\n      font-size: 18px;\n    }\n\n    .site-blocks-1 .text p:last-child {\n      margin-bottom: 0;\n    }\n\n    .site-blocks-2 .block-2-item {\n      display: block;\n      position: relative;\n    }\n\n    .site-blocks-2 .block-2-item:before {\n      z-index: 1;\n      content: '';\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      background: -moz-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n      background: -webkit-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n      background: -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(18%, transparent), color-stop(99%, rgba(0, 0, 0, 0.8)), to(rgba(0, 0, 0, 0.8)));\n      background: -o-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n      background: linear-gradient(to bottom, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#cc000000', GradientType=0);\n    }\n\n    .site-blocks-2 .block-2-item .image {\n      position: relative;\n      margin-bottom: 0;\n      overflow: hidden;\n    }\n\n    .site-blocks-2 .block-2-item .image img {\n      margin-bottom: 0;\n      -webkit-transition: .3s all ease-in-out;\n      -o-transition: .3s all ease-in-out;\n      transition: .3s all ease-in-out;\n    }\n\n    .site-blocks-2 .block-2-item .text {\n      z-index: 2;\n      bottom: 0;\n      padding-left: 20px;\n      position: absolute;\n      width: 100%;\n    }\n\n    .site-blocks-2 .block-2-item .text>span,\n    .site-blocks-2 .block-2-item .text h3 {\n      color: #fff;\n    }\n\n    .site-blocks-2 .block-2-item .text>span {\n      font-size: 12px;\n      letter-spacing: .1em;\n      font-weight: 900;\n    }\n\n    .site-blocks-2 .block-2-item .text h3 {\n      font-size: 40px;\n    }\n\n    .site-blocks-2 .block-2-item:hover .image img {\n      -webkit-transform: scale(1.1);\n      -ms-transform: scale(1.1);\n      transform: scale(1.1);\n    }\n\n    .block-3 .owl-stage {\n      padding-top: 40px;\n      padding-bottom: 40px;\n    }\n\n    .block-3 .owl-nav {\n      position: relative;\n      position: absolute;\n      bottom: -50px;\n      left: 50%;\n      -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n      transform: translateX(-50%);\n    }\n\n    .block-3 .owl-nav .owl-prev,\n    .block-3 .owl-nav .owl-next {\n      position: relative;\n      display: inline-block;\n      padding: 20px;\n      font-size: 30px;\n      color: #5c626e;\n    }\n\n    .block-3 .owl-nav .owl-prev:hover,\n    .block-3 .owl-nav .owl-next:hover {\n      color: #25262a;\n    }\n\n    .block-3 .owl-nav .owl-prev.disabled,\n    .block-3 .owl-nav .owl-next.disabled {\n      opacity: .2;\n    }\n\n    .block-4 {\n      -webkit-box-shadow: 0 0 30px -10px rgba(0, 0, 0, 0.1);\n      box-shadow: 0 0 30px -10px rgba(0, 0, 0, 0.1);\n      background: #fff;\n    }\n\n    .block-4 .block-4-text h3 {\n      font-size: 20px;\n      margin-bottom: 0;\n    }\n\n    .block-4 .block-4-text h3 a {\n      text-decoration: none;\n    }\n\n    .block-5 ul,\n    .block-5 ul li {\n      list-style: none;\n      padding: 0;\n      margin: 0;\n      line-height: 1.5;\n    }\n\n    .block-5 ul li {\n      padding-left: 30px;\n      position: relative;\n      margin-bottom: 15px;\n      color: #25262a;\n    }\n\n    .block-5 ul li:before {\n      top: 0;\n      font-family: \"icomoon\";\n      content: \"\";\n      position: absolute;\n      left: 0;\n      font-size: 20px;\n      line-height: 1;\n      color: #012652;\n    }\n\n    .block-5 ul li.address:before {\n      content: \"\\e8b4\";\n    }\n\n    .block-5 ul li.email:before {\n      content: \"\\f0e0\";\n    }\n\n    .block-5 ul li.phone:before {\n      content: \"\\f095\";\n    }\n\n    .block-6 {\n      display: block;\n    }\n\n    .block-6 img {\n      display: block;\n    }\n\n    .block-6 h3 {\n      font-size: 18px;\n    }\n\n    .block-6 p {\n      color: #737b8a;\n    }\n\n    .block-7 .form-group {\n      position: relative;\n      margin-top: 25px;\n    }\n\n    .block-7 .form-control {\n      padding-right: 96px;\n    }\n\n    .block-7 .btn {\n      position: absolute;\n      width: 80px;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n      transform: translateY(-50%);\n      right: 3px;\n    }\n\n    .block-8 .post-meta {\n      color: #c4c7ce;\n    }\n\n    .block-8 .block-8-sep {\n      margin-left: 10px;\n      margin-right: 10px;\n    }\n\n    .site-blocks-table {\n      overflow: auto;\n    }\n\n    .site-blocks-table .product-thumbnail {\n      width: 200px;\n    }\n\n    .site-blocks-table thead th {\n      padding: 30px;\n      text-align: center;\n      border-width: 1px !important;\n      vertical-align: middle;\n      color: #212529;\n      font-size: 18px;\n    }\n\n    .site-blocks-table td {\n      padding: 20px;\n      text-align: center;\n      vertical-align: middle;\n      color: #212529;\n    }\n\n    .site-blocks-table tbody tr:first-child td {\n      border-top: 1px solid #012652 !important;\n    }\n\n    .site-block-order-table th {\n      border-top: none !important;\n      border-bottom-width: 1px !important;\n    }\n\n    .site-block-order-table td,\n    .site-block-order-table th {\n      color: #000;\n    }\n\n    .site-block-top-search {\n      position: relative;\n    }\n\n    .site-block-top-search .icon {\n      position: absolute;\n      left: 0;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n      transform: translateY(-50%);\n    }\n\n    .site-block-top-search input {\n      padding-left: 40px;\n      -webkit-transition: .3s all ease-in-out;\n      -o-transition: .3s all ease-in-out;\n      transition: .3s all ease-in-out;\n    }\n\n    .site-block-top-search input:focus,\n    .site-block-top-search input:active {\n      padding-left: 25px;\n    }\n\n    .site-block-27 ul,\n    .site-block-27 ul li {\n      padding: 0;\n      margin: 0;\n    }\n\n    .site-block-27 ul li {\n      display: inline-block;\n      margin-bottom: 4px;\n    }\n\n    .site-block-27 ul li a,\n    .site-block-27 ul li span {\n      text-align: center;\n      display: inline-block;\n      width: 40px;\n      height: 40px;\n      line-height: 40px;\n      border-radius: 50%;\n      border: 1px solid #ccc;\n    }\n\n    .site-block-27 ul li.active a,\n    .site-block-27 ul li.active span {\n      background: #012652;\n      color: #fff;\n      border: 1px solid transparent;\n    }\n\n    #slider-range {\n      height: 8px;\n    }\n\n    #slider-range .ui-slider-handle {\n      width: 16px;\n      height: 16px;\n      border-radius: 50%;\n      border: none !important;\n      background: #012652;\n    }\n\n    #slider-range .ui-slider-handle:focus,\n    #slider-range .ui-slider-handle:active {\n      outline: none;\n    }\n\n    #slider-range .ui-slider-range {\n      background-color: #012652;\n    }\n\n    .color-item .color {\n      width: 14px;\n      height: 14px;\n    }\n\n    .block-16 figure {\n      position: relative;\n    }\n\n    .block-16 figure .play-button {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n      font-size: 40px;\n      width: 90px;\n      height: 90px;\n      background: #fff;\n      display: block;\n      border-radius: 50%;\n      border: none;\n    }\n\n    .block-16 figure .play-button:hover {\n      opacity: 1;\n    }\n\n    .block-16 figure .play-button>span {\n      position: absolute;\n      left: 55%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -45%);\n      -ms-transform: translate(-50%, -45%);\n      transform: translate(-50%, -45%);\n    }\n\n    .block-38 .block-38-header .block-38-heading {\n      color: #000;\n      margin: 0;\n      font-weight: 300;\n    }\n\n    .block-38 .block-38-header .block-38-subheading {\n      color: #b3b3b3;\n      margin: 0 0 20px 0;\n      text-transform: uppercase;\n      font-size: 15px;\n      letter-spacing: .1em;\n    }\n\n    .block-38 .block-38-header img {\n      width: 120px;\n      border-radius: 50%;\n      margin-bottom: 20px;\n    }\n\n    .product-name p {\n      margin: 0;\n    }\n\n    /* Chrome, Safari, Edge, Opera */\n    input::-webkit-outer-spin-button,\n    input::-webkit-inner-spin-button {\n      -webkit-appearance: none;\n      margin: 0;\n    }\n\n    /* Firefox */\n    input[type=number] {\n      -moz-appearance: textfield;\n    }\n\n    .btn-primary {\n      color: #fff;\n      background-color: #FE2202;\n      border-color: #FE2202;\n      padding: 10px 15px;\n    }\n\n    .btn-primary:hover {\n      color: #FE2202;\n      background-color: transparent;\n      border-color: #FE2202;\n    }\n\n    .btn-outline-primary {\n      color: #012652;\n      background-color: transparent;\n      background-image: none;\n      border-color: #012652;\n    }\n\n    .btn-outline-primary:hover {\n      color: #ffffff;\n      background-color: #012652;\n      background-image: none;\n      border-color: #012652;\n    }\n\n    .form-group input {\n      margin-bottom: 20px;\n    }\n\n    .border {\n      padding: 40px;\n    }\n\n    .border th {\n      font-size: 25px;\n      color: #FE2202;\n    }\n\n    .border-payment {\n      padding: 10px;\n      margin-bottom: 20px;\n    }\n\n    .form-group-payment th {\n      color: #FE2202;\n    }\n\n    .terrms {\n      margin-top: 20px;\n    }\n\n    .order-button {\n      display: inline-block;\n      margin-top: 15px;\n      margin-right: 25px;\n    }\n\n    .btn-buy {\n      padding: 8px 20px 10px 20px;\n      color: #ffffff;\n      background-color: #FE2202;\n      transition: none;\n      font-size: 16px;\n      font-weight: 400;\n      font-family: \"Nunito\", sans-serif;\n      font-weight: 600;\n      transition: 0.3s;\n      border: 1px solid #FE2202;\n    }\n\n    .btn-buy:hover {\n      color: #FE2202;\n      background-color: transparent;\n      border: 1px solid #FE2202;\n    }\n\n    .site-wrap {\n      margin-top: 50px;\n      margin-bottom: 50px;\n    }\n\n    .box-title {\n      font-weight: 800;\n      color: #012652;\n      margin-bottom: 20px;\n      text-transform: uppercase;\n    }\n  " }} />
      
        <div className="site-wrap">
          <div className="site-section">
            <div className="container">
            <Form onSubmit={handleSubmitOrder} className="mb-4">
              <div className="row">
                <div className="col-md-6">
                  <h2 className="box-title">Recipient Details</h2>
                  <div className="border">
                  <RecipientDetail 
formData={formDataSelected}
handleInputChange={handleInputChange}
areas={areas}
districts={districts}
zones={zones}

formValid={formValid}
alert={alert}
/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h2 className="box-title">Cost Of Order</h2>
                      <div className="p-3 p-lg-5 border">
                        <label htmlFor="c_code" className="text-black mb-3">Enter your coupon code if you have one</label>
                        <div className="input-group w-75">
                          <input type="text" className="form-control" id="c_code" placeholder="Coupon Code" aria-label="Coupon Code" aria-describedby="button-addon2" />
                          <div className="input-group-append">
                            <button className="btn btn-primary btn-sm" type="button" id="button-addon2">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="border">
                    <table className="table site-block-order-table mb-5">
                            <thead>
                              <tr><th>Product</th>
                                <th>Total</th>
                              </tr></thead>
                            <tbody>
                              {/* <tr>
                                <td>Top Up T-Shirt <strong className="mx-2">x</strong> 1</td>
                                <td><span style={{fontWeight: 800}}>৳</span>250</td>
                              </tr> */}
                              <tr>
                               
                             {
                                individualCustomRoundNeckQuantity>0 &&
                                  <>
                                   <td>Custom Round Neck <strong className="mx-2">x</strong> {individualCustomRoundNeckQuantity}</td>
                                <td><span style={{fontWeight: 800}}>৳</span>{individualCostCustomRoundNeckProductCost}</td>
                                  </>
                                
                             }
                              </tr>
                              <tr>
                             
                             {
                                individualCustomDropSholdQuantity>0 &&
                             
                                  <>
                                   <td>Custom Drop Sholder <strong className="mx-2">x</strong> {individualCustomDropSholdQuantity}</td>
                                <td><span style={{fontWeight: 800}}>৳</span>{individualCustomDropSholdProductCost}</td>
                                  </>
}
                               
                              </tr>
                              <tr>
                            
                                {
                                  individualCustomHoodieQuantity>0 &&
                                  <>
                                   <td>Custom Hoodie <strong className="mx-2">x</strong> {individualCustomHoodieQuantity}</td>
                                <td><span style={{fontWeight: 800}}>৳</span>{individualCustomHoodieProductCost}</td>
                                  </>
                                }
                               
                              </tr>
                              <tr>
                                {
                                 
                                 individualBlankRoundNeckQuantity>0 &&
                                  <>
                                   <td>Blank Round Neck <strong className="mx-2">x</strong> {individualBlankRoundNeckQuantity}</td>
                                <td><span style={{fontWeight: 800}}>৳</span>{individualBlankRoundNeckProductCost}</td>
                                  </>
                                }
                               </tr>
                              <tr>
                              {
                                 
                                 
                                 
                                 
                                 individualBlankDropSholQuantity>0 &&
                                  <>
                                   <td>Blank Drop Sholder <strong className="mx-2">x</strong> {individualBlankDropSholQuantity}</td>
                                <td><span style={{fontWeight: 800}}>৳</span>{individualBlankDropSholProductCost}</td>
                                  </>
                                }
                               
                               </tr>
                              <tr>
                              {
                                 
                                 
                                 individualBlankHoodieQuantity>0 &&
                                  <>
                                   <td>Blank Hoodie <strong className="mx-2">x</strong> { individualBlankHoodieQuantity
                                 }</td>
                                <td><span style={{fontWeight: 800}}>৳</span>{individualBlankHoodieProductCost}</td>
                                  </>
                                }
                               
                               </tr>
                              <tr>
                                <td className="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                                <td className="text-black"><span style={{fontWeight: 800}}>৳</span>{allProductsPrintbazCost}</td>
                              </tr>
                              {
                                formDataSelected?.discount>0 && 
                                <tr>
                                <td className="text-black font-weight-bold"><strong>Discount </strong></td>
                                <td className="text-black"><span style={{fontWeight: 800}}>৳</span>{formDataSelected?.discount}</td>
                              </tr>
                              }
                             
                              <tr>
                                <td className="text-black font-weight-bold"><strong>Delivery Fee</strong></td>
                                <td className="text-black"><span style={{fontWeight: 800}}>৳</span>{deliveryFee}</td>
                              </tr>
                              <tr>
                                <td className="text-black font-weight-bold"><strong>Cash Handling Fee</strong></td>
                                <td className="text-black font-weight-bold"><span>3%</span></td>
                              </tr> 
                              <tr>
                                <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                                <td className="text-black font-weight-bold"><strong><span style={{fontWeight: 800}}>৳</span>{formDataSelected?.grandCost}</strong></td>
                              </tr> 

                             
                              
                               
                              
                            </tbody>
                          </table>
                          <div className="border p-3 mb-2">
    <input 
        type="checkbox" 
        name="full advance payment" 
        checked={formDataSelected.paymentSystem === "full advance payment"}
        onChange={handleCheckboxChange} 
    />
    <span>Full Advance Payment</span>
</div>

<div className="border p-3 mb-2">
    <input 
        type="checkbox" 
        name="cashOnDelivery" 
        checked={formDataSelected.paymentSystem === "cashOnDelivery"}
        onChange={handleCheckboxChange} 
    />
    <span>Cash On Delivery</span>
</div>
{
  noPaymentSystem===true &&
  <span style={{color:"red",textAlign:"cenetr",marginBottom:"5px"}}>Payment system required!</span>
  
}
{
  noPaymentSystem===false &&
  ''
  
}
{
  formDataSelected.paymentSystem==="full advance payment"?
  <div className="form-group">
  <div className="col-md-12">
    <label htmlFor="c_phone" className="text-black">Amount to Collect <span className="text-danger">*</span></label>
    <Form.Control
  type="number"
  name="collectAmount"
  value={formDataSelected.collectAmount=0}
  className="form-control"
  onChange={(e) => {
     handleInputChange(e);
  }}
  readOnly
  required
 
/>
  </div>
</div>
:
<div className="form-group">
<div className="col-md-12">
  <label htmlFor="c_phone" className="text-black">Amount to Collect <span className="text-danger">*</span></label>
  <Form.Control
type="number"
name="collectAmount"
value={formDataSelected.collectAmount}
className="form-control"
onChange={(e) => {
   handleInputChange(e);;
}}
required
placeholder=""
/>
</div>
</div>
}
                     
                      {
                        recvMoney>0 &&
                        <div className="form-group form-group-payment">
                        <table className="table site-block-order-table">
                          <tbody><tr>
                              <th className="font-weight-bold"><strong>You will receive</strong></th>
                              <th className="font-weight-bold"><strong><span style={{fontWeight: 800}}>৳</span>{recvMoney}</strong></th>
                            </tr>
                          </tbody></table>
                      </div>
                   } 
                      
                    </div>
                  </div>
                </div>
             <div className='col-md-12' style={{position:"relative"}}>
             {/* {showContent && (
        <div id="Terms & Condition" className="popup-content">
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
        </div>
             )} */}
                <input type="checkbox" required className="terrms" />
                <span
        style={{ cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        I accept the Terms of Use and Privacy Policy.
      </span>

             </div>
                <div className="col-md-12" >
           
     
  <br />
                  <div className="form-group order-button">
                    <button className="btn btn-buy" type='submit'>Place Order</button>
                  </div>
                  <div className="form-group order-button">
                    <button onClick={backtoCart} className="btn btn-buy" >Cancel Order</button>
                  </div>
                </div>
                {
  isLoading===true &&(
    <>
     <div className="alert-overlay"  />
       <div className="alert-box" >
     
         <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
         
         <h2>Please wait!</h2>
       </div>
    </>
  )}
              </div>
              </Form>
       {isConfirmAlertOpen && (
  <ConfirmOrderAlert
    isOpen={isConfirmAlertOpen}
    message="Are you sure you want to place this order?"
    onConfirm={confirmHandlers.onConfirm}
    onClose={confirmHandlers.onClose}
  />
)}
            </div>
            {/* </form> */}
          </div>
        </div>
        {/*====== Bootstrap js ======*/}
        {showAlert===true && (
          
          <OrderSubmitDoneAlert
          message="Your order has been submitted"
          message2="Please keep an eye on the order for further development."
          onClose={() => setShowAlert(false)}
          
          
          />
          
          
          )
          
          
          }
      </div>
        </>
      );
};

export default CheckOut;
