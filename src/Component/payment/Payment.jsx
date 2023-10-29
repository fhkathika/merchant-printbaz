
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { useGetData } from '../../hooks/useGetData';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';
import BackToTop from '../backToTop/BackToTop';

const Payment = () => {
    let id = "resellerId";
  let collections = "resellerInfo";
  const {user}=useContext(AuthContext);
  const [dbData, setDbData] = useState({});
  const { fetchedData } = useGetData(id, collections, dbData);
  const resellerInfoFromDb=fetchedData?.resellerInfoArr
  console.log("resellerInfoFromDb",resellerInfoFromDb);
    return (
        <div className='payment_container'>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Payment</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
         
          <NavigationBar/>
          <div className="payment-info m-auto" >
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
          <Footer/>
          <BackToTop/>
        </div>
     );
    };
     
    export default Payment     
        