import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { useGetData } from '../../hooks/useGetData';
import '../../css/dashboardStyles.css'
import { CartContext } from '../../context/CartProvider';
import { Button } from 'react-bootstrap';
import ReqPaymentTIcketPopup from '../../alertBox/ReqPaymentTIcketPopup';
import GeneralQuerySupportTicketPopUp from '../generalQuerySupportTicketPopUp/GeneralQuerySupportTicketPopUp';
const NavigationBar = () => {
  const {user,logoutUser}=useContext(AuthContext);
  const { formData, setFormData, setCartItems, editCartItem, cartItems,addToCart } =
  useContext(CartContext);
  const mycartItems = cartItems?.filter(item => item?.userRegId === user?._id);
  let id = "resellerId";
  let collections = "resellerInfo";
  const [dbData, setDbData] = useState({});
  const [fetchAllTicket, setFetchAllTicket] = useState([]);
  const [fetchOverAllTicket, setFetchOverAllTicket] = useState([]);
  const { fetchedData} = useGetData(id, collections, dbData);
 
  const [showTicket, setShowTicket] = useState(false);
  const [show,setShow]=useState(false)
  useEffect(() => {
    // Fetch the chat log from the server when the component mounts

    fetchOrderIddata();
      // Fetch the chat log every 10 seconds
      const intervalId = setInterval(() => {
        fetchOrderIddata();
    
      }, 10000);
    
      // Clean up the interval on unmount
      return () => clearInterval(intervalId);
  }, []);
  
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
  
  useEffect(() => {
    const selectHeader = document.querySelector('#header');
    const headerScrolled = () => {
      if (window.scrollY > 80) {
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
  const [reqBtnStatus, setReqBtnStatus] = useState(true);
  const [showTicketPopUp, setShowTicketPopUp] = useState(false);
  const closePopup = () => {setShowTicketPopUp(false);setShow(false)};
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(prevShow => !prevShow);
  };
  
    const [isNavbarMobile, setIsNavbarMobile] = useState(false);
    const navbarRef = useRef(null);

    const toggleMobileNav = (e) => {
      console.log(e.currentTarget.nextElementSibling);
      setIsNavbarMobile(!isNavbarMobile);
    };
  
  const fetchOrderIddata = async () => {
    try {
        // const response = await axios.get(`http://localhost:5000/myTicket/${user?.email}`);
      const response = await axios.get(`https://mserver.printbaz.com/myTicket/${user?.email}`);
      setFetchAllTicket(response?.data);
   
    } catch (err) {
      console.error(err);
    }
  };
  const navigate=useNavigate();
  const handleLogOut=()=>{
    logoutUser();
    navigate('/login')
  }

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


let msgCount=0;
const [createTicket, setCreateTicket] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [popupId, setPopupId] = useState('');
let idCounter = 1;


  const fetchAllTicketData = async () => {
    try {
      // const response = await axios.get('http://localhost:5000/allTicketIds');
      const response = await axios.get('https://mserver.printbaz.com/allTicketIds');
      setFetchOverAllTicket(response.data);
    // Find the maximum ID from the fetched data and initialize idCounter
    const maxId = response.data.reduce((max, ticketId) => Math.max(max, parseInt(ticketId, 10)), 0);
    idCounter = maxId + 1;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchAllTicketData()
   },[])
   const generateId = () => {
    const paddedId = String(idCounter).padStart(6, '0');
  
    if (fetchOverAllTicket?.filter(ticketId => ticketId === paddedId).length > 0) {
      idCounter++;
      return generateId();
    }
  
    idCounter++;
    return paddedId;
  };
const handleShowTicketPopUp=()=>{
   fetchAllTicketData(); // Wait for data to be fetched and state to be updated
  const newId = generateId(); // Generate ID after fetching data
  setPopupId(newId);
  setShowTicket(true)
  setShowTicketPopUp(true)

 
} 
    return (<>
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
 
 <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Merchant Printbaz</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />
  {/* ======= Header ======= */}
  <header id="header" className="header fixed-top ">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
        <img
          src="https://media.discordapp.net/attachments/1128921638977683526/1163815250013978686/Logo-01.png?ex=6540f26a&is=652e7d6a&hm=1628865bf04319b5155b3e0c730e5c3225436817412a8ed31018437d696bd53e&=&width=1440&height=392"
          alt=""
        />
      </a>
      <div className="navbar">
      <nav ref={navbarRef} id="navbar" className={isNavbarMobile ? 'navbar-mobile' : ''}>
      <button style={{border:"none",background:"none"}}
        className={`mobile-nav-toggle ${isNavbarMobile ? 'bi-x' : 'bi-list'}`} 
        onClick={toggleMobileNav}
      ></button>
      
     
   
      <ul>
          <li>
           
            <Link className="nav-link scrollto " to="/dashboard">DASHBOARD</Link>
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
            {
   fetchAllTicket?.forEach(readMsg => {
    if( user?.email===readMsg?.userEmail && readMsg?.unread === "true"){
      msgCount++
   }
   else{
    msgCount=0
   }

  })
   }
   {
     msgCount>0 &&
     <span className='notification-badge' >{msgCount}</span>
   }
          </li> 
         
          <li>
          
            <Link className='nav-link scrollto'  to="/blogs">BLOGS</Link> 
          </li>
          <li className="dropdown" onClick={toggleDropdown}>
            <a href="#">
              <span>{user?.name}</span> <i className="bi bi-chevron-down" />
            </a>
            <ul className={showDropdown ? 'dropdown-content' : ''}>
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
                <Button className=''  onClick={handleShowTicketPopUp}>Create Support Ticket</Button> 
              </li>
              <li>
              <Link className=''  to="/printSizeDemo">Print Size Demo</Link> 
              </li>
              <li>
              <Link className='' to="/termsConditions">Terms &amp; Conditions</Link> 
              </li>
           
              {user ? (
           
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
          <li>
          <Link className="nav-link scrollto " to="/addToCart">
<img  style={{width:"35px",height:"30px"}}src="https://media.discordapp.net/attachments/1181515624455872602/1182942257658200106/shopping-cart.png?ex=658687d4&is=657412d4&hm=68969a99571dfa5dd6f0cf3da17e7054a28f34aeeec045de7e718bbc9fbc9812&=&format=webp&quality=lossless" alt="Icon" />
                        {mycartItems.length > 0 &&
                        <span className="notification-badge" >{mycartItems.length}</span>}
            </Link>
            {
   fetchAllTicket?.forEach(readMsg => {
    if( user?.email===readMsg?.userEmail && readMsg?.unread === "true"){
      msgCount++
   }
   else{
    msgCount=0
   }

  })
   }
   {
     msgCount>0 &&
     <span className='notification-badge' >{msgCount}</span>
   }
          </li>
        </ul>
     
    </nav>
    {
      showTicketPopUp &&
       <GeneralQuerySupportTicketPopUp
       userRegId={user?._id}
       setShow={setShow}
       onClose={closePopup}
       ticketId={popupId}
       userEmail={user?.email}
       userName={user?.username}
       
       />
    }
 
           
    </div>
    
    </div>
  </header>
  <section id="Hero" className="Hero"></section>
  {/* End Header */}
 
  </>

    );
};

export default NavigationBar;