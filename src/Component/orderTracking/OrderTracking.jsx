import axios from 'axios';
import React, { useEffect, useRef,useState } from 'react'
import { Accordion, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useGetData } from '../../hooks/useGetData';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';
import SupportTicketPopUp from '../supportTicketPopUp/SupportTicketPopUp';
import UsersStoredSupportTickets from '../userStoredSupportTicket/UsersStoredSupportTickets';
import BackToTop from '../backToTop/BackToTop';
 const OrderTracking = () => {
    let id = "resellerOrdersId";
    let collections = "resellerInfo";
    const [dbData, setDbData] = useState({});
    const [showTicketPopUp, setShowTicketPopUp] = useState(false);
    const [popupId, setPopupId] = useState('');
    const [usersTickets, setUsersTickets] = useState([]);
    const[fetchAllTicket,setFetchAllTicket]=useState([])
    const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
    const [shownPopupTicketId, setShownPopupTicketId] = useState(null);
    const [usersStoredTickets, setUsersStoredTickets] = useState([]);
    const [getSpecificOrderById, setGetSpecificOrderById] = useState();
    const [showTicket, setShowTicket] = useState(false);
    const [show,setShow]=useState(false)
    const target = useRef(null);
    const location = useLocation();
const viewOrder = location.state ? location?.state?.orderInfo : null;
console.log("getSpecificOrderById",getSpecificOrderById)
useEffect(() => {
  const backtotop = document.querySelector('.back-to-top');
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active');
    } else {
      backtotop.classList.remove('active');
    }
  };
  toggleBacktotop();
  window.addEventListener('scroll', toggleBacktotop);
  return () => {
    window.removeEventListener('scroll', toggleBacktotop);
  };
}, []);
useEffect(()=>{
  const getOrderById=async()=>{
           // Fetch the updated order details
  await fetch(`https://mserver.printbaz.com/getorder/${viewOrder?._id}`)
  // await fetch(`http://localhost:5000/getorder/${viewOrder?._id}`)
  // await fetch(`https://mserver.printbaz.com/testgetorder/${viewOrder?._id}`)
  .then(res=>res.json())
  .then(data => {setGetSpecificOrderById(data)
  })
    
  
       }
       getOrderById()
        // Update the previousPath state when the location changes

      },[])
      console.log("getSpecificOrderById",getSpecificOrderById);
const closePopup = () => {setShowTicketPopUp(false);setShow(false)};

useEffect(() => {
  // Function to handle fetching
  const fetchData = async () => {
    const returnedAmm =
      Number(getSpecificOrderById?.printbazcost) +
      Number(getSpecificOrderById?.deliveryFee);
    const orderReturmed = getSpecificOrderById?.orderStatus=== "returned";
console.log("orderReturmed",orderReturmed);
if(orderReturmed===true){
  try {
    const response = await fetch(
      // `http://localhost:5000/returnOrderAddition/${viewOrder?._id}`,
      `https://mserver.printbaz.com/returnOrderAddition/${viewOrder?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ returnedAmount: returnedAmm }),
      }
    );

    if (response.ok) {
      // Update the approval status in the viewClient object
      // You can update the state or do whatever you want here
    } else {
      console.error("Status Error:", response);
      // Handle error here
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Handle error here
  }
}
  
  };

  // Call the async function
  fetchData();
}, [getSpecificOrderById, viewOrder]);

useEffect(() => {
  // Fetch the chat log from the server when the component mounts
  fetchChatLog();
  fetchAllTicketData()
}, []);
const fetchChatLog = async () => {
  try {
    // const response = await axios.get(`http://localhost:5000/getOrderIdmessages/${viewOrder?._id}`);
    const response = await axios.get(`https://mserver.printbaz.com/getOrderIdmessages/${viewOrder?._id}`);
    setUsersTickets(response.data.messages);

  } catch (err) {
    console.error(err);
  }
};

const fetchAllTicketData = async () => {
  try {
    // const response = await axios.get('http://localhost:5000/allTicketIds');
    const response = await axios.get('https://mserver.printbaz.com/allTicketIds');
    setFetchAllTicket(response.data);
 
  } catch (err) {
    console.error(err);
  }
};
let date = new Date(getSpecificOrderById?.createdAt); // create a new Date object

let options = {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'  }; // options for toLocaleDateString

let formattedDate = date.toLocaleDateString('en-US', options); 
let idCounter = 1; // Initialize a counter for the IDs
const generateId = () => {
  const paddedId = String(idCounter).padStart(6, '0'); // Convert counter to string and pad with leading zeros

  if (fetchAllTicket?.filter(ticketId => ticketId === paddedId).length > 0){
    idCounter++; // Increment the counter
    return generateId(); // Recursively call the function to generate the next ID
  }

  idCounter++; // Increment the counter
  return paddedId;
};

const handleShowTicketPopUp=()=>{
  fetchAllTicketData()
  setShowTicket(true)
  setShowTicketPopUp(true)

  setPopupId(generateId()); // Set the generated ID
 
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
const copyOrderId = () => {
  navigator.clipboard.writeText(getSpecificOrderById?._id);
  
  setShow(true)
  // console.log("viewOrder?._id",viewOrder?._id);
  setTimeout(() => {
    setShow(false);
  }, 1000);
  
  // Show a notification or perform any other action after copying the ID
};
     return (
        <div>
        
          <NavigationBar />
          <div className="all-content m45 m_12responsive700">
          <div className="row mt-5">
              <div className="col-12">
                <div className="order-id bg-white p-4  shadow-sm" >
                <div style={{display:""}} className="row">
                  <div className='col-lg-5'>
                  <h3 className=" font-weight-bold col-lg-12 font_16" onClick={copyOrderId}>ORDER ID: {viewOrder?._id} &nbsp;<span style={{cursor:"pointer",padding:"5px",fontSize:"16px"}} ref={target}  onClick={copyOrderId}><i class="fa fa-copy ml-2 mt-1 text-green cursor-pointer text-sm"></i></span> 
                <h5 className='font_16' style={{marginTop:"10px"}}>{formattedDate}</h5>
                </h3>
                <div className='flex mt-3'>
               <p style={{fontWeight:"600",color:"white",backgroundColor:"orange",padding:"7px",borderRadius:"5px"}}>{getSpecificOrderById?.category}</p>
             </div>
                  </div>
              
         <div  className="font-weight-bold col-lg-5  mt-2" >
         
           <Button  className='btn-success' onClick={handleShowTicketPopUp}>Create A Support Ticket</Button>
       
         </div>
                  <div className="font-weight-bold col-lg-2 mt-2 "
                        style={{ marginBottom: "20px" }}
                      >
                       
                        <div style={{display:"flex"}} >
  <div className=" viewOrderPaymentStatus  font-weight-bold  "
                        style={{ display:""}}
                      >
                        <div style={{display:""}}>
                         
                        <p className="d-inline-block py-2 px-3  text-white font-weight-bold rounded" style={{backgroundColor:"blue",color:"white"}}>{getSpecificOrderById?.paymentStatus}</p>
                     
                       
                        </div>
                      
                         </div> 
                      
                      <div className="   font-weight-bold "
                        style={{marginLeft:"10px",display:"flex",justifyContent:"flex-end" }}
                      >
                        <div style={{display:""}}>
                         
                        <p className="d-inline-block py-2 px-3  text-white font-weight-bold rounded" style={{backgroundColor: getViewClientColor(
                                getSpecificOrderById?.orderStatus
                                )}}>{getSpecificOrderById?.orderStatus}</p>
                     
                      
                        </div>
                       
                      </div>

  </div>
  
  <p className='text_Align_Left' style={{textAlign:"center"}}>Status changed at: {getSpecificOrderById?.statusDate}</p>
  
                        </div> 
 
                  
                </div>
              
                     
                </div>
            
              </div>
            </div>
            {
              showTicketPopUp &&
              <div className="row">
              <div className="col-12">
                <div className="order-id bg-white p-3  shadow-sm">
                {/* <Button  className='btn-success' onClick={handleShowTicketPopUp}>Create A Support Ticket</Button> */}
                {
          
            <SupportTicketPopUp
            userOrderId={getSpecificOrderById?._id}
            setShow={setShow}
            onClose={closePopup}
            ticketId={popupId}
            fetchTickets={fetchChatLog}
            userEmail={getSpecificOrderById?.userMail}
            userName={getSpecificOrderById?.username}
            
            />
            
     }

<hr />
     {/* <h4 style={{marginTop:"20px"}}>All Support Tickets</h4>
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
         tickets?.ticketStatus==="close" &&
         <span style={{marginLeft:"10px",color:"red",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      }
         </Accordion.Header>
        <Accordion.Body>
        <UsersStoredSupportTickets
                   userOrderId={getSpecificOrderById?._id}
                   
                   onClose={() => setShownPopupTicketId(null)}
                   ticketId={tickets?.ticketId}
                   ticketIssue={tickets?.ticketIssue}
                   adminUser={tickets?.adminUser}
                   userEmail={getSpecificOrderById?.userMail}
                   userName={getSpecificOrderById?.name}
               />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
   )} */}
    
      

                </div>
              </div>
            </div>
            }
           
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
                     getSpecificOrderById?.orderStatus==="returned"|| getSpecificOrderById?.orderStatus==="Approved" || getSpecificOrderById?.orderStatus==="in-production" ||  getSpecificOrderById?.orderStatus==="out for delivery" ||  getSpecificOrderById?.orderStatus==="payment-released"||   getSpecificOrderById?.orderStatus==="delivered"    ?
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                      :
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} />

                     }
                     
                      <p>Accepted</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                                         getSpecificOrderById?.orderStatus==="returned" || getSpecificOrderById?.orderStatus==="in-production" ||  getSpecificOrderById?.orderStatus==="out for delivery" ||  getSpecificOrderById?.orderStatus==="payment-released"||   getSpecificOrderById?.orderStatus==="delivered"   ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>In Production</p>
                    </div>  
                      <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                       getSpecificOrderById?.orderStatus==="returned"|| getSpecificOrderById?.orderStatus==="out for delivery" || getSpecificOrderById?.orderStatus==="payment-released"||  getSpecificOrderById?.orderStatus==="delivered"   ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Out for Delivery</p>
                    </div>  
                     <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                   getSpecificOrderById?.orderStatus==="returned"||   getSpecificOrderById?.orderStatus==="payment-released"|| getSpecificOrderById?.orderStatus==="delivered"  ?
                     
                       
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
              
            <div className="row">
            <div className="col-lg-4 col-md-12 mb-3">
               
                  <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Client Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>{getSpecificOrderById?.clientName}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Brand Name</h5>
                      <p>{getSpecificOrderById?.clientbrandName}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Email</h5>
                      <p>{getSpecificOrderById?.userMail}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Contact Number</h5>
                      <p>{getSpecificOrderById?.clientPhone}</p>
                    </div>
                  </div>
                </div>
                
                
              </div>
              <div className="col-lg-4 col-md-12 mb-3">
                <div className="rec-info bg-white p-3 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Recipient Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>{getSpecificOrderById?.name}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Phone</h5>
                      <p>{getSpecificOrderById?.phone}</p>
                    </div>
                    <div className="col-12">
                      <h5>Address</h5>
                      <p>{getSpecificOrderById?.address}</p>
                    </div>
                  </div>
                </div>
              </div>

           
              <div className="col-lg-4 col-md-12 mb-3">
              <div className="bg-white p-4 shadow-sm mb-3" style={{height:"auto"}}>
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Cost of Order</h3>
                      <div className='align_center'>
                      <h6>Printbaz Cost</h6>
                      <p style={{marginTop:"10px",lineHeight:"0px"}}>{getSpecificOrderById?.printbazcost} BDT</p>
                      </div>
                      <div className='align_center'>
                      <h6>Delivery Fee</h6>
                      <p style={{marginTop:"10px",lineHeight:"0px"}}>{getSpecificOrderById?.deliveryFee} BDT</p>
                      </div> 
                      <div className='align_center'>
                      <h6>Collect Amount</h6>
                      <p style={{marginTop:"10px",lineHeight:"0px"}}>{getSpecificOrderById?.collectAmount} BDT</p>
                      </div> 
                      <div className='align_center'>
                      
                      <h6>Cash Handling Fee</h6>
                      <p style={{marginTop:"10px",lineHeight:"0px"}}>3% BDT</p>
                      </div>
                   
                  
                      <div className='align_center'>
                      {
getSpecificOrderById?.orderStatus==="returned"?
<>

<h6 style={{color:"red"}}>Returned Amount</h6>
<p style={{color:"red",lineHeight:"0px"}}> {getSpecificOrderById?.returnedAmount}</p>
</>
:
<>

<h6>Receivable Amount</h6>
<p style={{lineHeight:"0px"}}>{parseInt(getSpecificOrderById?.recvMoney)}</p>
</>
                      }
                      </div>
                      {
                        getSpecificOrderById?.dsicount &&
                        <div className='flex'>
                        <h6>Discount</h6>
                        <span style={{marginTop:"10px"}}>{parseInt(getSpecificOrderById?.dsicount)}  BDT</span>
                        </div>
                      }
                      {
                        getSpecificOrderById?.additionalCost &&
                        <div className='flex'>
                        <h6>Additional Cost</h6>
                        <span style={{marginTop:"10px"}}>{parseInt(getSpecificOrderById?.additionalCost)}  BDT</span>
                        </div>
                      }
                    
                      
                    </div>
                    
                  </div>
                </div>
                {/* <div className="bg-white p-3 shadow-sm">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Cost of Order</h3>
                      <h6>Printbaz Cost</h6>
                      <p>{getSpecificOrderById?.printbazcost}</p>
                      <h6>Delivery Fee</h6>
                      <p>{getSpecificOrderById?.deliveryFee}</p>
                      <h6>Collect Amount</h6>
                      <p>{getSpecificOrderById?.collectAmount}</p>
                      <h6>Cash Handling Fee</h6>
                      <p>2%</p>
                      {
getSpecificOrderById?.orderStatus==="returned"?
<>

<h6 style={{color:"red"}}>Returned Amount</h6>
<p style={{color:"red"}}> {getSpecificOrderById?.returnedAmount}</p>
</>
:
<>

<h6>Receivable Amount</h6>
<p>{parseInt(getSpecificOrderById?.recvMoney)}</p>
</>
                      }
                      
                     
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
           {/* //instruction box  */}
           <div className='row'>
           <div className="col-lg-12 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Instruction</h3>
                    </div>
                  </div>
               
                  <div className="row order-list-title">
                    <div className="col-12">
                      <h4 className='font_16'>{getSpecificOrderById?.instruction}</h4>
                    </div>
              
                  </div>
               
                
                 
                </div>
              </div>
           </div>

           <div className='row'>
            {
              getSpecificOrderById?.discountNote &&
<div className="col-lg-6 col-md-6 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Discount</h3>
                    </div>
                  </div>
               
                  <div className="row order-list-title">
                    <div className="col-12">
                      <h4 className='font_16'>{getSpecificOrderById?.discountNote}</h4>
                    </div>
              
                  </div>
               
                
                 
                </div>
              </div>
            }
{
  getSpecificOrderById?.additionalCostNote &&
<div className="col-lg-6 col-md-6 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Additional Cost</h3>
                    </div>
                  </div>
               
                  <div className="row order-list-title">
                    <div className="col-12">
                      <h4 className='font_16'>{getSpecificOrderById?.additionalCostNote}</h4>
                    </div>
              
                  </div>
               
                
                 
                </div>
              </div>
}
              
</div>

           <div className="col-lg-12 col-md-12 mb-3">
  <div className="rec-info bg-white p-4 shadow-sm">
    <div className="row">
      <div className="col-12">
        <h3 className="all-title">Order Details</h3>
      </div>
    </div>
 
    <div className="row order-list-title ">
      
      <div className="col-3">
        <h4 className='font10px'>Color</h4>
      </div>
      <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        <h4 className='font10px'> Size</h4>
      </div>
      <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        <h4 className='font10px'>Quantity</h4>
      </div>
      {/* <div className="col-1" style={{display:"flex",justifyContent:"center"}}>
        <h4>Print Size</h4>
      </div> */}
      {/* <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        <h4>Main File</h4>
      </div> */}
      <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        <h4 className='font10px d-none'>Picture </h4>
      </div>
        {/* <div className="col-1">
        <h4>BrandLogo</h4>
      </div> */}
      {/* <div className="col-2">
        <h4>Picture</h4>
      </div> */}
    </div>
    {
      getSpecificOrderById?.orderDetailArr?.map((orderDetail,orderIndex)=>{ 
      
        return(
          
          orderDetail?.printSide  &&
          
        <>
        <div className="row order-tab  " key={orderIndex}>
        {/* <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3> */}
        
      <div className="col-3">
        <p  className='font12px'>{orderDetail?.color}</p>
      </div>
      <div className="col-3 " style={{display:"flex",justifyContent:"center"}}>
    
      <ul>
      {typeof orderDetail.teshirtSize === 'string' ? (
        <li  className='font12px'>
          {orderDetail.teshirtSize}- {orderDetail.quantity}
        </li>
      ) : (
        Object.entries(orderDetail.teshirtSize || {}).map(
          ([size, quantity]) => (
            <li className='font12px' key={size}>
             {size}- {quantity}
            </li>
          )
        )
      )}
    </ul>
       
        
      </div>
      <div className="col-3 font12px" style={{display:"flex",justifyContent:"center"}}>
      {orderDetail?.totalQuantity} 
      </div>
 
    
      <div className="col-lg-2" style={{display:"flex",justifyContent:"center"}}>
      <div className="">
{
orderDetail?.image?.map(imageUrl => {
// Extract the file ID from the URL
//  let fileId = "";
//  if (imageUrl.includes("/file/d/")) {
//    fileId = imageUrl.split("/file/d/")[1].split("/")[0];
//  } else if (imageUrl.includes("id=")) {
//    fileId = imageUrl.split("id=")[1];
//  }

const fileId = imageUrl?.split('/d/')[1].split('/view')[0];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;

return (
<div key={imageUrl}>

<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div>
</div>
)
})
}
</div>
      </div>
    
    </div>
    <div className="row  " >
      {/* <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3> */}
      <div className="col-12 "  key={orderIndex}>
    
      {/* {orderDetail?.printSide} */}
    
      <p >Print side : <span style={{fontweight:'700'}}> {orderDetail?.printSide}</span></p>
      <p >FrontSide : <span className='bold'>{orderDetail?.printSize?orderDetail?.printSize:"N/A"}</span></p>
      <p>BackSide: {orderDetail?.printSizeBack ? orderDetail?.printSizeBack :"N/A"}</p>
     
    
       
    
     <div className="col-lg-12" >
     <h4>Main File :</h4>
      <div className='phone_flex_center' style={{display:"flex"}}>
{
orderDetail?.file?.map((fileUrl,fileIndex) => {
// Extract the file ID from the URL
//  let fileId = "";
//  if (fileUrl?.includes("/file/d/")) {
//    fileId = fileUrl?.split("/file/d/")[1]?.split("/")[0];
//  } else if (fileUrl?.includes("id=")) {
//    fileId = fileUrl?.split("id=")[1];
//  }

const fileId = fileUrl?.split('/d/')[1].split('/view')[0];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
// Construct the direct download link
//  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
let dropdownId = `dropdown${orderIndex}-${fileIndex}`;
return (
  <>
<div key={fileIndex} style={{display:"flex"}}>

<div className="file-info" style={{marginLeft:"15px",border:"none"}}>
<iframe src={previewURL}  style={{ textDecoration: "none",border:"none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div>
</div>
</>
)
})
}
</div>

</div>
     
     {/* <p >Main File :<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div></p> */}
   

{
orderDetail?.brandLogo &&
<>
<h4>Brang Logo :</h4>
<div className="">
      {
(() => {
// Extract the file ID from the URL
let fileId = "";
if (orderDetail?.brandLogo?.includes("/file/d/")) {
fileId = orderDetail?.brandLogo?.split("/file/d/")[1].split("/")[0];
} else if (orderDetail?.brandLogo?.includes("id=")) {
fileId = orderDetail?.brandLogo?.split("id=")[1];
}
// Construct the direct download link
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

return (
<div >

<div className="card-body file-info">
{
orderDetail?.brandLogo &&
<>

<div className="">
      {
(() => {
// Extract the file ID from the URL
let fileId = "";
if (orderDetail?.brandLogo?.includes("/file/d/")) {
fileId = orderDetail?.brandLogo?.split("/file/d/")[1].split("/")[0];
} else if (orderDetail?.brandLogo?.includes("id=")) {
fileId = orderDetail?.brandLogo?.split("id=")[1];
}
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
// Construct the direct download link
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

return (
<div>
<div className="card-body file-info phone_flex_center" style={{display:"flex"}}>
{
orderDetail?.brandLogo ?
<>
<div>
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download> <p>Brand Logo</p></a>
</div>

</>

:
""
}


{/* <span className="file-size">1009.2kb</span><br /> */}
</div>
</div>
)
})()
}

</div>
</>

}


{/* <span className="file-size">1009.2kb</span><br /> */}
</div>
</div>
)
})()
}

</div>
</>

}

      </div>
      <hr />
    </div>

{/* for mobile  */}
    <div className="row  diplay_none" >
      {/* <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3> */}
      <div className="col-12 "  key={orderIndex}>
     <p >Color:  <span className='bold'>{orderDetail?.color}</span></p>
     <ul>
      {typeof orderDetail.teshirtSize === 'string' ? (
        <li>
          {orderDetail.teshirtSize}- {orderDetail.quantity}
        </li>
      ) : (
        Object.entries(orderDetail.teshirtSize || {}).map(
          ([size, quantity]) => (
            <li key={size}>
              {size}- {quantity}
            </li>
          )
        )
      )}
    </ul>
     <p >Quantity : <span className='bold'> {orderDetail?.quantity}</span></p>
     <p >Print Size : <span className='bold'>{orderDetail?.printSize}</span></p>
     <div className="col-lg-12" >
     <p>Main File :</p>
      <div className="card file">
{
orderDetail?.file?.map((fileUrl,fileIndex) => {
// Extract the file ID from the URL
//  let fileId = "";
//  if (fileUrl?.includes("/file/d/")) {
//    fileId = fileUrl?.split("/file/d/")[1]?.split("/")[0];
//  } else if (fileUrl?.includes("id=")) {
//    fileId = fileUrl?.split("id=")[1];
//  }

const fileId = fileUrl?.split('/d/')[1].split('/view')[0];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
// Construct the direct download link
//  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
let dropdownId = `dropdown${orderIndex}-${fileIndex}`;
return (
<div key={fileIndex}>

<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div>
</div>
)
})
}
</div>

</div>
     
     {/* <p >Main File :<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div></p> */}
                <div className="col-lg-12" >
     <p>Picture :</p>
      <div className="card file">
      {
orderDetail?.image?.map(imageUrl => {


const fileId = imageUrl?.split('/d/')[1].split('/view')[0];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;

return (
<div key={imageUrl}>

<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div>
</div>
)
})
}
</div>

</div>

{
orderDetail?.brandLogo &&
<>
<p>Brang Logo :</p>
<div className="card file">
      {
(() => {
// Extract the file ID from the URL
let fileId = "";
if (orderDetail?.brandLogo?.includes("/file/d/")) {
fileId = orderDetail?.brandLogo?.split("/file/d/")[1].split("/")[0];
} else if (orderDetail?.brandLogo?.includes("id=")) {
fileId = orderDetail?.brandLogo?.split("id=")[1];
}
// Construct the direct download link
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

return (
<div >

<div className="card-body file-info">
{
orderDetail?.brandLogo ?
<a className="dropdown-item" href={downloadUrl} download> <p>Brand Logo</p></a>
:
""
}


{/* <span className="file-size">1009.2kb</span><br /> */}
</div>
</div>
)
})()
}

</div>
</>

}

      </div>
      <hr />
    </div>
    </>
       ) })
    }
    {
      getSpecificOrderById?.selectedItemsDetailArr
      ?.map((insideDetail,orderIndex)=> 
  
        insideDetail?.individualProductArr?.map((orderDetail,itemIndex)=>
          orderDetail?.printSide  ?
          
          <>
          <div className="row order-tab  " key={orderIndex}>
          {/* <h3 style={{color:"orange"}}>Line Item: {itemIndex+1}</h3> */}
          
        <div className="col-3">
          <p  className='font12px'>{orderDetail?.color}</p>
        </div>
        <div className="col-3 " style={{display:"flex",justifyContent:"center"}}>
      
        <ul>
        {typeof orderDetail.teshirtSize === 'string' ? (
          <li  className='font12px'>
            {orderDetail.teshirtSize}- {orderDetail.quantity}
          </li>
        ) : (
          Object.entries(orderDetail.teshirtSize || {}).map(
            ([size, quantity]) => (
              <li className='font12px' key={size}>
               {size}- {quantity}
              </li>
            )
          )
        )}
      </ul>
         
          
        </div>
        <div className="col-3 font12px" style={{display:"flex",justifyContent:"center"}}>
        {orderDetail?.totalQuantity} 
        </div>
   
      
        <div className="col-lg-2" style={{display:"flex",justifyContent:"center"}}>
        {/* <div className="">
        <img style={{width:"60px",height:"60px"}} src={`https://drive.google.com/uc?id=${orderDetail?.image?.fileId}`}alt="file" className="img-fluid" />
        <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.image?.fileId}`}>download picture</a>
  </div> */}

<div style={{position: "relative" ,display: "inline-block"}}>
    <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.image?.fileId}`} style={{position: "absolute", top: "50px", left: "10px", backgroundColor:" rgba(255, 255, 255, 0.7)", padding: "5px"}}>Download</a>
    <img style={{width:"100px",height:"100px"}} src={`https://drive.google.com/uc?id=${orderDetail?.image?.fileId}`} alt="file" className="img-fluid" />
</div>

        </div>
      
      </div>
      <div className="row  " >
        {/* <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3> */}
        <div className="col-12 "  key={orderIndex}>
      
        {/* {orderDetail?.printSide} */}
      
        <p >productType: <span style={{fontweight:'700'}}> {orderDetail?.productType}</span></p>
        <p >Print side : <span style={{fontweight:'700'}}> {orderDetail?.printSide}</span></p>
        <p >FrontSide : <span className='bold'>{orderDetail?.printSide==="frontSide"?orderDetail?.printSize:"N/A"}</span></p>
        <p>BackSide: {orderDetail?.printSizeBack ? orderDetail?.printSizeBack :orderDetail?.printSize==="backSide"?orderDetail?.printSize:"N/A"}</p>
       
      
         
      
       <div className="col-lg-12" >
       <h4>Main File :</h4>
        <div className='phone_flex_center' style={{display:"flex"}}>
        {/* <img style={{width:"60px",height:"60px"}} src={`https://drive.google.com/uc?id=${orderDetail?.file?.fileId}`}alt="file" className="img-fluid" />
        <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.file?.fileId}`}>download Main File</a> */}

<div style={{position: "relative" ,display: "inline-block"}}>
    <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.file?.fileId}`} style={{position: "absolute", top: "50px", left: "10px", backgroundColor:" rgba(255, 255, 255, 0.7)", padding: "5px"}}>Download</a>
    <img style={{width:"100px",height:"100px"}} src={`https://drive.google.com/uc?id=${orderDetail?.file?.fileId}`} alt="file" className="img-fluid" />
</div>
  </div>
  
  </div>
       
       {/* <p >Main File :<div className="file-info">
  <iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
  <a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>
  
  </div></p> */}
     
  
  {
  orderDetail?.brandLogo &&
  <>
  <h4>Brang Logo :</h4>
  <div className="">
  {/* <img style={{width:"60px",height:"60px"}} src={`https://drive.google.com/uc?id=${orderDetail?.brandLogo?.fileId}`}alt="file" className="img-fluid" />
  <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.brandLogo?.fileId}`}>download logo</a> */}

<div style={{position: "relative" ,display: "inline-block"}}>
    <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.brandLogo?.fileId}`} style={{position: "absolute", top: "50px", left: "10px", backgroundColor:" rgba(255, 255, 255, 0.7)", padding: "5px"}}>Download</a>
    <img style={{width:"100px",height:"100px"}} src={`https://drive.google.com/uc?id=${orderDetail?.brandLogo?.fileId}`} alt="file" className="img-fluid" />
</div>
  </div>
  </>
  
  }
  
        </div>
        <hr />
      </div>
  
  {/* for mobile  */}
      <div className="row  diplay_none" >
        {/* <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3> */}
        <div className="col-12 "  key={orderIndex}>
       <p >Color:  <span className='bold'>{orderDetail?.color}</span></p>
       <ul>
        {typeof orderDetail.teshirtSize === 'string' ? (
          <li>
            {orderDetail.teshirtSize}- {orderDetail.quantity}
          </li>
        ) : (
          Object.entries(orderDetail.teshirtSize || {}).map(
            ([size, quantity]) => (
              <li key={size}>
                {size}- {quantity}
              </li>
            )
          )
        )}
      </ul>
       <p >Quantity : <span className='bold'> {orderDetail?.quantity}</span></p>
       <p >Print Size : <span className='bold'>{orderDetail?.printSize}</span></p>
       <div className="col-lg-12" >
       <p>Main File :</p>
        <div className="card file">
        {/* <img style={{width:"60px",height:"60px"}} src={`https://drive.google.com/uc?id=${orderDetail?.file?.fileId}`}alt="file" className="img-fluid" />
        <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.file?.fileId}`}>download mockup</a> */}
        <div style={{position: "relative" ,display: "inline-block"}}>
    <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.file?.fileId}`} style={{position: "absolute", top: "50px", left: "10px", backgroundColor:" rgba(255, 255, 255, 0.7)", padding: "5px"}}>Download</a>
    <img style={{width:"100px",height:"100px"}} src={`https://drive.google.com/uc?id=${orderDetail?.file?.fileId}`} alt="file" className="img-fluid" />
</div>
  </div>
  
  </div>
       
       {/* <p >Main File :<div className="file-info">
  <iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
  <a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>
  
  </div></p> */}
                  <div className="col-lg-12" >
       <p>Picture :</p>
        <div className="card file">
        {/* const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`; */}
        {/* <img style={{width:"60px",height:"60px"}} src={`https://drive.google.com/uc?id=${orderDetail?.image?.fileId}`}alt="file" className="img-fluid" />
        <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.image?.fileId}`}>download picture</a> */}
        <div style={{position: "relative" ,display: "inline-block"}}>
    <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.image?.fileId}`} style={{position: "absolute", top: "50px", left: "10px", backgroundColor:" rgba(255, 255, 255, 0.7)", padding: "5px"}}>Download</a>
    <img style={{width:"100px",height:"100px"}} src={`https://drive.google.com/uc?id=${orderDetail?.image?.fileId}`} alt="file" className="img-fluid" />
</div>
  </div>
  
  </div>
  
  {
  orderDetail?.brandLogo &&
  <>
  <p>Brang Logo :</p>
  <div className="card file">
  {/* <img style={{width:"60px",height:"60px"}} src={`https://drive.google.com/uc?id=${orderDetail?.brandLogo?.fileId}`}alt="file" className="img-fluid" />
  <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.brandLogo?.fileId}`}>download logo</a> */}

<div style={{position: "relative" ,display: "inline-block"}}>
    <a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.brandLogo?.fileId}`} style={{position: "absolute", top: "50px", left: "10px", backgroundColor:" rgba(255, 255, 255, 0.7)", padding: "5px"}}>Download</a>
    <img style={{width:"100px",height:"100px"}} 
    src={`https://drive.google.com/uc?id=${orderDetail?.brandLogo?.fileId}`}
    alt="file" className="img-fluid" />
</div>
 
  </div>
  </>
  
  }
  
        </div>
        <hr />
      </div>
      </>

      :(!orderDetail?.printSide && orderDetail?.brandLogo?.fileId)&&
      <>
      <div className="row order-tab  " key={orderIndex}>
      {/* <h3 style={{color:"orange"}}>Line Item: {itemIndex+1}</h3> */}
      
    <div className="col-3">
      <p  className='font12px'>{orderDetail?.color}</p>
    </div>
    <div className="col-3 " style={{display:"flex",justifyContent:"center"}}>
  
    <ul>
    {typeof orderDetail.teshirtSize === 'string' ? (
      <li  className='font12px'>
        {orderDetail.teshirtSize}- {orderDetail.quantity}
      </li>
    ) : (
      Object.entries(orderDetail.teshirtSize || {}).map(
        ([size, quantity]) => (
          <li className='font12px' key={size}>
           {size}- {quantity}
          </li>
        )
      )
    )}
  </ul>
     
      
    </div>
    <div className="col-3 font12px" style={{display:"flex",justifyContent:"center"}}>
    {orderDetail?.totalQuantity} 
    </div>

  
  </div>
  <div className="row  " >
    {/* <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3> */}
    <div className="col-12 "  key={orderIndex}>
  
    {/* {orderDetail?.printSide} */}
  
 
   
  
     
  
  
   {/* <p >Main File :<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div></p> */}
 

{
orderDetail?.brandLogo &&
<>
<h4>Brang Logo :</h4>
<div className="">
{/* <img style={{width:"60px",height:"60px"}} src={`https://drive.google.com/uc?id=${orderDetail?.brandLogo?.fileId}`}alt="file" className="img-fluid" />
<a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.brandLogo?.fileId}`}>download logo</a> */}

<div style={{position: "relative" ,display: "inline-block"}}>
<a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.brandLogo?.fileId}`} style={{position: "absolute", top: "50px", left: "10px", backgroundColor:" rgba(255, 255, 255, 0.7)", padding: "5px"}}>Download</a>
<img style={{width:"100px",height:"100px"}} src={`https://drive.google.com/uc?id=${orderDetail?.brandLogo?.fileId}`} alt="file" className="img-fluid" />
</div>
</div>
</>

}

    </div>
    <hr />
  </div>

{/* for mobile  */}
  <div className="row  diplay_none" >
    {/* <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3> */}
    <div className="col-12 "  key={orderIndex}>
   <p >Color:  <span className='bold'>{orderDetail?.color}</span></p>
   <ul>
    {typeof orderDetail.teshirtSize === 'string' ? (
      <li>
        {orderDetail.teshirtSize}- {orderDetail.quantity}
      </li>
    ) : (
      Object.entries(orderDetail.teshirtSize || {}).map(
        ([size, quantity]) => (
          <li key={size}>
            {size}- {quantity}
          </li>
        )
      )
    )}
  </ul>
   <p >Quantity : <span className='bold'> {orderDetail?.quantity}</span></p>
 
 
   
 
     

{
orderDetail?.brandLogo &&
<>
<p>Brang Logo :</p>
<div className="card file">
{/* <img style={{width:"60px",height:"60px"}} src={`https://drive.google.com/uc?id=${orderDetail?.brandLogo?.fileId}`}alt="file" className="img-fluid" />
<a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.brandLogo?.fileId}`}>download logo</a> */}

<div style={{position: "relative" ,display: "inline-block"}}>
<a href={`https://drive.google.com/uc?export=download&id=${orderDetail?.brandLogo?.fileId}`} style={{position: "absolute", top: "50px", left: "10px", backgroundColor:" rgba(255, 255, 255, 0.7)", padding: "5px"}}>Download</a>
<img style={{width:"100px",height:"100px"}} src={`https://drive.google.com/uc?id=${orderDetail?.brandLogo?.fileId}`} alt="file" className="img-fluid" />
</div>

</div>
</>

}

    </div>
    <hr />
  </div>
  </>
        )
 )
    }


  
   
  </div>
</div>
           
          </div>
          <Footer/>
      <BackToTop/>
        </div>
        );
 };
 export default OrderTracking;