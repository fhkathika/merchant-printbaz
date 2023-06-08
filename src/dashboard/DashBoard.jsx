import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Component/footer/Footer';
import Login from '../Component/login/Login';
import Register from '../Component/login/Register';
import NavigationBar from '../Component/Navbar/NavigationBar';
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
  const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
  const resellerOrdersFromDb=fetchedData?.orders
  const {info}=useGetMongoData()
  console.log("user from dashboard",user);
  console.log("info",info);
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    function closePopup() {
      document.getElementById("popup1").style.display = "none";
    }
   
    
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
    if(!user){
      console.log("non user exists");
    }
    else {
      console.log(" user exists");
    }
  
  console.log("user",user);
  // pending delivery
  const orderStatusPending=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="Pending" )
  console.log("orderStatus pending",orderStatusPending);
  let pendingstatusCount=0
  for(let i=1;i<=orderStatusPending?.length;i++){
     pendingstatusCount++

  } 
  // Returned
   const orderStatusReturned=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="returned" )
  console.log("orderStatus return",orderStatusReturned);

  let returnedstatusCount=0
  for(let i=1;i<=orderStatusReturned?.length;i++){
    returnedstatusCount++

  }
  console.log("returnstatusCount",returnedstatusCount);  
  
  // Payment Released
   const orderStatusPaymentReleased=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="payment-released" )
  console.log("orderStatus pament released",orderStatusPaymentReleased);
  let totalReceiveBase=0
for(let i=0;i<orderStatusPaymentReleased?.length;i++){
  let totalReceive=orderStatusPaymentReleased[i]?.recvMoney;
  totalReceiveBase +=totalReceive;
console.log("totalReceiveBase",totalReceiveBase);
}

//patmnet status =paid,orderstatus :delivered
const PaymentStausPaid=info
?.filter(order => order.userMail === user?.email && order.paymentStatus==="paid" && order?.orderStatus==="delivered")
console.log("PaymentStausPaid",PaymentStausPaid);

let statusPaidbase=0;
for(let i=0;i<PaymentStausPaid?.length;i++){
  let totalpaid=PaymentStausPaid[i]?.recvMoney;
  statusPaidbase +=totalpaid;
console.log("statusPaidbase",statusPaidbase);
}
let dueAmount=parseInt(statusPaidbase-totalReceiveBase)
console.log("dueAmount",dueAmount);
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
      
      <div className="row ">
      <div className="col-md-6 mb-4">
          <div className="dashboard-card dashboard-card-img">
          <YoutubeEmbed embedId="3mrzJ2fKims" />
          </div>
        </div> 
        <div className="col-md-6 mb-4">
          <div className="dashboard-card dashboard-card-img">
          <YoutubeEmbed embedId="ffo850LL9Y4" />
          </div>
        </div>
      </div>
      <div className="row">
        {/* First row */}
        <div className="col-12 mb-4">
          <div className="dashboard-card brief-stats-card">
            <div className="d-flex justify-content-between align-items-center">
              <h3>Brief Stats</h3>
              {/* <input type="date" className="form-control" style={{width: 'auto'}} /> */}
            </div>
          </div>
        </div>
        {/* Second row */}
        <div className="col-md-4 mb-4">
          <div className="dashboard-card">
            <h4>Total Delivered</h4>
            <div className="sub-cat">
            <div className='flex'>
              <p>Pending Delivery:</p>
              <span style={{color:"orange",fontSize:'16px'}}>{pendingstatusCount} </span>
             
              </div>
               <div className='flex'>
              <p>Total Returned:</p>
              <span style={{color:"orange",fontSize:'16px'}}>{returnedstatusCount} </span>
             
              </div>
             
            
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="dashboard-card">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Payments</h4>
            </div>
            <div className="Payment-btn">
              <button className="btn btn-sm btn-primary mr-2">Request</button>
            </div>
            <div className="sub-cat">
              <div className='flex'>
              <p>Total Payment Received: {/* Add payment in process value */}</p>
              <span style={{color:"orange",fontSize:'16px'}}>{totalReceiveBase} </span>
             
              </div>
               <div className='flex'>
              <p>Total Bill:  </p>
              <span style={{color:"orange",fontSize:'16px'}}>{parseInt(statusPaidbase)} </span>
             
              </div>
               <div className='flex'>
              <p>Due Amount: </p>
              <span style={{color:"orange",fontSize:'16px'}}> {dueAmount>=0 && dueAmount }</span>
             
              </div>

             
                
             
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="dashboard-card dashboard-card-img">
            <a href="#">
              <img src="https://media.discordapp.net/attachments/1069579536842379305/1097079998336204800/20.jpg?width=616&height=616" alt="Clickable Image" className="img-fluid" />
            </a>
          </div>
        </div>
      </div>

   
    </div>

    <Footer ></Footer>


    
  
    
            </div>
       
  );
};

export default DashBoard;