import React, { useContext, useState } from 'react';
import { Button, Form, Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import DashBoard from '../../dashboard/DashBoard';
const NavigationBar = () => {
  const {user,logOut}=useContext(AuthContext);
  // const {user,logOut}=useContext(AuthContext)
  const navigate=useNavigate();
  const handleLogOut=()=>{
    logOut()
   
    .then(()=>{
      localStorage.removeItem('user');
      navigate("/login");

    })
    .catch(error=>console.log(error))
    // navigate("/login");
  }

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

    return (<>
     <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <title>Dashboard</title>
          {/* CSS styles */}
          <style dangerouslySetInnerHTML={{__html: "\n      /* General styles */\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #f8f9fa;\n}\n\n.navbar {\n  background-color: #001846 !important;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 20px;\n  padding-left: 40px !important;\n}\n\n.navbar-brand img {\n  width: 150px;\n}\n\n.nav-link {\n  color: #ffffff !important;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.nav-link:hover {\n  background-color: #ffffff;\n  color: #001846 !important;\n}\n.dropdown{\n  padding-left: 1200px;\n}\n\n.dropdown-menu {\n  margin-left: 1120px;\n  \n}\n\n.container {\n  max-width: 1200px;\n}\n\n/* Dashboard */\n.dashboard-title {\n  font-weight: 800 !important;\n  font-size: 50px !important;\n  color: #001846;\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n}\n\n.dashboard-card {\n  background-color: #ffffff;\n  border-radius: 0.25rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 1.5rem;\n  height: 100%;\n  padding-bottom: 10px !important;\n}\n\n.dashboard-card h3 {\n  font-size: 30px;\n  font-weight: 700;\n  color: #001846;\n  text-transform: uppercase;\n}\n\n.dashboard-card h4 {\n  font-size: 25spx;\n  font-weight: 700;\n  color: #001846;\n  text-transform: uppercase;\n}\n\n.dashboard-card p {\n  font-size: 15px;\n  font-weight: 600;\n  color: #6b6b6b;\n}\n\n.Payment-btn button {\n  background-color: rgb(234, 58, 59);\n  border: none;\n  font-weight: 700;\n}\n\n.sub-cat {\n  margin-top: 30px;\n}\n\n.dashboard-card-img {\n  padding: 0 !important;\n}\n\n/* Second row columns */\n.second-row-card {\n  display: flex;\n  flex-direction: column;\n}\n\n.second-row-card h4 {\n  margin-bottom: 1rem;\n}\n\n.second-row-card p {\n  margin-bottom: 0.5rem;\n}\n\n/* Clickable image */\n.img-fluid {\n  width: 100%;\n  height: auto;\n  border-radius: 0.25rem;\n}\n\n/* Responsive styles */\n@media (min-width: 768px) {\n  .second-row-card {\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n  }\n\n  .second-row-card p {\n      margin-left: 1rem;\n  }\n}\n\n/* Responsive styles */\n@media (min-width: 576px) {\n  .dashboard-title {\n      font-size: 2rem;\n  }\n}\n\n    " }} />
     
        <Navbar bg="light" expand="lg" collapseOnSelect>
  <Container fluid>
    <Link className="navbar-brand navbar-brand-mobile" to="/dashboard">
      <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
    </Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="my-2 my-lg-0" style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-between" }} >
        <ul className="navbar-nav" style={{zIndex:"111"}}>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/myorders">Order</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/invoice">Invoice</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/newOrder">New Order</Link>
          </li>
        </ul>
        <div className="navbar-dropdown mt-2 dropdownMobile" >
          <button className="navbar-dropdown-toggle dropdownButtonMobile" onClick={handleDropdownClick} >
         
            <span className="profile-text">{user?.displayName} </span> 
            <span className="dropdown-icon"><svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><g id="_16" data-name="16"><path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z"/></g></svg></span> 
          </button>
          {dropdownOpen && (
            <ul className="navbar-dropdown-menu "  style={{zIndex:"132"}}>
              <li className="navbar-dropdown-item">Profile</li>
              <li className="navbar-dropdown-item">Payment</li>
              <li className="navbar-dropdown-item">
                <Link className='navbar-dropdown-item-Link' to="/teeShrtCapming">Calculator</Link> 
              </li>     
                    <li className="navbar-dropdown-item">
                <Link className='navbar-dropdown-item-Link' to="/printSizeDemo">Print Size Demo</Link> 
              </li>     
                    <li className="navbar-dropdown-item">
                <Link className='navbar-dropdown-item-Link' to="/termsConditions">Terms &amp; Conditions</Link> 
              </li>

              {user ? (
                <li onClick={handleLogOut} className="navbar-dropdown-item" style={{color:"#EA3A3B" ,marginTop:"6px",textDecoration:"none"}}>
                  Log Out
                </li> 
              ) : (
                <Link to="/login">Login</Link>
              )}
            </ul>
          )}
        </div>
      </Nav>
    
   
     
    </Navbar.Collapse>
  </Container>
</Navbar>
       
{/* <nav className="navbar">
      <div className="navbar-left">
      <div className="navbar-logo">
        <img src="/images/Logo-01.png" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li
          className={`navbar-link ${activeTab === "Dashboard" ? "active" : ""}`}
          onClick={() => handleTabClick("Dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`navbar-link ${activeTab === "Delivery" ? "active" : ""}`}
          onClick={() => handleTabClick("Delivery")}
        >
          Delivery
        </li>
        <li
          className={`navbar-link ${activeTab === "Invoices" ? "active" : ""}`}
          onClick={() => handleTabClick("Invoices")}
        >
          Invoices
        </li>
      </ul>

      </div>
    
      <div className="navbar-dropdown">
        <button className="navbar-dropdown-toggle" onClick={handleDropdownClick}>
          
          <span className="profile-icon"><img src='/images/user (2).svg' alt=''/></span> 
          <span className="profile-text">Profile</span> 
          <span className="dropdown-icon"><img src='/images/down.svg' alt='down icon'/></span> 
          
        </button>
        {dropdownOpen && (
          <ul className="navbar-dropdown-menu">
            <li className="navbar-dropdown-item">Menu Item 1</li>
            <li className="navbar-dropdown-item">Menu Item 2</li>
            <li className="navbar-dropdown-item">Menu Item 3</li>
          </ul>
        )}
      </div>
    </nav> */}

       
 
  </>

    );
};

export default NavigationBar;