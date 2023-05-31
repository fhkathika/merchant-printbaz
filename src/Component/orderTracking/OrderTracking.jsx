
 import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useGetData } from '../../hooks/useGetData';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';
 const OrderTracking = () => {
    let id = "resellerOrdersId";
    let collections = "resellerInfo";
    const [dbData, setDbData] = useState({});
    const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
  
    const location = useLocation();
const viewOrder = location.state ? location?.state?.orderInfo : null;
console.log("viewOrder",viewOrder?.orderStatus);
     return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <title>Order Tracking</title>
          <style dangerouslySetInnerHTML={{__html: "\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f8f9fa;\n        }\n\n        .navbar {\n        background-color: #001846 !important;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        padding: 20px;\n        padding-left: 40px !important;\n    }\n\n    .navbar-brand img {\n        width: 150px;\n    }\n\n    .nav-link {\n        color: #ffffff !important;\n        font-size: 16px;\n        font-weight: 600;\n    }\n\n    .nav-link:hover {\n        background-color: #ffffff;\n        color: #001846 !important;\n    }\n\n    .dropdown {\n        padding-left: 1200px;\n    }\n\n    .dropdown-menu {\n        margin-left: 1120px;\n    }\n    \n    .all-content {\n    padding-left: 50px;\n    padding-right: 50px;\n}\n\n    .all-title {\n        font-weight: 700;\n    }\n\n    .rec-title h5 {\n        margin-top: 40px;\n        font-weight: 600;\n    }\n\n    .rec-title p {\n        font-size: 18px;\n    }\n\n    .amu-title h3 {\n        margin-bottom: 15px;\n    }\n\n    .amu-title h6 {\n        display: inline-block;\n        width: 75%;\n        font-weight: 700;\n        margin: 0;\n        margin-top: 10px;\n    }\n\n    .amu-title p {\n        display: inline-block;\n        width: 20%;\n        float: right;\n        margin: 0;\n    }\n\n    .trak-info h3 {\n        font-weight: 700;\n    }\n\n    .trak-status .col-3 {\n        text-align: center;\n    }\n\n    .trak-status p {\n        font-weight: 600;\n        margin-top: 10px;\n    }\n\n    @media (max-width: 480px) {\n        .all-content {\n    padding-left: 20px !important;\n    padding-right: 20px !important;\n}\n}\n\n" }} />
          
          <NavigationBar/>
          <div className="all-content">
            <div className="row">
              <div className="col-12">
                <div className="order-id bg-white p-3 my-3 shadow-sm">
                  <h3 className="d-inline-block font-weight-bold">ORDER {viewOrder?._id} &nbsp;</h3>
                  <p className="d-inline-block py-2 px-3 bg-success text-white font-weight-bold rounded">{viewOrder?.orderStatus}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-12 mb-3">
                <div className="rec-info bg-white p-3 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Recipient Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>{viewOrder?.name}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Phone</h5>
                      <p>{viewOrder?.phone}</p>
                    </div>
                    <div className="col-12">
                      <h5>Address</h5>
                      <p>{viewOrder?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-1 col-md-12">
                <div className="bg-white p-3 shadow-sm">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Cost of Order</h3>
                      <h6>Printbaz Cost</h6>
                      <p>{viewOrder?.printbazcost}</p>
                      <h6>Delivery Fee</h6>
                      <p>{viewOrder?.deliveryFee}</p>
                      <h6>Collect Amount</h6>
                      <p>{viewOrder?.collectAmount}</p>
                      <h6>Cash Handling Fee</h6>
                      <p>2%</p>
                      <h6>Receivable Amount</h6>
                      <p>{viewOrder?.recvMoney}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="trak-info bg-white p-4 my-3 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title mb-4">Tracking Details</h3>
                    </div>
                  </div>
                  <div className="row trak-status">
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868453112680478/ic-confirmed-red.f41e73a9.png" alt="" />
                     {
                      viewOrder?.orderStatus==="Approved" ?
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                      :
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} />

                     }
                     
                      <p>Accepted</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                       viewOrder?.orderStatus==="Product ready"  ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Product Ready</p>
                    </div>  
                      <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                       viewOrder?.orderStatus==="Out for delivery"  ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Out for Delivery</p>
                    </div>  
                     <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                       viewOrder?.orderStatus==="Delivered"  ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Delivered</p>
                    </div>
                    
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
        );
 };
 export default OrderTracking;