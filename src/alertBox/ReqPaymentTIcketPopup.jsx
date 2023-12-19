import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "../css/styles.css"
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import axios from 'axios';
import CreateTicketAlertbox from '../Component/createTickwtAlert/CreateTicketAlertbox';
import AlertMessage from '../Component/alert/AlertMessage';

const ReqPaymentTIcketPopup = ({ userId,
  createTicket,
  setShowPopup,
  showPopup,
  ticketId,
  setReqBtnStatus,
  setCreateTicket,
  userEmail,
  userName,
}) => {

  const [newMsg, setNewMsg] = useState('');
  const [ticketIssue, setTicketIssue] = useState('');
  // const [createTicketnotify, setCreateTicketnotify] = useState(false);
  const [usersStoredTickets, setUsersStoredTickets] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const {user}=useContext(AuthContext);
 

    const [countdown, setCountdown] = useState(null);

    // Check if 24 hours have passed since the last click
    const lastClickTimestamp = localStorage.getItem('lastClickTimestamp');
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - (lastClickTimestamp ? parseInt(lastClickTimestamp, 10) : 0);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    let paymentInfo = '';

    if (user?.bkashAccount) {
      paymentInfo = `Bkash: ${user.bkashAccount}`;
    } else if (user?.rocketAccount) {
      paymentInfo = `Rocket: ${user.rocketAccount}`;
    } else if (user?.nagadAccount) {
      paymentInfo = `Nagad: ${user.nagadAccount}`;
    } else if (user?.bankName) {
      paymentInfo = `Bank: ${user.bankName}, Branch: ${user.branchName}, Routing: ${user.routingNumber}`;
    }
    const messageContent =`
    <p>Hello Printbaz,</p>
    <br/>
    <p>I would like to <strong > request a withdrawal</strong> of my overdue amount.</p>
    <br/>
    <p><strong>Payment Method: <br/> </strong> ${paymentInfo}</p>
    <br/>
    <p>Let me know if you need more information.</p>
    <br/>
    <p>Thanks,</p>
    <p>${userName}</p>
  `;

    useEffect(() => {
      // If not 24 hours yet, start countdown
      if (timeDifference < oneDayInMilliseconds) {
        setCountdown(oneDayInMilliseconds - timeDifference);
  
        const timer = setInterval(() => {
          setCountdown(prevCountdown => {
            if (prevCountdown <= 1000) {
              clearInterval(timer);
              return null;
            }
            return prevCountdown - 1000;
          });
        }, 1000);
      }
    }, []);  // Empty dependency array to run this effect only once when the component mounts
  
  

 const handleSendMessage = async () => {


  try {
 const formData=new FormData();
    Array.from(selectedFiles).forEach((file)=>{
      formData.append('files',file)
    })
    const newMessage = { ticketId: ticketId,userId:userId,adminUser:"",ticketIssue:"general query",ticketStatus:"pending(created by client)", user: user?.name,
     content:messageContent,userEmail:userEmail,userName:user?.name };

    const chatMessage = {
      ticketId: newMessage.ticketId,  // added this line
      content: newMessage.content,
      ticketStatus: newMessage.ticketStatus,
      ticketIssue: newMessage.ticketIssue,
      userEmail: newMessage.userEmail,
      adminUser:newMessage.adminUser,
      userName: newMessage.userName,
      unread:"true",
      orderId:"",
      admin: newMessage.user,
      userId:newMessage.userId,
      timestamp: new Date().toISOString(), // this won't be the exact timestamp saved in the DB
    };
    Object.entries(chatMessage).forEach(([key,value])=>{
      formData.append(key,value)
    })

    // Add the new message to the local state immediately
  
    

    // const response = await axios.post('http://localhost:5000/sendmessages', formData, {
    const response = await axios.post('https://mserver.printbaz.com/sendmessages', formData, {
headers: {
  'Content-Type': 'multipart/form-data',
},
});
    if (!response?.data?.success) {
     
     
      
     

    }
   
    setShowPopup(true)
   

  } catch (err) {
    console.error(err);
  }
}; 


  if (createTicket===true) {
    if (timeDifference >= oneDayInMilliseconds) {
      // Allow sending the message and update the last click time
      handleSendMessage(/* event object if needed */);
      localStorage.setItem('lastClickTimestamp', currentTime.toString());
      setCreateTicket(false);  // Reset createTicket back to false
     
    } else {
      // Not 24 hours yet, don't allow
      setShowPopup(false)
        setReqBtnStatus(false)
    }
  }



  return (
    <>
   
    
  
    {
        showPopup===true &&
        <CreateTicketAlertbox
        // closeCreateTicketPopup={onClose}
        onClose={() => setShowPopup(false)}
        message="Your request has been sent successfully. You can view your request on the ticket."
        />
      }
         {/* {
             showAlert  &&
             <AlertMessage
             message="input field required"
             showAlert={showAlert}
             setShowAlert={setShowAlert}
             
             />
           
           }  */}
             
                     
                    
                  
            
     
    </>
  );
};


export default ReqPaymentTIcketPopup;