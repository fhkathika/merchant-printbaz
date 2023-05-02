// import NavigationBar from '../Navbar/NavigationBar';
// import { addDoc, collection,  doc , getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
// import React, { useState } from 'react';
// import { Form, Button, Container } from 'react-bootstrap';
// import { db, storage } from '../../firebase.config';
// const NewOrder = () => {
//   const id = "resellerOrdersId"
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     purpose:"",
//     detail:"",
//     usage:"",
//     images: [], // an array to hold multiple images
//     createdAt: Timestamp.now().toDate(),
//     productArr: [] // Initialize as an empty array
//   });
// console.log("formdata",formData.productArr);
//   const [progress, setProgress] = useState(0);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = e.target.files;
//     const images = [...formData.images];
//     for (let i = 0; i < files.length; i++) {

//         images.push(files[i]);

//     }
//     setFormData({ ...formData, images });
//   };
//   let newProductArr=[]
//   const handlePublish = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.category || !formData.purpose || !formData.detail|| !formData.usage || formData.images.length === 0) {
//       alert("Please fill all the fields");
//       return;
//     }

//     const promises = [];
//     const newImageUrls = [];

//     formData.images.forEach((image) => {
//       const storageRef = ref(
//         storage,
//         `/images/${Date.now()}${image?.name}`
//       );
//       const uploadImage = uploadBytesResumable(storageRef, image);
//       promises.push(uploadImage);

//       uploadImage.on(
//         "state_changed",
//         (snapshot) => {
//           const progressPercent = Math.round(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           );
//           setProgress(progressPercent);
//         },
//         (err) => {
//           console.log(err);
//         },
//         () => {
//           getDownloadURL(uploadImage.snapshot.ref).then((url) => {
//             newImageUrls.push(url);
//           });
//         }
//       );
//     });

//     Promise.all(promises)
//       .then(() => {
//         const newProduct = {
//           name: formData.name,
//           category: formData.category,
//           purpose: formData.purpose,
//           detail:formData.detail,
//           usage:formData.usage,
//           imageUrls: newImageUrls,
//           createdAt: Timestamp.now().toDate(),
//           id: Date.now(),
//         };
//         const articleRef = collection(db, "allProducts");
//         const docRef = doc(articleRef, "resellerOrdersId");

//         return getDoc(docRef).then((doc) => {
//           if (doc.exists()) {
//             const productArr = doc.data().productArr || [];
//             const newProductArr = [...productArr, newProduct];

//             return updateDoc(docRef, {
//               productArr: newProductArr,
//             });
//           } else {
//             return setDoc(docRef, {
//               productArr: [newProduct],
//             });
//           }
//         });
//       })
//       .then(() => {
//         alert("Article added successfully", { type: "success" });
//         setFormData({
//           name: "",
//           category: "",
//           purpose:"",
//           detail:"",
//           usage:"",
//           images: [],
//           productArr: newProductArr,
//         });
//         setProgress(0);
//       })
//       .catch((err) => {
//         alert("Error adding article", { type: "error" });
//       });
//   };

//   return (
//       <>
//       <NavigationBar/>
//       <Container className="sbcalc sm lg xs md mx-auto my-auto">
//        <h3 className="pt-3 pb-3 mx-auto">Add order</h3>
//        <hr className="mb-25"/>
//    <Form  className="sm lg xs md" onSubmit={handlePublish}>

//           <Form.Group className="mb-3 Quantity" controlId="wccalcQuantity">
//                 <Form.Label>Name</Form.Label>

//                 <Form.Control
//                  type="text"
//                  name="name"
//                  value={formData.name}
//                  placeholder="enter Item"
//                  onChange={(e) => handleChange(e)}
//                 />

// </Form.Group>
//           {/* category */}
//           <Form.Group
//                 className="mb-3 Print Side"
//                 controlId="wccalcPrintSide"
//               >
//                 <Form.Label className="pr-2">Category</Form.Label>
//                 <Form.Control
//                  as="select"
//                  name="category"
//                  className="form-control"
//                  value={formData.category}
//                  onChange={(e) => handleChange(e)}
//                 >

//                   <option value=""selected="true" disabled="disabled" >choose category</option>
//                   <option value="Stationary">Stationary</option>
//                   <option value="Event Merchandise">Event Merchandise</option>
//                   <option value="Promotional Item">Promotional Item</option>
//                   <option value="Year End Or Gift Item">Year End Or Gift Item</option>
//                 </Form.Control>
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Purpose</Form.Label>
//         <Form.Control as="textarea" rows={4}
//                  name="purpose"
//                  value={formData.purpose}
//                  placeholder="enter purpose"
//                  onChange={(e) => handleChange(e)}/>
//       </Form.Group>
//        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Product Detail</Form.Label>
//         <Form.Control as="textarea" rows={10}
//                  name="detail"
//                  value={formData.detail}
//                  placeholder="enter detail"
//                  onChange={(e) => handleChange(e)}/>
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>How to use</Form.Label>
//         <Form.Control as="textarea" rows={8}
//                  name="usage"
//                  value={formData.usage}
//                  placeholder="enter usage"
//                  onChange={(e) => handleChange(e)}/>
//       </Form.Group>

//           {/* image */}

//           <label htmlFor="" >Product detail first Image</label>
//           <input
//             type="file"
//             name="image1"
//             accept="image/*"
//             className="form-control mb-3"
//             onChange={(e) => handleImageChange(e)}
//           />

//             <label htmlFor="">Product detail  second image</label>
//           <input
//             type="file"
//             name="image2"
//             accept="image/*"
//             className="form-control mb-3"
//             onChange={(e) => handleImageChange(e)}
//           />
//              <label htmlFor="">Product detail  third Image</label>
//           <input
//             type="file"
//             name="image3"
//             accept="image/*"
//             className="form-control mb-3"
//             onChange={(e) => handleImageChange(e)}
//           />

//           {/* <label htmlFor="">Image4</label>
//           <input
//             type="file"
//             name="image4"
//             accept="image/*"
//             className="form-control"
//             onChange={(e) => handleImageChange(e)}
//           /> */}

//           {progress === 0 ? null : (
//             <div className="progress">
//               <div
//                 className="progress-bar progress-bar-striped mt-2"
//                 style={{ width: `${progress}%` }}
//               >
//                 {`uploading image ${progress}%`}
//               </div>
//             </div>
//           )}

//          <Button variant="primary" type="submit" className='mt-20'>
//                 Submit
//               </Button>
//     </Form>
//       </Container>
//       </>

//   );
// };

// export default NewOrder;

import { collection, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { Button, Form } from "react-bootstrap";
import { db, storage } from '../../firebase.config';
import teeShirtFormula from "../../Formulas/teeShirtFormula";
import { useGetData } from "../../hooks/useGetData";
import NavigationBar from "../Navbar/NavigationBar";
const NewOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone:"",
    address:"",
    instruction:"",
    color:"",
    teshirtSize:"",
    quantity:"",
    printSize:"",
    collectAmount:"",
    images: [],
    resellerOrderArr:[]
   
  });

  let id = "resellerOrdersId";
  let collections = "resellerInfo";
  let idPrice = "teeShirtCampingId";
  let collectionsPrice = "productValues";
  const [progress, setProgress] = useState(0);
  const [dbData, setDbData] = useState({});
  const { fetchedData, searchProduct, setSearchProduct } = useGetData(
    idPrice,
    collectionsPrice,
    dbData
  );
  const handleChange=(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData",formData);
  }
  const resellerOrdersFromDb = fetchedData?.resellerOrders;
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();
  const [printSize, setPrintSize] = useState("10 x 14");
  const [teshirtSize, setTshirtSize] = useState();
  const [color, setColor] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [instruction, setInstruction] = useState();
  // const [deliveryFee, setDeliveryFee] = useState(70);
  const [collectAmount, setCollectAmount] = useState();
  const [showAlert, setShowAlert] = useState(false);
//money received calculation



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
  console.log("collectAmount",collectAmount);

  let printbazcost;

if(formData.quantity &&
formData.printSize &&
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
price50Plus_2p5X5) {
  
  const totalPrice = teeShirtFormula(
    formData.quantity,
    formData.printSize,
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
  
  printbazcost = totalPrice;
} else {
  printbazcost = 0; // or any default value you want to set
}


let deliveryFee = 0;
if (quantity > 5) {
  deliveryFee = 70;
  const remainder = quantity % 5;
  const groups = Math.floor((quantity - remainder) / 5);
  if (remainder >= 5) {
    deliveryFee += (groups + 1) * 15;
  } else {
    deliveryFee += groups * 15;
  }
} else {
  deliveryFee = 70;
}

let recvMoney=0
let costHandlingfee;
let recvMoneyWithouthandling=0
recvMoneyWithouthandling=Number(Math.ceil((formData.collectAmount-(printbazcost+deliveryFee))));
costHandlingfee=recvMoneyWithouthandling*0.02
 recvMoney=recvMoneyWithouthandling-costHandlingfee

console.log("recvMoney",recvMoney);
const handleImageChange = (e) => {
  const files = e.target.files;
  const images = [...formData.images];
  for (let i = 0; i < files.length; i++) {
   

      images.push(files[i]);
   
  }
  setFormData({ ...formData, images });
};

let newresellerOrderArr=[]
const handleSubmit = (e) => {
  e.preventDefault();
//   if (!formData.bkashAccount && !formData.nagadAccount && !formData.rocketAccount &&
//     !(formData.bankName && formData.accountName && formData.accountNumber && formData.routingNumber && formData.branchName)) {
//     alert("Please choose at least one payment system");
//     return;
// }

 
const promises = [];
const newImageUrls = [];
const newFileUrls = [];

formData.images.forEach((image) => {
  const storageRef = ref(
    storage,
    `/images/${Date.now()}${image?.name}`
  );
  const uploadImage = uploadBytesResumable(storageRef, image);
  promises.push(uploadImage);

  uploadImage.on(
    "state_changed",
    (snapshot) => {
      const progressPercent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progressPercent);
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadImage.snapshot.ref).then((url) => {
        newImageUrls.push(url);
      });
    }
  );
});

 
  Promise.all(promises)
    .then(() => {
      const newProduct = {
        name:formData.name,
        phone:formData.phone,
        address:formData.address,
        instruction:formData.instruction,
        color:formData.color,
        teshirtSize:formData.teshirtSize,
        quantity:formData.quantity,
        printSize:formData.printSize,
        collectAmount:formData.collectAmount,
        printbazcost:printbazcost,
        deliveryFee:deliveryFee,
        recvMoney:recvMoney,
        imageUrls: newImageUrls,
        createdAt: Timestamp.now().toDate(),
        id: Date.now(),
      };
      const articleRef = collection(db, "resellerInfo");
      const docRef = doc(articleRef, "resellerOrdersId");

      return getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          const resellerOrderArr = doc.data().resellerOrderArr || [];
          const newresellerOrderArr = [...resellerOrderArr, newProduct];

          return updateDoc(docRef, {
            resellerOrderArr: newresellerOrderArr,
          });
        } else {
          return setDoc(docRef, {
            resellerOrderArr: [newProduct],
          });
        }
      });
    })
    .then(() => {
      setShowAlert(true);
     alert("order added successfully", { type: "success" });
      setFormData({
        name: "",
        phone: "",
        address: "",
        instruction:"",
        color:"",
        teshirtSize:"",
        quantity:"",
        printSize:"",
        collectAmount:"",
        images: [],
        resellerOrderArr: newresellerOrderArr,
      });
      setProgress(0);
    })
    .catch((err) => {
      alert("Error adding article", { type: "error" });
    });
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
      <div className="new-order">
        <div className="row mt-5">
          <div className="col-12">
            <h1>New Order</h1>
          </div>
        </div>
        <Form 
        onSubmit={handleSubmit} 
        className="mb-4">
        <div className="row mt-5">
          {/* 1st Column */}
          <div className="col-md-4">
          <h3>Recipient Details</h3>

        <Form.Group className="mb-3" >
          <Form.Label>Recipient's Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            className="form-control"
            id="recipientName"
            onChange={(e) => handleChange(e)}
            required
            placeholder="Enter Name"
          />
        </Form.Group>
           
              <Form.Group className="mb-3" >
          <Form.Label>Recipient's Phone</Form.Label>
          <Form.Control
              type="number"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange(e)}
              className="form-control"
              id="recipientPhone"
            required
            placeholder="Enter recipient number"
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Recipient's/Delivery Address</Form.Label>
          <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e)}
           
              className="form-control"
              id="recipientAddress"
            required
            placeholder="Enter recipient address"
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>   Special Instructions</Form.Label>
          <Form.Control
              type="text"
              name="instruction"
              value={formData.instruction}
              onChange={(e) => handleChange(e)}
              className="form-control"
              id="recipientAddress"
           
            placeholder=""
          />
        </Form.Group> 
            
        
          </div>
          {/* 2nd Column */}
          <div className="col-md-4">
            <h3>Order Details</h3>
            
            
              
            <Form.Group
                                className="mb-3 Print Side w-100 m-auto"
                                controlId="wccalcPrintSide"
                            >
                                <Form.Label className="pr-2">Color</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="color"
                                    value={formData.color}
                                    onChange={(e) => handleChange(e)}
                                    
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
                                    value={formData.teshirtSize}
                                    onChange={(e) => handleChange(e)}
                                   
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
                   value={formData.quantity}
                  onChange={(e) => {handleChange(e);
                    setQuantity((_) => e.target.value)}
                  }
                  
                 
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
                  value={formData.printSize}
                  onChange={(e) => {handleChange(e);
                    setPrintSize((_) => e.target.value)}}
                  name="printSize"
                >
                  <option default>select print size</option>
                  <option value="10 x 14">10″ x 14″</option>
                  <option value="10 x 10">10″ x 10″</option>
                  <option value="10 x 5">10″ x 5″</option>
                  <option value="5 X 5">5″ x 5″</option>
                  <option value="2.5 X 5">2.5″ x 5″</option>
                </Form.Control>
              </Form.Group>
          
         
          
          </div>
          {/* 3rd Column */}
          <div className="col-md-4">
            <h3>Cost Details</h3>
                <label htmlFor="printbazCost">Printbaz Cost</label>
         
     <h3> <span style={{fontSize:""}}>&#2547;</span> {printbazcost}</h3>
     <label htmlFor="printbazCost">Delivery Fee</label>
         
         <h3> <span style={{fontSize:""}}>&#2547;</span> {deliveryFee}</h3>
       
            
                <Form.Group className="mb-3" >
          <Form.Label>Collect Amount</Form.Label>
          <Form.Control
            type="number"
            name="collectAmount"
            value={formData.collectAmount}
            className="form-control"
            onChange={(e) =>{ handleChange(e);
            setCollectAmount((_)=> e.target.value)
            }}
            required
            placeholder=""
          />
        </Form.Group>
     
      <label htmlFor="printbazCost">Cash Handling fee</label>
         
         <h3> 2%</h3>
       
         
      
         {
          formData.quantity && formData.printSize && collectAmount  &&
           <>
            <label htmlFor="printbazCost">You Received</label>
           <h3> {recvMoney} </h3>
           </>
          
           
         }
        
       
            
          
          </div>
        </div>
        <div className="row mt-5">
          {/* 1st Column */}
          <div className="col-md-6">
            <h3>Upload Main File</h3>
           
            <input
            type="file"
            name="document"
            // accept="image/*"
            className="form-control mb-3"
            onChange={(e) => handleImageChange(e)}
          />  
           
          </div>
          {/* 2nd Column */}
          <div className="col-md-6">
            <h3>Upload Mockup/T-Shirt Demo Picture</h3>
          
            <input
            type="file"
            name="image"
            // accept="image/*"
            className="form-control mb-3"
            onChange={(e) => handleImageChange(e)}
          />   
          
          </div>
        </div>


        {progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}

        <div className="row mt-5">
          <div className="col-12">
          <Button type="submit" style={{backgroundColor:"#124"}}>Submit</Button>
         
            <Button type="reset" style={{backgroundColor:"gray" ,marginLeft:"10px"}}>Cancel</Button>
          </div>
        </div>

        </Form>
    
        <div className="row mt-5">
          <div className="col-12">
            <h3>Terms and Conditions</h3>
            <p>What is Lorem Ipsum?</p>
            <p>What is Lorem Ipsum?</p>
            <p>What is Lorem Ipsum?</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewOrder;
