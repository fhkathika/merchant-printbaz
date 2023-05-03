import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetData } from '../../hooks/useGetData';
import NavigationBar from '../Navbar/NavigationBar';


const MyOrders = () => {
    let id = "resellerOrdersId";
    let collections = "resellerInfo";
    const [dbData, setDbData] = useState({});
    const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
    const resellerOrdersFromDb=fetchedData?.resellerOrderArr
    console.log("resellerOrdersFromDb",resellerOrdersFromDb);
    const navigate=useNavigate()
    const handlePage=()=>{
      navigate("/newOrder")
      console.log("clicked");
    }  
      const handleViewOrder=()=>{
      navigate("/viewOrder")
      console.log("clicked");
    }
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
                <h1>Order List</h1>
              </div>
              <div className="col-sm-6 text-right">
                <button onClick={handlePage} className="btn btn-primary" id="newOrderBtn">New Order</button>
              </div>
            </div>
            {/* Order tabs */} 
            <ul className="nav nav-tabs mt-4" id="orderTabs">
              <li className="nav-item text_brandColor">
                <a className="nav-link active " id="all-tab" data-toggle="tab" href="#all"  style={{color: '#001846 !important'}}>All</a>
              </li>
              <li className="nav-item text_brandColor">
                <a className="nav-link text_brandColor" id="active-tab" data-toggle="tab" href="#active" style={{color: '#001846 !important'}}>Active</a>
              </li>
              <li className="nav-item text_brandColor">
                <a className="nav-link " id="delivered-tab" data-toggle="tab" href="#delivered" style={{color: '#001846 !important'}}>Delivered</a>
              </li>
              <li className="nav-item text_brandColor">
                <a className="nav-link" id="returned-tab" data-toggle="tab" href="#returned" style={{color: '#001846 !important'}}>Returned</a>
              </li>
            </ul>
            {/* Tab content */}
            <div className="tab-content mt-4">
              <div id="all" className="container tab-pane active">
                {/* Order list content for All tab */}
              </div>
              <div id="active" className="container tab-pane fade">
                {/* Order list content for Active tab */}
              </div>
              <div id="delivered" className="container tab-pane fade">
                {/* Order list content for Delivered tab */}
              </div>
              <div id="returned" className="container tab-pane fade">
                {/* Order list content for Returned tab */}
              </div>
            </div>
            {/* filter */}
            <form id="filter-form">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="orderID" className="form-label">Order ID</label>
                  <input type="text" className="form-control" id="orderID" placeholder="Enter Order ID" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="orderStatus" className="form-label">Order Status</label>
                  <br />
                  <select className="form-select" id="orderStatus">
                    <option value>Select Order Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="in production ">In production </option>
                    <option value="on hold">On hold</option>
                    <option value="delivered">Delivered</option>
                    <option value="payment released">Payment released</option>
                    <option value="returned">Returned</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input type="date" className="form-control" id="date" />
                </div>
              </div>
            </form>
            {/* Order header */}
            <div className="row mt-4 order-header">
              <div className="col-2">
                <h4>User Name</h4>
              </div>
              <div className="col-2">
                <h4>Order ID</h4>
              </div>
              <div className="col-2">
                <h4>Recipient Info</h4>
              </div>
              <div className="col-2">
                <h4>Delivery Status</h4>
              </div>
              <div className="col-1">
                <h4>Amount</h4>
              </div>
              <div className="col-2">
                <h4>Payment</h4>
              </div>
              <div className="col-1">
              </div>
            </div>
            {/* Order list */}
            {
               resellerOrdersFromDb?.map(orderInfo=> 
            <div className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
                <>
                   <div className="col-md-2 col-sm-12">
                <p style={{lineHeight: '15px'}}>{orderInfo?.name}
                </p></div>
              <div className="col-md-2 col-sm-12">
                <p style={{lineHeight: '15px'}}>{orderInfo?.id}</p>
              </div>
              <div className="col-md-2 col-sm-12">
                <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
                <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
                <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
              </div>
              <div className="col-md-2 col-sm-12">
                <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'greenyellow', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</p>
                <p style={{lineHeight: '15px'}}>Updated on {orderInfo?.createdAt}  </p>
              </div>
              <div className="col-md-1 col-sm-12">
                <p style={{lineHeight: '15px', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>Unpaid</p>
              </div>
              <div className="col-md-2 col-sm-12">
                <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{orderInfo?.recvMoney}</span></p>
              </div>
              <div className="col-md-1 col-sm-12">
              <Link style={{textDEcoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?.id}`}
                                               state={ {orderInfo}}>View</Link>
                {/* <button onClick={handleViewOrder} style={{lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}>View</button> */}
              </div>
                </>
             
            </div>
               )
              }
          
          </div>
        </div>
      );
    };
    export default MyOrders;


