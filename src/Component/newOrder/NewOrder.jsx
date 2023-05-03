import {
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { Button, Form } from "react-bootstrap";
import { db, storage } from "../../firebase.config";
import teeShirtFormula from "../../Formulas/teeShirtFormula";
import { useGetData } from "../../hooks/useGetData";
import NavigationBar from "../Navbar/NavigationBar";
import "../../css/styles.css";
const NewOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    instruction: "",
    
    color: "",
    teshirtSize: "",
    quantity: "",
    printSize: "",
    collectAmount: "",
    area: "",
    images: [],
    resellerOrderArr: [],
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData", formData);
  };
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
  console.log("collectAmount", collectAmount);

  let printbazcost;

  if (
    formData.quantity &&
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
    price50Plus_2p5X5
  ) {
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

  let deliveryFeeInsideDhaka = 0;
  const baseDeliveryFee = 70;
  const additionalDeliveryFee = 15;

  if (quantity > 0) {
    // Calculate the number of groups of 5 items in the order
    const groups = Math.floor(quantity / 5);

    // Calculate the remainder
    const remainder = quantity % 5;

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

  let deliveryFeeOutSideDhaka = 0;
  const baseDeliveryFeeOutSideDhaka = 100;
  const additionalDeliveryFeeOutSideDhaka = 25;

  if (quantity > 0) {
    // Calculate the number of groups of 5 items in the order
    const groups = Math.floor(quantity / 5);

    // Calculate the remainder
    const remainder = quantity % 5;

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

  console.log("recvMoney", recvMoney);
  const handleImageChange = (e) => {
    const files = e.target.files;
    const images = [...formData.images];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i]);
    }
    setFormData({ ...formData, images });
  };
  const addFields = () => {
    const newFields={ color: "",
    teshirtSize: "",
    quantity: "",
    printSize: "",
    images: [],
    files:[]}
  setFormData([...formData]);
  }
  let newresellerOrderArr = [];
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
      const storageRef = ref(storage, `/images/${Date.now()}${image?.name}`);
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
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          instruction: formData.instruction,
          color: formData.color,
          teshirtSize: formData.teshirtSize,
          quantity: formData.quantity,
          printSize: formData.printSize,
          area: formData.area,
          collectAmount: formData.collectAmount,
          printbazcost: printbazcost,
          deliveryFee: deliveryFee,
          recvMoney: recvMoney,
          imageUrls: newImageUrls,
          orderStatus: "pending",
          createdAt: formattedDate,
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
          instruction: "",
          color: "",
          teshirtSize: "",
          quantity: "",
          printSize: "",
          area: "",
          collectAmount: "",
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="recipientPhone"
                  required
                  placeholder="Enter recipient number"
                />
              </Form.Group>
              <Form.Group
                className="mb-3 Print Side w-100 "
                controlId="wccalcPrintSide"
              >
                <Form.Label className="pr-2">Delivery Area</Form.Label>
                <Form.Control
                  as="select"
                  name="area"
                  value={formData.area}
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
              <Button onClick={addFields} className="addButtonStyle">+</Button>
              </div>
           

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
                  onChange={(e) => {
                    handleChange(e);
                    setQuantity((_) => e.target.value);
                  }}
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
                  onChange={(e) => {
                    handleChange(e);
                    setPrintSize((_) => e.target.value);
                  }}
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
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Main File</Form.Label>
                <Form.Control
                  type="file"
                  name="document"
                  // accept="image/*"
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Mockup/T-Shirt Demo Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  // accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
              </Form.Group>
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
                    handleChange(e);
                    setCollectAmount((_) => e.target.value);
                  }}
                  required
                  placeholder=""
                />
              </Form.Group>
              <div className="costOrder_Style">
                <label htmlFor="printbazCost">Cash Handling fee</label>{" "}
                <h3> 2%</h3>
              </div>

              {formData.quantity && formData.printSize && collectAmount && (
                <div className="costOrder_Style">
                  <label htmlFor="printbazCost">You will receive</label>
                  <h3> {recvMoney} </h3>
                </div>
              )}
            </div>
          </div>
          <div className="row mt-5">{/* 1st Column */}</div>

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
    </div>
  );
};
export default NewOrder;
