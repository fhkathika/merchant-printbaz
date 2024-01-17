

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
import NavigationBar from '../Component/Navbar/NavigationBar';
import BackToTop from '../Component/backToTop/BackToTop';
import ProductInfoTab from '../Component/productInfoTab/ProductInfoTab';
import useGetAllTicket from '../hooks/useGetAllTicket';
const DashBoard = () => {
  const {user,logoutUser}=useContext(AuthContext);

  const navigate=useNavigate()
  const {info}=useGetMongoData()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
  
    const [popupId, setPopupId] = useState('');
    const [createTicket, setCreateTicket] = useState(false);
    const [reqBtnStatus, setReqBtnStatus] = useState(true);
    const [reqAlert, setReqAlert] = useState('');
    const closePopup = () => {setShowPopup(false);};
    const {fetchAllTicket}=useGetAllTicket()
    const [allticket,setAllTicket]=useState()
   // UseEffect to retrieve data from local storage on component mount
useEffect(() => {
  const storedData = localStorage.getItem('fetchAllTicketData');

  if (storedData) {
    setAllTicket(JSON.parse(storedData));
  }
}, []);

    // const fetchAllTicketData = async () => {
    //   try {
    //     // const response = await axios.get('http://localhost:5000/allTicketIds');
    //     const response = await axios.get('https://mserver.printbaz.com/allTicketIds');
    //     setFetchAllTicket(response.data);
     
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    let idCounter = 1; // Initialize a counter for the IDs
    const generateId =() => {
      // Assuming useGetAllTicket returns an object with a fetchAllTicket property
  
      const paddedId = String(idCounter).padStart(6, '0'); // Convert counter to string and pad with leading zeros
    
    
      // Check if the generated ID already exists
      if (allticket?.filter(ticketId => ticketId === paddedId).length > 0) {
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
  let pendingstatusCount=0
  for(let i=1;i<=orderStatusPending?.length;i++){
     pendingstatusCount++

  } 
  // Returned
   const orderStatusReturned=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="returned" )
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

  //return amount
    const orderSatatusReturned=info
  ?.filter(order => order.userMail === user?.email && order.orderStatus==="returned" )
const lastPayment = user.payments && user.payments.length > 0 ? user.payments[user.payments.length - 1] : null;
  let totalReceiveBase=0,totalReturnAmmountBase=0;
  if (lastPayment) {
    for(let i=0;i<user.payments?.length;i++){
  let totalReceive=Number(user.payments[i]?.paymentReleasedAmount?user.payments[i]?.paymentReleasedAmount:0);
  totalReceiveBase +=totalReceive;
}
   
}

for(let i=0;i<orderSatatusReturned?.length;i++){
  let totalReturn=Number(orderSatatusReturned[i]?.returnedAmount);
  if(totalReturn){
    const deliveryFee = Number(orderSatatusReturned[i]?.deliveryFee);
   totalReturnAmmountBase += (totalReturn +deliveryFee+deliveryFee/2);
    
  }


}


const PaymentStausPaid=info
?.filter(order => order.userMail === user?.email && order.paymentStatus==="paid" && order?.orderStatus==="delivered")

const returnValueFilter=info?.filter(order => order.userMail === user?.email && order?.orderStatus==="returned")

let statusPaidbase=0; let totalpaid
for(let i=0;i<PaymentStausPaid?.length;i++){
   totalpaid=Number(PaymentStausPaid[i]?.recvMoney);
  statusPaidbase =Number(statusPaidbase+totalpaid);
 
}

// returned amount 
for(let i=0;i<returnValueFilter?.length;i++){
  let totalreturned=returnValueFilter[i]?.recvMoney;

}

let dueAmount=statusPaidbase-(totalReceiveBase+totalReturnAmmountBase)

 // Fetch the latest payment made by user
let lastPayementDetail = user?.payments?.length > 0 ? 
user.payments[user.payments.length-1] : null;

// Calculate the grand due amount
let grandDueNow = dueAmount;

// useEffect(() => {
//   const getOrderById = async () => {
//       // Ensure there's an ID before making a request
//     if (user?._id) {
//           try {
        
//               const response = await fetch(
//                   `https://mserver.printbaz.com/updateBill/${user._id}`,
//                   // `http://localhost:5000/updateBill/${viewClient._id}`,
//                   {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ 
//                         totalBill: statusPaidbase, 
//                         totalReceiveBase: totalReceiveBase?totalReceiveBase:0,
//                         totalReturnAmmountBase: totalReturnAmmountBase,
//                         dueAmount:  grandDueNow 
//                     }),
//                 }
//               );

//               const data = await response.json();
//               if (response.status === 200) {
//                   // Handle success, for instance:
                 
//               } else {
//                   // Handle error
//                   console.error("Error updating the bill:", data.message);
//               }

//           } catch (error) {
//               console.error("Network or server error:", error);
//           }
//       }
//   };

//   getOrderById();

// }, [user,statusPaidbase, totalReceiveBase, totalReturnAmmountBase, dueAmount]);


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

// new calculation for billing system 
//totalbill is sum of all rcv money
let newTotalBill=0;
if (PaymentStausPaid?.length !== 0) {
  newTotalBill = PaymentStausPaid?.reduce((sum, receiveAmount) => {
    let amount = parseInt(receiveAmount?.recvMoney);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}

// new return calculation 
let sumofReturnOrderPrintbazcost=0;
let sumofReturnOrderDeliveryFee=0
if (orderSatatusReturned?.length !== 0) {
  sumofReturnOrderPrintbazcost = orderSatatusReturned?.reduce((sum, pbCost) => {
    let amount = parseInt(pbCost?.printbazcost);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}
if (orderSatatusReturned?.length !== 0) {
  sumofReturnOrderDeliveryFee = orderSatatusReturned?.reduce((sum, delivFee) => {
    let amount = parseInt(delivFee?.deliveryFee);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}
let newTotalReturn=sumofReturnOrderPrintbazcost+sumofReturnOrderDeliveryFee+sumofReturnOrderDeliveryFee/2
let newTotalDue=newTotalBill-(user?.paymentReleasedAmount?user?.paymentReleasedAmount:0+newTotalReturn)
let totalnewDueAmount=newTotalDue>0?newTotalDue:0

useEffect(()=>{
  const getUpdatebillinMerchantProfile= async () => {
    // Ensure there's an ID before making a request
   console.log("call getUpdatebillinMerchantProfile.........")
  if(user?._id){
  try {
      
            const response = await fetch(
                `https://mserver.printbaz.com/updateBill/${user?._id}`,
                // `http://localhost:5000/updateBill/${viewClient._id}`,
                {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ 
                      // totalBill: statusPaidbase, 
                      // totalReceiveBase: totalReceiveBase,
                      // totalReturnAmmountBase: totalReturnAmmountBase,
                      // dueAmount: dueAmount
                      totalBill: newTotalBill,
                      totalReturnAmmountBase: newTotalReturn,
                      dueAmount: totalnewDueAmount
                  }),
              }
            );
  
            const data = await response.json();
            if (response.status === 200) {
                // Handle success, for instance:
                console.log("updated bill.......", totalnewDueAmount)
            } else {
                // Handle error
                console.error("Error updating the bill:", data.message);
            }
  
        }
         catch (error) {
            console.error("Network or server error:", error);
        }
      }
  };

  // if (!user?.totalBill && PaymentStausPaid.length > 0 && (!user?.dueAmount||user?.dueAmount==="null")) {
   
    getUpdatebillinMerchantProfile();
  // }
 
  console.log("totalnewDueAmount..........",totalnewDueAmount)

 },[newTotalBill,
  newTotalReturn,
  totalnewDueAmount])

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
 <NavigationBar/>
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
                {/* <sup>৳</sup>{lastPayment?.totalReleasedAmount?Math.floor(lastPayment?.totalReleasedAmount):0} */}
                <sup>৳</sup>{user?.paymentReleasedAmount?user?.paymentReleasedAmount:0}
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
                {/* <sup>৳</sup>{Math.floor(lastPayment?.totalBill)} */}
                <sup>৳</sup>{Math.floor(user?.totalBill)}
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
                {/* <sup>৳</sup>{Math.floor(lastPayment?.totalReturnAmmountBase)} */}
                <sup>৳</sup>{Math.floor(user?.totalReturnAmmountBase)}
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
                {/* <sup>৳</sup>{Math.floor(user?.dueAmountNow)} */}
                <sup>৳</sup>{Math.floor(user?.dueAmount?user?.dueAmount:0)}
              </div>
            </div>
          </div>
        </div>
       
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
                   
                    user?.totalBill<=1000 ?
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
  
  <Footer/>
  {/* End Footer */}
  <BackToTop/>

  {/* Vendor JS Files */}
</>
  );
};

export default DashBoard;



