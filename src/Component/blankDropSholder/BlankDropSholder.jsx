import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { db, storage } from "../../firebase.config";
import { useGetData } from "../../hooks/useGetData";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
// import SendOrderConfirmationEmail from '../../confirmationMailOrder/SendOrderConfirmationEmail';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetTshirtPrice from "../../hooks/useGetTshirtPrice";
import AddtoCartAlert from "../alert/AddtoCartAlert";
import { CartContext } from "../../context/CartProvider";
import NavigationBar from "../Navbar/NavigationBar";
import ProductTab from "../ProductTab";
import LogoFileInput from "../logoFIleInput/LogoFileInput";
import BuyNowAlert from "../alert/BuyNowAlert";

const BlankDropSholder  = () => {
  const { formData, setFormData, setCartItems, editCartItem, cartItems,addToCart } =
    useContext(CartContext);
    const [uploadedFile, setUploadedFile] = useState(null);
    const location = useLocation();

  let idPrice = "teeShirtCampingId";
  let collectionsPrice = "productValues";
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbData, setDbData] = useState({});
  const [alert, setAlert] = useState(false);
  const [showBuyNowAlert, setShowBuyNowAlert] = useState(false);
  const [OpenCheckout, setOpenCheckout] = useState(false);
  const [showAddtocartAlert, setShowAddtocartAlert] = useState("");
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
  const [recvAmount, setRecvAmount] = useState();
  const [formValid, setFormValid] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  const d = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = d.toLocaleDateString("en-US", options);
  const { tshirtPrice } = useGetTshirtPrice();


 
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
        const newOrderDetailArr = [...prevFormData.orderDetailArrBlankDropSholder];
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

        return { ...prevFormData, orderDetailArrBlankDropSholder: newOrderDetailArr };
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
        const newOrderDetailArr = [...prevFormData.orderDetailArrBlankDropSholder];
        newOrderDetailArr[index].brandLogo = {}; // Clear brand logo data
        return { ...prevFormData, orderDetailArrBlankDropSholder: newOrderDetailArr };
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
const removeFileFromServer = async (fileId) => {
  try {
    // const response = await fetch(`http://localhost:5000/deleteFileApi/${fileId}`, {
    const response = await fetch(`https://mserver.printbaz.com/deleteFileApi/${fileId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

   

  } catch (error) {
    console.error('Error removing file from server:', error);
  }
};

 
  formData?.orderDetailArrBlankDropSholder?.forEach((item) => {
    item.totalQuantity =
      safeParseInt(item.quantityM) +
      safeParseInt(item.quantityL) +
      safeParseInt(item.quantityXL) +
      safeParseInt(item.quantityXXL)+
      safeParseInt(item.quantityXXXL);
  });

  const blankDropSholderFilter=tshirtPrice?.find(thsirt => thsirt.category === "Blank Drop Sholder")
let perCategoryCost=0
  let printbazcost = 0;
  let printbazcostbase = 0;
  if(EditItemDetail?._id){
    for (var i = 0; i < EditItemDetail?.orderDetailArrBlankDropSholder?.length; i++) 
    {
      if (
        formData?.quantity &&formData?.orderDetailArrBlankDropSholder[i]?.totalQuantity 
      ) {
       
    // Check if brand logo is selected for the current index
    const isBrandLogoSelected = i < addBrandLogoArray.length && addBrandLogoArray[i];
 
        if (EditItemDetail?.orderDetailArrBlankDropSholder[i]?.brandLogo?.fileId) {
          perCategoryCost=(5*formData?.orderDetailArrBlankDropSholder[i]?.totalQuantity)+(formData?.orderDetailArrBlankDropSholder[i]?.totalQuantity  * blankDropSholderFilter?.frontSideprice)
          printbazcost +=perCategoryCost
        } else {
          perCategoryCost=formData?.orderDetailArrBlankDropSholder[i]?.totalQuantity  * blankDropSholderFilter?.frontSideprice
          printbazcost +=perCategoryCost
  
        }
      }
    }
  }
  else{
    for (var j = 0; j < formData?.orderDetailArrBlankDropSholder?.length; j++) {
      if (
        formData?.quantity &&formData?.orderDetailArrBlankDropSholder[j]?.totalQuantity 
      ) {
      
    // Check if brand logo is selected for the current index
    const isBrandLogoSelected = j < addBrandLogoArray.length && addBrandLogoArray[j];
 
        if (isBrandLogoSelected) {
          perCategoryCost=(5*formData?.orderDetailArrBlankDropSholder[j]?.totalQuantity)+(formData?.orderDetailArrBlankDropSholder[j]?.totalQuantity  * blankDropSholderFilter?.frontSideprice)
          printbazcost +=perCategoryCost
        } else {
          perCategoryCost=formData?.orderDetailArrBlankDropSholder[j]?.totalQuantity  * blankDropSholderFilter?.frontSideprice
          printbazcost +=perCategoryCost
  
        }
      }
    }
  }
 

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const color = event.target.getAttribute("data-color");
    const size = event.target.getAttribute("data-size");
    const newOrderDetailArr = [...formData.orderDetailArrBlankDropSholder];

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
      orderDetailArrBlankDropSholder: newOrderDetailArr,
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
  }, [formData.quantity, formData.orderDetailArrBlankDropSholder,formData]); // Dependencies

  const handleBack = () => {
    navigate("/");
  };

  const [mainImage, setMainImage] = useState('https://i.ibb.co/ydx7zVC/Drop-Shoulder-Maroon.jpg');

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
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
    const response = await fetch('https://mserver.printbaz.com/addToCart', {
    // const response = await fetch('http://localhost:5000/addToCart', {
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
          productType: "Blank Drop Sholder",
          districts: "",
          zones: "",
          areas: "",
          quantity: 0,
          printbazcost: 0,
          uniqueId: Date.now(), // Note: This will set the uniqueId to the current timestamp, which might not be reset to initial state
          orderDetailArrBlankDropSholder: formData.orderDetailArrBlankDropSholder.map((item) => ({
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
    const response = await fetch('https://mserver.printbaz.com/addToCart', {
    // const response = await fetch('http://localhost:5000/addToCart', {
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
          productType: "Blank Drop Sholder",
          districts: "",
          zones: "",
          areas: "",
          quantity: 0,
          printbazcost: 0,
          uniqueId: Date.now(), // Note: This will set the uniqueId to the current timestamp, which might not be reset to initial state
          orderDetailArrBlankDropSholder: formData.orderDetailArrBlankDropSholder.map((item) => ({
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
            Blank Drop Sholder
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
          <img src={mainImage} alt="Custom T-shirt" />
        </div>
      </div>
      <div className="col-3">
        <div className="productMoreImg">
          <img
            src="https://i.ibb.co/kxwpVfX/Drop-Shoulder-Black.jpg"
            alt="Custom T-shirt"
            onClick={() => handleThumbnailClick('https://i.ibb.co/kxwpVfX/Drop-Shoulder-Black.jpg')}
          />
        </div>
      </div>
      <div className="col-3">
        <div className="productMoreImg" id="preview2">
          <img
            src="https://i.ibb.co/ydx7zVC/Drop-Shoulder-Maroon.jpg"
            alt="Custom T-shirt"
            onClick={() => handleThumbnailClick('https://i.ibb.co/ydx7zVC/Drop-Shoulder-Maroon.jpg')}
          />
        </div>
      </div>
      <div className="col-3">
        <div className="productMoreImg">
          <img
            src="https://i.ibb.co/WzhzNv1/Drop-Shoulder-Bottle-Green.jpg"
            alt="Custom T-shirt"
            onClick={() => handleThumbnailClick('https://i.ibb.co/WzhzNv1/Drop-Shoulder-Bottle-Green.jpg')}
          />
        </div>
      </div>
      <div className="col-3">
        <div className="productMoreImg">
          <img
            src="https://i.ibb.co/zZq85J2/Drop-Shoulder-White.jpg"
            alt="Custom T-shirt"
            onClick={() => handleThumbnailClick('https://i.ibb.co/zZq85J2/Drop-Shoulder-White.jpg')}
          />
        </div>
      </div>
    </div>
           
  
                
              </div>
              {/*====== Product Information ======*/}
              <div className="col-lg-7">
                <div className="productInformation">
                  {/*====== Product Title ======*/}
                  <div className="productTitle marginTop10_mobile" >
                    <h2 style={{textAlign:"left"}}>Blank Drop Sholder</h2>
                  </div>
                 
                  {/*====== Product Color/Size/Files/Price/Button ======*/}
                  <div className="productColorSizeRow1">
                    {/*====== Product Color/Size/Files ======*/}
                    <div className="row">
                      <h5>Product Size/Color</h5>
                      <div className="col-lg-8 productSizeRow1">
                        <div className="accordion" id="accordionExample">
                       

{formData?.orderDetailArrBlankDropSholder?.map((item, index) => (
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
      
       
{/* file inputs component */}
<LogoFileInput itemToEdit={EditItemDetail} handleFileChange={handleFileChange} index={index} item={item}/>
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
      <ProductTab describtion=""/>
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

export default BlankDropSholder ;
