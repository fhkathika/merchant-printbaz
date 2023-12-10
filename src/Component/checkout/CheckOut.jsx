import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartProvider';
import axios from 'axios';
import RecipientDetail from '../recipientDetail/RecipientDetail';
import { Button, Form, Spinner } from 'react-bootstrap';
import deliveryCharge from '../../Formulas/deliveryCharge';
import NavigationBar from '../Navbar/NavigationBar';

const CheckOut = () => {
  const { setFormData,setCartItems,editCartItem,cartItems} = useContext(CartContext);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fetchCartItems,setFetchCartItems]=useState([])
  const [noPaymentSystem, setNoPaymentSystem] = useState(false);
  // State to hold handlers
const [confirmHandlers, setConfirmHandlers] = useState({ onConfirm: () => {}, onClose: () => {} });
const fetchOrders = async () => {
  try {
      const response = await fetch(`http://localhost:5000/getCartItems`);
      // const response = await fetch(`https://server.printbaz.com/getCartItems`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFetchCartItems(data);
  } catch (error) {
      console.error('Error fetching orders:', error);
  }
};
useEffect(()=>{fetchOrders()},[])
  function removeEmptyArraysFromObject(obj) {
    const newObj = { ...obj }; // Start with a shallow copy of the object
    Object.keys(newObj).forEach(key => {
      if (Array.isArray(newObj[key]) && newObj[key].length === 0) {
        delete newObj[key]; // Remove the property if it's an empty array
      }
    });
    return newObj;
  }
 const copyCartOrders=cartItems?.map(items=>removeEmptyArraysFromObject(items))
  console.log("ordersAll",copyCartOrders)
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
    collectAmount:0,
    rcvAmount:0,
    orderCreatedAt:formattedDate,
    paymentSystem:'',
    orderStatus:'Pending',
    paymentStatus:'Unpaid',
    selectedItemsDetailArr: [
    
     
    ],
    
  
  })

  console.log("fetchCartItems..........",fetchCartItems)
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
console.log("totalDelivFee",totalDelivFee)

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
        console.log("finddeliv areas")
        // axios.get(`http://localhost:5000/deliveryAreaByLocation?District=${formDataSelected?.districts}&Zone=${formDataSelected?.zones}&Area=${formDataSelected?.areas}`)
        axios.get(`https://mserver.printbaz.com/deliveryAreaByLocation?District=${formDataSelected?.districts}&Zone=${formDataSelected?.zones}&Area=${formDataSelected?.areas}`)
          .then((res) => setDeliveryAreas(res.data.deliveryArea))
          .catch((error) => console.error('Error fetching deliveryArea:', error));
      }
    }, [formDataSelected?.districts ,formDataSelected?.zones , formDataSelected?.areas]);
  
        console.log("cartItems",cartItems)


// const allCustomRoundNeckProducts = cartItems.flatMap(item => 
//   item.orderDetailArr.filter(roundNeck => roundNeck.productType === 'Custom Round Neck tshirt')
// );
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

console.log("allCustomHoodieProducts",allCustomHoodieProducts)

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

let totalOrderItemQuantity=cartItems?.reduce((acc, item) => 
acc + safeParseInt(item.quantity) , 0);

const getIndividualProductCostSumAndQuantity=(indiviaualFilterProduct)=>{
  console.log("getIndividualProductCostSumAndQuantity called")
   const productCost = indiviaualFilterProduct?.reduce((total, item) => {
    return total + item.printbazcost;
  }, 0);
 const productQuantity = indiviaualFilterProduct?.reduce((acc, item) => 
acc + safeParseInt(item.quantity) , 0);
// setIndividualProductCost(productCost)
// setIndividualProductQuantity(productQuantity)
return{productQuantity,productCost}
}
console.log("individualCostCustomRoundNeckProductCost.............",individualCostCustomRoundNeckProductCost)
useEffect(()=>{
  if(allCustomRoundNeckProducts) {
    console.log("allCustomRoundNeckProducts from use effect")
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allCustomRoundNeckProducts)
    setIndividualProductCost( productCost)
    setIndividualProductQuantity(productQuantity)
  
  }
  if(allCustomDropSholderProducts) {
    console.log("allCustomRoundNeckProducts from use effect")
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allCustomDropSholderProducts)
    setIndividualCustomDropSholdProductCost(productCost)
    setIndividualCustomDropSholdQuantity(productQuantity)
  }
  if(allCustomHoodieProducts) {
    console.log("allCustomRoundNeckProducts from use effect")
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allCustomHoodieProducts)
    console.log("productQuantity of custom hoodie",productQuantity)
    setindividualCustomHoodieProductCost(productCost)
    setIndividualCustomHoodieQuantity(productQuantity)
  }
  if(allBlankRoundNeckProducts) {
    console.log("allCustomRoundNeckProducts from use effect")
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allBlankRoundNeckProducts)
    setIndividualBlankRoundNeckProductCost(productCost)
    setIndividualBlankRoundNeckQuantity(productQuantity)
  }
  if(allBlankDropSholderProducts) {
    console.log("allCustomRoundNeckProducts from use effect")
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allBlankDropSholderProducts)
    setIndividualBlankDropSholProductCost(productCost)
    setIndividualBlankDropSholQuantity(productQuantity)
  }
  if(allBlankHoodieProducts) {
    console.log("allCustomRoundNeckProducts from use effect")
    const {productQuantity,productCost}=getIndividualProductCostSumAndQuantity(allBlankHoodieProducts)
  
    setIndividualBlankHoodieProductCost(productCost)
    setIndividualBlankHoodieQuantity(productQuantity)
  }

  // if(cartItems) {
  //   console.log("allCustomRoundNeckProducts from use effect")
  //   getIndividualProductCostSumAndQuantity(cartItems)
  // }
},[allCustomRoundNeckProducts,individualCostCustomRoundNeckProductCost])

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
  const extraInSideDhakaChange=15
  const extraOutSideDhakaChange=25
  let grandQuantity=totalOrderItemQuantity

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
  const allProductsPrintbazCost = cartItems.reduce((total, item) => {
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
}

let orderTotal=cartItems?.reduce((total, item) => {
  return total + item.printbazcost;
}, 0)+deliveryFee-Number(addeDiscount);


const handleInputChange = (event, index) => {
  const { name, value } = event.target;
  const color = event.target.getAttribute('data-color');
  const size = event.target.getAttribute('data-size');
  const newOrderDetailArr =[...formDataSelected?.selectedItemsDetailArr];

 
    setFormDataSelected({ ...formDataSelected, [name]: value });
    // Flatten all the product arrays into one array
    // const allProducts = copyCartOrders?.flatMap(cartItem => {
    //   // Extract all product arrays from the cartItem, ignoring non-array properties
    //   return Object.values(cartItem).flat().filter(item => Array.isArray(item));
    // });
    // const allProducts = copyCartOrders?.flatMap(cartItem => {
    //   // Get all values that are arrays
    //   const productArrays = Object.values(cartItem).filter(value => Array.isArray(value));
    //   // Flatten the arrays of products and return them
    //   return productArrays.flat();
    // });
    
    // console.log("allProducts", allProducts);
    // // Transform the product items to fit the structure required by selectedItemsDetailArr
    // const newItems = allProducts.map(product => ({
    //   productType: product.productType,
    //   perItemQuantity: product.quantityM + product.quantityL + product.quantityXL + product.quantityXXL, // Summing quantities as an example
    //   printbazcost: product.printbazcost,
    //   individualProductArr: [
    //     {
    //       color: product.color,
    //       teshirtSize: product.teshirtSize,
    //       quantityM: product.quantityM,
    //       quantityL: product.quantityL,
    //       quantityXL: product.quantityXL,
    //       quantityXXL: product.quantityXXL,
    //       individualItemQuantity: product.quantityM + product.quantityL + product.quantityXL + product.quantityXXL, // Example calculation
    //       printSide: product.printSide,
    //       printSize: product.printSize,
    //       printSizeBack: product.printSizeBack,
    //       file: product.file,
    //       image: product.image
    //     }
    //   ]
    // }));
  
   
 
  // Update state
  // setFormDataSelected(prevState => ({
  //     ...prevState,
  //     selectedItemsDetailArr: newOrderDetailArr,
     
      
  // }));

 
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
    // grandQuantity: parseInt(
    //   individualCustomRoundNeckQuantity+
    //   individualCustomDropSholdQuantity+
    //   individualCustomHoodieQuantity+
    //   individualBlankRoundNeckQuantity+
    //   individualBlankDropSholQuantity+
    //   individualBlankHoodieQuantity),
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
let recvMoney = 0;
    let costHandlingfee;
    let recvMoneyWithouthandling = 0;
    recvMoneyWithouthandling = Number(
      // Math.ceil(formDataSelected.collectAmount - (formDataSelected?.printbazcost + deliveryFee))
      Math.ceil(formDataSelected.collectAmount - (formDataSelected?.grandCost))
    );
    // costHandlingfee = recvMoneyWithouthandling * 0.03;
    costHandlingfee = Number(formDataSelected.collectAmount * 0.03);
    recvMoney = recvMoneyWithouthandling - costHandlingfee;
   
    let suggestedCollectAmount = Math.ceil((1 + formDataSelected?.grandCost) / 0.97);
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

const handleSubmitOrder=async(e)=>{
  e.preventDefault()
 console.log( "click to submit")
 // Check if a payment system is selected
 if (!formDataSelected.paymentSystem) {
  setNoPaymentSystem(true);
  return;
}
 const isConfirmed = await handleConfirmOrder(); // Wait for user's decision
  if (!isConfirmed) {
    console.log("Order submission cancelled.");
    return; // Exit if user cancels
  }
  
  setIsLoading(true); // Start loading before the fetch request
  getToBeOrerDetail()
  // Create a FormData object to handle files
  const formDataSendOrdertoServer = new FormData();

  console.log("formDataSelected............",formDataSelected)
 
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
  formDataSendOrdertoServer.append("email",formDataSelected?.email);
  formDataSendOrdertoServer.append("address",formDataSelected?.address);
  formDataSendOrdertoServer.append("instruction",formDataSelected?.instruction);
  formDataSendOrdertoServer.append("districts",formDataSelected?.districts);
  formDataSendOrdertoServer.append("zones",formDataSelected?.zones);
  formDataSendOrdertoServer.append("areas",formDataSelected?.areas);
  formDataSendOrdertoServer.append("grandQuantity",formDataSelected?.grandQuantity);
  formDataSendOrdertoServer.append("grandCost",formDataSelected?.grandCost);
  formDataSendOrdertoServer.append("deliveryFee",formDataSelected?.deliveryFee);
  formDataSendOrdertoServer.append("discount",formDataSelected?.discount);
  formDataSendOrdertoServer.append("orderCreatedAt",formDataSelected?.orderCreatedAt);
  formDataSendOrdertoServer.append("paymentSystem",formDataSelected?.paymentSystem);
  formDataSendOrdertoServer.append("orderStatus",formDataSelected?.orderStatus);
  formDataSendOrdertoServer.append("paymentStatus",formDataSelected?.paymentStatus);
    formDataSendOrdertoServer.append('createdAt', formattedDate);

  
    try {
      // const response = await fetch('http://localhost:5000/sendOrder', {
      const response = await fetch('https://server.printbaz.com/sendOrder', {
        method: 'POST',
        body: formDataSendOrdertoServer
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
       // Clear cartItems from state and localStorage on successful submission
       setCartItems([]); // Assuming setCartItems is your state updater function for cart items
       localStorage.removeItem('cartItems'); // Clear cart items from localStorage

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
          // {
          //   productType:'',
          //   perItemQuantity:0,
          //   printbazcost:0,
          //  individualProductArr: [
          //   {color: '',
          //   teshirtSize: {},
          //  quantityM: '',
          //   quantityL: '',
          //   quantityXL: '',
          //   quantityXXL: '',
          //  individualItemQuantity:0,
          // printSide: '',
          //   printSize: '',
          //   printSizeBack: '',
          //   file: null,
          //   image: null
          // }
          //   ]
           
          // }
         
        ],
        
      
      })
      console.log(result); // Handle the response
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
        <div>
          <title>Printbaz</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mukta:300,400,700" /> 
          <link rel="stylesheet" href="fonts/icomoon/style.css" />
          <link rel="stylesheet" href="css/bootstrap.min.css" />
          <link rel="stylesheet" href="css/magnific-popup.css" />
          <link rel="stylesheet" href="css/jquery-ui.css" />
          <link rel="stylesheet" href="css/owl.carousel.min.css" />
          <link rel="stylesheet" href="css/owl.theme.default.min.css" />
          <link rel="stylesheet" href="css/aos.css" />
          <style dangerouslySetInnerHTML={{__html: "\n      \n/* Blocks */\n.site-blocks-cover {\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center; }\n  .site-blocks-cover, .site-blocks-cover .row {\n    min-height: 600px;\n    height: calc(100vh - 174px); }\n  .site-blocks-cover h1 {\n    font-size: 30px;\n    font-weight: 900;\n    color: #000; }\n    @media (min-width: 768px) {\n      .site-blocks-cover h1 {\n        font-size: 50px; } }\n  .site-blocks-cover p {\n    color: #333333;\n    font-size: 20px;\n    line-height: 35px; }\n  .site-blocks-cover .intro-text {\n    font-size: 16px;\n    line-height: 1.5; }\n\n.site-blocks-1 {\n  border-bottom: 1px solid #edf0f5; }\n  .site-blocks-1 .divider {\n    position: relative; }\n    .site-blocks-1 .divider:after {\n      content: \"\";\n      position: absolute;\n      height: 100%;\n      width: 1px;\n      right: 10px;\n      background: #edf0f5; }\n    .site-blocks-1 .divider:last-child:after {\n      display: none; }\n  .site-blocks-1 .icon span {\n    position: relative;\n    color: #012652;\n    top: -10px;\n    font-size: 50px;\n    display: inline-block; }\n  .site-blocks-1 .text h2 {\n    color: #25262a;\n    letter-spacing: .05em;\n    font-size: 18px; }\n  .site-blocks-1 .text p:last-child {\n    margin-bottom: 0; }\n\n.site-blocks-2 .block-2-item {\n  display: block;\n  position: relative; }\n  .site-blocks-2 .block-2-item:before {\n    z-index: 1;\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background: -moz-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n    background: -webkit-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(18%, transparent), color-stop(99%, rgba(0, 0, 0, 0.8)), to(rgba(0, 0, 0, 0.8)));\n    background: -o-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n    background: linear-gradient(to bottom, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#cc000000',GradientType=0 ); }\n  .site-blocks-2 .block-2-item .image {\n    position: relative;\n    margin-bottom: 0;\n    overflow: hidden; }\n    .site-blocks-2 .block-2-item .image img {\n      margin-bottom: 0;\n      -webkit-transition: .3s all ease-in-out;\n      -o-transition: .3s all ease-in-out;\n      transition: .3s all ease-in-out; }\n  .site-blocks-2 .block-2-item .text {\n    z-index: 2;\n    bottom: 0;\n    padding-left: 20px;\n    position: absolute;\n    width: 100%; }\n    .site-blocks-2 .block-2-item .text > span, .site-blocks-2 .block-2-item .text h3 {\n      color: #fff; }\n    .site-blocks-2 .block-2-item .text > span {\n      font-size: 12px;\n      letter-spacing: .1em;\n      font-weight: 900; }\n    .site-blocks-2 .block-2-item .text h3 {\n      font-size: 40px; }\n  .site-blocks-2 .block-2-item:hover .image img {\n    -webkit-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    transform: scale(1.1); }\n\n.block-3 .owl-stage {\n  padding-top: 40px;\n  padding-bottom: 40px; }\n\n.block-3 .owl-nav {\n  position: relative;\n  position: absolute;\n  bottom: -50px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  transform: translateX(-50%); }\n  .block-3 .owl-nav .owl-prev, .block-3 .owl-nav .owl-next {\n    position: relative;\n    display: inline-block;\n    padding: 20px;\n    font-size: 30px;\n    color: #5c626e; }\n    .block-3 .owl-nav .owl-prev:hover, .block-3 .owl-nav .owl-next:hover {\n      color: #25262a; }\n    .block-3 .owl-nav .owl-prev.disabled, .block-3 .owl-nav .owl-next.disabled {\n      opacity: .2; }\n\n.block-4 {\n  -webkit-box-shadow: 0 0 30px -10px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0 30px -10px rgba(0, 0, 0, 0.1);\n  background: #fff; }\n  .block-4 .block-4-text h3 {\n    font-size: 20px;\n    margin-bottom: 0; }\n    .block-4 .block-4-text h3 a {\n      text-decoration: none; }\n\n.block-5 ul, .block-5 ul li {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  line-height: 1.5; }\n\n.block-5 ul li {\n  padding-left: 30px;\n  position: relative;\n  margin-bottom: 15px;\n  color: #25262a; }\n  .block-5 ul li:before {\n    top: 0;\n    font-family: \"icomoon\";\n    content: \"\";\n    position: absolute;\n    left: 0;\n    font-size: 20px;\n    line-height: 1;\n    color: #012652; }\n  .block-5 ul li.address:before {\n    content: \"\\e8b4\"; }\n  .block-5 ul li.email:before {\n    content: \"\\f0e0\"; }\n  .block-5 ul li.phone:before {\n    content: \"\\f095\"; }\n\n.block-6 {\n  display: block; }\n  .block-6 img {\n    display: block; }\n  .block-6 h3 {\n    font-size: 18px; }\n  .block-6 p {\n    color: #737b8a; }\n\n.block-7 .form-group {\n  position: relative; }\n\n.block-7 .form-control {\n  padding-right: 96px; }\n\n.block-7 .btn {\n  position: absolute;\n  width: 80px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%);\n  right: 3px; }\n\n.block-8 .post-meta {\n  color: #c4c7ce; }\n\n.block-8 .block-8-sep {\n  margin-left: 10px;\n  margin-right: 10px; }\n\n.site-blocks-table {\n  overflow: auto; }\n  .site-blocks-table .product-thumbnail {\n    width: 200px; }\n  .site-blocks-table thead th {\n    padding: 30px;\n    text-align: center;\n    border-width: 1px !important;\n    vertical-align: middle;\n    color: #212529;\n    font-size: 18px; }\n  .site-blocks-table td {\n    padding: 20px;\n    text-align: center;\n    vertical-align: middle;\n    color: #212529; }\n  .site-blocks-table tbody tr:first-child td {\n    border-top: 1px solid #012652 !important; }\n\n.site-block-order-table th {\n  border-top: none !important;\n  border-bottom-width: 1px !important; }\n\n.site-block-order-table td, .site-block-order-table th {\n  color: #000; }\n\n.site-block-top-search {\n  position: relative; }\n  .site-block-top-search .icon {\n    position: absolute;\n    left: 0;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    transform: translateY(-50%); }\n  .site-block-top-search input {\n    padding-left: 40px;\n    -webkit-transition: .3s all ease-in-out;\n    -o-transition: .3s all ease-in-out;\n    transition: .3s all ease-in-out; }\n    .site-block-top-search input:focus, .site-block-top-search input:active {\n      padding-left: 25px; }\n\n.site-block-27 ul, .site-block-27 ul li {\n  padding: 0;\n  margin: 0; }\n\n.site-block-27 ul li {\n  display: inline-block;\n  margin-bottom: 4px; }\n  .site-block-27 ul li a, .site-block-27 ul li span {\n    text-align: center;\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    border-radius: 50%;\n    border: 1px solid #ccc; }\n  .site-block-27 ul li.active a, .site-block-27 ul li.active span {\n    background: #012652;\n    color: #fff;\n    border: 1px solid transparent; }\n\n#slider-range {\n  height: 8px; }\n  #slider-range .ui-slider-handle {\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    border: none !important;\n    background: #012652; }\n    #slider-range .ui-slider-handle:focus, #slider-range .ui-slider-handle:active {\n      outline: none; }\n  #slider-range .ui-slider-range {\n    background-color: #012652; }\n\n.color-item .color {\n  width: 14px;\n  height: 14px; }\n\n.block-16 figure {\n  position: relative; }\n  .block-16 figure .play-button {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    font-size: 40px;\n    width: 90px;\n    height: 90px;\n    background: #fff;\n    display: block;\n    border-radius: 50%;\n    border: none; }\n    .block-16 figure .play-button:hover {\n      opacity: 1; }\n    .block-16 figure .play-button > span {\n      position: absolute;\n      left: 55%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -45%);\n      -ms-transform: translate(-50%, -45%);\n      transform: translate(-50%, -45%); }\n\n.block-38 .block-38-header .block-38-heading {\n  color: #000;\n  margin: 0;\n  font-weight: 300; }\n\n.block-38 .block-38-header .block-38-subheading {\n  color: #b3b3b3;\n  margin: 0 0 20px 0;\n  text-transform: uppercase;\n  font-size: 15px;\n  letter-spacing: .1em; }\n\n.block-38 .block-38-header img {\n  width: 120px;\n  border-radius: 50%;\n  margin-bottom: 20px; }\n\n.product-name p {\n  margin: 0;\n}\n\n/* Chrome, Safari, Edge, Opera */\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n/* Firefox */\ninput[type=number] {\n  -moz-appearance: textfield;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #012652;\n  border-color: #012652;\n}\n\n.btn-primary:hover {\n  color: #fff;\n  background-color: #012652;\n  border-color: #012652;\n}\n\n.btn-outline-primary {\n  color: #012652;\n  background-color: transparent;\n  background-image: none;\n  border-color: #012652;\n}\n\n.btn-outline-primary:hover {\n  color: #ffffff;\n  background-color: #012652;\n  background-image: none;\n  border-color: #012652;\n}\n    " }} />
          {/* ======= Header ======= */}
 <NavigationBar/>
          <div className="site-wrap">
            <div className="site-section">
              <div className="container">
              <Form onSubmit={handleSubmitOrder} className="mb-4">
                <div className="row">
               
                  <div className="col-md-6 mb-5 mb-md-0">
                    <h2 className="h3 mb-3 text-black">Billing Details</h2>
                    <div className="p-3 p-lg-5 border">
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
                    <div className="row mb-5">
                      <div className="col-md-12">
                        <h2 className="h3 mb-3 text-black">Your Order</h2>
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
                      <div className="col-md-12">
                        <div className="p-3 p-lg-5 border">
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
                              
                                  <>
                                   <td>Custom Round Neck <strong className="mx-2">x</strong> {individualCustomRoundNeckQuantity}</td>
                                <td><span style={{fontWeight: 800}}>৳</span>{individualCostCustomRoundNeckProductCost}</td>
                                  </>
                                
                               
                              </tr>
                              <tr>
                             
                             
                                  <>
                                   <td>Custom Drop Sholder <strong className="mx-2">x</strong> {individualCustomDropSholdQuantity}</td>
                                <td><span style={{fontWeight: 800}}>৳</span>{individualCustomDropSholdProductCost}</td>
                                  </>
                              
                               
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
                              <tr>
                                <td className="text-black font-weight-bold"><strong>Discount </strong></td>
                                <td className="text-black"><span style={{fontWeight: 800}}>৳</span>{formDataSelected?.discount}</td>
                              </tr>
                              <tr>
                                <td className="text-black font-weight-bold"><strong>Delivery Fee</strong></td>
                                <td className="text-black"><span style={{fontWeight: 800}}>৳</span>{deliveryFee}</td>
                              </tr>
                              <tr>
                                <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                                <td className="text-black font-weight-bold"><strong><span style={{fontWeight: 800}}>৳</span>{formDataSelected?.grandCost}</strong></td>
                              </tr> 
                               <tr>
                                <td className="text-black font-weight-bold"><strong>Ammount To Collect</strong></td>
                                <td className="text-black font-weight-bold">
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
                                </td>
                              </tr>
                               <tr>
                                <td className="text-black font-weight-bold"><strong>Minimum To Collect</strong></td>
                                <td className="text-black font-weight-bold">
                                <Form.Control
                        type="number"
                        name="suggestedCollectAmount"
                        value={suggestedCollectAmount}
                        className="form-control"
                      readOnly
                      />
                                </td>
                              </tr>
                              
                            </tbody>
                          </table>
                          <div className="border p-3 mb-2">
    <input 
        type="checkbox" 
        name="directBankTransfer" 
        checked={formDataSelected.paymentSystem === "directBankTransfer"}
        onChange={handleCheckboxChange} 
    />
    <span>Direct Bank Transfer</span>
</div>
{/* <div className="border p-3 mb-2">
    <input 
        type="checkbox" 
        name="bkashNagadRocket" 
        checked={formDataSelected.paymentSystem === "bkashNagadRocket"}
        onChange={handleCheckboxChange} 
    />
   
    <span>Bkash/Nagad/Rocket</span>
    <span style={{color:"gray",marginLeft:'20px'}} className='font12mobile'>10% discount</span>
   
    

</div> */}
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


                          <div className="form-group">
                            <button className="btn btn-primary btn-lg py-3 btn-block"type="submit">Place Order</button>
                          </div>
           
                         
                        </div>
                      </div>
                    </div>
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
  )
  
} 
                </Form>
                {/* {isConfirmAlertOpen && (
  <ConfirmOrderAlert
    isOpen={isConfirmAlertOpen}
    message="Are you sure you want to place this order?"
    onConfirm={confirmHandlers.onConfirm}
    onClose={confirmHandlers.onClose}
  />
)} */}
     
              </div>
            </div>
          </div>
          {/* {showAlert===true && (
          
          <OrderSubmitDoneAlert
          message="Your order has been submitted"
          message2="Please keep an eye on the order for further development."
          onClose={() => setShowAlert(false)}
          
          
          />
          
          
          )
          
          
          } */}
        </div>
      );
};

export default CheckOut;