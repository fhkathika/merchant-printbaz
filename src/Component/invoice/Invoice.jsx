
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { useGetData } from '../../hooks/useGetData';
import useGetMongoData from '../../hooks/useGetMongoData';
import InvoicePdf from '../invoicePdf/InvoicePdf';
import NavigationBar from '../Navbar/NavigationBar';


const Invoice = () => {
    let id = "resellerOrdersId";
    let collections = "resellerInfo";
    const {info}=useGetMongoData()
    const [dbData, setDbData] = useState({});
    const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
    const resellerOrdersFromDb=fetchedData?.orders
    console.log("resellerOrdersFromDb",resellerOrdersFromDb);
    const {user}=useContext(AuthContext);
    const userEmail=user?.email
    const navigate=useNavigate()
    const handlePage=()=>{
      navigate("/newOrder")
      console.log("clicked");
    }  
      const handleViewOrder=()=>{
      navigate("/viewOrder")
      console.log("clicked");
    }
    const [activeTab, setActiveTab] = useState('all');

    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    }

    console.log("",);

    return (
        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <title>Order</title>
          <style dangerouslySetInnerHTML={{__html: "\n        \n      /* General styles */\n      body {\n        font-family: Arial, sans-serif;\n        background-color: #f8f9fa;\n      }\n      \n      .navbar {\n        background-color: #001846 !important;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        padding: 20px;\n        padding-left: 40px !important;\n      }\n      \n      .navbar-brand img {\n        width: 150px;\n      }\n      \n      .nav-link {\n        color: #ffffff !important;\n        font-size: 16px;\n        font-weight: 600;\n      }\n      \n      .nav-link:hover {\n        background-color: #ffffff;\n        color: #001846 !important;\n      }\n      .dropdown{\n        padding-left: 1200px;\n      }\n      \n      .dropdown-menu {\n        margin-left: 1120px;\n        \n      }\n      \n      .main-div {\n        padding-left: 50px;\n        padding-right: 50px;\n      }\n\nh1 {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #001846;\n}\n\nh4 {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #001846;\n  margin-bottom: 0;\n}\n\n/* Order List */\n#newOrderBtn {\n  font-weight: 600;\n}\n\n#orderStatus {\n    display: block;\n    width: 100%;\n    height: calc(1.5em + .75rem + 2px);\n    padding: .375rem .75rem;\n    font-size: 1rem;\n    font-weight: 400;\n    line-height: 1.5;\n    color: #495057;\n    background-color: #fff;\n    background-clip: padding-box;\n    border: 1px solid #ced4da;\n    border-radius: .25rem;\n    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n}\n\n.nav-tabs .nav-item .nav-link {\n  font-size: 1.1rem;\n}\n\n.nav-tabs .nav-item .nav-link.active {\n  font-weight: 600;\n  color: #001846 !important;\n  background-color: #f8f9fa;\n  border-color: #dee2e6 #dee2e6 #f8f9fa;\n}\n\n/* Filter Form */\n#filter-form {\n  margin-top: 2rem;\n}\n\n#filter-form label {\n  font-weight: 600;\n}\n\n#filter-form input,\n#filter-form select {\n  margin-top: 0.5rem;\n}\n\n/* Order Header */\n.order-header {\n  border-top: 2px solid #001846;\n  padding-top: 1rem;\n  margin-top: 2rem;\n}\n\n@media (max-width: 991.98px) {\n  .order-header .col-md-2 {\n    margin-bottom: 1rem;\n  }\n}\n\n/* Mobile View Styles */\n@media (max-width: 767.98px) {\n  .navbar-brand img {\n    width: 120px;\n    height: auto;\n  }\n\n  h1 {\n    font-size: 1.5rem;\n  }\n\n  h4 {\n    font-size: 0.5rem;\n  }\n\n  /* Order List */\n  .nav-tabs .nav-item .nav-link {\n    font-size: 1rem;\n  }\n\n  /* Filter Form */\n  #filter-form {\n    margin-top: 1rem;\n  }\n\n  #filter-form label {\n    display: block;\n    margin-top: 1rem;\n  }\n\n  /* Order Header */\n  .order-header {\n    margin-top: 1rem;\n  }\n\n  .order-header {\n    opacity: 0;\n  }\n\n  .order-list {\n    flex-direction: column;\n    padding: 20px 10px;\n  }\n\n  .order-list .col-2,\n  .order-list .col-1 {\n    margin-bottom: 10px;\n    text-align: center;\n  }\n\n  .order-list p {\n    font-size: 0.85rem;\n    line-height: 1.2;\n  }\n\n  .order-list button {\n    font-size: 0.8rem;\n    padding: 5px 10px;\n  }\n}\n\n    " }} />
         
          <NavigationBar/>
          <div className="main-div">
            <div className="row mt-4">
              <div className="col-sm-6">
                <h1>Invoice </h1>
              </div>
              <div className="col-sm-6 text-right">
             
              </div>
            </div>
      
{/* 
<ul className="nav nav-tabs mt-4" id="orderTabs">
      
      </ul>
          */}
            {/* filter */}
            {/* <form id="filter-form">
              <div className="row">
                <div className="col-md-4">
                  
                </div>
                <div className="col-md-4">
                
                  
                </div>
                <div className="col-md-4">
                
                </div>
              </div>
            </form> */}
            {/* Invoice header */}
            <div className="row mt-4 order-header">
              <div className="col-2">
                <h4>Order ID</h4>
              </div> 
                <div className="col-1">
                <h4>Date </h4>
              </div>
              <div className="col-1">
                <h4>Collected</h4>
              </div>
               <div className="col-2">
                <h4>Printbaz cost</h4>
              </div>
              <div className="col-2">
                <h4>Fee</h4>
              </div>
              <div className="col-2">
                <h4>Receivable</h4>
              </div>
              <div className="col-1">
                <h4>Status</h4>
              </div>
           
              <div className="col-1">
              </div>
            </div>
        
        
              {/* Tab content */}
      <div className="tab-content mt-4">
        <div id="all" className={`tab-pane ${activeTab === 'all' ? 'active' : 'fade'}`}>
           {/* invoice list */}
           {
             info
             ?.filter(order => order.userMail === user?.email)
             .map(orderInfo => (
               // Your order item JSX code
               <div className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.id}
               </p></div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.createdAt} </p>
             </div>
              <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.collectAmount} BDT</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.printbazcost} BDT</p>
             </div>
             <div className="col-md-2 col-sm-12">
              
               <p style={{lineHeight: '15px'}}> {orderInfo?.deliveryFee}  </p>
             </div>
           
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}> <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(44, 227, 129)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <ul className="col-md-1 col-sm-12 " style={{display:"flex"}} >
               <li style={{listStyle:"none"}}> 
               {/* <a  href={`http://localhost:5000/invoicePdf/${orderInfo?.id}`}>PDF</a> */}
               {/* <button onClick={generatePDF} type="button">Export PDF</button> */}
              {/* <a href={`/invoicePdf/${orderInfo?.id}`} download="invoice.pdf">PDF</a> */}
</li>
             </ul>
               </>
            
           </div>
             ))
            
              }
        </div>
      
      </div>
          </div>
        </div>
      );
    };
    export default Invoice;


