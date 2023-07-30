import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { useGetData } from '../../hooks/useGetData';
import useGetMongoData from '../../hooks/useGetMongoData';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyOrders = () => {
    let id = "resellerOrdersId";
    let collections = "resellerInfo";
    const {info}=useGetMongoData()
    const refs = useRef({});

    const [dbData, setDbData] = useState({});
    const [show, setShow] = useState({});
    const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
    const resellerOrdersFromDb=fetchedData?.orders
    const [filterOrders,setFilterOrders]=useState('all');
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
   
    const {user}=useContext(AuthContext);
    const userEmail=user?.email


    const [orders, setOrders] = useState([]);
    let options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }; // options for toLocaleDateString
   
    const navigate=useNavigate()
    const handlePage=()=>{
      navigate("/newOrder")
    
    }  
      const handleViewOrder=()=>{
      navigate("/viewOrder")
   
    }
    const handleInputChange = (event, index) => {
      const { name, value } = event.target;
      setFilterOrders(value)
    }
    const [activeTab, setActiveTab] = useState('all');
// filter order based on status 
let pendingOrders=info?.filter(users=>users?.orderStatus==="Pending");

let approvedOrders=info?.filter(users=>users?.orderStatus==="Approved");
let onHoldOrders=info?.filter(users=>users?.orderStatus==="on-hold");
let onHoldArtworkIssueOrders=info?.filter(users=>users?.orderStatus==="on hold artwork issue");
let onHoldBillingIssueOrders=info?.filter(users=>users?.orderStatus==="on hold billing issue");
let onHoldOutOfStockOrders=info?.filter(users=>users?.orderStatus==="on hold out of stock");
let inProductionOrders=info?.filter(users=>users?.orderStatus==="in-production");
let outForDeliveryOrders=info?.filter(users=>users?.orderStatus==="out for delivery");
let deliveredOrders=info?.filter(users=>users?.orderStatus==="delivered");
let cancelOrders=info?.filter(users=>users?.orderStatus==="cancel");
let returnOrders=info?.filter(users=>users?.orderStatus==="returned");
let filterByOrderId=info?.filter(users=>users?._id===filterOrders);


   
const copyOrderId = (orderId, index) => {
  navigator.clipboard.writeText(orderId);
  
  setShow(prevShow => ({ ...prevShow, [index]: true }));

  setTimeout(() => {
    setShow(prevShow => ({ ...prevShow, [index]: false }));
  }, 3000);
};

useEffect(() => {
  info?.filter(order => order.userMail === user?.email).forEach((order, index) => {
    refs.current[index] = React.createRef();
  });
}, [info, user]);
const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    }
// start date Handler 
const handleChangeStartDate=(date)=>{
  setStartDate(date)
  setFilterOrders('')
}
const handleChangeEndDate=(date)=>{
  setEndDate(date)
  setFilterOrders('')
}
const filerByOrderDate=info.filter(order=>{
  const orderDate=new Date(order?.createdAt)
  return orderDate>=new Date(startDate) && orderDate<=new Date(endDate)
})
    const getViewClientColor = (status) => {
      if (status === "Pending") {
        return "Orange";
      }
      if (status === "on-hold") {
        return "Orange";
      }
      if (status === "on hold artwork issue") {
        return "Orange";
      }  
          if (status === "on hold billing issue") {
        return "Orange";
      } 
      if (status === "on hold out of stock") {
        return "Orange";
      }  
      if (status === "Approved") {
        return "green";
      } 
    
        if (status === "in-production") {
        return "green";
      }
        if (status === "out for delivery") {
        return "green";
      }  
      if (status === "delivered") {
        return "green";
      } 
       if (status === "payment-released") {
        return "green";
      } 
      if (status === "returned") {
        return "red";
      }    
        if (status === "cancel") {
        return "red";
      }   
       if (status === "paid") {
        return "#1fea70";
      }  
      if (status === "Unpaid") {
        return "#360eea";
      }
      // you can add more conditions here or just return a default color
      // return "defaultColor";
    };
    let date = new Date(info?.createdAt); // create a new Date object
  

    let day = date.getDate();
    day = day < 10 ? '0' + day : day;  // adding leading zero if date is single digit
    
    let month = date.getMonth() + 1;  // getMonth() returns month index starting from 0
    month = month < 10 ? '0' + month : month;  // adding leading zero if month is single digit
    
    let year = date.getFullYear();
    
    let formattedDate = `${day}/${month}/${year}`;
    
    // console.log(formattedDate);  // Output: "04/07/2023"
    
    return (
        <div className='payment_container'>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <title>Order</title>
          <style dangerouslySetInnerHTML={{__html: "\n        \n      /* General styles */\n      body {\n        font-family: Arial, sans-serif;\n        background-color: #f8f9fa;\n      }\n      \n      .navbar {\n        background-color: #001846 !important;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        padding: 20px;\n        padding-left: 40px !important;\n      }\n      \n      .navbar-brand img {\n        width: 150px;\n      }\n      \n      .nav-link {\n        color: #ffffff !important;\n        font-size: 16px;\n        font-weight: 600;\n      }\n      \n      .nav-link:hover {\n        background-color: #ffffff;\n        color: #001846 !important;\n      }\n      .dropdown{\n        padding-left: 1200px;\n      }\n      \n      .dropdown-menu {\n        margin-left: 1120px;\n        \n      }\n      \n      .main-div {\n        padding-left: 50px;\n        padding-right: 50px;\n      }\n\nh1 {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #001846;\n}\n\nh4 {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #001846;\n  margin-bottom: 0;\n}\n\n/* Order List */\n#newOrderBtn {\n  font-weight: 600;\n}\n\n#orderStatus {\n    display: block;\n    width: 100%;\n    height: calc(1.5em + .75rem + 2px);\n    padding: .375rem .75rem;\n    font-size: 1rem;\n    font-weight: 400;\n    line-height: 1.5;\n    color: #495057;\n    background-color: #fff;\n    background-clip: padding-box;\n    border: 1px solid #ced4da;\n    border-radius: .25rem;\n    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n}\n\n.nav-tabs .nav-item .nav-link {\n  font-size: 1.1rem;\n}\n\n.nav-tabs .nav-item .nav-link.active {\n  font-weight: 600;\n  color: #001846 !important;\n  background-color: #f8f9fa;\n  border-color: #dee2e6 #dee2e6 #f8f9fa;\n}\n\n/* Filter Form */\n#filter-form {\n  margin-top: 2rem;\n}\n\n#filter-form label {\n  font-weight: 600;\n}\n\n#filter-form input,\n#filter-form select {\n  margin-top: 0.5rem;\n}\n\n/* Order Header */\n.order-header {\n  border-top: 2px solid #001846;\n  padding-top: 1rem;\n  margin-top: 2rem;\n}\n\n@media (max-width: 991.98px) {\n  .order-header .col-md-2 {\n    margin-bottom: 1rem;\n  }\n}\n\n/* Mobile View Styles */\n@media (max-width: 767.98px) {\n  .navbar-brand img {\n    width: 120px;\n    height: auto;\n  }\n\n  h1 {\n    font-size: 1.5rem;\n  }\n\n  h4 {\n    font-size: 0.5rem;\n  }\n\n  /* Order List */\n  .nav-tabs .nav-item .nav-link {\n    font-size: 1rem;\n  }\n\n  /* Filter Form */\n  #filter-form {\n    margin-top: 1rem;\n  }\n\n  #filter-form label {\n    display: block;\n    margin-top: 1rem;\n  }\n\n  /* Order Header */\n  .order-header {\n    margin-top: 1rem;\n  }\n\n  .order-header {\n    opacity: 0;\n  }\n\n  .order-list {\n    flex-direction: column;\n    padding: 20px 10px;\n  }\n\n  .order-list .col-2,\n  .order-list .col-1 {\n    margin-bottom: 10px;\n    text-align: center;\n  }\n\n  .order-list p {\n    font-size: 0.85rem;\n    line-height: 1.2;\n  }\n\n  .order-list button {\n    font-size: 0.8rem;\n    padding: 5px 10px;\n  }\n}\n\n    " }} />
         
          <NavigationBar/>
          <div className="main-div" style={{marginBottom:"50px"}}>
            <div className="row mt-4">
              <div className="col-sm-6">
                <h1>Order List</h1>
              </div>
              <div className="col-sm-6 text-right">
                <button onClick={handlePage} className="btn btn-primary" id="newOrderBtn">New Order</button>
              </div>
            </div>
            {/* Order tabs */} 
            {/* <ul className="nav nav-tabs mt-4" id="orderTabs">
              <li className="nav-item ">
                <a className=" tab-link  active " id="all-tab" data-toggle="tab" href="#all"  style={{color: '#001846 !important'}}>All</a>
              </li>
              <li className="nav-item ">
                <a className="tab-link " id="active-tab" data-toggle="tab" href="#active" style={{color: '#001846 !important'}}>Active</a>
              </li>
              <li className="nav-item ">
                <a className="tab-link " id="delivered-tab" data-toggle="tab" href="#delivered" style={{color: '#001846 !important'}}>Delivered</a>
              </li>
              <li className="nav-item ">
                <a className="tab-link "  id="returned-tab" data-toggle="tab" href="#returned" style={{color: '#001846 !important'}}>Returned</a>
              </li>
            </ul> */}

{/* <ul className="nav nav-tabs mt-4" id="orderTabs">
        <li  className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}>
          <a className="tab-link" id="all-tab" data-toggle="tab" href="#all" onClick={() => handleTabClick('all')}>All</a>
        </li>
        <li className={`nav-item ${activeTab === 'active' ? 'active' : ''}`}>
          <a className="tab-link" id="active-tab" data-toggle="tab" href="#active" onClick={() => handleTabClick('active')}>Active</a>
        </li>
        <li className={`nav-item ${activeTab === 'delivered' ? 'active' : ''}`}>
          <a className="tab-link" id="delivered-tab" data-toggle="tab" href="#delivered" onClick={() => handleTabClick('delivered')}>Delivered</a>
        </li>
        <li className={`nav-item ${activeTab === 'returned' ? 'active' : ''}`}>
          <a className="tab-link" id="returned-tab" data-toggle="tab" href="#returned" onClick={() => handleTabClick('returned')}>Returned</a>
        </li>
      </ul> */}
         
            {/* filter */}
            <form id="filter-form">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="orderID" className="form-label">Order ID</label>
                  <input type="text" onChange={(e) =>  handleInputChange(e)} className="form-control" id="orderID" placeholder="Enter Order ID" />
                </div>
                <div className="col-lg-2 col-sm-12 col-md-4">
                <label htmlFor="status-filter">Status:</label>
                <select id="status-filter" className="form-control" onChange={(e) =>  handleInputChange(e)}>
                  <option value="all">All</option>
                  <option value="Pending">Pending</option>
                  <option value="on-hold">On Hold</option>
                  <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                  <option value="Approved">Approved</option>
                  <option value="in-production">In Production</option>
                  <option value="out for delivery">Out for delivery</option>
                 <option value="delivered">Delivered</option>
                  <option value="payment-released">Payment Released</option>
                  <option value="returned">Returned</option>
                  <option value="cancel">Cancel</option>
                  
                </select>
              </div>
                <div className="col-md-2 ">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <DatePicker className='form-control' selected={startDate} onChange={handleChangeStartDate} selectsStart startDate={startDate} endDate={endDate} />
                 
                
                  </div>   
                   <div className="col-md-2 ">
               
                 
                  <label style={{textAlign:"start"}} htmlFor="endDate" className="form-label">End Date</label>
                  <DatePicker className='form-control' selected={endDate} onChange={handleChangeEndDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
                  </div>
             
                 
               
              </div>
            </form>
            {/* Order header */}
            <div className="row mt-4 order-header">
              <div className="col-2">
                <h4>User Name</h4>
              </div>
              <div className="col-2">
                <h4>Order ID</h4>
              </div>
              <div className="col-2">
                <h4>Recipient Info</h4>
              </div>
              <div className="col-2">
                <h4>Delivery Status</h4>
              </div>
              <div className="col-1">
                <h4>Amount</h4>
              </div>
              <div className="col-2">
                <h4>Payment</h4>
              </div>
              <div className="col-1">
              </div>
            </div>
            {/* Order list */}
               {/* Tab content */}
               <div className="tab-content mt-4">
              <div id="all" className=" tab-pane active">
                
            
              </div>
              <div id="active" className=" tab-pane fade">
                {/* Order list content for Active tab */}
                <h1>active</h1>
              </div>
              <div id="delivered" className=" tab-pane fade">
                {/* Order list content for Delivered tab */}
                <h1>delivered</h1>
              </div>
              <div id="returned" className=" tab-pane fade">
                {/* Order list content for Returned tab */}
              </div>
            </div>
            {/* filter by order Id  */}
            {
            filterByOrderId
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }   {/* filter by order Date  */}
            {
            filerByOrderDate
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }  
              
                {
           filterOrders==="all" &&  info
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
               <div className="col-md-2 col-sm-12">
                <p
                  style={{ lineHeight: "15px" }}
                  ref={refs.current[index]}
                  // onClick={() => copyOrderId(orderInfo?._id, index)}
                >
                  {orderInfo?._id}
                  <img
                    style={{ width: "20px", marginLeft: "5px" }}
                    onClick={() => copyOrderId(orderInfo?._id, index)}
                    src="/images/copy-icon.png"
                    alt="copy-icon"
                  />
                </p>
                <Overlay target={refs.current[index]?.current} show={show[index]} >
                  {(props) => (
                    <Tooltip id={`overlay-example-${index}`} {...props}>
                    copied
                    </Tooltip>
                  )}
                </Overlay>
              </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              } 
                {
           filterOrders==="on-hold" &&  onHoldOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }  
               {
           filterOrders==="Pending" &&  pendingOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }
              {
           filterOrders==="Approved" &&  approvedOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }  
              {
           filterOrders==="on hold artwork issue" &&  onHoldArtworkIssueOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }
              {
           filterOrders==="on hold billing issue" &&  onHoldBillingIssueOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              } 
               {
           filterOrders==="on hold out of stock" &&  onHoldOutOfStockOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              } 
               {
           filterOrders==="in-production" &&  inProductionOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              } 
               {
           filterOrders==="out for delivery" &&  outForDeliveryOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }  
                {
           filterOrders==="delivered" &&  deliveredOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }  
               {
           filterOrders==="cancel" &&  cancelOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }     {
           filterOrders==="returned" &&  returnOrders
             ?.filter(order => order.userMail === user?.email)
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
               {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
             </div>
               </>
            
           </div>
             ))
            
              }
        
              {/* Tab content */}
   
          </div>
          <Footer/>
        </div>
      );
    };
    export default MyOrders;


