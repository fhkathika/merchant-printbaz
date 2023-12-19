
import axios from 'axios';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import AlertMessage from '../alert/AlertMessage';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
const UsersStoredSupportTickets = ({ message,ticketId,userOrderId,ticketIssue, onClose,adminUser,userEmail,userName }) => {
 
  const [chatLog, setChatLog] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [usersStoredTickets, setUsersStoredTickets] = useState([]);
  const [openTextBox, setOpenTextBox] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  // const [ticketIssue, setTicketIssue] = useState('');
  const {user}=useContext(AuthContext);
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });
  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents) => {
        
       
        delta.ops.forEach((op) => {
          if (typeof op.insert === 'string') {
         
          } else if (op.insert && typeof op.insert === 'object') {
            // handle embeds like images, video etc.
            Object.keys(op.insert).forEach((key) => {
             
            });
          }
        });
        const currentContents = quill.getContents();
       

        const text = quill.getText();
        const format=quill.getFormat();
       
        // setNewMsg(text)
        setNewMsg(quill.root.innerHTML);
      });
    }
  }, [quill, Quill]);

  
 
  useEffect(() => {
    // Fetch the chat log from the server when the component mounts
   
    fetchOrderIddata();
  }, []);
  const fetchOrderIddata = async () => {
    try {
      // const response = await axios.get(`http://localhost:5000/getOrderIdmessages/${userOrderId}`);
      const response = await axios.get(`https://mserver.printbaz.com/getOrderIdmessages/${userOrderId}`);
      setUsersStoredTickets(response.data.messages);
   
    } catch (err) {
      console.error(err);
    }
  };
  
  let filterByTicketId=usersStoredTickets?.find(ticket=>ticket.ticketId===ticketId)
  let filterByAdminUser=usersStoredTickets?.filter(ticket=>ticket.adminUser===adminUser)

const lastTicketStatus = filterByTicketId?.ticketStatus

      //upload files
      const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
      };


    
 const handleSendMessage = async (e) => {
  e.preventDefault();
  try {
    if (!newMsg.trim() && !selectedFiles.length) {
      setShowAlert(true)
      return;
  }
    const formData=new FormData();
    Array.from(selectedFiles).forEach((file)=>{
      formData.append('files',file)
    })
    const newMessage = { ticketId: ticketId,userOrderId:userOrderId,ticketIssue:ticketIssue,ticketStatus:"pending", user:user?.name, content: newMsg,userEmail:userEmail,adminUser:adminUser,userName:user?.name };

    const chatMessage = {
      ticketId: newMessage.ticketId,  // added this line
      content: newMessage.content,
      ticketStatus: newMessage.ticketStatus,
      ticketIssue: newMessage.ticketIssue,
      userEmail: newMessage.userEmail,
      userName: newMessage.userName,
      admin: newMessage.user,
      adminUser: newMessage.adminUser,
      orderId:newMessage.userOrderId,
      timestamp: new Date().toISOString(), // this won't be the exact timestamp saved in the DB
    };
    Object.entries(chatMessage).forEach(([key,value])=>{
      formData.append(key,value)
    })

    // Add the new message to the local state immediately
    setChatLog([...chatLog, chatMessage]);
    

    // const response = await axios.post('http://localhost:5000/sendmessages', formData, {
    const response = await axios.post('https://mserver.printbaz.com/sendmessages', formData, {
headers: {
  'Content-Type': 'multipart/form-data',
},
});
    if (!response?.data?.success) {
      // If the message was not sent successfully, revert the local state
      setChatLog(oldChatLog => oldChatLog.filter(msg => msg !== chatMessage));
      setUsersStoredTickets(oldTickets => oldTickets.filter(ticket => ticket !== chatMessage));
      console.error('Failed to send message');
    }
    setUsersStoredTickets(oldTickets => [...oldTickets, {
      ...chatMessage,
      messages: [chatMessage]
    }]);
    if (quill) {
      quill.setContents([]);
    }
    setNewMsg('');
    setSelectedFiles('');
   fetchOrderIddata();
  
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


  return (
    <>
     <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    <link rel="stylesheet" href="styles.css" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        ul,\n        li,\n        a {\n            text-decoration: none;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Nav Bar CSS End */\n\n        /* Ticket System CSS Start */\n\n        .ticket-system {\n            margin: 50px;\n        }\n\n        .ticket-header {}\n\n        .ticket-header h1 {\n            background: #ffffff;\n            padding: 20px;\n            font-size: 30px;\n            font-weight: 700;\n            margin: 0;\n        }\n\n        .ticket-top-menu {\n            background: #F5F7F9;\n            padding: 20px;\n            margin: 0;\n            box-shadow: 0 2px 4px 0 rgba(24, 50, 71, .08);\n        }\n\n        .ttm-button {\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n        }\n\n        .ttm-button:hover {\n            border: 1px solid #cfd7df;\n            color: #12344d;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n        }\n\n        .ticket-top-menu .sort-by {\n            display: inline-block;\n            float: right;\n        }\n\n        /* Ticket Display */\n\n        .ticket-info {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n            margin-top: 3px;\n            margin-bottom: 3px;\n\n        }\n\n        .ticket-info img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n\n        }\n\n        .ticket-info h2 {\n            display: inline-block;\n            font-size: 25px;\n            font-weight: 700;\n        }\n\n        .ticket-info p {\n            font-size: 14px;\n            font-weight: 600;\n            margin-left: 35px;\n            margin-bottom: 0;\n        }\n\n        .mer-info {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n\n        }\n\n        .mer-info img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n            border-radius: 5px;\n\n        }\n\n        .mer-info h2 {\n            display: inline-block;\n            font-size: 20px;\n            font-weight: 700;\n            color: rgb(0, 157, 255);\n        }\n\n        .mer-info button {\n            float: right;\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n\n        }\n\n        .mer-info button:hover {\n            border: 1px solid #cfd7df;\n            color: #ca0909;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n\n        }\n\n        .mer-info h3 {\n            font-size: 14px;\n            font-weight: 400;\n            margin-left: 35px;\n            margin-bottom: 0;\n            font-style: italic;\n        }\n\n        .mer-info p {\n            font-size: 16px;\n            font-weight: 400;\n            margin-left: 35px;\n            margin-bottom: 0;\n        }\n\n        .ticket-replay {\n            background: #ffffff;\n            padding: 20px 20px 20px 20px;\n\n        }\n\n        .ticket-replay img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n            border-radius: 5px;\n\n        }\n\n\n        /* finter Section */\n\n        .filter-section {\n            margin-top: 3px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            height: 100%;\n        }\n\n        .filter-text h2 {\n            font-size: 18px;\n            font-weight: 600;\n        }\n\n        .filter-text h3 {\n            font-size: 14px;\n            font-weight: 400;\n            font-style: italic;\n            margin-bottom: 25px;\n        }\n\n        .filter-dropdown {\n            margin-bottom: 30px;\n        }\n\n        .filter-dropdown .dropdown-menu {\n            width: 100%;\n        }\n\n        .dropdown-toggle::after {\n            float: right;\n            margin-top: 10px;\n        }\n\n        .filter-update-button button {\n            width: 100%;\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n            font-weight: 700;\n\n        }\n\n        .filter-update-button button:hover {\n            border: 1px solid #cfd7df;\n            color: #ffffff;\n            background: rgb(0, 194, 0);\n            transition: .1s ease-in;\n\n        }\n\n        .profile-section {\n            margin-top: 3px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            height: 100%;\n        }\n\n        .profile-section img {\n            width: 80px;\n            display: inline-block;\n            border-radius: 5px;\n            margin-left: 30%;\n        }\n\n        .profile-section h2 {\n            margin-top: 20px;\n            font-size: 18px;\n            font-weight: 700;\n            display: inline-block;\n        }\n\n        .profile-section h3 {\n            font-size: 14px;\n            font-weight: 400;\n            font-style: italic;\n            display: inline-block;\n        }\n\n        .profile-section p {\n            margin-top: 15px;\n            font-size: 16px;\n            font-weight: 600;\n            display: inline-block;\n        }\n\n    " }} />
      <div className="" onClick={onClose} />
      <div className=" ">
        {/* <h2>{message}</h2> */}
        {/* <p style={{color:"black",cursor:"pointer",textAlign:"right"}} onClick={onClose}>Cancel</p> */}
       
            <div className="card">
              <div className="row g-0">
               
              <div className="col-12 col-lg-12 col-xl-12">
          <div className="row">
            <div className="col-12">
              <div className="ticket-info">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1117395441697443860/pngegg_15.png" alt="" />
                <h2>{ticketIssue==="onHold out of stock" &&
               "Out of Stock"
                
                }</h2>  
                <h2>{ticketIssue==="onHold artwork issue" &&
               "Artwork Issue"
                
                }</h2>  
                <h2>{ticketIssue==="onHold billing issue" &&
               "Billing Issue"
                
                }</h2>
                  <h2>{ticketIssue==="returned" &&
               "Returned"
                
                }</h2> 
                <h2>{ticketIssue==="cancellation" &&
               "Cancellation"
                
                }</h2>
                <h2>{ticketIssue==="general query" &&
               "General Query"
                
                }</h2>
                <p>Order ID: {userOrderId}</p>
                <p>Ticket ID: {ticketId}</p>
              </div>
            </div>
          </div>
          <div className="" style={{maxHeight:"30rem",overflowY:"scroll"}}>
            {
               filterByTicketId?.messages?.map(allText=>
                <>
                {/* clent messages  */}
               {
                allText.admin!=="Printbaz" && 
           
                <div className="col-12">
                <div className="mer-info">
                  <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                  <h2 style={{color:"#012652"}}>{user?.name}</h2>
                  <h3 >{timeSince(new Date(allText?.timestamp))} ({new Date(allText?.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })})</h3>
                  <hr className='hr_lineStyle'/>
              
                  {/* <p>   {viewTick.content}</p> */}
                  <div dangerouslySetInnerHTML={{ __html: allText.content }} />
                
                  {/* // upload image  */}
                  {
  allText?.files?.map(adminFile => {
    const fileId = adminFile.split('/d/')[1].split('/view')[0];
    const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
    return (
      <>
        
          <iframe src={previewURL}  style={{width: "auto", height: "auto",alignItems:"center"}}></iframe>
      </>
    )
  })
} 

                
                </div>
              </div>
              }
                 {/* admin messages  */}
              {
                allText.admin==="Printbaz" && 
                <div className="col-12">
                <div className="mer-info">
                  <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                  <h2 style={{color: 'red'}}>{allText.admin}</h2>
                  <h3>{timeSince(new Date(allText?.timestamp))} ({new Date(allText?.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })})</h3>
                  <hr className='hr_lineStyle'/>
                  <div dangerouslySetInnerHTML={{ __html: allText.content }} />
                  {
  allText?.files?.map(adminFile => {
    const fileId = adminFile.split('/d/')[1].split('/view')[0];
    const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
    return (
      <>
        
          <iframe src={previewURL}  style={{width: "auto", height: "auto",alignItems:"center"}}></iframe>
      </>
    )
  })
}             </div>
              </div>
              }
             
                </>
              
                )
            }
           
          </div>
          <div className="row">
            <div className="col-12">
            
                {
                lastTicketStatus==="close" &&
                <div className="ticket-replay">
                  <h2 style={{textAlign:"center",color:"red"}}>Ticket Closed!</h2>
                </div>
              }
            
            </div>
          </div> 
            <div className="row">
              <div className='col-12'>
              
          
             <form className="input-group chat-messages p-4 " onSubmit={handleSendMessage}>
     <div   ref={quillRef}  />
    {/* <textarea  className='col-12'
                       type="text"
                       rows="11" cols="33"
                       value={newMsg}
                       onChange={handleNewMessageChange}
                       placeholder="Type your message here..."
                       
                     /> */}
           
                     <div className='flex col-12' style={{marginTop:"20px"}} >
                   
                     <button  className="btn"
                     
                     ><i className="fa fa-paperclip" aria-hidden="true" />      
                         <input
                     className="btn"
                     type="file"
                     name="file"
                    
                     onChange={handleFileChange}
                     multiple
                   />
                   </button>
                     <div>
                     <button className="ttm-button" onClick={()=>setOpenTextBox(false)}> <i className="fa fa-trash" aria-hidden="true" style={{ marginRight: '5px' }} /></button>
                     <button className="ttm-button" type="submit"><i className="fa fa-reply" aria-hidden="true" style={{marginRight: '5px'}} />Reply</button>
               
              
                {/* <button className="ttm-button" onClick={()=>setOpenTextBox(true)}><i className="fa fa-reply" aria-hidden="true" style={{marginRight: '5px'}} />Reply</button> */}
                {/* <button className="ttm-button"><i className="fa fa-sticky-note" aria-hidden="true" style={{marginRight: '5px'}} />Add Note</button> */}
                {/* <button className="ttm-button"><i className="fa fa-paper-plane" aria-hidden="true" style={{marginRight: '5px'}} />Send Copy</button> */}
            
                     </div>
                    
                   
                     </div>

                  
                     
                    
                  
                     {/* <input type="text" className="form-control"   value={newMessage}
                       onChange={handleNewMessageChange} placeholder="Type your message" />
                                   <button className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button>
                                   <button className="btn btn-primary">Reply</button> */}
                  
                   </form>
         
           {
             showAlert &&
             <AlertMessage 
             message="input field required"
             showAlert={showAlert}
             setShowAlert={setShowAlert}
             
             />
           }
              </div>
        
           
                     
           
          </div>
        </div>
              </div>

              
            </div>
        
      </div>
    </>
  );
};

UsersStoredSupportTickets.propTypes = {
  message: PropTypes.string.isRequired,
  userOrderId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UsersStoredSupportTickets;
