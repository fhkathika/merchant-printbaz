import React, { useContext, useState } from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import DashBoard from '../../dashboard/DashBoard';
const NavigationBar = () => {
  const {user,logOut}=useContext(AuthContext);
  // const {user,logOut}=useContext(AuthContext)
  const handleLogOut=()=>{
    logOut()
    .then(()=>{})
    .catch(error=>console.log(error))
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Order</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Invoice</a>
                </li>
              
                <li className="nav-item">
                  <Link className="nav-link" href="#">New Order</Link>
                </li>
              </ul>

            </div>
            <div className="navbar-dropdown">
          
        <button className="navbar-dropdown-toggle" onClick={handleDropdownClick}>
          
          <span className="profile-icon"><svg fill="white" height="512" viewBox="0 0 24 24" width="612" xmlns="http://www.w3.org/2000/svg"><g fill="white"><path d="m12 12.75c-3.17 0-5.75-2.58-5.75-5.75s2.58-5.75 5.75-5.75 5.75 2.58 5.75 5.75-2.58 5.75-5.75 5.75zm0-10c-2.34 0-4.25 1.91-4.25 4.25s1.91 4.25 4.25 4.25 4.25-1.91 4.25-4.25-1.91-4.25-4.25-4.25z"/><path d="m20.5901 22.75c-.41 0-.75-.34-.75-.75 0-3.45-3.5199-6.25-7.8399-6.25-4.32005 0-7.84004 2.8-7.84004 6.25 0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-4.27 4.18999-7.75 9.34004-7.75 5.15 0 9.3399 3.48 9.3399 7.75 0 .41-.34.75-.75.75z"/></g></svg></span> 
          <span className="profile-text">{user?.displayName} </span> 
          <span className="dropdown-icon"><svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><g id="_16" data-name="16"><path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z"/></g></svg></span> 
          
        </button>
        {dropdownOpen && (
          <ul className="navbar-dropdown-menu">
  
            <li className="navbar-dropdown-item">Profile</li>
            <li className="navbar-dropdown-item">Payment</li>
            <li className="navbar-dropdown-item"><Link className='navbar-dropdown-item-Link' to="/teeShrtCapming">Calculator</Link> </li>
            <li className="navbar-dropdown-item">Print Size Demo</li>
            <li className="navbar-dropdown-item">Terms &amp; Conditions</li>
            <li className="navbar-dropdown-item">Settings</li>
            <li className="navbar-dropdown-item">Settings</li>
            <li onClick={handleLogOut} className="navbar-dropdown-item" style={{color:"#EA3A3B" ,marginTop:"6px",textDecoration:"none"}}>Log Out</li>
          </ul>
          
        )}
      </div>
          </nav>
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

       
    {/* <Navbar expand="lg">
    <Container>
    <Navbar.Brand ><Link to="/"> <img style={{width:"10rem"}} src="/images/Logo-01.png" alt="" /></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"  className="flex">
        <Nav className='me-auto'>
        <Nav.Link href="/printSizeDemo" style={{marginTop:"6px",color:"#124",fontSize:"16px"}}>
Print Size demo
        </Nav.Link>
         <Nav.Link href="/" style={{marginTop:"6px",color:"#124",fontSize:"16px"}}>
Calculator
        </Nav.Link>
        <Nav.Link style={{marginTop:"6px",color:"#124",fontSize:"16px"}} href="/termsConditions">Terms & Conditions</Nav.Link>
     
          </Nav>
          <Navbar.Text >
            {
              user ?  <Link onClick={handleLogOut} className="navBar f_w500" style={{color:"#EA3A3B" ,marginTop:"6px",textDecoration:"none"}}>{user?.displayName}</Link>
           :
           <Container  style={{marginTop:"8px"}}>
           <Link to='/login' className="navBar f_w500" style={{color:"#012652",textDecoration:"none",border:"1px solid #124",padding:"8px",borderRadius:"10px"}}>Login</Link>
           <Link to='/register' className="navBar f_w500"style={{color:"#012652",marginLeft:"15px",textDecoration:"none",border:"1px solid #124",padding:"8px",borderRadius:"10px"}}>Register</Link>
           </Container>
           
            }
             
          </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar> */}
  </>

    );
};

export default NavigationBar;