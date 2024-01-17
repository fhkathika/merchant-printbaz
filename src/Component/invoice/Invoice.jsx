import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import NavigationBar from '../Navbar/NavigationBar';
import Footer from '../footer/Footer';
import BackToTop from '../backToTop/BackToTop';

const Invoice = () => {
    const location=useLocation()
    let { id,regId } = useParams();

    const [getPaymentDetailById, setGetPaymentDetailById] = useState([]);
    const [paymentRelasedOrders,setPaymentRelasedOrders]=useState([])
    const getPerSegmentPaymentDetailById = async () => {
      try {
        const response = await fetch(`https://mserver.printbaz.com/getPaymentDetailbyId/${id}`);
        const data = await response.json();
        setGetPaymentDetailById(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    useEffect(() => {
      getPerSegmentPaymentDetailById();
    }, [regId,getPaymentDetailById]); // Include regId as a dependency
    
       
    const getPaymentReleasedOrdersByRefId = async () => {
         await fetch(`https://mserver.printbaz.com/getPaymentReleasedOrderByRegId/${regId}`) //for main site
        // await fetch(`http://localhost:5000/getPaymentReleasedOrderByRegId/${regId}`)
        .then(res=>res.json())
        .then(data => setPaymentRelasedOrders(data))
        }
       
        useEffect(()=>{
          getPaymentReleasedOrdersByRefId()
      
            
              },[paymentRelasedOrders])
           
                const specificPayDetail=getPaymentDetailById?.find(detail=>detail?._id===id)
       
        const filterByDate=paymentRelasedOrders?.filter(order=>order?.paymentReleasedDate===specificPayDetail?.paymentReleasedDate)
 
        return (
            <>
        <NavigationBar/>
        <Container className="invoice mt-5">
                <div style={{display:"flex"}}>
            <div >
            <img style={{width:"20px",height:"20px"}} src="https://i.ibb.co/N1NY2D2/favicon2.jpg" alt="Company Logo"/>
            <p style={{marginTop:"5px",fontSize:"10px"}}>Banani Breeze,</p>
            <p style={{lineHeight:"1px",fontSize:"10px"}}> House 76 Rd No 2, Dhaka 1213</p>
           
        </div>
            <div  style={{marginLeft:"40px",borderLeft:"1px solid black"}}>
            <img style={{width:"20px",height:"20px",marginLeft:"20px"}} src="https://i.ibb.co/zJTM5Zk/call-1.png" alt="phone logo"/>
            <p style={{marginTop:"5px",fontSize:"10px",marginLeft:"20px"}}>01927-854949</p>
          
            {/* <img style={{textAlign:"center"}} src='https://i.ibb.co/zJTM5Zk/call-1.png'/> 
            <p style={{fontSize:"15px"}}>01927-854949</p> */}
        </div>
        <div>
           
            </div>
        <div>
           
            </div>
        <div>
           
            </div>
        <div>
           
            </div>
     
           
            
        </div>
        <hr />
        <div class="header">
          {/* <img src="your-company-logo.png" alt="Company Logo"/> */}
          <h1>Invoice To</h1>
        </div>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <div class="bill-to">
        
        <p>{specificPayDetail?.clientName}</p>
        <p>{specificPayDetail?.clientAddress}</p>
    
      </div>

          <Table striped="columns" style={{width:"30%"}}>
    
      <tbody>
        <tr>
        <td><strong>Total Paid Out</strong> </td>         
             <td>{specificPayDetail?.totalRecvableAmount} </td> 
        </tr>
        <tr>
        <td ><strong>Invoice Date </strong></td>
          <td >{specificPayDetail?.paymentReleasedDate} </td>
        </tr>
    
      </tbody>
    </Table>
    </div>
       

    
        <table class="table">
          <thead>
            <tr>
            <th >Order Info </th>
            <th >Payment Release Date</th>
                        <th >Collect Amount</th>
                        <th >Delivery Fee</th>
                        <th >Rcv Amount</th>
                       
            </tr>
          </thead>
          <tbody>
            {
                filterByDate?.map(order=> 
                <tr>
                        <td><p>{order?.address}</p>
<p>{order?.reciepientFirstname}</p>
<p>{order?.reciepientLastname}</p>

<p>{order?.phone}</p>

</td>
                    <td>{order?.paymentReleasedDate}</td>
                    <td>{order?.collectAmount}</td>
                    <td>{order?.deliveryFee}</td>
                    <td>{order?.recvMoney}</td>
                
                  
                  </tr>)
            }
         
         <tr className='highlightedrow'>
    <td className='highlightedrow'><strong>Total:</strong></td>
    <td className='highlightedrow'></td>
    <td className='highlightedrow'><strong>{specificPayDetail?.totalCollectAmount}</strong></td>
    <td className='highlightedrow'><strong>{specificPayDetail?.totalDeliveryFee}</strong></td>
    <td className='highlightedrow'><strong>{specificPayDetail?.totalRecvableAmount}</strong></td>
  
</tr>

           
          
          </tbody>
        </table>
    
        
        {/* <div class="footer">
          <p>For payment, please use the following bank details:</p>
          <p>Bank Name: Your Bank Name</p>
          <p>Account Number: Your Account Number</p>
        </div> */}
      </Container>
      <Footer/>
    <BackToTop/>
      </>
         );
};

export default Invoice;