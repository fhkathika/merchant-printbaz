import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import NavigationBar from '../Navbar/NavigationBar';
import "../../css/styles.css"
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
const ViewTicket = () => {
  const messagesEndRef = React.useRef(null);
    const location = useLocation();
    const [openTextBox, setOpenTextBox] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const [newMsg, setNewMsg] = useState('');
    const viewTicketDetail = location.state ? location?.state?.allTicket : null;
    const [usersStoredTickets, setUsersStoredTickets] = useState([]);
   
    const [selectedFiles, setSelectedFiles] = useState([]);
    const {user}=useContext(AuthContext);
  console.log("viewTicketDetail",viewTicketDetail);
  console.log("usersStoredTickets",usersStoredTickets);
    const { quill, quillRef, Quill } = useQuill({
      modules: { blotFormatter: {} }
    });
    if (Quill && !quill) {
      // const BlotFormatter = require('quill-blot-formatter');
      Quill.register('modules/blotFormatter', BlotFormatter);
    }



useEffect(() => {
  // mark as read message 
  const markAsRead = async (messageId) => {
    console.log("click mark as read function");
    try {
      console.log("click mark as read function from try");
        const response = await axios.post('https://mserver.printbaz.com/markAsRead', {
        // const response = await axios.post('http://localhost:5000/markAsRead', {
            messageId: messageId
        });
        if (response?.data?.success) {
            console.log(' mark message as read');
        }
    } catch (err) {
      console.log("click mark as read function from catch");
        console.error(err);
    }
  };
  markAsRead(viewTicketDetail?._id)
}, [viewTicketDetail?._id]);

    useEffect(() => {
      if (quill) {
        quill.on('text-change', (delta, oldContents) => {
          // const text =  quillRef.current.getEditor().getText();
          // setNewMsg(text)
         
          delta.ops.forEach((op) => {
            if (typeof op.insert === 'string') {
              console.log('Inserted text:', op.insert);
              console.log('Applied formats:', op.attributes);
            } else if (op.insert && typeof op.insert === 'object') {
              // handle embeds like images, video etc.
              Object.keys(op.insert).forEach((key) => {
                console.log('Inserted object of type:', key);
                console.log('Object value:', op.insert[key]);
                console.log('Applied formats:', op.attributes);
              });
            }
          });
          const currentContents = quill.getContents();
          console.log(currentContents.diff(oldContents));
  
          const text = quill.getText();
          const format=quill.getFormat();
          console.log('Typed text:', format);
          // setNewMsg(text)
          setNewMsg(quill.root.innerHTML);
        });
      }
    }, [quill, Quill]);
    let filterByTicketId=usersStoredTickets?.find(ticket=>ticket.ticketId===viewTicketDetail?.ticketId)
    const lastTicketStatus = filterByTicketId?.ticketStatus
    const adminUser = filterByTicketId?.adminUser


    console.log("adminUser from client",adminUser);
    useEffect(() => {
      // Fetch the chat log from the server when the component mounts
      fetchOrderIddata();
      fetchUserIddata()
      // Scroll to the bottom of the chat log on initial load
     
    
      // Fetch the chat log every 10 seconds
      const intervalId = setInterval(() => {
        fetchOrderIddata();
        fetchUserIddata()
    
      }, 10000);
    
      // Clean up the interval on unmount
      return () => clearInterval(intervalId);
    }, [ messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })]);
    
      const fetchOrderIddata = async () => {
        try {
          // const response = await axios.get(`http://localhost:5000/getOrderIdmessages/${viewTicketDetail?.orderId}`);
          const response = await axios.get(`https://mserver.printbaz.com/getOrderIdmessages/${viewTicketDetail?.orderId}`);
 
          setUsersStoredTickets(response.data.messages);
       
        } catch (err) {
          console.error(err);
        }
      }; 
      const fetchUserIddata = async () => {
        try {
          // const response = await axios.get(`http://localhost:5000/getuesrIdmessages/${viewTicketDetail?.userId}`);
          const response = await axios.get(`https://mserver.printbaz.com/getuesrIdmessages/${viewTicketDetail?.userId}`);
 
          setUsersStoredTickets(response.data.messages);
       
        } catch (err) {
          console.error(err);
        }
      };
    

  //  console.log("filterByTicketId",filterByTicketId);  


    ///input text
      const handleNewMessageChange = (e) => {
        console.log(e.target.value);
        setNewMsg(e.target.value);
    };
    //upload files
    const handleFileChange = (e) => {
      setSelectedFiles(e.target.files);
    };
    
  
    const handleSendMessage = async (e) => {
        e.preventDefault();
             // After the message is sent, scroll to the bottom of the chat log
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        try {
       
          const formData=new FormData();
          Array.from(selectedFiles).forEach((file)=>{
            formData.append('files',file)
          })
          const newMessage = {
             ticketId: viewTicketDetail?.ticketId,
             ticketIssue: viewTicketDetail?.ticketIssue,
             ticketStatus:"pending",
             userOrderId:viewTicketDetail?.orderId,
             userName:user?.name,
             userEmail:viewTicketDetail?.userEmail,
             adminUser:adminUser,
              user: user?.name,
               content: newMsg };
      
          const chatMessage = {
            ticketId: newMessage.ticketId,  // added this line
            content: newMessage.content,
            ticketStatus: newMessage.ticketStatus,
            ticketIssue: newMessage.ticketIssue,
            userName: newMessage.userName,
            userEmail: newMessage.userEmail,
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
          fetchOrderIddata()
          fetchUserIddata()
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
      console.log("filterByTicketId",filterByTicketId);
    return (
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    <link rel="stylesheet" href="styles.css" />
    <title>Admin Dashboard</title>
    <style dangerouslySetInnerHTML={{__html: "\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        ul,\n        li,\n        a {\n            text-decoration: none;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n             .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Nav Bar CSS End */\n\n        /* Ticket System CSS Start */\n\n        .ticket-system {\n            margin: 50px;\n        }\n\n        .ticket-header {}\n\n        .ticket-header h1 {\n            background: #ffffff;\n            padding: 20px;\n            font-size: 30px;\n            font-weight: 700;\n            margin: 0;\n        }\n\n        .ticket-top-menu {\n            background: #F5F7F9;\n            padding: 20px;\n            margin: 0;\n            box-shadow: 0 2px 4px 0 rgba(24, 50, 71, .08);\n        }\n\n        .ttm-button {\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n        }\n\n        .ttm-button:hover {\n            border: 1px solid #cfd7df;\n            color: #12344d;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n        }\n\n        .ticket-top-menu .sort-by {\n            display: inline-block;\n            float: right;\n        }\n\n        /* Ticket Display */\n\n        .ticket-info {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n            margin-top: 3px;\n            margin-bottom: 3px;\n\n        }\n\n        .ticket-info img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n\n        }\n\n        .ticket-info h2 {\n            display: inline-block;\n            font-size: 25px;\n            font-weight: 700;\n        }\n\n        .ticket-info p {\n            font-size: 14px;\n            font-weight: 600;\n            margin-left: 35px;\n            margin-bottom: 0;\n        }\n\n        .mer-info {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n\n        }\n\n        .mer-info img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n            border-radius: 5px;\n\n        }\n\n        .mer-info h2 {\n            display: inline-block;\n            font-size: 20px;\n            font-weight: 700;\n            color: rgb(0, 157, 255);\n        }\n\n        .mer-info button {\n            float: right;\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n\n        }\n\n        .mer-info button:hover {\n            border: 1px solid #cfd7df;\n            color: #ca0909;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n\n        }\n\n        .mer-info h3 {\n            font-size: 14px;\n            font-weight: 400;\n            margin-left: 35px;\n            margin-bottom: 0;\n            font-style: italic;\n        }\n\n        .mer-info p {\n            font-size: 16px;\n            font-weight: 400;\n            margin-left: 35px;\n            margin-bottom: 0;\n        }\n\n        .ticket-replay {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n\n        }\n\n        .ticket-replay img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n            border-radius: 5px;\n\n        }\n\n\n        /* finter Section */\n\n        .filter-section {\n            margin-top: 3px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            height: 100%;\n        }\n\n        .filter-text h2 {\n            font-size: 18px;\n            font-weight: 600;\n        }\n\n        .filter-text h3 {\n            font-size: 14px;\n            font-weight: 400;\n            font-style: italic;\n            margin-bottom: 25px;\n        }\n\n        .filter-dropdown {\n            margin-bottom: 30px;\n        }\n\n        .filter-dropdown .dropdown-menu {\n            width: 100%;\n        }\n\n        .dropdown-toggle::after {\n            float: right;\n            margin-top: 10px;\n        }\n\n        .filter-update-button button {\n            width: 100%;\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n            font-weight: 700;\n\n        }\n\n        .filter-update-button button:hover {\n            border: 1px solid #cfd7df;\n            color: #ffffff;\n            background: rgb(0, 194, 0);\n            transition: .1s ease-in;\n\n        }\n\n        .profile-section {\n            margin-top: 3px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            height: 100%;\n        }\n\n        .profile-section img {\n            width: 80px;\n            display: inline-block;\n            border-radius: 5px;\n            margin-left: 30%;\n        }\n\n        .profile-section h2 {\n            margin-top: 20px;\n            font-size: 18px;\n            font-weight: 700;\n            display: inline-block;\n        }\n\n        .profile-section h3 {\n            font-size: 14px;\n            font-weight: 400;\n            font-style: italic;\n            display: inline-block;\n        }\n\n        .profile-section p {\n            margin-top: 15px;\n            font-size: 16px;\n            font-weight: 600;\n            display: inline-block;\n        }\n\n    " }} />
    <NavigationBar/>
    <section className="ticket-system">
      <div className="row">
        <div className="col-12">
          <div className="ticket-header">
            <h1>Ticket View</h1>
          </div>
          
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="ticket-info">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1117395441697443860/pngegg_15.png" alt="" />
               
                <h2>{viewTicketDetail?.ticketIssue==="onHold out of stock" &&
               "Out of Stock"
                
                }</h2>  
                <h2>{viewTicketDetail?.ticketIssue==="onHold artwork issue" &&
               "Artwork Issue"
                
                }</h2>  
                <h2>{viewTicketDetail?.ticketIssue==="onHold billing issue" &&
               "Billing Issue"
                
                }</h2>
                  <h2>{viewTicketDetail?.ticketIssue==="returned" &&
               "Returned"
                
                }</h2> 
                <h2>{viewTicketDetail?.ticketIssue==="cancellation" &&
               "Cancellation"
                
                }</h2>
                <h2>{viewTicketDetail?.ticketIssue==="general query" &&
               "General Query"
                
                }</h2>
                {
                  viewTicketDetail?.orderId ?
                     <p>Order ID: {viewTicketDetail?.orderId}</p>
                     :
                     <p> ID: {viewTicketDetail?.userId}</p>
                }
             
                <p>Ticket ID: {viewTicketDetail?.ticketId}</p>
              </div>
            </div>
          </div>
          <div className="" style={{overflowY:"scroll",maxHeight:"30rem"}}>
              {
                  filterByTicketId?.messages?.map(viewTick=>{
                
                  return(
<div className="col-12">
             
             {/* for admin messsage  */}
          {
            viewTick.admin==="Printbaz" && 
            <div className="col-12">
            <div className="mer-info">
              <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
              <h2 style={{color: 'red'}}>Printbaz</h2>
              <h3>{timeSince(new Date(viewTick?.timestamp))} ({new Date(viewTick?.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })})</h3>
              <hr className='hr_lineStyle'/>
              <div dangerouslySetInnerHTML={{ __html: viewTick.content }} />
              {
viewTick?.files?.map(adminFile => {
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

          {/* for client message  */}
            {
            viewTick.admin!=="Printbaz" && 
       
            <div className="col-12">
            <div className="mer-info">
              <img src={user?.brandLogoURL} alt="" />
              <h2 >{viewTicketDetail?.userName}</h2>
              <h3 >{timeSince(new Date(viewTick?.timestamp))} ({new Date(viewTick?.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })})</h3>
              <hr className='hr_lineStyle'/>
       
              {/* <p>   {viewTick.content}</p> */}
              <div dangerouslySetInnerHTML={{ __html: viewTick.content }} />
            
              {/* // upload image  */}
              {
viewTick?.files?.map(adminFile => {
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

         
              </div>

                  )
                  }
                    
                    )
              }
              <div ref={messagesEndRef} />
         
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
                       required
                     /> */}
                     
                     <div className=' col-12' style={{marginTop:"20px"}} >
                     {/* <button  className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button> */}
                   
      
                     </div>  
                     <div className='flex col-12' style={{marginTop:"20px"}} >
           
                     <button  className="btn"
                     
                     ><i className="fa fa-paperclip" aria-hidden="true" />          <input
                     className="btn"
                     type="file"
                     name="file"
                     multiple
                     
                     onChange={handleFileChange}
                   /></button>
                     <div>
                     <button className="ttm-button" onClick={()=>setOpenTextBox(false)}> <i className="fa fa-trash" aria-hidden="true" style={{ marginRight: '5px' }} /></button>
                     <button className="ttm-button" type="submit"><i className="fa fa-reply" aria-hidden="true" style={{marginRight: '5px'}} />Reply</button>
                  
                     </div>
                    
                   
                     </div>

                  
                     
                    
                  
                     {/* <input type="text" className="form-control"   value={newMessage}
                       onChange={handleNewMessageChange} placeholder="Type your message" />
                                   <button className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button>
                                   <button className="btn btn-primary">Reply</button> */}
                   </form>
           
              </div>
        
           
                     
           
          </div>
        </div>
        
       
      </div>
    </section>
  </div>
  );
};

export default ViewTicket;