

import React, { useContext, useEffect, useState } from 'react';
import '../css/dashboardStyles.css'
import Swiper from 'swiper';
import 'aos/dist/aos.css';
import AOS from 'aos';
// Import Swiper styles
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { Accordion, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import axios from 'axios';
import useGetMongoData from '../hooks/useGetMongoData';
import ReqPaymentTIcketPopup from '../alertBox/ReqPaymentTIcketPopup';
import Footer from '../Component/footer/Footer';
const DashBoard = () => {
  const {user,logoutUser}=useContext(AuthContext);
  let id = "resellerOrdersId";
  let collections = "resellerInfo";
  const navigate=useNavigate()
  const [dbData, setDbData] = useState({});
  // const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
  // const resellerOrdersFromDb=fetchedData?.orders
console.log("user",user);
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

    const handleDropdownClick = () => {
      setDropdownOpen(!dropdownOpen);
    };
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
 
  console.log("returnstatusCount",returnedstatusCount);  
  
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
  let totalReceive=Number(user.payments[i]?.paymentReleasedAmount?user.payments[i]?.paymentReleasedAmount:0);
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
  let totalReturn=Number(orderSatatusReturned[i]?.returnedAmount);
  if(totalReturn){
    // totalReturnAmmountBase +=totalReturn;
    const deliveryFee = Number(orderSatatusReturned[i]?.deliveryFee);
    
    // If totalReturn and deliveryFee exist and are numbers, add them to totalReturnAmountBase
   
      totalReturnAmmountBase += (totalReturn +deliveryFee/2);
    
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
  statusPaidbase =Number(statusPaidbase+totalpaid);
 
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
 // Fetch the latest payment made by user
let lastPayementDetail = user?.payments?.length > 0 ? 
user.payments[user.payments.length-1] : null;

// Calculate the grand due amount
let grandDueNow = dueAmount;

// if (lastPayementDetail && lastPayementDetail.paymentReleasedAmount) {
// grandDueNow -= lastPayementDetail.totalReleasedAmount;
// }

console.log("Initial dueAmount:", dueAmount);
console.log("Last payment amount:", lastPayementDetail?.paymentReleasedAmount);
console.log("Grand Due Amount:", grandDueNow);

console.log("totalReturnAmmountBase test",totalReturnAmmountBase);
useEffect(() => {
  const getOrderById = async () => {
      // Ensure there's an ID before making a request
      console.log("totalBill test",statusPaidbase);
      console.log("dueAmount test",dueAmount);
      console.log("totalReceiveBase test",totalReceiveBase);
      console.log("totalReturnAmmountBase test",totalReturnAmmountBase);
      if (user?._id) {
          try {
        
              const response = await fetch(
                  `https://mserver.printbaz.com/updateBill/${user._id}`,
                  // `http://localhost:5000/updateBill/${viewClient._id}`,
                  {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        totalBill: statusPaidbase, 
                        totalReceiveBase: totalReceiveBase?totalReceiveBase:0,
                        totalReturnAmmountBase: totalReturnAmmountBase,
                        dueAmount:  grandDueNow 
                    }),
                }
              );

              const data = await response.json();
              if (response.status === 200) {
                  // Handle success, for instance:
                  console.log("Total bill updated successfully:", data);
              } else {
                  // Handle error
                  console.error("Error updating the bill:", data.message);
              }

          } catch (error) {
              console.error("Network or server error:", error);
          }
      }
  };

  getOrderById();

}, [user,statusPaidbase, totalReceiveBase, totalReturnAmmountBase, dueAmount]);


useEffect(() => {
  const navbarlinks = document.querySelectorAll('#navbar .scrollto');

  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = document.querySelector(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  navbarlinksActive();
  window.addEventListener('scroll', navbarlinksActive);
  return () => {
    window.removeEventListener('scroll', navbarlinksActive);
  };
}, []);
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  useEffect(() => {
    const handleMobileNavToggle = (e) => {
      if (e.target.matches('.mobile-nav-toggle')) {
        setIsMobileNavActive((prev) => !prev);
      }
    };

    const handleDropdownClick = (e) => {
      if (e.target.matches('.navbar .dropdown > a')) {
        if (document.querySelector('#navbar').classList.contains('navbar-mobile')) {
          e.preventDefault();
          e.target.nextElementSibling.classList.toggle('dropdown-active');
        }
      }
    };

    // Add event listeners
    document.addEventListener('click', handleMobileNavToggle);
    document.addEventListener('click', handleDropdownClick, true);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleMobileNavToggle);
      document.removeEventListener('click', handleDropdownClick, true);
    };
  }, []);

useEffect(() => {
  const selectHeader = document.querySelector('#header');
  const headerScrolled = () => {
    if (window.scrollY > 100) {
      selectHeader.classList.add('header-scrolled');
    } else {
      selectHeader.classList.remove('header-scrolled');
    }
  };
  headerScrolled();
  window.addEventListener('scroll', headerScrolled);
  return () => {
    window.removeEventListener('scroll', headerScrolled);
  };
}, []);

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
useEffect(() => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false
  });

  // Initialize Swiper
  new Swiper('.Hero-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 3,
      }
    }
  });


}, []);
const handleLogOut=()=>{
  logoutUser();
  navigate('/login')
}

// new PureCounter();
  return (
    <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Merchant Printbaz</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />
  {/* Favicons */}
  <link
   src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js"
  
  />

  <link
    href="https://media.discordapp.net/attachments/1128921638977683526/1163824367923368007/Logo-01.jpg?ex=6540fae8&is=652e85e8&hm=db532d8bea456f4945989a8023e08dd928f40092466a52478c7fb945dea4edd6&=&width=612&height=612"
    rel="apple-touch-icon"
  />
  {/* Google Fonts */}
  <link
    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
    rel="stylesheet"
  />
  {/* Vendor CSS Files */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
    integrity="sha512-1cK78a1o+ht2JcaW6g8OXYwqpev9+6GqOkz9xmBN9iUUhIndKtxwILGWYOSibOKjLsEdjyjZvYDq/cZwNeak0w=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
    integrity="sha512-b2QcS5SsA8tZodcDtGRELiGv5SaKSk1vDHDaQRda0htPYWZ6046lr3kJ5bAAQdpV2mmA/4v0wQF9MyU6/pDIAg=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css"
    integrity="sha512-oAvZuuYVzkcTc2dH5z1ZJup5OmSQ000qlfRvuoTTiyTBjwX1faoyearj8KdMq0LgsBTHMrRuMek7s+CxF8yE+w=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/css/glightbox.min.css"
    integrity="sha512-T+KoG3fbDoSnlgEXFQqwcTC9AdkFIxhBlmoaFqYaIjq2ShhNwNao9AKaLUPMfwiBPL0ScxAtc+UYbHAgvd+sjQ=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.min.css"
    integrity="sha512-/VYneElp5u4puMaIp/4ibGxlTd2MV3kuUIroR3NSQjS2h9XKQNebRQiyyoQKeiGE9mRdjSCIZf9pb7AVJ8DhCg=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.3.1/swiper-bundle.min.css"
    integrity="sha512-UV9ujyMxyYubOSkCa8+OGzknJ1EilA19WPimPseyMcZaGIoO8l7iNphD0Mq/0R/lNkzBH70ai3tmurxAW0M2ww=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  /> 
 
  
  {/* ======= Header ======= */}
  <header id="header" className="header fixed-top">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
      <a href="index.html" className="logo d-flex align-items-center">
        <img
          src="https://media.discordapp.net/attachments/1128921638977683526/1163815250013978686/Logo-01.png?ex=6540f26a&is=652e7d6a&hm=1628865bf04319b5155b3e0c730e5c3225436817412a8ed31018437d696bd53e&=&width=1440&height=392"
          alt=""
        />
      </a>
      <nav id="navbar" className="navbar">
        <ul>
          <li>
           
            <Link className="nav-link scrollto active" to="/dashboard">DASHBOARD</Link>
          </li>
          <li>
           
            <Link className="nav-link scrollto " to="/myorders">ORDER</Link>
          </li>
          <li>
          <Link className="nav-link scrollto " to="/newOrdersWithOption">
              NEW ORDER
            </Link>
          </li>
          <li>
          <Link className="nav-link scrollto " to="/ticket">
              TICKET
            </Link>
          </li>
          <li>
            <a className="nav-link scrollto" href="#">
              BLOGS
            </a>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>{user?.name}</span> <i className="bi bi-chevron-down" />
            </a>
            <ul>
              <li>
              <Link className=''  to="/profile">Profile</Link> 
              </li>
              <li>
              <Link className='' to="/payment">Payment</Link> 
              </li>
              <li>
                <Link className=''  to="/calculator">Calculator</Link> 
              </li>
              <li>
              <Link className=''  to="/printSizeDemo">Print Size Demo</Link> 
              </li>
              <li>
              <Link className='' to="/termsConditions">Terms &amp; Conditions</Link> 
              </li>
              {/* <li>
                <a href="#">Log Out f</a>
              </li> */}
              {user ? (
                // <li onClick={handleLogOut} className="" >
                //   Log Out
                // </li> 
                  <li  onClick={handleLogOut} style={{cursor:"pointer"}}>
                 <p style={{marginLeft:"20px"}}> Log Out </p>
                  </li>
              ) : (
                <li   >
                 <Link to="/login">Login</Link>
              </li> 
              
              )}
            </ul>
          </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" />
      </nav>
      </div>

      {/* .navbar */}
    
  </header>

  
  {/* End Header */}
  {/* ======= Hero Section ======= */}
 

  <section id="Hero" className="Hero">
    <div className="container" data-aos="fade-up">
      <div className="row">
        <div
          className="col-12"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <Link to="/newOrdersWithOption" style={{textDecoration:"none"}} className="btn-buy">
            Create A New Order
          </Link>
        </div>
      </div>
      <div 
        className="Hero-slider swiper"
        data-aos="fade-up"
        data-aos-delay={200}
 >
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="hero-item">
              <div className="stars">
                <img
                  src="https://media.discordapp.net/attachments/1128921638977683526/1163804830494629978/02.jpg?ex=6540e8b6&is=652e73b6&hm=d73ad20c8292687afc3cb6e2d946855b1aaffb19f665fcd91714018fade75f01&=&width=612&height=612"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* End testimonial item */}
          <div className="swiper-slide">
            <div className="hero-item">
              <div className="stars">
                <img
                  src="https://media.discordapp.net/attachments/1128921638977683526/1163804829362167899/01.jpg?ex=6540e8b5&is=652e73b5&hm=213d24bc0f65f9560bc89e20ed6c67d341bb9b3f4fabfed2d9525615127c0d9d&=&width=612&height=612"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* End testimonial item */}
          <div className="swiper-slide">
            <div className="hero-item">
              <div className="stars">
                <img
                  src="https://media.discordapp.net/attachments/1128921638977683526/1163804829982937168/01.jpg?ex=6540e8b5&is=652e73b5&hm=1af075263889242a98336521894ee3da3f39444d4408178c4851f037c3d28769&=&width=612&height=612"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* End testimonial item */}
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  </section>
  {/* End Hero Section */}
  <main id="main">
    {/* ======= delivery Section ======= */}
    <section id="delivery" className="delivery">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>BRIEF STATS</h2>
          <p>YOUR ORDER STATS</p>
        </header>
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <div className="delivery-box">
              <i className="ri-projector-2-line" />
              <div>
                <span className='text_center'>{pendingstatusCount}</span>
                <p>Total Pending</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="delivery-box">
              <i className="ri-text-wrap" style={{ color: "#ee6c20" }} />
              <div>
              <span className='text_center'>{returnedstatusCount}</span>
               
                <p>Total Returned</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="delivery-box">
              <i className="bi bi-headset" style={{ color: "#15be56" }} />
              <div>
              <span className='text_center'>{totalHold}</span>
                <p>Total On Hold</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="delivery-box">
              <i className="ri-truck-line" style={{ color: "#bb0852" }} />
              <div>
              <span className='text_center'>{deliveredstatusCount}</span>
                <p>Total Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End delivery Section */}
    {/* ======= payment Section ======= */}
    <section id="payment" className="payment">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>BRIEF STATS</h2>
          <p>PAYMENT INFORMATION</p>
        </header>
        <div className="row gy-4" data-aos="fade-left">
          <div
            className="col-lg-3 col-md-6"
            data-aos="zoom-in"
            data-aos-delay={100}
          >
            <div className="box">
              <h3 style={{ color: "#07d5c0" }}>Total Payment Received</h3>
              <div className="payments">
                <sup>৳</sup>{lastPayment?.totalReleasedAmount}
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6"
            data-aos="zoom-in"
            data-aos-delay={200}
          >
            <div className="box">
              <h3 style={{ color: "#65c600" }}>Total Bill</h3>
              <div className="payments">
                <sup>৳</sup>{lastPayment?.totalBill}
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6"
            data-aos="zoom-in"
            data-aos-delay={300}
          >
            <div className="box">
              <h3 style={{ color: "#ff901c" }}>Return Value</h3>
              <div className="payments">
                <sup>৳</sup>{lastPayment?.totalReturnAmmountBase}
              </div>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6"
            data-aos="zoom-in"
            data-aos-delay={400}
          >
            <div className="box">
              <h3 style={{ color: "#ff0071" }}>Due Amount</h3>
              <div className="payments">
                <sup>৳</sup>{user?.dueAmountNow}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-12" style={{ textAlign: "center" }}>
            <a href="#" style={{textDecoration:"none"}} className="btn-buy">
              Request
            </a>
          </div>
           
            
        </div>  */}
        <div className="row">
          <div className="col-12" style={{ textAlign: "center" }}>
         
                {timeDifference < oneDayInMilliseconds || reqBtnStatus===false ?
                  <>
                    <button  style={{textDecoration:"none"}} className="btn-buydisabled" disabled onClick={handleCreateTicket}>
                     Request for Payment
                   </button>
                    <p style={{color:"red",marginTop:"10px"}}>{countdown !== null ? formatTime(countdown) : ""}</p>
                   
                  </>
                 
                   :
                   
                    statusPaidbase<=1000 ?
                    <>
                     <p  style={{textDecoration:"none"}} className="btn-buy"  onClick={handleRequestAlert}>
                     Request
                   </p>
                   {
                     reqAlert &&
                     <p style={{color:"red",marginTop:"5px"}}>{reqAlert}</p>
                   }
   
                    </>
                   
                    :
                    <p style={{textDecoration:"none"}} className="btn-buy" onClick={handleCreateTicket}>Request</p>
                   
                 
                 
                }
            
            
            
          </div>
           
            
        </div>
      </div>
    </section>
    {/* End payment Section */}
    {/* ======= F.A.Q Section ======= */}
    <section id="faq" className="faq">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>F.A.Q</h2>
          <p>Frequently Asked Questions</p>
        </header>
        <div className="row">
         
          <Accordion className='accordionMain row'>
          <div className="col-lg-6">
      <Accordion.Item eventKey="0" className='accordionItem'>
        <Accordion.Header className='accordionHead'> টিশার্ট/হুডি/ড্রপশোল্ডারের কোয়ালিটি কেমন?</Accordion.Header>
        <Accordion.Body className='accordionBody'>
          <ul>
            <li>১৮০ জি এস এম (বেসিক রাউন্ড নেক)</li>
            <li>১৯০ জি এস এম কটন (রাউন্ড নেক)</li>
            <li>৩০০ জি এস এম কটন ফ্লিস (হুডি)</li>
          </ul>
        
        
        

        </Accordion.Body>
      </Accordion.Item> 
      <Accordion.Item eventKey="1" className='accordionItem'>
        <Accordion.Header className='accordionHead'>কি ধরনের প্রিন্ট ব্যবহার করা হয়?</Accordion.Header>
        <Accordion.Body className='accordionBody'>
        High Quality DTF
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className='accordionItem'>
        <Accordion.Header className='accordionHead'>টিশার্টে লোগো যোগ করা যাবে?</Accordion.Header>
        <Accordion.Body className='accordionBody'>
        জী। টিশার্টের সাইজ লেবেলের নিচের অংশে আপনার লোগো প্রিন্ট করা থাকবে। 
        </Accordion.Body>
      </Accordion.Item> 
      <Accordion.Item eventKey="3" className='accordionItem'>
        <Accordion.Header className='accordionHead'>Tshirt, Hoodies, Dropshoulder এর কস্টিং কিভাবে জানবো?</Accordion.Header>
        <Accordion.Body className='accordionBody'>
        Check <Link to="https://merchants.printbaz.com/Calculator">https://merchants.printbaz.com/Calculator</Link> 
        </Accordion.Body>
      </Accordion.Item> 
      </div>
       <div className="col-lg-6">
      
      <Accordion.Item eventKey="4" className='accordionItem'>
        <Accordion.Header className='accordionHead'>কস্টিং এর সাথে কি ডেলিভারি ফি যোগ করা আছে?</Accordion.Header>
        <Accordion.Body className='accordionBody'>
        না, ক্যালকুলেটরে আপনি যেই কস্টিং দেখতে পান, এটা প্রিন্টবাজ কস্ট। এটার সাথে ডেলিভারি ফি যোগ করা নাই।
        </Accordion.Body>
      </Accordion.Item>   
       <Accordion.Item eventKey="5" className='accordionItem'>
        <Accordion.Header className='accordionHead'>ডেলিভারি ফি কত?</Accordion.Header>
        <Accordion.Body className='accordionBody'>
        ঢাকার ভিতরে ডেলিভারি ফি ৭০ টাকা, এবং বাইরে ১০০ টাকা। 
        </Accordion.Body>
      </Accordion.Item>  
        <Accordion.Item eventKey="6" className='accordionItem'>
        <Accordion.Header className='accordionHead'>প্রাইস কিভাবে সেট করবো?</Accordion.Header>
        <Accordion.Body className='accordionBody'>
        আপনি আপনার কাস্টমারের কাছে কত দামে সেল করতে চান সেটা সম্পূর্ণ আপনার নিজের স্বাধীনতা। তবে কস্টিং এবং ডেলিভারি ফি মাথায় রেখে প্রাইস সেট করতে হবে। 
        </Accordion.Body>
      </Accordion.Item>  
        <Accordion.Item eventKey="7" className='accordionItem'>
        <Accordion.Header className='accordionHead'>কি ধরনের ডিজাইন ভালো সেল হতে পারে?</Accordion.Header>
        <Accordion.Body className='accordionBody'>
        কস্টিং এর দিক মাথায় রেখে যদি করতে চান তাহলে, 10 x 5 এবং 10 x 10 সাইজের ডিজাইনে মনোযোগি হতে পারেন। 
        </Accordion.Body>
      </Accordion.Item>
      </div>
    </Accordion>
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
    </section>
    {/* End F.A.Q Section */}
  </main>
  {/* End #main */}
  {/* ======= Footer ======= */}
  {/* <footer id="footer" className="footer">
    <div className="footer-top">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-info">
            <a href="index.html" className="logo d-flex align-items-center">
              <img
                src="https://media.discordapp.net/attachments/1128921638977683526/1163815250013978686/Logo-01.png?ex=6540f26a&is=652e7d6a&hm=1628865bf04319b5155b3e0c730e5c3225436817412a8ed31018437d696bd53e&=&width=1440&height=392"
                alt=""
              />
            </a>
            <p style={{ fontWeight: "bold" }}>
              বিনা পুজিতে টিশার্ট ব্যবসা করুন। <br />
              আপনার শুধু ডিজাইনের কাজ, বাকি দ্বায়িত্বে প্রিন্টবাজ
            </p>
            <div className="social-links mt-3">
              <a
                href="https://api.whatsapp.com/send/?phone=%2B8801927854949&text&type=phone_number&app_absent=0"
                className="twitter"
              >
                <i className="bi bi-whatsapp" />
              </a>
              <a href="https://www.facebook.com/Printbaz/" className="facebook">
                <i className="bi bi-facebook" />
              </a>
              <a
                href="https://www.instagram.com/printbaz.com.bd/"
                className="instagram"
              >
                <i className="bi bi-instagram" />
              </a>
              <a
                href="https://www.linkedin.com/company/printbaz/"
                className="linkedin"
              >
                <i className="bi bi-linkedin" />
              </a>
              <a href="https://www.behance.net/printbaz" className="instagram">
                <i className="bi bi-behance" />
              </a>
              <a href="https://www.youtube.com/@printbaz" className="linkedin">
                <i className="bi bi-youtube" />
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right" /> <a href="#">Blogs</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <a href="#">Orders</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <a href="#">New Order</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <a href="#">Calculator</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="#">Print Size Demo</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="#">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="#">Blank Round Neck</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="#">Custom Round Neck</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="#">Blank Drop Shoulder</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="#">Custom Drop Shoulder</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="#">Blank Hoodies</a>
              </li>
              <li>
                <i className="bi bi-chevron-right" />{" "}
                <a href="#">Custom Hoodies</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              Block- F, House # 76, Road # 2, Charimanbari, Banani, Dhaka,
              Bangladesh <br />
              <br />
              <strong>Phone:</strong> +8801927-854949
              <br />
              <strong>Email:</strong> merchants@printbaz.com
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        © Copyright{" "}
        <strong>
          <span>Printbaz</span>
        </strong>
        . All Rights Reserved
      </div>
    </div>
  </footer> */}
  <Footer/>
  {/* End Footer */}
  <a
    href="#"
    className="back-to-top d-flex align-items-center justify-content-center"
  >
    <i className="bi bi-arrow-up-short" />
  </a>
  {/* Vendor JS Files */}
</>
  );
};

export default DashBoard;



