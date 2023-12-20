import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartProvider';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Navbar/NavigationBar';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const AddToCart = () => {
    const { formData,setFormData,cartItems,deleteCartItem} = useContext(CartContext)
    const {user}=useContext(AuthContext)
    // const mycartItems = cartItems?.filter(item => item?.userRegId === user?._id);
    const navigate=useNavigate()
    const handleBackToHomepage=()=>{
      navigate('/newOrdersWithOption')
    }
   
  
    const initialRoundNeckOptions =  [
      {
        productType:"Custom Round Neck tshirt",
        color: 'Black',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/1np6ZMQ/Round-Neck-Black-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
       totalQuantity:0,
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo:null
      },
      {
        productType:"Custom Round Neck tshirt",
        color: 'White',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/7VtxHWr/Round-Neck-White-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
        totalQuantity:0,
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo:null
      },
      {

        productType:"Custom Round Neck tshirt",
         color: 'Bottle Green',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/bQRDfhL/Round-Neck-Bottle-Green-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
        totalQuantity:0,
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo:null
      },  
      {
        productType:"Custom Round Neck tshirt",
        color: 'Maroon',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/NtznFwg/Round-Neck-Maroon-Custom.jpg",
        quantityM: '',
        quantityL: '',
        quantityXL: '',
        quantityXXL: '',
        quantityXXXL: '',
        totalQuantity:0,
        printSide: '',
        printSize: '',
        printSizeBack: '',
        file: null,
        image: null,
        brandLogo:null
      },
    ]
    const initialDropShoulderOptions = [
          
      {
        productType:'custom Drop Sholder',
        color: 'Black',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/VjrwxkT/Drop-Shoulder-Black-Custom.jpg",
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
        productType:'custom Drop Sholder',
        color: 'White',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/QHPTMkX/Drop-Shoulder-White-Custom.jpg",
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
        productType:'custom Drop Sholder',
        color: 'Bottle Green',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/8dQdFCD/Drop-Shoulder-Bottle-Green-Custom.jpg",
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
        productType:'custom Drop Sholder',
        color: 'Maroon',
        teshirtSize: {},
        categoryImg:"https://i.ibb.co/7pXqkZr/Drop-Shoulder-Maroon-Custom.jpg",
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
    ]

    const initialHoodieOptions =  [
      {
        productType:'Custom hoodie',
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
        productType:'Custom hoodie',
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
        productType:'Custom hoodie',
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
        productType:'Custom hoodie',
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
        productType:'Custom hoodie',
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
    ]
   const initialBankRoundNackOptions= [
      {
        productType:'Blank Round Neck',
        color: 'Black',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Round Neck Black.jpg",
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
        productType:'Blank Round Neck',
        color: 'White',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Round Neck White.jpg",
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
        productType:'Blank Round Neck',
        color: 'Bottle Green',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Round Neck Bottle Green.jpg",
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
        productType:'Blank Round Neck',
        color: 'Maroon',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Round Neck Maroon.jpg",
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
    ]
   const initialBankDropSholderOptions= [
      {
        productType:'Blank Drop Sholder',
        color: 'Black',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Drop Shoulder Black.jpg",
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
        productType:'Blank Drop Sholder',
        color: 'White',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Drop Shoulder White.jpg",
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
        productType:'Blank Drop Sholder',
        color: 'Bottle Green',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Drop Shoulder Bottle Green.jpg",
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
        productType:'Blank Drop Sholder',
        color: 'Maroon',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Drop Shoulder Maroon.jpg",
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
    ]
   const initialBankHoodieOptions= [
      {
        productType:'Blank Hoodie',
        color: 'Black',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Black.jpg",
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
        productType:'Blank Hoodie',
        color: 'Green',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Neon Green.jpg",
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
        productType:'Blank Hoodie',
        color: 'Nevy Blue',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Nevy Blue.jpg",
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
        productType:'Blank Hoodie',
        color: 'Gray',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Gray.jpg",
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
        productType:'Blank Hoodie',
        color: 'Red',
        teshirtSize: {},
        categoryImg:"/images/categoryImgs/Hoodies Red.jpg",
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
      }
    ]
    const mergeOptionsWithSelectedData = (selectedData, options) => {
  return options.map(option => {
    const selectedOption = selectedData.find(sd => sd.color === option.color);
    return selectedOption ? { ...option, ...selectedOption } : option;
  });
};
const startEdit = (e, itemIdentifier) => {
  e.preventDefault();
  
  const itemToEdit = cartItems?.find(item => item._id === itemIdentifier);
 
  if (itemToEdit) {
    let updatedFormData = { ...itemToEdit };

    if (itemToEdit.orderDetailArr?.length > 0) {
      updatedFormData.orderDetailArr = mergeOptionsWithSelectedData(itemToEdit.orderDetailArr, initialRoundNeckOptions);
      navigate('/newOrder', { state: { itemToEdit: updatedFormData } });
    }
     else if (itemToEdit.orderDetailArrCustomDropSholder?.length > 0) {
      updatedFormData.orderDetailArrCustomDropSholder = mergeOptionsWithSelectedData(itemToEdit.orderDetailArrCustomDropSholder, initialDropShoulderOptions);
      navigate('/customDropSholder', { state: { itemToEdit: updatedFormData } });
    }
     else if (itemToEdit.orderDetailArrCustomHoodie?.length > 0) {
      updatedFormData.orderDetailArrCustomHoodie = mergeOptionsWithSelectedData(itemToEdit.orderDetailArrCustomHoodie, initialHoodieOptions);
      navigate('/custonHoodie', { state: { itemToEdit: updatedFormData } });
    }
     else if (itemToEdit.orderDetailArrBlankRoundNeck?.length > 0) {
      updatedFormData.orderDetailArrBlankRoundNeck = mergeOptionsWithSelectedData(itemToEdit.orderDetailArrBlankRoundNeck, initialBankRoundNackOptions);
    navigate('/blankRoundNeck', { state: { itemToEdit: updatedFormData } });
    }
     else if (itemToEdit.orderDetailArrBlankDropSholder?.length > 0) {
      updatedFormData.orderDetailArrBlankDropSholder = mergeOptionsWithSelectedData(itemToEdit.orderDetailArrBlankDropSholder, initialBankDropSholderOptions);
      navigate('/blankDropSholder', { state: { itemToEdit: updatedFormData } });
    }
     else if (itemToEdit.orderDetailArrBlankHoodie?.length > 0) {
      updatedFormData.orderDetailArrBlankHoodie = mergeOptionsWithSelectedData(itemToEdit.orderDetailArrBlankHoodie, initialBankHoodieOptions);
      navigate('/blankHoodie', { state: { itemToEdit: updatedFormData } });
    }

    setFormData(updatedFormData);
  }
};

   

    useEffect(()=>{

    },[formData])
   
      
        const handleCheckOut=()=>{
          navigate("/checkout")
        }
        const allProductsPrintbazCost = cartItems?.reduce((total, item) => {
          return total + item.printbazcost;
      }, 0);
      
   
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
          <style dangerouslySetInnerHTML={{__html: "\n    \n/* Blocks */\n.site-blocks-cover {\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center center; }\n  .site-blocks-cover, .site-blocks-cover .row {\n    min-height: 600px;\n    height: calc(100vh - 174px); }\n  .site-blocks-cover h1 {\n    font-size: 30px;\n    font-weight: 900;\n    color: #000; }\n    @media (min-width: 768px) {\n      .site-blocks-cover h1 {\n        font-size: 50px; } }\n  .site-blocks-cover p {\n    color: #333333;\n    font-size: 20px;\n    line-height: 35px; }\n  .site-blocks-cover .intro-text {\n    font-size: 16px;\n    line-height: 1.5; }\n\n.site-blocks-1 {\n  border-bottom: 1px solid #edf0f5; }\n  .site-blocks-1 .divider {\n    position: relative; }\n    .site-blocks-1 .divider:after {\n      content: \"\";\n      position: absolute;\n      height: 100%;\n      width: 1px;\n      right: 10px;\n      background: #edf0f5; }\n    .site-blocks-1 .divider:last-child:after {\n      display: none; }\n  .site-blocks-1 .icon span {\n    position: relative;\n    color: #012652;\n    top: -10px;\n    font-size: 50px;\n    display: inline-block; }\n  .site-blocks-1 .text h2 {\n    color: #25262a;\n    letter-spacing: .05em;\n    font-size: 18px; }\n  .site-blocks-1 .text p:last-child {\n    margin-bottom: 0; }\n\n.site-blocks-2 .block-2-item {\n  display: block;\n  position: relative; }\n  .site-blocks-2 .block-2-item:before {\n    z-index: 1;\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background: -moz-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n    background: -webkit-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n    background: -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(18%, transparent), color-stop(99%, rgba(0, 0, 0, 0.8)), to(rgba(0, 0, 0, 0.8)));\n    background: -o-linear-gradient(top, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n    background: linear-gradient(to bottom, transparent 0%, transparent 18%, rgba(0, 0, 0, 0.8) 99%, rgba(0, 0, 0, 0.8) 100%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#cc000000',GradientType=0 ); }\n  .site-blocks-2 .block-2-item .image {\n    position: relative;\n    margin-bottom: 0;\n    overflow: hidden; }\n    .site-blocks-2 .block-2-item .image img {\n      margin-bottom: 0;\n      -webkit-transition: .3s all ease-in-out;\n      -o-transition: .3s all ease-in-out;\n      transition: .3s all ease-in-out; }\n  .site-blocks-2 .block-2-item .text {\n    z-index: 2;\n    bottom: 0;\n    padding-left: 20px;\n    position: absolute;\n    width: 100%; }\n    .site-blocks-2 .block-2-item .text > span, .site-blocks-2 .block-2-item .text h3 {\n      color: #fff; }\n    .site-blocks-2 .block-2-item .text > span {\n      font-size: 12px;\n      letter-spacing: .1em;\n      font-weight: 900; }\n    .site-blocks-2 .block-2-item .text h3 {\n      font-size: 40px; }\n  .site-blocks-2 .block-2-item:hover .image img {\n    -webkit-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    transform: scale(1.1); }\n\n.block-3 .owl-stage {\n  padding-top: 40px;\n  padding-bottom: 40px; }\n\n.block-3 .owl-nav {\n  position: relative;\n  position: absolute;\n  bottom: -50px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  transform: translateX(-50%); }\n  .block-3 .owl-nav .owl-prev, .block-3 .owl-nav .owl-next {\n    position: relative;\n    display: inline-block;\n    padding: 20px;\n    font-size: 30px;\n    color: #5c626e; }\n    .block-3 .owl-nav .owl-prev:hover, .block-3 .owl-nav .owl-next:hover {\n      color: #25262a; }\n    .block-3 .owl-nav .owl-prev.disabled, .block-3 .owl-nav .owl-next.disabled {\n      opacity: .2; }\n\n.block-4 {\n  -webkit-box-shadow: 0 0 30px -10px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0 30px -10px rgba(0, 0, 0, 0.1);\n  background: #fff; }\n  .block-4 .block-4-text h3 {\n    font-size: 20px;\n    margin-bottom: 0; }\n    .block-4 .block-4-text h3 a {\n      text-decoration: none; }\n\n.block-5 ul, .block-5 ul li {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  line-height: 1.5; }\n\n.block-5 ul li {\n  padding-left: 30px;\n  position: relative;\n  margin-bottom: 15px;\n  color: #25262a; }\n  .block-5 ul li:before {\n    top: 0;\n    font-family: \"icomoon\";\n    content: \"\";\n    position: absolute;\n    left: 0;\n    font-size: 20px;\n    line-height: 1;\n    color: #012652; }\n  .block-5 ul li.address:before {\n    content: \"\\e8b4\"; }\n  .block-5 ul li.email:before {\n    content: \"\\f0e0\"; }\n  .block-5 ul li.phone:before {\n    content: \"\\f095\"; }\n\n.block-6 {\n  display: block; }\n  .block-6 img {\n    display: block; }\n  .block-6 h3 {\n    font-size: 18px; }\n  .block-6 p {\n    color: #737b8a; }\n\n.block-7 .form-group {\n  position: relative; }\n\n.block-7 .form-control {\n  padding-right: 96px; }\n\n.block-7 .btn {\n  position: absolute;\n  width: 80px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%);\n  right: 3px; }\n\n.block-8 .post-meta {\n  color: #c4c7ce; }\n\n.block-8 .block-8-sep {\n  margin-left: 10px;\n  margin-right: 10px; }\n\n.site-blocks-table {\n  overflow: auto; }\n  .site-blocks-table .product-thumbnail {\n    width: 200px; }\n  .site-blocks-table thead th {\n    padding: 30px;\n    text-align: center;\n    border-width: 1px !important;\n    vertical-align: middle;\n    color: #212529;\n    font-size: 18px; }\n  .site-blocks-table td {\n    padding: 20px;\n    text-align: center;\n    vertical-align: middle;\n    color: #212529; }\n  .site-blocks-table tbody tr:first-child td {\n    border-top: 1px solid #012652 !important; }\n\n.site-block-order-table th {\n  border-top: none !important;\n  border-bottom-width: 1px !important; }\n\n.site-block-order-table td, .site-block-order-table th {\n  color: #000; }\n\n.site-block-top-search {\n  position: relative; }\n  .site-block-top-search .icon {\n    position: absolute;\n    left: 0;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    transform: translateY(-50%); }\n  .site-block-top-search input {\n    padding-left: 40px;\n    -webkit-transition: .3s all ease-in-out;\n    -o-transition: .3s all ease-in-out;\n    transition: .3s all ease-in-out; }\n    .site-block-top-search input:focus, .site-block-top-search input:active {\n      padding-left: 25px; }\n\n.site-block-27 ul, .site-block-27 ul li {\n  padding: 0;\n  margin: 0; }\n\n.site-block-27 ul li {\n  display: inline-block;\n  margin-bottom: 4px; }\n  .site-block-27 ul li a, .site-block-27 ul li span {\n    text-align: center;\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    border-radius: 50%;\n    border: 1px solid #ccc; }\n  .site-block-27 ul li.active a, .site-block-27 ul li.active span {\n    background: #012652;\n    color: #fff;\n    border: 1px solid transparent; }\n\n#slider-range {\n  height: 8px; }\n  #slider-range .ui-slider-handle {\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    border: none !important;\n    background: #012652; }\n    #slider-range .ui-slider-handle:focus, #slider-range .ui-slider-handle:active {\n      outline: none; }\n  #slider-range .ui-slider-range {\n    background-color: #012652; }\n\n.color-item .color {\n  width: 14px;\n  height: 14px; }\n\n.block-16 figure {\n  position: relative; }\n  .block-16 figure .play-button {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    font-size: 40px;\n    width: 90px;\n    height: 90px;\n    background: #fff;\n    display: block;\n    border-radius: 50%;\n    border: none; }\n    .block-16 figure .play-button:hover {\n      opacity: 1; }\n    .block-16 figure .play-button > span {\n      position: absolute;\n      left: 55%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -45%);\n      -ms-transform: translate(-50%, -45%);\n      transform: translate(-50%, -45%); }\n\n.block-38 .block-38-header .block-38-heading {\n  color: #000;\n  margin: 0;\n  font-weight: 300; }\n\n.block-38 .block-38-header .block-38-subheading {\n  color: #b3b3b3;\n  margin: 0 0 20px 0;\n  text-transform: uppercase;\n  font-size: 15px;\n  letter-spacing: .1em; }\n\n.block-38 .block-38-header img {\n  width: 120px;\n  border-radius: 50%;\n  margin-bottom: 20px; }\n\n.product-name p {\n  margin: 0;\n}\n\n/* Chrome, Safari, Edge, Opera */\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n/* Firefox */\ninput[type=number] {\n  -moz-appearance: textfield;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #012652;\n  border-color: #012652;\n}\n\n.btn-primary:hover {\n  color: #fff;\n  background-color: #012652;\n  border-color: #012652;\n}\n\n.btn-outline-primary {\n  color: #012652;\n  background-color: transparent;\n  background-image: none;\n  border-color: #012652;\n}\n\n.btn-outline-primary:hover {\n  color: #ffffff;\n  background-color: #012652;\n  background-image: none;\n  border-color: #012652;\n}\n  " }} />
         <NavigationBar/>
          <div className="site-wrap mt-5">
            <div className="site-section">
              <div className="container">
                <div className="row mb-5">
                  <form className="col-md-12" method="post">
                    <div className="site-blocks-table">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            {/* <th className="product-thumbnail">Image</th> */}
                            {/* <th className="product-name">Product</th>
                            <th className="product-quantity">Quantity</th> */}
                            <th className="product-price">products</th>
                            <th className="product-total">Per Item Price</th>
                            <th className="product-option">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                         
                            {
                             
                             cartItems
                              ?.map((selectedProduct,index)=><>
                            <tr key={selectedProduct?.uniqueId}> 
                            <table className="table table-bordered"><thead>
                          <tr>
                            <th className="product-thumbnail">Image</th> 
                          <th className="product-name">Product</th>
                            <th className="product-quantity">Quantity</th>
                          
                          </tr>
                        </thead>
                               {
                                //custom round neck
                                selectedProduct?.orderDetailArr?.map(item=>
                               
                              <tr>

                                  {  
                                    item?.totalQuantity>0 &&(item?.printSide &&  
                                     ( item?.printSize|| item?.printSizeBack) ) &&
                              <>
                              <td className="product-thumbnail">
                                {
                                  item?.color==="Black"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/1np6ZMQ/Round-Neck-Black-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="White"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/7VtxHWr/Round-Neck-White-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Bottle Green"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/bQRDfhL/Round-Neck-Bottle-Green-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Maroon"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/NtznFwg/Round-Neck-Maroon-Custom.jpg" alt="" className="img-fluid" />
                                }
                            
                           
                            </td>
                            <td className="product-name" style={{textAlign: 'left'}}>
                              <h5>{item?.productType}</h5>
                           
                                 <p>{item?.color}:
                                 {item?.quantityL&& "L: " + item?.quantityL}  
                        {item?.quantityM&& "M: " +  item?.quantityM}  
                        {item?.quantityXL&& "XL: " + item?.quantityXL}  
                        {item?.quantityXXL&& "2XL: " + item?.quantityXXL}  
                        {item?.quantityXXXL&& "3XL: " + item?.quantityXXXL}  
                          {/* {item?.teshirtSize?.L&& "L: " + item?.teshirtSize?.L}  
                          {item?.tshirtSize?.M&& "M: " +  item?.tshirtSize?.M}  
                        {item?.teshirtSize?.XL&& "XL: " + item?.teshirtSize?.XL}  
                        {item?.teshirtSize?.XXL&& "XXL: " + item?.teshirtSize?.XXL}   */}
                                  
                                  
                                  </p>
                             
                             </td>
                             <td>{item?.totalQuantity}</td>
                             </>
                                    } 
                                    </tr> 
                           
                                )
                                 
                              }
                               {
                                // for custom drop sholder
                                selectedProduct?.orderDetailArrCustomDropSholder?.map(item=>
                               
                              <tr>

                                  {  
                                    item?.totalQuantity>0 &&(item?.printSide &&  
                                     ( item?.printSize|| item?.printSizeBack) ) &&
                              <>
                               <td className="product-thumbnail">
                                {
                                  item?.color==="Black"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/VjrwxkT/Drop-Shoulder-Black-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="White"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/QHPTMkX/Drop-Shoulder-White-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Bottle Green"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/8dQdFCD/Drop-Shoulder-Bottle-Green-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Maroon"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/7pXqkZr/Drop-Shoulder-Maroon-Custom.jpg" alt="" className="img-fluid" />
                                }
                            
                           
                            </td>
                            <td className="product-name" style={{textAlign: 'left'}}>
                              <h5>{item?.productType}</h5>
                           
                                 <p>{item?.color}:
                                 {item?.quantityL&& "L: " + item?.quantityL}  
                        {item?.quantityM&& "M: " +  item?.quantityM}  
                        {item?.quantityXL&& "XL: " + item?.quantityXL}  
                        {item?.quantityXXL&& "2XL: " + item?.quantityXXL}  
                        {item?.quantityXXXL&& "3XL: " + item?.quantityXXXL}   
                          </p>
                             
                             </td>
                             <td>{item?.totalQuantity}</td>
                             </>
                                    } 
                                    </tr> 
                           
                                )
                                 
                              }
                               {
                                // for custom drop sholder
                                selectedProduct?.orderDetailArrCustomHoodie?.map(item=>
                               
                              <tr>

                                  {  
                                    item?.totalQuantity>0 &&(item?.printSide &&  
                                     ( item?.printSize|| item?.printSizeBack) ) &&
                              <>
                              <td className="product-thumbnail">
                                {
                                  item?.color==="Black"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/VDp04Mx/Hoodies-Black-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Nevy Blue"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/JjFmL11/Hoodies-Nevy-Blue-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Green"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/v36RXc6/Hoodies-Neon-Green-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Gray"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/NKhyMyp/Hoodies-Gray-Custom.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Red"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/MRf1tBD/Hoodies-Red-Custom.jpg" alt="" className="img-fluid" />
                                }
                            
                           
                            </td>
                            <td className="product-name" style={{textAlign: 'left'}}>
                              <h5>{item?.productType}</h5>
                           
                                 <p>{item?.color}:
                                 
                          {item?.quantityL&& "L: " + item?.quantityL}  
                        {item?.quantityM&& "M: " +  item?.quantityM}  
                        {item?.quantityXL&& "XL: " + item?.quantityXL}  
                        {item?.quantityXXL&& "2XL: " + item?.quantityXXL}  
                        {item?.quantityXXXL&& "3XL: " + item?.quantityXXXL}   
                                  
                                  
                                  </p>
                             
                             </td>
                             <td>{item?.totalQuantity}</td>
                             </>
                                    } 
                                    </tr> 
                            )
                                 
                              }
                               {
                                // for blank round neck
                                selectedProduct?.orderDetailArrBlankRoundNeck
                                ?.map(item=>
                               
                              <tr>

                                  {  
                                  
                              <>
                              <td className="product-thumbnail">
                                {
                                  item?.color==="Black"?
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/1np6ZMQ/Round-Neck-Black-Custom.jpg" alt="" className="img-fluid" />
                                
                               : 
                                  item?.color==="White"?
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/zffxNhp/Round-Neck-White.jpg" alt="" className="img-fluid" />
                                
                               : 
                                  item?.color==="Bottle Green"?
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/1sFzNJ0/Round-Neck-Bottle-Green.jpg" alt="" className="img-fluid" />
                                :
                                
                                  item?.color==="Maroon" &&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/85b9H6S/Round-Neck-Maroon.jpg" alt="" className="img-fluid" />
                                }
                            
                           
                            </td>
                            <td className="product-name" style={{textAlign: 'left'}}>
                              <h5>{item?.productType}</h5>
                           
                                 <p>{item?.color}:
                               
                                  {item?.quantityL&& "L: " + item?.quantityL}  
                        {item?.quantityM&& "M: " +  item?.quantityM}  
                        {item?.quantityXL&& "XL: " + item?.quantityXL}  
                        {item?.quantityXXL&& "2XL: " + item?.quantityXXL}  
                        {item?.quantityXXXL&& "3XL: " + item?.quantityXXXL}        
                                  </p>
                             
                             </td>
                             <td>{item?.totalQuantity}</td>
                             </>
                                    } 
                                    </tr> 
                            )
                                 
                              }
                               {
                                // for blank round neck
                                selectedProduct?.orderDetailArrBlankDropSholder
                                ?.map(item=>
                               
                              <tr>

                                  {  
                              <>
                              
                              <td className="product-thumbnail">
                                {
                                  item?.color==="Black"?
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/kxwpVfX/Drop-Shoulder-Black.jpg" alt="" className="img-fluid" />
                                
                               : 
                                  item?.color==="White"?
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/zZq85J2/Drop-Shoulder-White.jpg" alt="" className="img-fluid" />
                                
                               : 
                                  item?.color==="Bottle Green"?
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/WzhzNv1/Drop-Shoulder-Bottle-Green.jpg" alt="" className="img-fluid" />
                                :
                                
                                  item?.color==="Maroon" &&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/ydx7zVC/Drop-Shoulder-Maroon.jpg" alt="" className="img-fluid" />
                                }
                            
                           
                            </td>
                            <td className="product-name" style={{textAlign: 'left'}}>
                              <h5>{item?.productType}</h5>
                           
                                 <p>{item?.color}:
                           
                                {item?.quantityL&& "L: " + item?.quantityL}  
                        {item?.quantityM&& "M: " +  item?.quantityM}  
                        {item?.quantityXL&& "XL: " + item?.quantityXL}  
                        {item?.quantityXXL&& "2XL: " + item?.quantityXXL}  
                        {item?.quantityXXXL&& "3XL: " + item?.quantityXXXL}      
                                  
                                  </p>
                             
                             </td>
                             <td>{item?.totalQuantity}</td>
                             </>
                                    } 
                                    </tr> 
                            )
                                 
                              }
                               {
                                // for blank Hoodie
                                selectedProduct?.orderDetailArrBlankHoodie
                                ?.map(item=>
                               
                              <tr>

                                  {  
                                   
                              <>
                              <td className="product-thumbnail">
                                {
                                  item?.color==="Black"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/tM08Ww7/Hoodies-Black.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Nevy Blue"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/fCnCjhK/Hoodies-Nevy-Blue.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Green"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/h1svWPZ/Hoodies-Neon-Green.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Gray"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/SxMzfND/Hoodies-Gray.jpg" alt="" className="img-fluid" />
                                }
                                {
                                  item?.color==="Red"&&
                                  <img style={{width:"80px",height:"80px"}}  src="https://i.ibb.co/QbSnvWT/Hoodies-Red.jpg" alt="" className="img-fluid" />
                                }
                            
                           
                            </td>
                            <td className="product-name" style={{textAlign: 'left'}}>
                              <h5>{item?.productType}</h5>
                           
                                 <p>{item?.color}:
                                 
                           
                                  {item?.quantityL&& "L: " + item?.quantityL}  
                        {item?.quantityM&& "M: " +  item?.quantityM}  
                        {item?.quantityXL&& "XL: " + item?.quantityXL}  
                        {item?.quantityXXL&& "2XL: " + item?.quantityXXL}  
                        {item?.quantityXXXL&& "3XL: " + item?.quantityXXXL}       
                                  </p>
                             
                             </td>
                             <td>{item?.totalQuantity}</td>
                             </>
                                    } 
                                    </tr> 
                           
                                
                                 
                                
                                  
                                  
                          
                           
                                  )
                                 
                              }
                              </table>
                              <td><span style={{fontWeight: 800}}>৳</span>{selectedProduct?.printbazcost/selectedProduct?.quantity}</td>
                            
                            <td><span style={{fontWeight: 800}}>৳</span>{selectedProduct?.printbazcost}</td>
                            <td>
                              <button onClick={(e)=>deleteCartItem(selectedProduct?._id,e)} style={{backgroundColor:"#012652",border:"none"}} className="btn btn-primary btn-sm mr-2">Delete</button>
                              <button onClick={(e) => startEdit(e,selectedProduct?._id)} style={{backgroundColor:"#012652",border:"none",marginLeft:"10px"}} className="btn btn-primary btn-sm ">Edit</button>

                            </td>
                              </tr> 
                              </>)
                              
                            }
                            
                        
                         
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <button onClick={handleBackToHomepage} className="btn btn-outline-primary btn-sm btn-block" style={{backgroundColor:"#012652",border:"none",color:"white"}}>Continue Shopping</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 pl-5">
                    <div className="row justify-content-end">
                      <div className="col-md-7">
                        <div className="row">
                          <div className="col-md-12 text-right border-bottom mb-5">
                            <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                          </div>
                        </div>
                       
                        <div className="row mb-5">
                          <div className="col-md-6">
                            <span className="text-black">Total</span>
                          </div>
                          <div className="col-md-6 text-right">
                            <strong className="text-black"><span style={{fontWeight: 800}}>৳</span>{allProductsPrintbazCost}</strong>
                          </div>
                        </div>
                        <div className="row mb-5">
                          {
                            cartItems?.length>0 &&
                            <div className="col-md-12">
                            <button className="btn btn-primary btn-lg py-3 btn-block" style={{backgroundColor:"#012652",border:"none"}} onClick={handleCheckOut}>Proceed To Checkout</button>
                          </div>
                          }
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};

export default AddToCart;

