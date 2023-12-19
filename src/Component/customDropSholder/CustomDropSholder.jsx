import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
  Spinner,
  Row,
  Col,
  Card,
  ListGroup,
  Container,
  Alert,
} from "react-bootstrap";
import { db, storage } from "../../firebase.config";
import { useGetData } from "../../hooks/useGetData";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
// import SendOrderConfirmationEmail from '../../confirmationMailOrder/SendOrderConfirmationEmail';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import tshirtFormulaCustomDropSholder from '../../Formulas/tshirtFormulaCustomDropSholder';
import backsiideFormulaDropSholderHoodie from '../../Formulas/backsiideFormulaDropSholderHoodie';
import useFilterProducts from "../../hooks/useFilterProducts";
import FileInputFields from "../fileInputFields/FileInputFields";
import useFilterValueBasedonCategory from "../../hooks/useFilterValueBasedonCategory copy";
import useGetTshirtPrice from "../../hooks/useGetTshirtPrice";
import teeShirtFormula from "../../Formulas/teeShirtFormula";
import backsideFormula from "../../Formulas/backsideFormula";
import AddtoCartAlert from "../alert/AddtoCartAlert";
import { CartContext } from "../../context/CartProvider";
import NavigationBar from "../Navbar/NavigationBar";
import ProductTab from "../ProductTab";
import BuyNowAlert from "../alert/BuyNowAlert";

// import isAddToCartEnabled from "../../globalFunctions/isAddToCartEnabled";

const CustomDropSholder = () => {
  const { formData, setFormData, setCartItems, editCartItem, cartItems,addToCart } =
    useContext(CartContext);
    const [uploadedFile, setUploadedFile] = useState(null);
    const location = useLocation();
  // const { itemToEdit } = useFilterProducts();

  let id = "resellerOrdersId";
  let collections = "resellerInfo";
  let idPrice = "teeShirtCampingId";
  let collectionsPrice = "productValues";

  const [fileprogress, setFileProgress] = useState(0);
  const [imageprogress, setImageProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbData, setDbData] = useState({});
  const [printSide, setPrintSide] = useState("");
  const [addbrandLogo, setAddBrandLogo] = useState(false);
  const [deliveryAreas, setDeliveryAreas] = useState("");
  const [alert, setAlert] = useState(false);
  const [hasSize, setHasSize] = useState(false);
  const [showAddtocartAlert, setShowAddtocartAlert] = useState("");
  const [showBuyNowAlert, setShowBuyNowAlert] = useState(false);
  const { fetchedData, searchProduct, setSearchProduct } = useGetData(
    idPrice,
    collectionsPrice,
    dbData
  );

  const EditItemDetail = location?.state?.itemToEdit;
  // const itemToEdit =  cartItems?.find(item => item?._id === EditItemDetail?._id);
  const [showRegPopup, setShowRegPopup] = useState(false);
  const switchToLogin = () => {
    setShowRegPopup(false);
    setShowLoginPopup(true);
  };
  const switchToRegister = () => {
    setShowRegPopup(true);
    setShowLoginPopup(false);
  };
  const closeAllPopup = () => {
    setShowRegPopup(false);
    setShowLoginPopup(false);
  };
  const { user } = useContext(AuthContext);
 
  const userEmail = user?.email;
  const [isLoading, setIsLoading] = useState(false);
  const [OpenCheckout, setOpenCheckout] = useState(false);
  const [recvAmount, setRecvAmount] = useState();
  const [formValid, setFormValid] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const {
    customDropSholderinputFront11p7X16p5,
    customDropSholderinputFront10X14,
    customDropSholderinputFront10X10,
    customDropSholderinputFront10X5,
    customDropSholderinputFront5X5,
    customDropSholderinputFront2p5X5,
    customDropSholderinputFront2p5X2p5,
    customDropSholderinputBack11p7X16p5,
    customDropSholderinputBack10X14,
    customDropSholderinputBack10X10,
    customDropSholderinputBack10X5,
    customDropSholderinputBack5X5,
    customDropSholderinputBack2p5X5,
    customDropSholderinputBack2p5X2p5}=useFilterValueBasedonCategory()
  const d = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = d.toLocaleDateString("en-US", options);
  const { tshirtPrice } = useGetTshirtPrice();
 
  let price_11p7x16p5=customDropSholderinputFront11p7X16p5?.frontSideprice
  let price_10x14=customDropSholderinputFront10X14?.frontSideprice
  let price_10x10=customDropSholderinputFront10X10?.frontSideprice
  let price_10x5=customDropSholderinputFront10X5?.frontSideprice
  let price_5X5=customDropSholderinputFront5X5?.frontSideprice
  let price_2p5X5=customDropSholderinputFront2p5X5?.frontSideprice
  let price_2p5X2p5=customDropSholderinputFront2p5X2p5?.frontSideprice

 
  let backSideDtfprice_11p7x16p5=customDropSholderinputBack11p7X16p5?.backSideprice
  let backSideDtfprice_10x14=customDropSholderinputBack10X14?.backSideprice
  let backSideDtfprice_10x10=customDropSholderinputBack10X10?.backSideprice
  let backSideDtfprice_10x5=customDropSholderinputBack10X5?.backSideprice
  let backSideDtfprice_5X5=customDropSholderinputBack5X5?.backSideprice
  let backSideDtfprice_2p5X5=customDropSholderinputBack2p5X5?.backSideprice
  let backSideDtfprice_2p5X2p5=customDropSholderinputBack2p5X2p5?.backSideprice
  let additionalCost=tshirtPrice[0]?.additionalCost

  //////////////////////////////////////////

  const navigate = useNavigate();

  const [inputs, setInputs] = useState([{ value: "" }]);
  const safeParseInt = (str) => {
    const value = parseInt(str);
    return isNaN(value) ? 0 : value;
  };



  const [addBrandLogoArray, setAddBrandLogoArray] = useState([]);

 
const handleFileChange = async (event, index, fileType, oldFileId = null) => {
  const { files } = event.target;
  const updatedBrandLogoArray = [...addBrandLogoArray];
  if (files && files.length > 0) {
 
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    // If there is an old file to replace, append its ID to the form data
    if (oldFileId) {
      formData.append('oldFileId', oldFileId);
    }

    try {
      // Send the file to your backend server
      // const response = await fetch('http://localhost:5000/uploadOrderedFile', {
      const response = await fetch('https://mserver.printbaz.com/uploadOrderedFile', {
        method: 'POST',
        body: formData, // Send the file within FormData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const uploadedFileData = await response.json(); // Get the response from the server

      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);

      // Update the component state with the file details from the server
      setFormData(prevFormData => {
        const newOrderDetailArr = [...prevFormData.orderDetailArrCustomDropSholder];
        const fileData = {
          fileId: uploadedFileData.fileId, // File ID from the server response
          fileUrl: fileUrl, // URL for preview
        };
 // Save the uploaded file data to state
 setUploadedFile({
  fileId: uploadedFileData.fileId,
  fileUrl: fileUrl
});
        if (fileType === 'mainFile') {
          newOrderDetailArr[index].file = fileData;
        } else if (fileType === 'image') {
          newOrderDetailArr[index].image = fileData;
        }
        else if (fileType === 'brandLogo') {
          updatedBrandLogoArray[index] = true; // Set true when file is selected
          setAddBrandLogoArray(updatedBrandLogoArray);
          newOrderDetailArr[index].brandLogo = fileData;
          }

        return { ...prevFormData, orderDetailArrCustomDropSholder: newOrderDetailArr };
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
      // Update state
      setFormData((prevState) => ({
        ...prevState,
   
        printbazcost: printbazcost,
      }));
    
  }
  else {
     // No file is selected
     if (fileType === 'brandLogo') {
      updatedBrandLogoArray[index] = false; // Set false when file is unselected
      setAddBrandLogoArray(updatedBrandLogoArray);
      setFormData(prevFormData => {
        const newOrderDetailArr = [...prevFormData.orderDetailArrCustomDropSholder];
        newOrderDetailArr[index].brandLogo = {}; // Clear brand logo data
        return { ...prevFormData, orderDetailArrCustomDropSholder: newOrderDetailArr };
      });
       // No file is selected, proceed to delete the previous file if it exists
       if (uploadedFile) {
        await removeFileFromServer(uploadedFile.fileId);
        setUploadedFile(null);
       
        alert('File is deleted.'); // Display confirmation message
  
       
      }
    
    }
    
   
  }
  

};
useEffect(()=>{},[addBrandLogoArray,uploadedFile,formData])
console.log("uploadedFile.............",uploadedFile)
const removeFileFromServer = async (fileId) => {
  try {
    // const response = await fetch(`http://localhost:5000/deleteFileApi/${fileId}`, {
    const response = await fetch(`https://mserver.printbaz.com/deleteFileApi/${fileId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Handle the response from the server confirming the file has been deleted
    console.log('File removed from server');

  } catch (error) {
    console.error('Error removing file from server:', error);
  }
};

 
  formData?.orderDetailArrCustomDropSholder?.forEach((item) => {
    item.totalQuantity =
      safeParseInt(item.quantityM) +
      safeParseInt(item.quantityL) +
      safeParseInt(item.quantityXL) +
      safeParseInt(item.quantityXXL)+
      safeParseInt(item.quantityXXXL);
  });

  let updatedPrintbazcost = 0;
  let printbazcost = 0;
  let printbazcostbase = 0;
  if(EditItemDetail?._id){
    for (var i = 0; i < EditItemDetail?.orderDetailArrCustomDropSholder?.length; i++) {
      if (
        formData?.quantity &&
        formData?.orderDetailArrCustomDropSholder[i]?.totalQuantity &&
        formData?.orderDetailArrCustomDropSholder[i]?.printSize &&
        price_11p7x16p5 &&
        price_10x14 &&
        price_10x10 &&
        price_10x5 &&
        price_5X5 &&
        price_2p5X5 &&
        price_2p5X2p5
      ) {
        // front side cost
        const totalPrice = tshirtFormulaCustomDropSholder(
          formData?.quantity,
          formData?.orderDetailArrCustomDropSholder[i]?.totalQuantity,
          formData?.orderDetailArrCustomDropSholder[i]?.printSize,
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
    formData?.orderDetailArrCustomDropSholder[i]?.totalQuantity,
    formData?.orderDetailArrCustomDropSholder[i]?.printSizeBack,
    formData?.orderDetailArrCustomDropSholder[i]?.printSide,
    backSideDtfprice_11p7x16p5,
    backSideDtfprice_10x14,
    backSideDtfprice_10x10,
    backSideDtfprice_10x5,
    backSideDtfprice_5X5,
    backSideDtfprice_2p5X5,
    backSideDtfprice_2p5X2p5,
    additionalCost,

  ).backDtfAndAdditionalCost;
    // Check if brand logo is selected for the current index
    const isBrandLogoSelected = i < addBrandLogoArray.length && addBrandLogoArray[i];
 
        if (EditItemDetail?.orderDetailArrCustomDropSholder[i]?.brandLogo?.fileId) {
          // printbazcost=parseInt(printbazcostbase+5)
          let brandLogoCost = 5 * formData?.orderDetailArrCustomDropSholder[i]?.totalQuantity;
          printbazcostbase =
            Number(totalPrice) + backSidePrintCost + brandLogoCost;
         
          printbazcost += printbazcostbase;
          const test = printbazcost + backSidePrintCost;
        } else {
          printbazcostbase = Number(totalPrice) + Number(backSidePrintCost);
          printbazcost += printbazcostbase;
  
        }
      }
    }
  }
  else{
    for (var j = 0; j < formData?.orderDetailArrCustomDropSholder?.length; j++) {
      if (
        formData?.quantity &&
        formData?.orderDetailArrCustomDropSholder[j]?.totalQuantity &&
        formData?.orderDetailArrCustomDropSholder[j]?.printSize &&
        price_11p7x16p5 &&
        price_10x14 &&
        price_10x10 &&
        price_10x5 &&
        price_5X5 &&
        price_2p5X5 &&
        price_2p5X2p5 
      ) {
       
      const totalPrice = tshirtFormulaCustomDropSholder(
        formData?.quantity,
        formData?.orderDetailArrCustomDropSholder[j]?.totalQuantity,
        formData?.orderDetailArrCustomDropSholder[j]?.printSize,
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
    formData?.orderDetailArrCustomDropSholder[j]?.totalQuantity,
    formData?.orderDetailArrCustomDropSholder[j]?.printSizeBack,
    formData?.orderDetailArrCustomDropSholder[j]?.printSide,
    backSideDtfprice_11p7x16p5,
    backSideDtfprice_10x14,
    backSideDtfprice_10x10,
    backSideDtfprice_10x5,
    backSideDtfprice_5X5,
    backSideDtfprice_2p5X5,
    backSideDtfprice_2p5X2p5,
    additionalCost,

  ).backDtfAndAdditionalCost;
    // Check if brand logo is selected for the current index
    const isBrandLogoSelected = j < addBrandLogoArray.length && addBrandLogoArray[j];
  console.log("isBrandLogoSelected",isBrandLogoSelected)
        if (isBrandLogoSelected) {
          let brandLogoCost = 5 * formData?.orderDetailArrCustomDropSholder[j]?.totalQuantity;
          printbazcostbase =
            Number(totalPrice) + backSidePrintCost + brandLogoCost;
        
          printbazcost += printbazcostbase;
          const test = printbazcost + backSidePrintCost;
        } else {
          printbazcostbase = Number(totalPrice) + Number(backSidePrintCost);
          printbazcost += printbazcostbase;
  
        }
      }
    }
  }
 

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const color = event.target.getAttribute("data-color");
    const size = event.target.getAttribute("data-size");
    const newOrderDetailArr = [...formData.orderDetailArrCustomDropSholder];

    let itemIndex = newOrderDetailArr.findIndex((item) => item.color === color);
   
    if (
      name === "color" ||
      name === "teshirtSize" ||
      name === "quantityM" ||
      name === "quantityL" ||
      name === "quantityXL" ||
      name === "quantityXXL" ||
      name === "quantityXXXL" ||
      name === "printSize" ||
      name === "printSide" ||
      name === "printSizeBack"
    ) {
      if (size) {
        newOrderDetailArr[itemIndex].teshirtSize = {
          ...newOrderDetailArr[itemIndex].teshirtSize,
          [size]: value,
        };
      }
      newOrderDetailArr[itemIndex][name] = value;
      // Update totalQuantity if a quantity field is changed
      if (
        ["quantityM", "quantityL", "quantityXL", "quantityXXL","quantityXXXL"].includes(name)
      ) {
        const totalQuantity =
          safeParseInt(newOrderDetailArr[itemIndex].quantityM) +
          safeParseInt(newOrderDetailArr[itemIndex].quantityL) +
          safeParseInt(newOrderDetailArr[itemIndex].quantityXL) +
          safeParseInt(newOrderDetailArr[itemIndex].quantityXXL)+
          safeParseInt(newOrderDetailArr[itemIndex].quantityXXXL);

        newOrderDetailArr[itemIndex].totalQuantity = totalQuantity;
      }
    } else {
      setFormData({ ...formData, [name]: value });
      return;
    }

    // Compute grand total based on the newOrderDetailArr
    const newGrandQuantity = newOrderDetailArr.reduce(
      (acc, item) =>
        acc +
        safeParseInt(item.quantityM) +
        safeParseInt(item.quantityL) +
        safeParseInt(item.quantityXL) +
        safeParseInt(item.quantityXXL)+
        safeParseInt(item.quantityXXXL),
      0
    );

    // Update state
    setFormData((prevState) => ({
      ...prevState,
      orderDetailArrCustomDropSholder: newOrderDetailArr,
      quantity: parseInt(newGrandQuantity),
      printbazcost: printbazcost,
    }));
  };

  // Function to handle form submit
  const handleEdit = async(e) => {
    e.preventDefault();
    if (formData?.quantity <= 0) {
      setAlert(true);
  
          const timeoutId = setTimeout(() => {
            setAlert(false);
          }, 2000); // Hide the alert box after 3 seconds
    
          return () => clearTimeout(timeoutId);
      
    }
    // if (isAddToCartEnabled(formData?.orderDetailArr)) {
   
      editCartItem(EditItemDetail?._id, formData); // Pass the unique ID and the updated form data
     
  
     // Reset the form or navigate away after successful edit
     setFormData(formData);
    setShowAlert(true);
  };

  useEffect(() => {
    // Calculate newPrintbazcost based on formData

    // Update the state with the new value
    setFormData((prevState) => ({
      ...prevState,

      printbazcost: printbazcost,
    }));
  }, [formData.quantity, formData.orderDetailArrCustomDropSholder,formData]); // Dependencies

  const handleBack = () => {
    navigate("/");
  };

  
  const isItemFilled = (item) => {
    // You can customize this logic based on how you determine if an item is "filled"
    return item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL || item.quantityXXXL;
  };
  
  const handleGotoAddToCart = async(e) => {
    e.preventDefault();
  
    if (formData?.quantity <= 0) {
      // Handle the case where no quantity is selected
      setAlert(true);
      const timeoutId = setTimeout(() => {
        setAlert(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  if(user){
  // Filter the items that have been filled out
  const filledItems = {
    ...formData,
    orderDetailArr: formData.orderDetailArr?.filter(item => isItemFilled(item)),
    orderDetailArrCustomDropSholder: formData.orderDetailArrCustomDropSholder?.filter(item => isItemFilled(item)),
    orderDetailArrCustomHoodie: formData.orderDetailArrCustomHoodie?.filter(item => isItemFilled(item)),
    orderDetailArrBlankRoundNeck: formData.orderDetailArrBlankRoundNeck?.filter(item => isItemFilled(item)),
    orderDetailArrBlankDropSholder: formData.orderDetailArrBlankDropSholder?.filter(item => isItemFilled(item)),
    orderDetailArrBlankHoodie: formData.orderDetailArrBlankHoodie?.filter(item => isItemFilled(item)),
    userEmail:user?.email,userRegId:user?._id
  };

  // Add the filled items to the cart
  // addToCart(filledItems);
  // setCartItems(prevItems => {
  //   const updatedItems = [...prevItems, filledItems];
  //   localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  //   return updatedItems;
  // });
  const newItem = {
    ...formData,
    orderDetailArr: formData.orderDetailArr?.filter(item => isItemFilled(item)),
    orderDetailArrCustomDropSholder: formData.orderDetailArrCustomDropSholder?.filter(item => isItemFilled(item)),
    orderDetailArrCustomHoodie: formData.orderDetailArrCustomHoodie?.filter(item => isItemFilled(item)),
    orderDetailArrBlankRoundNeck: formData.orderDetailArrBlankRoundNeck?.filter(item => isItemFilled(item)),
    orderDetailArrBlankDropSholder: formData.orderDetailArrBlankDropSholder?.filter(item => isItemFilled(item)),
    orderDetailArrBlankHoodie: formData.orderDetailArrBlankHoodie?.filter(item => isItemFilled(item)),
  
    userEmail: user?.email,
    userRegId: user?._id
  };
  try {
    // Make a POST request to your server with the order data
    // const response = await fetch('https://server.printbaz.com/addToCart', {
    // const response = await fetch('http://localhost:5000/addToCart', {
    const response = await fetch('https://mserver.printbaz.com/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      // Order data sent successfully
      setShowAlert(true);
    } else {
      // Handle errors
      console.error('Error sending order data to server');
    }
  } catch (error) {
    // Handle network errors
    console.error('Network error:', error);
  }
  // Reset formData to its initial state
  setFormData({
          name: "",
          phone: "",
          address: "",
          instruction: "",
          collectAmount: "",
          productType: "Custom Drop Sholder",
          districts: "",
          zones: "",
          areas: "",
          quantity: 0,
          printbazcost: 0,
          uniqueId: Date.now(), // Note: This will set the uniqueId to the current timestamp, which might not be reset to initial state
          orderDetailArrCustomDropSholder: formData.orderDetailArrCustomDropSholder.map((item) => ({
            ...item,
            quantityM: "",
            quantityL: "",
            quantityXL: "",
            quantityXXL: "",
            quantityXXXL: "",
            totalQuantity: 0,
            printSide: "",
            printSize: "",
            printSizeBack: "",
            file: null,
            image: null,
          })),
        });
        // setShowAlert(true);
  
  }
  else{
setShowLoginPopup(true)
  }
  
  };
  const handleGotoCheckout = async(e) => {
    e.preventDefault();
  
    if (formData?.quantity <= 0) {
      // Handle the case where no quantity is selected
      setAlert(true);
      const timeoutId = setTimeout(() => {
        setAlert(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  if(user){
  // Filter the items that have been filled out
  const filledItems = {
    ...formData,
    orderDetailArr: formData.orderDetailArr?.filter(item => isItemFilled(item)),
    orderDetailArrCustomDropSholder: formData.orderDetailArrCustomDropSholder?.filter(item => isItemFilled(item)),
    orderDetailArrCustomHoodie: formData.orderDetailArrCustomHoodie?.filter(item => isItemFilled(item)),
    orderDetailArrBlankRoundNeck: formData.orderDetailArrBlankRoundNeck?.filter(item => isItemFilled(item)),
    orderDetailArrBlankDropSholder: formData.orderDetailArrBlankDropSholder?.filter(item => isItemFilled(item)),
    orderDetailArrBlankHoodie: formData.orderDetailArrBlankHoodie?.filter(item => isItemFilled(item)),
    userEmail:user?.email,userRegId:user?._id
  };

  
  const newItem = {
    ...formData,
    orderDetailArr: formData.orderDetailArr?.filter(item => isItemFilled(item)),
    orderDetailArrCustomDropSholder: formData.orderDetailArrCustomDropSholder?.filter(item => isItemFilled(item)),
    orderDetailArrCustomHoodie: formData.orderDetailArrCustomHoodie?.filter(item => isItemFilled(item)),
    orderDetailArrBlankRoundNeck: formData.orderDetailArrBlankRoundNeck?.filter(item => isItemFilled(item)),
    orderDetailArrBlankDropSholder: formData.orderDetailArrBlankDropSholder?.filter(item => isItemFilled(item)),
    orderDetailArrBlankHoodie: formData.orderDetailArrBlankHoodie?.filter(item => isItemFilled(item)),
  
    userEmail: user?.email,
    userRegId: user?._id
  };
  try {
    // Make a POST request to your server with the order data
    // const response = await fetch('https://server.printbaz.com/addToCart', {
    // const response = await fetch('http://localhost:5000/addToCart', {
    const response = await fetch('https://mserver.printbaz.com/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      // Order data sent successfully
      setShowBuyNowAlert(true);
    } else {
      // Handle errors
      console.error('Error sending order data to server');
    }
  } catch (error) {
    // Handle network errors
    console.error('Network error:', error);
  }
  // Reset formData to its initial state
  setFormData({
          name: "",
          phone: "",
          address: "",
          instruction: "",
          collectAmount: "",
          productType: "Custom Drop Sholder",
          districts: "",
          zones: "",
          areas: "",
          quantity: 0,
          printbazcost: 0,
          uniqueId: Date.now(), // Note: This will set the uniqueId to the current timestamp, which might not be reset to initial state
          orderDetailArrCustomDropSholder: formData.orderDetailArrCustomDropSholder.map((item) => ({
            ...item,
            quantityM: "",
            quantityL: "",
            quantityXL: "",
            quantityXXL: "",
            quantityXXXL: "",
            totalQuantity: 0,
            printSide: "",
            printSize: "",
            printSizeBack: "",
            file: null,
            image: null,
          })),
        });
        // setShowAlert(true);
  
  }
  else{
setShowLoginPopup(true)
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
  <NavigationBar/>
      {loading === true && (
        <>
          <div className="alert-overlay" />
          <div className="alert-box">
            <Spinner
              style={{ padding: "10px" }}
              animation="grow"
              variant="warning"
            />

            <h2>Please wait!</h2>
          </div>
        </>
      )}
      <Row className="m-auto">
        <Col xs={12} md={12} className="mt-5 ">
          <h3 style={{ cursor: "pointer" }} onClick={handleBack}>
            <span style={{ cursor: "pointer" }}>
              {" "}
              <img
                style={{ width: "20px" }}
                src="/images/left-arrow.png"
                alter="backTocategory"
              />
            </span>{" "}
            Custom Drop Sholder
          </h3>
        </Col>
      </Row>

      <Form onSubmit={EditItemDetail?handleEdit:OpenCheckout===true?handleGotoCheckout:handleGotoAddToCart} className="mb-4">
    
    
     

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
                      <img src="https://i.ibb.co/7pXqkZr/Drop-Shoulder-Maroon-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="productMoreImg">
                      <img src="https://i.ibb.co/QHPTMkX/Drop-Shoulder-White-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="productMoreImg" id="preview2">
                      <img src="https://i.ibb.co/VjrwxkT/Drop-Shoulder-Black-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="productMoreImg">
                      <img src="https://i.ibb.co/8dQdFCD/Drop-Shoulder-Bottle-Green-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                 
                  <div className="col-3">
                    <div className="productMoreImg">
                      <img src="https://i.ibb.co/7pXqkZr/Drop-Shoulder-Maroon-Custom.jpg" alt="Custom T-shirt" />
                    </div>
                  </div>
                </div>
           
  
                
              </div>
              {/*====== Product Information ======*/}
              <div className="col-lg-7">
                <div className="productInformation">
                  {/*====== Product Title ======*/}
                  <div className="productTitle marginTop10_mobile" >
                    <h2 style={{textAlign:"left"}}>Custom Drop Sholder</h2>
                  </div>
                  <div className="self-product-description">
                            <h5><strong>Size chart - In inches</strong></h5>
                          
                            <table border="1" cellpadding="5" className="scrollable-table">
                            <thead>
                            <tr>
                            <th>Size</th>
                            <th>Chest </th>
                            <th>Length</th>
                            <th>Shoulder</th>
                            <th>Sleeve</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>M</td>
                            <td>42</td>
                            <td >27</td>
                            <td >8</td>
                            <td >8.5</td>
    
                            </tr>
                            <tr>
                            <td>L</td>
                            <td>40</td>
                            <td>28</td>
                            <td >8.5</td>
                            <td >9</td>
   
    
                            </tr>
                            <tr>
                            <td>XL</td>
                            <td>42</td>
  
                            <td >29</td>
                            <td >9</td>
                            <td >9.5</td>
  
                            </tr>
                            <tr>
                            <td>2XL</td>
                            <td >44</td>
                            <td >30</td>
                            <td >9.5</td>
                            <td >9.8</td>
    
                            </tr>
                            <tr>
                            <td>3XL</td>
                            <td >50</td>
                            <td >32</td>
                            <td >10</td>
                            <td >10</td>
                            </tr>
                            </tbody>
                            </table>
                            <p></p></div>

                  {/*====== Product Color/Size/Files/Price/Button ======*/}
                  <div className="productColorSizeRow1">
                    {/*====== Product Color/Size/Files ======*/}
                    <div className="row">
                      <h5>Product Size/Color</h5>
                      <div className="col-lg-8 productSizeRow1">
                        <div className="accordion" id="accordionExample">
                       

{formData.orderDetailArrCustomDropSholder?.map((item, index) => (
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
                   type="number"
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
                   type="number"
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
                   type="number"
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
                   type="number"
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
                   type="number"
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
 ( item.printSide==="frontSide") &&
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
 ( item.printSide==="backSide") &&
 <>
   <label htmlFor="formFile" className="form-label fileUploadTitle">Back
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
       {/* <label htmlFor="formFile" className="form-label fileUploadTitle">Upload
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
onChange={(e) => handleFileChange(e, index)}/> */}
{/* file inputs component */}
<FileInputFields itemToEdit={EditItemDetail} handleFileChange={handleFileChange} index={index} item={item}/>
     </div>
   </div>
    </div>
  </div>
))}


                        
                        </div>
                      </div>
                    </div>
                    {/*====== Product Price ======*/}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="productPrice">
                          <h5>Product Price</h5>
                          <h6>{formData?.printbazcost} Tk</h6>
                          <p>Per Unit {formData?.quantity ?Number(printbazcost/Number(formData?.quantity)):0} Tk</p>
                        </div>
                      </div>
                    </div>
                    {/*====== Product Button ======*/}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="productButton">
                       
                          {  !EditItemDetail && 
                         <><button type="submit" onClick={()=>setOpenCheckout(true)}>Buy Now</button>
                         <button  type="submit">Add To Cart</button></>}
                         {   EditItemDetail &&  <button  type="submit"> Update Cart</button>}

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
        {/* <CustomProductCost
          formData={formData}
          handleInputChange={handleInputChange}
          printbazcost={formData?.printbazcost}
          printbazcostRawCalculation={printbazcost}
          formValid={formValid}
          alert={alert}
        /> */}
        
        {/* {(handleGotoAddToCart || handleEdit) && buttonEnabled === false && (
          <Alert variant="danger" className="m-auto">
            <Alert.Heading>
              please fill Required field(quantity,sizes,file,mockup) for your
              choosen item{" "}
            </Alert.Heading>
          </Alert>
        )} */}

        <div className="col-md-12 d-flex flex-column align-items-center ">
          {/* {
            !itemToEdit &&   <Button  className='orderSubmit_btn' type="submit">
            Add to cart
            </Button>
          }
          {
            itemToEdit &&   <Button  className='orderSubmit_btn' type="submit">
           Update Cart
            </Button>
          } */}
      
          {/* {!itemToEdit && (
            <Button
              className="orderSubmit_btn"
              // Directly calling the function here
              onClick={handleGotoAddToCart}
            >
              Add To Cart
            </Button>
          )}

          {itemToEdit && (
            <Button
              className="orderSubmit_btn"
              // disabled={isAddToCartEnabled()} // Directly calling the function here
              onClick={handleEdit}
            >
              Update Cart
            </Button>
          )} */}

          {isLoading === true && (
            <>
              <div className="alert-overlay" />
              <div className="alert-box">
                <Spinner
                  style={{ padding: "20px" }}
                  animation="grow"
                  variant="warning"
                />

                <h2>Please wait!</h2>
              </div>
            </>
          )}
          {/* {
            showLoginPopup===true &&
            <LoginPopup
            onClose={()=>setShowLoginPopup(false)}
            onSwitchToRegister={switchToRegister}
            closeAllPopup={closeAllPopup}
            />
          } */}
        </div>
      </Form>
      <ProductTab describtion="describtion here........"/>
      {/* new order all design will be here  */}
      {showAlert === true && (
        <AddtoCartAlert
          message="Item Added to Cart"
          onClose={() => setShowAlert(false)}
        />
      )}
        {showBuyNowAlert === true && (
        <BuyNowAlert
          message="Go to proceed to checkout"
          onClose={() => setShowBuyNowAlert(false)}
        />
      )}
    </div>
  );
};

export default CustomDropSholder;
