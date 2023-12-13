
import axios from 'axios';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import "../../css/styles.css"
import AlertMessage from '../alert/AlertMessage';
import CreateTicketAlertbox from '../createTickwtAlert/CreateTicketAlertbox';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const GeneralQuerySupportTicketPopUp = ({userRegId,
    setShow,
    onClose,
    ticketId,
    userEmail,
    userName}) => {
  
  const [chatLog, setChatLog] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [ticketIssue, setTicketIssue] = useState('');
  const [createTicketnotify, setCreateTicketnotify] = useState(false);
  const [usersStoredTickets, setUsersStoredTickets] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [preview, setPreview] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [selectIssue,setSelectIssue] = useState(false);
    const [clientTicketIssue,setClientTicketIssue] = useState("");
    const {user}=useContext(AuthContext);
    console.log("selectIssue",selectIssue);
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
          // const text =  quillRef.current.getEditor().getText();
          // setNewMsg(text)
          console.log("delta,delta",delta);
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
    useEffect(() => {
    // Fetch the chat log from the server when the component mounts
    fetchChatLog();
  
    
  }, [ticketIssue]);


  const fetchChatLog = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/getmessages/${ticketId}`);
        const response = await axios.get(`https://mserver.printbaz.com/getmessages/${ticketId}`);
        setChatLog(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const handleNewMessageChange = (e) => {
      console.log(e.target.value);
      setNewMsg(e.target.value);
  };
 console.log("chatLog",chatLog); 

 const getViewClientColor = (status) => {
  if (status === "onHold artwork issue") {
    return "Orange";
  }
  if (status === "onHold billing issue") {
    return "Orange";
  }
  if (status === "onHold out of stock") {
    return "Orange";
  }  
   
  
  if (status === "returned") {
    return "red";
  } 

    if (status === "cancellation") {
    return "red";
  }
   
  // you can add more conditions here or just return a default color
  // return "defaultColor";
};

const handleInputTicketIssueChange = async (e) => {
  e.preventDefault()
  console.log("e.target.value",e.target.value);
  setClientTicketIssue(e.target.value)
if(e.target.value==="billing issue for wrong order"){
    setTicketIssue("onHold billing issue")
}
if(e.target.value==="billing issue for wrong deli info"){
    setTicketIssue("onHold billing issue")
}
if(e.target.value==="billing issue"){
    setTicketIssue("onHold billing issue")
}
if(e.target.value==="artwork issue"){
    setTicketIssue("onHold artwork issue")
}
if(e.target.value==="cancellation"){
    setTicketIssue("cancellation")
}
if(e.target.value==="general query"){
    setTicketIssue("general query")
}

 
 }
 console.log("ticketIssue",ticketIssue);
     //upload files
     const handleFileChange = (e) => {
      setSelectedFiles(e.target.files);
  
    };

 const handleSendMessage = async (e) => {
  e.preventDefault();
  try {
    if (!newMsg.trim() && !selectedFiles.length) {
      setShowAlert(true)
      return;
  }  
   if (!ticketIssue.trim()) {
    setSelectIssue(true)
      return;
  }
    const formData=new FormData();
    Array.from(selectedFiles).forEach((file)=>{
      formData.append('files',file)
    })
    const newMessage = { ticketId: ticketId,userRegId:userRegId,adminUser:"",ticketIssue:ticketIssue,ticketStatus:"pending(created by client)", user: user?.name, content: newMsg,userEmail:userEmail,userName:user?.name };

    const chatMessage = {
      ticketId: newMessage.ticketId,  // added this line
      userRegId:newMessage.userRegId,
      content: newMessage.content,
      ticketStatus: newMessage.ticketStatus,
      ticketIssue: newMessage.ticketIssue,
      userEmail: newMessage.userEmail,
      adminUser:newMessage.adminUser,
      userName: newMessage.userName,
      admin: newMessage.user,
      orderId:'',
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
    setNewMsg('');
    fetchChatLog();
     setCreateTicketnotify(true)
     
    console.log("chatLog",chatLog);
  } catch (err) {
    console.error(err);
  }
}; 

    

  return (
    <>
      <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n   \n}\n\n/* Nav Bar CSS Start */\n\n\n.chat-page {\n   width:45%;\n}\n\n.chat-list-tab2 {\n    color: #001846 !important;\n    padding: 10px 25px 10px 25px;\n    margin: 0;\n}\n\n.chat-online {\n    color: #34ce57\n}\n\n.chat-offline {\n    color: #e4606d\n}\n\n.chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-message-left,\n.chat-message-right {\n    display: flex;\n    flex-shrink: 0\n}\n\n.chat-message-left {\n    margin-right: auto\n}\n\n.chat-message-right {\n    flex-direction: row-reverse;\n    margin-left: auto\n}\n.py-3 {\n    padding-top: 1rem!important;\n    padding-bottom: 1rem!important;\n}\n.px-4 {\n    padding-right: 1.5rem!important;\n    padding-left: 1.5rem!important;\n}\n.flex-grow-0 {\n    flex-grow: 0!important;\n}\n.border-top {\n    border-top: 1px solid #dee2e6!important;\n}\n\n    " }} />
      <div className="alert-overlay" onClick={onClose} />
      <div className="alert-box " >
        {/* <h2>{message}</h2> */}
        <p style={{color:"white",cursor:"pointer",textAlign:"right"}} onClick={onClose}>Cancel</p>
       
            <div className="card">
              <div className="row g-0">
               
                <div className="col-sm-12 col-lg-12 ">
                  <div className="py-2 px-4 border-bottom  d-lg-block">
                  <div className="flex block-mobile align-items-center py-1" >
                        <div className='d-flex align-items-center'>

                       
                      <div className="flex-grow-1 pl-3" style={{ marginLeft:"10px",textAlign:"left"}}>
                        <p>Reg Id: <span style={{color:"blue"}}>{userRegId}</span></p>
                        <p>Ticket id: <span style={{color:"orange"}}>{ticketId}</span> </p>
                       
                      </div>
                        </div>
                    
                      <div>
                      <select
                          id="status-filter"
                          className="status-btn"
                          
                          style={{
                            border: "none",
                            padding: "8px",
                            marginRight:'20px',
                            backgroundColor: getViewClientColor(
                              ticketIssue
                            ),
                          }}
                          name="ticketIssue"
                          value={clientTicketIssue}
                          required
                          onChange={ (e)=>handleInputTicketIssueChange(e)}
                        >
                     
                     <option value="">select issue</option>
                  
                     <option value="general query">General Query</option>
                        </select>
                        {
 selectIssue=== true &&
 <p style={{textAlign:"center",color:"red"}}>select Issue required!</p>
                      } 
                      </div> 
                  
                     
                    </div>
                  </div>
              
                  <div className="flex-grow-0 py-3 px-2 border-top">
                  
                    <form className="input-group chat-messages  " onSubmit={handleSendMessage}>
                    <div   ref={quillRef}  />
             <div style={{ position:"relative"}}>
              <input
                  className="btn"
                  type="file"
                  name="file"
                style={{height:"100%",weight:"100%"}}
                  multiple
                  
                  onChange={handleFileChange}
                />
                 
                </div>
      
      <button className="btn btn-primary" style={{}} type="submit">Create Ticket</button>
     
 
      </form>
      {
        createTicketnotify &&
        <CreateTicketAlertbox
        closeCreateTicketPopup={onClose}
        onClose={() => setCreateTicketnotify(false)}
        message="Your Ticket Createed Successfully"
        />
      }
         {
             showAlert  &&
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
    </>
  );
};

GeneralQuerySupportTicketPopUp.propTypes = {
  message: PropTypes.string.isRequired,
  userOrderId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GeneralQuerySupportTicketPopUp;
