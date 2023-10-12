import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReqPaymentTIcketPopup from '../alertBox/ReqPaymentTIcketPopup';
import Footer from '../Component/footer/Footer';
import HomeSlider from '../Component/homeSlider/HomeSlider';
import Login from '../Component/login/Login';
import Register from '../Component/login/Register';
import NavigationBar from '../Component/Navbar/NavigationBar';
import SupportTicketPopUp from '../Component/supportTicketPopUp/SupportTicketPopUp';
import YoutubeEmbed from '../Component/youtubeEmbaded/YoutubeEmbaded';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import  "../css/styles.css"
import { useGetData } from '../hooks/useGetData';
import useGetMongoData from '../hooks/useGetMongoData';

const DashBoard = () => {
  const {user,logOut}=useContext(AuthContext);
  let id = "resellerOrdersId";
  let collections = "resellerInfo";
  const [dbData, setDbData] = useState({});
  // const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
  // const resellerOrdersFromDb=fetchedData?.orders

  const {info}=useGetMongoData()
  const [usersTickets, setUsersTickets] = useState([]);
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const[fetchAllTicket,setFetchAllTicket]=useState([])
    const [popupId, setPopupId] = useState('');
    const [createTicket, setCreateTicket] = useState(false);
    const [reqBtnStatus, setReqBtnStatus] = useState(true);
    const [totalBill, setTotalBill] = useState(0);
    const [reqAlert, setReqAlert] = useState('');
    const closePopup = () => {setShowPopup(false);};
    // function closePopup() {
    //   document.getElementById("popup1").style.display = "none";
    // }

    
   useEffect(()=>{
    fetchAllTicketData()
   },[])
    const fetchAllTicketData = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/allTicketIds');
        const response = await axios.get('https://mserver.printbaz.com/allTicketIds');
        setFetchAllTicket(response.data);
     
      } catch (err) {
        console.error(err);
      }
    };
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
    const [display, setDisplay] = useState('flex');
    const [displayNone, setDisplayNone] = useState('none');
    const showRegister = () => {
      setDisplay('none');
      setDisplayNone('block')
    }
     const showLogin = () => {
      setDisplay('block');
      setDisplayNone('none')
    }
  
    
    const [countdown, setCountdown] = useState(null);

    // Check if 24 hours have passed since the last click
    const lastClickTimestamp = localStorage.getItem('lastClickTimestamp');
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - (lastClickTimestamp ? parseInt(lastClickTimestamp, 10) : 0);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    useEffect(() => {
      // If not 24 hours yet, start countdown
      if (timeDifference < oneDayInMilliseconds) {
        setCountdown(oneDayInMilliseconds - timeDifference);
  
        const timer = setInterval(() => {
          setCountdown(prevCountdown => {
            if (prevCountdown <= 1000) {
              clearInterval(timer);
              return null;
            }
            return prevCountdown - 1000;
          });
        }, 1000);
      }
    }, []);  // Empty dependency array to run this effect only once when the component mounts
  
    const formatTime = (milliseconds) => {
      const hours = Math.floor(milliseconds / (60 * 60 * 1000));
      const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    
      return `${hours}h ${minutes}m ${seconds}s`;
    };
    

  // pending delivery
  const orderStatusPending=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="Pending" )
  // console.log("orderStatus pending",orderStatusPending);
  let pendingstatusCount=0
  for(let i=1;i<=orderStatusPending?.length;i++){
     pendingstatusCount++

  } 
  // Returned
   const orderStatusReturned=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="returned" )
  // console.log("orderStatus return",orderStatusReturned);
   const orderStatusDelivered=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="delivered" ) 
  // on hold artwork issue
  const orderStatusonHoldartworkissue=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="on hold artwork issue" )
    // on hold billing issue
  const orderStatusonHoldbillingissue=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="on hold billing issue" )
    // on hold out of stock
  const orderStatusonHoldoutofstock=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="on hold out of stock" )
  

  let returnedstatusCount=0
  for(let i=1;i<=orderStatusReturned?.length;i++){
    returnedstatusCount++

  }
  let deliveredstatusCount=0
  for(let i=1;i<=orderStatusDelivered?.length;i++){
    deliveredstatusCount++

  }let onHoldArtWorkstatusCount=0
  for(let i=1;i<=orderStatusonHoldartworkissue?.length;i++){
    onHoldArtWorkstatusCount++

  }let onHoldBillingstatusCount=0
  for(let i=1;i<=orderStatusonHoldbillingissue?.length;i++){
    onHoldBillingstatusCount++

  }let onHoldoutofstockCount=0
  for(let i=1;i<=orderStatusonHoldoutofstock?.length;i++){
    onHoldoutofstockCount++

  }
const handleCreateTicket=(e)=>{
 e.preventDefault()
 localStorage.setItem('lastClicked', Date.now());
  setCreateTicket(true)
 
  fetchAllTicketData()
  setShowPopup(true)
  setPopupId(generateId()); // Set the generated ID

}
const handleRequestAlert=(e)=>{
  e.preventDefault()
  setReqAlert("your total bill must be 1000/- or more")
  setTimeout(()=>{
    setReqAlert("");

  },2000)
}
  const totalHold=Number(onHoldArtWorkstatusCount+onHoldBillingstatusCount+onHoldoutofstockCount)
 
  // console.log("returnstatusCount",returnedstatusCount);  
  
  // Payment Released
   const orderStatusPaymentReleased=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="payment-released" ) 
  //return amount
    const orderSatatusReturned=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="returned" )
  // console.log("orderStatus pament released",orderStatusPaymentReleased);
console.log("user",user);
// if (!user?.payments || user.payments.length === 0) {
//   // This merchant has no payments, so return null or a placeholder row
//   return 0;
// }
const lastPayment = user.payments && user.payments.length > 0 ? user.payments[user.payments.length - 1] : null;
  let totalReceiveBase=0,totalReturnAmmountBase=0;
  if (lastPayment) {
    for(let i=0;i<user.payments?.length;i++){
  let totalReceive=user.payments[i]?.paymentReleasedAmount;
  // totalReceiveBase = lastPayment?.paymentReleasedAmount;
  totalReceiveBase +=totalReceive;
// console.log("totalReceiveBase",totalReceiveBase);
}
   
    // ... any other logic related to lastPayment.
}
// for(let i=0;i<orderStatusPaymentReleased?.length;i++){
//   let totalReceive=orderStatusPaymentReleased[i]?.recvMoney;
//   totalReceiveBase +=totalReceive;
// // console.log("totalReceiveBase",totalReceiveBase);
// }
for(let i=0;i<orderSatatusReturned?.length;i++){
  let totalReturn=orderSatatusReturned[i]?.returnedAmount;
  if(totalReturn){
    totalReturnAmmountBase +=totalReturn;
  }


}

// Check if orderStatusReturned is an array before looping
// if (Array.isArray(orderSatatusReturned)) {
//   for (let i = 0; i < orderSatatusReturned.length; i++) {
//     const totalReturn = Number(orderSatatusReturned[i]?.returnedAmount);
//     const deliveryFee = Number(orderSatatusReturned[i]?.deliveryFee);
    
//     // If totalReturn and deliveryFee exist and are numbers, add them to totalReturnAmountBase
   
//       totalReturnAmmountBase += (totalReturn + deliveryFee);
    
//   }
// }

//patmnet status =paid,orderstatus :delivered
const PaymentStausPaid=info
?.filter(order => order.userMail === user?.email && order.paymentStatus==="paid" && order?.orderStatus==="delivered")

const returnValueFilter=info?.filter(order => order.userMail === user?.email && order?.orderStatus==="returned")


let statusPaidbase=0; let totalpaid
for(let i=0;i<PaymentStausPaid?.length;i++){
   totalpaid=Number(PaymentStausPaid[i]?.recvMoney);
  statusPaidbase =statusPaidbase+totalpaid;
 
  // setTotalBill(totalBill+totalpaid);

}

// returned amount 
let returnAmountBase=0;
for(let i=0;i<returnValueFilter?.length;i++){
  let totalreturned=returnValueFilter[i]?.recvMoney;
  // returnAmountBase =returnAmountBase+totalreturned;

}

let dueAmount=statusPaidbase-(totalReceiveBase+totalReturnAmmountBase)
// console.log("totalReturnAmmountBase",totalReturnAmmountBase);

// let dueAmount=statusPaidbase-(totalReceiveBase-)
// console.log("dueAmount",dueAmount);
      return (
        <div className='payment_container'>
   <NavigationBar/>
     <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> 
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
     <style dangerouslySetInnerHTML={{__html: "\n      /* General styles */\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #f8f9fa;\n}\n\n.navbar {\n  background-color: #001846 !important;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 20px;\n  padding-left: 40px !important;\n}\n\n.navbar-brand img {\n  width: 150px;\n}\n\n.nav-link {\n  color: #ffffff !important;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.nav-link:hover {\n  background-color: #ffffff;\n  color: #001846 !important;\n}\n.dropdown{\n  padding-left: 1200px;\n}\n\n.dropdown-menu {\n  margin-left: 1120px;\n  \n}\n\n.container {\n  max-width: 1200px;\n}\n\n/* Dashboard */\n.dashboard-title {\n  font-weight: 800 !important;\n  font-size: 50px !important;\n  color: #001846;\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n}\n\n.dashboard-card {\n  background-color: #ffffff;\n  border-radius: 0.25rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 1.5rem;\n  height: 100%;\n  padding-bottom: 10px !important;\n}\n\n.dashboard-card h3 {\n  font-size: 30px;\n  font-weight: 700;\n  color: #001846;\n  text-transform: uppercase;\n}\n\n.dashboard-card h4 {\n  font-size: 25spx;\n  font-weight: 700;\n  color: #001846;\n  text-transform: uppercase;\n}\n\n.dashboard-card p {\n  font-size: 15px;\n  font-weight: 600;\n  color: #6b6b6b;\n}\n\n.Payment-btn button {\n  background-color: rgb(234, 58, 59);\n  border: none;\n  font-weight: 700;\n}\n\n.sub-cat {\n  margin-top: 30px;\n}\n\n.dashboard-card-img {\n  padding: 0 !important;\n}\n\n/* Second row columns */\n.second-row-card {\n  display: flex;\n  flex-direction: column;\n}\n\n.second-row-card h4 {\n  margin-bottom: 1rem;\n}\n\n.second-row-card p {\n  margin-bottom: 0.5rem;\n}\n\n/* Clickable image */\n.img-fluid {\n  width: 100%;\n  height: auto;\n  border-radius: 0.25rem;\n}\n\n/* Responsive styles */\n@media (min-width: 768px) {\n  .second-row-card {\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n  }\n\n  .second-row-card p {\n      margin-left: 1rem;\n  }\n}\n\n/* Responsive styles */\n@media (min-width: 576px) {\n  .dashboard-title {\n      font-size: 2rem;\n  }\n}\n\n    " }} />
   
    <title className=''>Dashboard</title>
    {/* CSS styles */}
   

    <div className="container mt-5 " style={{marginBottom:"50px"}}>
      <h1 className="text-center mb-4 dashboard-title test">Dashboard</h1>
      <div className="mb-3 mt-5 ml-5">
        <HomeSlider/>
        </div>

      <div className="row">
        {/* First row */}
        <div className="col-12 mb-4">
          <div className="dashboard-card brief-stats-card">
            <div className="d-flex justify-content-between align-items-center">
              {/* <h3>Brief Stats</h3> */}
            </div>
          </div>
        </div>
        {/* Second row */}
        {/* <div className="col-md-4 mb-4">
          <div className="dashboard-card">
            <h4>Total Delivered</h4>
            <div className="sub-cat">
            <div className='flex'>
              <p>Total Pending:</p>
              <span style={{color:"orange",fontSize:'16px'}}>{pendingstatusCount} </span>
             
              </div>
               <div className='flex'>
              <p>Total Returned:</p>
              <span style={{color:"orange",fontSize:'16px'}}>{returnedstatusCount} </span>
             
              </div><div className='flex'>
              <p>Total On Hold:</p>
              <span style={{color:"orange",fontSize:'16px'}}>{totalHold} </span>
             
              </div><div className='flex'>
              <p>Total Delivered:</p>
              <span style={{color:"orange",fontSize:'16px'}}>{deliveredstatusCount} </span>
             
              </div>
             
            
            </div>
          </div>
        </div> */}
        {/* <div className="col-md-4 mb-4">
          <div className="dashboard-card">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Payments</h4>
            </div>
            
           
              <div className="Payment-btn">
                {timeDifference < oneDayInMilliseconds || reqBtnStatus===false ?
                   <div>
                   <button  style={{ backgroundColor: "#817f7f", color: "white" }} disabled onClick={handleCreateTicket}>
                     Request
                   </button>
                   <span style={{color:"red",marginLeft:"10px"}}>{countdown !== null ? formatTime(countdown) : ""}</span>
                 </div>
                   
                   :
                   
                    statusPaidbase<=1000 ?
                    <>
                     <button className="btn btn-sm btn-primary mr-2" style={{ backgroundColor: "#817f7f", color: "white" }}  onClick={handleRequestAlert}>
                     Request
                   </button>
                   {
                     reqAlert &&
                     <p style={{color:"red",marginTop:"5px"}}>{reqAlert}</p>
                   }
   
                    </>
                   
                    :
                    <button className="btn btn-sm btn-primary mr-2" style={{backgroundColor:"#ff4400",color:"#fff"}} onClick={handleCreateTicket}>Request</button>
                   
                 
                 
                }
             
            </div>
            
            
            
           
            <div className="sub-cat">
              <div className='flex'>
              <p>Total Payment Received: </p>
              <span style={{color:"orange",fontSize:'16px'}}>{totalReceiveBase} </span>
             
              </div>
               <div className='flex'>
              <p>Total Bill:  </p>
              <span style={{color:"orange",fontSize:'16px'}}>{parseInt(lastPayment?.totalBill?lastPayment?.totalBill :statusPaidbase)} Tk </span>
             
              </div> 
              <div className='flex'>
              <p>Return Value:  </p>
              <span style={{color:"orange",fontSize:'16px'}}>{Number(lastPayment?.totalReturnAmmountBase?lastPayment?.totalReturnAmmountBase :totalReturnAmmountBase)} Tk </span>
             
              </div> 
             
               <div className='flex'>
              <p>Due Amount: </p>
              <span style={{color:"orange",fontSize:'16px'}}> {lastPayment?.dueAmountNow?lastPayment?.dueAmountNow:dueAmount.toFixed(2)} TK</span>
             
              </div>

             
                
             
            </div>
          </div>
        </div> */}
        {/* <div className="col-md-4 mb-4">
          <div className="dashboard-card dashboard-card-img">
            <a href="#">
              <img src="https://media.discordapp.net/attachments/1128921638977683526/1159425964829315112/DM.png?ex=6530fa93&is=651e8593&hm=9895ffdd69c36ae7ad87502701c34bba005054a691b5536ad8106d91fad72b86&=&width=612&height=612" alt="Clickable Image" className="img-fluid" />
            </a>
          </div>
        </div> */}
      </div>

      <div className="row mt-5 ">
      <div className="col-md-6 mb-5">
          <div className="dashboard-card dashboard-card-img">
          <YoutubeEmbed embedId="3mrzJ2fKims" />
          </div>
        </div> 
        <div className="col-md-6 mb-5 ">
          <div className="dashboard-card dashboard-card-img">
          <YoutubeEmbed embedId="ffo850LL9Y4" />
          </div>
        </div>
      </div>
    </div>
{
  showPopup===true &&
  <ReqPaymentTIcketPopup
  showPopup={showPopup}
  userId={user?.phone}
  setShowPopup={setShowPopup}
  onClose={closePopup}
  ticketId={popupId}
  setReqBtnStatus={setReqBtnStatus}
  reqBtnStatus={reqBtnStatus}
  userEmail={user?.email}
  userName={user?.name}
  createTicket={createTicket}
  setCreateTicket={setCreateTicket}
  />
}
    <Footer ></Footer>


    
  
    
            </div>
       
  );
};

export default DashBoard;