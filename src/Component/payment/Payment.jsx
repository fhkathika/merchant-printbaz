
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { useGetData } from '../../hooks/useGetData';
import NavigationBar from '../Navbar/NavigationBar';

const Payment = () => {
    let id = "resellerId";
  let collections = "resellerInfo";
  const {user}=useContext(AuthContext);
  const [dbData, setDbData] = useState({});
  const { fetchedData } = useGetData(id, collections, dbData);
  const resellerInfoFromDb=fetchedData?.resellerInfoArr
  console.log("resellerInfoFromDb",resellerInfoFromDb);
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Payment</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <style dangerouslySetInnerHTML={{__html: "\n    /* General styles */\n    body {\n        font-family: Arial, sans-serif;\n        background-color: #f8f9fa;\n      }\n      \n      .navbar {\n        background-color: #001846 !important;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        padding: 20px;\n        padding-left: 40px !important;\n      }\n      \n      .navbar-brand img {\n        width: 150px;\n      }\n      \n      .nav-link {\n        color: #ffffff !important;\n        font-size: 16px;\n        font-weight: 600;\n      }\n      \n      .nav-link:hover {\n        background-color: #ffffff;\n        color: #001846 !important;\n      }\n      .dropdown{\n        padding-left: 1200px;\n      }\n      \n      .dropdown-menu {\n        margin-left: 1120px;\n        \n      }\n\n/* Titles */\nh3 {\n  margin: 0;\n  padding: 0;\n  font-family: Arial, Helvetica, sans-serif;\n  color: #000000;\n  font-weight: 700;\n}\n\nh3 {\n  font-size: 2rem;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6e6;\n  margin-bottom: 20px;\n}\n\n.payment-info {\n        padding: 20px;\n        margin: 50px;\n        border: 1px solid #dee2e6!important;\n        background-color: #fff;\n}\n\n/* Form styles */\n.form-group {\n  margin-bottom: 1rem;\n}\n\n.input-group {\n  display: flex;\n}\n\n/* Mobile Banking select and input */\n.custom-select {\n  flex-grow: 1;\n  margin-right: 5px;\n}\n\n#mobile-number {\n  flex-grow: 1;\n}\n\n/* Buttons */\nbutton {\n  margin-top: 20px;\n  margin-right: 10px;\n}\n\n/* Media queries for responsiveness */\n@media (max-width: 576px) {\n  .container {\n    padding: 15px;\n  }\n\n  h2 {\n    font-size: 24px;\n  }\n\n  h3 {\n    font-size: 20px;\n  }\n\n  .input-group {\n    flex-direction: column;\n  }\n\n  .custom-select {\n    margin-right: 0;\n    margin-bottom: 5px;\n    width: 100% !important;\n  }\n#mobile-number {\n  width: 100%;\n}\n  button {\n    width: 100%;\n    margin-bottom: 10px;\n  }\n}\n\n  " }} />
         
          <NavigationBar/>
          <div className="payment-info">
            <form>
              <h3>Mobile Banking Information</h3>
              {
                
                    resellerInfoFromDb?.map(resellerInfo=> 
                     user?.email === resellerInfo.email &&( 
<>
<div className="form-group">
                <label htmlFor="mobile-banking">Mobile Banking</label>
                <div className="input-group">
                  {/* <select className="custom-select" id="mobile-banking">
                    <option selected>Choose...</option>
                    <option value="bkash">Bkash</option>
                    <option value="rocket">Rocket</option>
                    <option value="nagad">Nagad</option>
                  </select> */}
                
               
               {
                   resellerInfo?.bkashAccount!=="" ?
                   <>
                    <input type="text" className="form-control" id="mobile-number" readOnly value="Bkash" /> 
   <input type="text" className="form-control" id="mobile-number" readOnly value={resellerInfo?.bkashAccount}/> 
                   </>
                   
                    :
                    resellerInfo?.nagadAccount!=="" ?
                    
                    <>
                                    <input type="text" className="form-control" id="nagad-number" value="Nagad" /> 
                     <input type="text" className="form-control" id="mobile-number" readOnly value={resellerInfo?.nagadAccount}/> 
                    </>
    
                    :
                    resellerInfo?.rocketAccount!=="" &&
                    <>
                    <input type="text" className="form-control" id="nagad-number" value="Rocket" /> 
     <input type="text" className="form-control" id="mobile-number"readOnly value={resellerInfo?.rocketAccount}/> 
    </>
                   
               }
               
               </div>
              </div>
            
            {
                resellerInfo?.accountNumber &&
                <>
                  <h3>Bank Information</h3>
                  <div className="form-group">
                <label htmlFor="bank-name">Bank Name</label>
                <input type="text" className="form-control" readOnly id="bank-name" value={resellerInfo?.readOnly} />
              </div>
              <div className="form-group">
                <label htmlFor="account-name">Account Name</label>
                <input type="text" className="form-control" readOnly id="account-name"  value={resellerInfo?.accountName} />
              </div>
              <div className="form-group">
                <label htmlFor="account-number">Account Number</label>
                <input type="text" className="form-control" readOnly id="account-number"  value={resellerInfo?.accountNumber} />
              </div>
              <div className="form-group">
                <label htmlFor="branch-name">Branch Name</label>
                <input type="text" className="form-control" id="branch-name" readOnly value={resellerInfo?.branchName} />
              </div>
              <div className="form-group">
                <label htmlFor="routing-number">Routing Number</label>
                <input type="text" className="form-control" id="routing-number" readOnly value={resellerInfo?.routingNumber} />
              </div>
                </>
            }
            
</>
                        
                     )) 
              }
         
              {/* <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn btn-secondary">Cancel</button> */}
            </form>
          </div>
        </div>
     );
    };
     
    export default Payment     
        