import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';

const Ticket = () => {
  const[fetchAllTicket,setFetchAllTicket]=useState([])
  const {user}=useContext(AuthContext);
  const userEmail=user?.email

  useEffect(() => {
    // Fetch the chat log from the server when the component mounts
   
    fetchOrderIddata();
  }, []);
  const fetchOrderIddata = async () => {
    try {
        // const response = await axios.get(`http://localhost:5000/myTicket/${userEmail}`);
      const response = await axios.get(`https://mserver.printbaz.com/myTicket/${userEmail}`);
      setFetchAllTicket(response?.data);
   
    } catch (err) {
      console.error(err);
    }
  };



  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  const sortedTickets = [...fetchAllTicket].sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1]?.timestamp;
    const lastMessageB = b.messages[b.messages.length - 1]?.timestamp;
  
    // Parse the timestamps to Date objects
    const dateA = new Date(lastMessageA);
    const dateB = new Date(lastMessageB);
  
    // Sort in descending order to have the most recent first
    return dateB - dateA;
  });


  return (
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    <link rel="stylesheet" href="styles.css" />
    <title>Client</title>
    <style dangerouslySetInnerHTML={{__html: "\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        ul,\n        li,\n        a {\n            text-decoration: none;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n              /* Ticket System CSS Start */\n\n        .ticket-system {\n            margin: 50px;\n        }\n\n        .ticket-header {}\n\n        .ticket-header h1 {\n            background: #ffffff;\n            padding: 20px;\n            font-size: 30px;\n            font-weight: 700;\n            margin: 0;\n        }\n\n        .ticket-top-menu {\n            background: #F5F7F9;\n            padding: 20px;\n            margin: 0;\n            box-shadow: 0 2px 4px 0 rgba(24, 50, 71, .08);\n        }\n\n        .ttm-button {\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n        }\n\n        .ttm-button:hover {\n            border: 1px solid #cfd7df;\n            color: #12344d;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n        }\n\n        .ticket-top-menu .sort-by {\n            display: inline-block;\n            float: right;\n        }\n\n        /* Ticket Display */\n\n        .ticket-display {\n            margin-top: 20px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            cursor: pointer;\n        }\n\n        .td-box1 {\n            position: relative;\n        }\n\n        .box1-left {\n            display: inline-block;\n            position: absolute;\n            top: 25%;\n        }\n\n        .box1-right {\n            display: inline-block;\n            margin-left: 100px;\n        }\n\n        .box1-left img {\n            width: 70px;\n            border-radius: 5px;\n        }\n\n        .box1-right h3 {\n            font-size: 18px;\n            font-weight: 600;\n        }\n\n        .box1-right h4 {\n            font-size: 14px;\n            font-weight: 600;\n            color: #4d4d4d;\n        }\n\n        .box1-right h5 {\n            font-size: 14px;\n            font-weight: 600;\n            color: #4d4d4d;\n        }\n\n        .box1-right h6 {\n            font-size: 12px;\n            font-weight: 600;\n            color: #ffffff;\n            background-color: red;\n            display: inline-block;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            margin-bottom: 15px;\n        }\n\n        .box1-right p {\n            font-size: 14px;\n            font-weight: 400;\n            color: #4d4d4d;\n            margin: 0;\n        }\n\n        .td-box2 {}\n\n        .td-box2 .box-text {\n            margin-top: 10px;\n        }\n\n        .td-box2 .box-text p {\n            font-size: 14px;\n            color: #4d4d4d;\n        }\n\n        .td-box2 .box-text i {\n            margin-right: 10px;\n        }\n\n        /* finter Section */\n\n        .filter-section {\n            margin-top: 20px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n        }\n\n        .filter-dropdown {\n            margin-bottom: 30px;\n        }\n\n        .filter-dropdown .dropdown-menu {\n            width: 100%;\n        }\n\n        .dropdown-toggle::after {\n            float: right;\n            margin-top: 10px;\n        }\n\n    " }} />
    
    <NavigationBar/>
    <section className="m45 m_1responsive700">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="ticket-header">
            <h1>All Tickets </h1>
          </div>
         
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          {
            sortedTickets?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              const fileId = allTicket?.brandLogoURL?.split('/d/')[1]?.split('/view')[0];
              const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
              return(
               
 
                                
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}}   key={index}>

<div className="ticket-display" >
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left"> 
                        {/* <input className="check-box" type="checkbox" /> */}
                       
                        <img src={user?.brandLogoURL} alt="" />
                       
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
              
               <h3 className='' >{user?.name} </h3>
             
              
                       {
                         allTicket?.orderId?
                         <h4>Order ID: {allTicket?.orderId}</h4>
                         :
                         <h4>Phone Number: {allTicket?.userId}</h4>
                       } 
                     
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span className='timeStampDesignMobile'>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                <div className='col-4 '>
                {
                 allTicket?.unread==="true" &&

                   <span  className='notification-badge-individual'>New Message</span> 
              
                 
               }
             
                </div>
                </div>
              </div>
                </Link>
              
              )
             
                         } )
          }
        
        
        </div>
       
      </div>
    </section>
    <Footer/>
  </div>
  );
};

export default Ticket;
