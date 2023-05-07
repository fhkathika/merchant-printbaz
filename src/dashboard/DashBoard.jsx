import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../Component/login/Login';
import Register from '../Component/login/Register';
import NavigationBar from '../Component/Navbar/NavigationBar';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import  "../css/styles.css"

const DashBoard = () => {
  const {user,logOut}=useContext(AuthContext);
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
      return (
        <>
        <NavigationBar/>
       
    
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> 
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
     <style dangerouslySetInnerHTML={{__html: "\n      /* General styles */\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #f8f9fa;\n}\n\n.navbar {\n  background-color: #001846 !important;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 20px;\n  padding-left: 40px !important;\n}\n\n.navbar-brand img {\n  width: 150px;\n}\n\n.nav-link {\n  color: #ffffff !important;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.nav-link:hover {\n  background-color: #ffffff;\n  color: #001846 !important;\n}\n.dropdown{\n  padding-left: 1200px;\n}\n\n.dropdown-menu {\n  margin-left: 1120px;\n  \n}\n\n.container {\n  max-width: 1200px;\n}\n\n/* Dashboard */\n.dashboard-title {\n  font-weight: 800 !important;\n  font-size: 50px !important;\n  color: #001846;\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n}\n\n.dashboard-card {\n  background-color: #ffffff;\n  border-radius: 0.25rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 1.5rem;\n  height: 100%;\n  padding-bottom: 10px !important;\n}\n\n.dashboard-card h3 {\n  font-size: 30px;\n  font-weight: 700;\n  color: #001846;\n  text-transform: uppercase;\n}\n\n.dashboard-card h4 {\n  font-size: 25spx;\n  font-weight: 700;\n  color: #001846;\n  text-transform: uppercase;\n}\n\n.dashboard-card p {\n  font-size: 15px;\n  font-weight: 600;\n  color: #6b6b6b;\n}\n\n.Payment-btn button {\n  background-color: rgb(234, 58, 59);\n  border: none;\n  font-weight: 700;\n}\n\n.sub-cat {\n  margin-top: 30px;\n}\n\n.dashboard-card-img {\n  padding: 0 !important;\n}\n\n/* Second row columns */\n.second-row-card {\n  display: flex;\n  flex-direction: column;\n}\n\n.second-row-card h4 {\n  margin-bottom: 1rem;\n}\n\n.second-row-card p {\n  margin-bottom: 0.5rem;\n}\n\n/* Clickable image */\n.img-fluid {\n  width: 100%;\n  height: auto;\n  border-radius: 0.25rem;\n}\n\n/* Responsive styles */\n@media (min-width: 768px) {\n  .second-row-card {\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n  }\n\n  .second-row-card p {\n      margin-left: 1rem;\n  }\n}\n\n/* Responsive styles */\n@media (min-width: 576px) {\n  .dashboard-title {\n      font-size: 2rem;\n  }\n}\n\n    " }} />
    <title className=''>Dashboard</title>
    {/* CSS styles */}
  

    <div className="container mt-5">
      <h1 className="text-center mb-4 dashboard-title test">Dashboard</h1>
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
              <p>Pending Delivery: {/* Add pending delivery value */}</p>
              <p>Total Returned: </p>
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
              <p>Total Payment Received:  {/* Add payment in process value */}</p>
              <p>Total Bill:  {/* Add due amount value */}</p>
              <p>Due Amount: {/* Add pending payment value */}</p>
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

        </>
       
  );
};

export default DashBoard;