
 import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useGetData } from '../../hooks/useGetData';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';
import SupportTicketPopUp from '../supportTicketPopUp/SupportTicketPopUp';
import UsersStoredSupportTickets from '../userStoredSupportTicket/UsersStoredSupportTickets';
 const OrderTracking = () => {
    let id = "resellerOrdersId";
    let collections = "resellerInfo";
    const [dbData, setDbData] = useState({});
    const [showTicketPopUp, setShowTicketPopUp] = useState(false);
    const [popupId, setPopupId] = useState('');
    const [usersTickets, setUsersTickets] = useState([]);
    const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
    const [shownPopupTicketId, setShownPopupTicketId] = useState(null);
    const [usersStoredTickets, setUsersStoredTickets] = useState([]);
    const location = useLocation();
const viewOrder = location.state ? location?.state?.orderInfo : null;
console.log("viewOrder",viewOrder);

const closePopup = () => {setShowTicketPopUp(false);};

useEffect(() => {
  // Fetch the chat log from the server when the component mounts
  fetchChatLog();
  
}, []);
const fetchChatLog = async () => {
  try {
    // const response = await axios.get(`http://localhost:5000/getOrderIdmessages/${viewOrder?._id}`);
    const response = await axios.get(`https://mserver.printbaz.com/getOrderIdmessages/${viewOrder?._id}`);
    setUsersTickets(response.data.messages);
    console.log("response.data.messages",response.data.messages);
  } catch (err) {
    console.error(err);
  }
};
console.log("usersTickets",usersTickets);
const generateId = () => {
  // Generate an ID using your logic (e.g., library or custom code)
  const id = Math.random().toString(36).substr(2, 9);
  return id;
};
const handleShowTicketPopUp=()=>{
  setShowTicketPopUp(true)
  setPopupId(generateId); // Set the generated ID
} 
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
     return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <title>Order Tracking</title>
          <style dangerouslySetInnerHTML={{__html: "\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f8f9fa;\n        }\n\n        .navbar {\n        background-color: #001846 !important;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        padding: 20px;\n        padding-left: 40px !important;\n    }\n\n    .navbar-brand img {\n        width: 150px;\n    }\n\n    .nav-link {\n        color: #ffffff !important;\n        font-size: 16px;\n        font-weight: 600;\n    }\n\n    .nav-link:hover {\n        background-color: #ffffff;\n        color: #001846 !important;\n    }\n\n    .dropdown {\n        padding-left: 1200px;\n    }\n\n    .dropdown-menu {\n        margin-left: 1120px;\n    }\n    \n    .all-content {\n    padding-left: 50px;\n    padding-right: 50px;\n}\n\n    .all-title {\n        font-weight: 700;\n    }\n\n    .rec-title h5 {\n        margin-top: 40px;\n        font-weight: 600;\n    }\n\n    .rec-title p {\n        font-size: 18px;\n    }\n\n    .amu-title h3 {\n        margin-bottom: 15px;\n    }\n\n    .amu-title h6 {\n        display: inline-block;\n        width: 75%;\n        font-weight: 700;\n        margin: 0;\n        margin-top: 10px;\n    }\n\n    .amu-title p {\n        display: inline-block;\n        width: 20%;\n        float: right;\n        margin: 0;\n    }\n\n    .trak-info h3 {\n        font-weight: 700;\n    }\n\n    .trak-status .col-3 {\n        text-align: center;\n    }\n\n    .trak-status p {\n        font-weight: 600;\n        margin-top: 10px;\n    }\n\n    @media (max-width: 480px) {\n        .all-content {\n    padding-left: 20px !important;\n    padding-right: 20px !important;\n}\n}\n\n" }} />
          
          <NavigationBar/>
          <div className="all-content">
            <div className="row">
              <div className="col-12">
                <div className="order-id bg-white p-3 my-3 shadow-sm">
                  <h3 className="d-inline-block font-weight-bold">ORDER ID: {viewOrder?._id} &nbsp;</h3>
                  <p className="d-inline-block py-2 px-3  text-white font-weight-bold rounded" style={{backgroundColor: getViewClientColor(
                                viewOrder?.orderStatus
                                )}}>{viewOrder?.orderStatus}</p>
                </div>
              </div>
            </div> 
              <div className="row">
              <div className="col-12">
                <div className="order-id bg-white p-3 my-3 shadow-sm">
                <Button  className='btn-success' onClick={handleShowTicketPopUp}>Create A Support Ticket</Button>
                {
         showTicketPopUp &&  (
            <SupportTicketPopUp
            userOrderId={viewOrder?._id}
            onClose={closePopup}
            ticketId={popupId}
            fetchTickets={fetchChatLog}
            userEmail={viewOrder?.userMail}
            userName={viewOrder?.username}
            
            />
            )
     }

<hr />
     <h4 style={{marginTop:"20px"}}>All Support Tickets</h4>
     {
   usersTickets?.map(tickets =>
  
       <Accordion defaultActiveKey="0">
     
      <Accordion.Item eventKey="1">
        <Accordion.Header>
         Ticket Id:  <span style={{color:"blue",fontWeight:"bold",marginLeft:"10px"}}>{ tickets?.ticketId}</span> 
         
      {
         tickets?.ticketStatus==="open" &&
         <span style={{marginLeft:"10px",color:"purple",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      }  
       {
         tickets?.ticketStatus==="replied" &&
         <span style={{marginLeft:"10px",color:"green",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      } 
       {
         tickets?.ticketStatus==="pending" &&
         <span style={{marginLeft:"10px",color:"orange",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      }  {
         tickets?.ticketStatus==="closed" &&
         <span style={{marginLeft:"10px",color:"red",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      }
         </Accordion.Header>
        <Accordion.Body>
        <UsersStoredSupportTickets
                   userOrderId={viewOrder?._id}
                   onClose={() => setShownPopupTicketId(null)}
                   ticketId={tickets?.ticketId}
                   ticketIssue={tickets?.ticketIssue}
                   userEmail={viewOrder?.userMail}
                   userName={viewOrder?.name}
               />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
   )}
    
      

                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-12 mb-3">
                <div className="rec-info bg-white p-3 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Recipient Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>{viewOrder?.name}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Phone</h5>
                      <p>{viewOrder?.phone}</p>
                    </div>
                    <div className="col-12">
                      <h5>Address</h5>
                      <p>{viewOrder?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-1 col-md-12">
                <div className="bg-white p-3 shadow-sm">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Cost of Order</h3>
                      <h6>Printbaz Cost</h6>
                      <p>{viewOrder?.printbazcost}</p>
                      <h6>Delivery Fee</h6>
                      <p>{viewOrder?.deliveryFee}</p>
                      <h6>Collect Amount</h6>
                      <p>{viewOrder?.collectAmount}</p>
                      <h6>Cash Handling Fee</h6>
                      <p>2%</p>
                      <h6>Receivable Amount</h6>
                      <p>{viewOrder?.recvMoney}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="trak-info bg-white p-4 my-3 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title mb-4">Tracking Details</h3>
                    </div>
                  </div>
                  <div className="row trak-status">
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868453112680478/ic-confirmed-red.f41e73a9.png" alt="" />
                     {
                     viewOrder?.orderStatus==="returned"|| viewOrder?.orderStatus==="Approved" || viewOrder?.orderStatus==="in-production" ||  viewOrder?.orderStatus==="out for delivery" ||  viewOrder?.orderStatus==="payment-released"||   viewOrder?.orderStatus==="delivered"    ?
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                      :
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} />

                     }
                     
                      <p>Accepted</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                                         viewOrder?.orderStatus==="returned" || viewOrder?.orderStatus==="in-production" ||  viewOrder?.orderStatus==="out for delivery" ||  viewOrder?.orderStatus==="payment-released"||   viewOrder?.orderStatus==="delivered"   ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>In Production</p>
                    </div>  
                      <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                       viewOrder?.orderStatus==="returned"|| viewOrder?.orderStatus==="out for delivery" || viewOrder?.orderStatus==="payment-released"||  viewOrder?.orderStatus==="delivered"   ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Out for Delivery</p>
                    </div>  
                     <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                   viewOrder?.orderStatus==="returned"||   viewOrder?.orderStatus==="payment-released"|| viewOrder?.orderStatus==="delivered"  ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Delivered</p>
                    </div>
                    
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
        );
 };
 export default OrderTracking;