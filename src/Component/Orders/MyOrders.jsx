import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, Overlay, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { useGetData } from '../../hooks/useGetData';
import useGetMongoData from '../../hooks/useGetMongoData';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/dashboardStyles.css'
import BackToTop from '../backToTop/BackToTop';

const MyOrders = () => {
    let id = "resellerOrdersId";
    let collections = "resellerInfo";
    const {info}=useGetMongoData()
    const refs = useRef({});

    const [dbData, setDbData] = useState({});
    const [show, setShow] = useState({});
    const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
    const resellerOrdersFromDb=fetchedData?.orders
    const [filterOrders,setFilterOrders]=useState('all');
    const [filterProductType, setFilterProductType] = useState('');
    const [filterOrderId, setFilterOrderId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20); 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const {user}=useContext(AuthContext);
    const userEmail=user?.email


    const [orders, setOrders] = useState([]);
    let options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }; // options for toLocaleDateString
   
    const navigate=useNavigate()
    const handlePage=()=>{
      navigate("/newOrder")
    
    }  
      const handleViewOrder=()=>{
      navigate("/viewOrder")
   
    }
    // const handleInputChange = (event, index) => {
    //   const { name, value } = event.target;
    //   setFilterOrders(value)
    // }
    const [activeTab, setActiveTab] = useState('all');
// filter order based on status 
let pendingOrders=info?.filter(users=>users?.orderStatus==="Pending");

let approvedOrders=info?.filter(users=>users?.orderStatus==="Approved");
let onHoldOrders=info?.filter(users=>users?.orderStatus==="on-hold");
let onHoldArtworkIssueOrders=info?.filter(users=>users?.orderStatus==="on hold artwork issue");
let onHoldBillingIssueOrders=info?.filter(users=>users?.orderStatus==="on hold billing issue");
let onHoldOutOfStockOrders=info?.filter(users=>users?.orderStatus==="on hold out of stock");
let inProductionOrders=info?.filter(users=>users?.orderStatus==="in-production");
let outForDeliveryOrders=info?.filter(users=>users?.orderStatus==="out for delivery");
let deliveredOrders=info?.filter(users=>users?.orderStatus==="delivered");
let cancelOrders=info?.filter(users=>users?.orderStatus==="cancel");
let returnOrders=info?.filter(users=>users?.orderStatus==="returned");
let filterByOrderId=info?.filter(users=>users?._id===filterOrders);


   
const copyOrderId = (orderId, index) => {
  navigator.clipboard.writeText(orderId);
  
  setShow(prevShow => ({ ...prevShow, [index]: true }));

  setTimeout(() => {
    setShow(prevShow => ({ ...prevShow, [index]: false }));
  }, 3000);
};

useEffect(() => {
  info?.filter(order => order.userMail === user?.email).forEach((order, index) => {
    refs.current[index] = React.createRef();
  });
}, [info, user]);

useEffect(() => {
  const backtotop = document.querySelector('.back-to-top');
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active');
    } else {
      backtotop.classList.remove('active');
    }
  };
  toggleBacktotop();
  window.addEventListener('scroll', toggleBacktotop);
  return () => {
    window.removeEventListener('scroll', toggleBacktotop);
  };
}, []);
const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    }
// start date Handler 
const handleChangeStartDate=(date)=>{
  setStartDate(date)
  setFilterOrders('')
}
const handleChangeEndDate=(date)=>{
  setEndDate(date)
  setFilterOrders('')
}



const handleInputChange = (event) => {
  const { id, value } = event.target;
  switch (id) {
    case 'status-filter':
      setFilterStatus(value);
      break; 
    
        case 'productType-filter':
      setFilterProductType(value);
      break;
    case 'id-filter':
      setFilterOrderId(value);
      break;
      case 'name-filter':
  setFilterName(value);
  break; 
      case 'startDate':
  setStartDate(value);
  break; 
      case 'endDate':
  setEndDate(value);
  break; 
  // ...other cases
    default:
      break;
  }
  
};

const applyFilters = () => {
  return info.filter((order) => {
    console.log("order from applyFilters", order?.trackingId);
    
    // Filter by status
    if (filterStatus !== 'all' && order.orderStatus !== filterStatus) {
      return false;
    }

    // Filter by Product type status
    if(filterProductType){
      if (filterProductType === "Custom Round Neck") {
        if (order.hasOwnProperty('category') && order.category !== "Custom Round Neck") {
          return false;
        }
      } else if (order.category !== filterProductType) {
        return false;
      }
    }

    // Filter by order ID
    if (filterOrderId && !order._id.includes(filterOrderId)) {
      return false;
    } 

    // Handle Date Filtering
    let userDate;
    if(order.statusDate) {
      const formattedStatusDate = order.statusDate?.replace(" at", "");
      userDate = new Date(formattedStatusDate);
    } else if(order.createdAt) {
      userDate = new Date(order.createdAt);
    }

    if (userDate) {
      userDate.setHours(0, 0, 0, 0);
      
      const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;
      
      if (start && end && (userDate < start || userDate > end)) {
        return false;
      }
      
      if (start && !end && userDate < start) {
        return false;
      }

      if (!start && end && userDate > end) {
        return false;
      }
    } else {
      console.error("Neither order.statusDate nor order.createdAt is available.");
      return false; // If you want to exclude orders without dates, else remove this line.
    }
    
    // Filter by phone (assuming filterName is for phone)
    if (filterName && order.phone.indexOf(filterName) === -1) return false;

    return true;
  });
};



const orderMap=applyFilters()

const filerByOrderDate=info.filter(order=>{
  const orderDate=new Date(order?.createdAt)
  return orderDate>=new Date(startDate) && orderDate<=new Date(endDate)
})
    const getViewClientColor = (status) => {
      if (status === "Pending") {
        return "Orange";
      }
      if (status === "on-hold") {
        return "Orange";
      }
      if (status === "on hold artwork issue") {
        return "Orange";
      }  
          if (status === "on hold billing issue") {
        return "Orange";
      } 
      if (status === "on hold out of stock") {
        return "Orange";
      }  
      if (status === "Approved") {
        return "green";
      } 
    
        if (status === "in-production") {
        return "green";
      }
        if (status === "out for delivery") {
        return "green";
      }  
      if (status === "delivered") {
        return "green";
      } 
       if (status === "payment-released") {
        return "green";
      } 
      if (status === "returned") {
        return "red";
      }    
        if (status === "cancel") {
        return "red";
      }   
       if (status === "paid") {
        return "#1fea70";
      }  
      if (status === "Unpaid") {
        return "#360eea";
      }
      // you can add more conditions here or just return a default color
      // return "defaultColor";
    };
    let date = new Date(info?.createdAt); // create a new Date object
  

    let day = date.getDate();
    day = day < 10 ? '0' + day : day;  // adding leading zero if date is single digit
    
    let month = date.getMonth() + 1;  // getMonth() returns month index starting from 0
    month = month < 10 ? '0' + month : month;  // adding leading zero if month is single digit
    
    let year = date.getFullYear();
    
    let formattedDate = `${day}/${month}/${year}`;
    const actualIndexOfLastItem = indexOfLastItem > orderMap.length ? orderMap.length : indexOfLastItem;
    const sortedOrder = orderMap.sort((a, b) => {
      const dateA = new Date(a.createdAt.$date);
      const dateB = new Date(b.createdAt.$date);
    
      return dateB - dateA;  // Return a positive number for descending order
    });
    
    return (
        <div className='payment_container'>
       
          <NavigationBar/>
       
          <div className="main-div " style={{margin:"45px"}}>
            <div className="row mt-4">
              <div className="col-sm-6">
                <h1>Order List</h1>
              </div>
              {/* <div className="col-sm-6 text-right">
                <button onClick={handlePage} className="btn btn-primary" id="newOrderBtn">New Order</button>
              </div> */}
            </div>
            {/* Order tabs */} 
            {/* <ul className="nav nav-tabs mt-4" id="orderTabs">
              <li className="nav-item ">
                <a className=" tab-link  active " id="all-tab" data-toggle="tab" href="#all"  style={{color: '#001846 !important'}}>All</a>
              </li>
              <li className="nav-item ">
                <a className="tab-link " id="active-tab" data-toggle="tab" href="#active" style={{color: '#001846 !important'}}>Active</a>
              </li>
              <li className="nav-item ">
                <a className="tab-link " id="delivered-tab" data-toggle="tab" href="#delivered" style={{color: '#001846 !important'}}>Delivered</a>
              </li>
              <li className="nav-item ">
                <a className="tab-link "  id="returned-tab" data-toggle="tab" href="#returned" style={{color: '#001846 !important'}}>Returned</a>
              </li>
            </ul> */}

{/* <ul className="nav nav-tabs mt-4" id="orderTabs">
        <li  className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}>
          <a className="tab-link" id="all-tab" data-toggle="tab" href="#all" onClick={() => handleTabClick('all')}>All</a>
        </li>
        <li className={`nav-item ${activeTab === 'active' ? 'active' : ''}`}>
          <a className="tab-link" id="active-tab" data-toggle="tab" href="#active" onClick={() => handleTabClick('active')}>Active</a>
        </li>
        <li className={`nav-item ${activeTab === 'delivered' ? 'active' : ''}`}>
          <a className="tab-link" id="delivered-tab" data-toggle="tab" href="#delivered" onClick={() => handleTabClick('delivered')}>Delivered</a>
        </li>
        <li className={`nav-item ${activeTab === 'returned' ? 'active' : ''}`}>
          <a className="tab-link" id="returned-tab" data-toggle="tab" href="#returned" onClick={() => handleTabClick('returned')}>Returned</a>
        </li>
      </ul> */}
         
            {/* filter */}
            <form id="filter-form">
              <div className="row">
             
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="name-filter" style={{marginBottom:"8px"}}>Recipient Number</label>
                <input type="text" id="name-filter" className="form-control" value={filterName} onChange={handleInputChange}  />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="id-filter" style={{marginBottom:"8px"}}>Order Id:</label>
                <input type="text" id="id-filter" className="form-control" value={filterOrderId}  onChange={handleInputChange} />
              </div>
              {/* <div className="col-lg-1 col-sm-12">
                <label htmlFor="brand-filter" style={{marginBottom:"8px"}}>Brand Name</label>
                <input type="text" id="brand-filter" value={filterBrand} onChange={(e) =>  handleInputChange(e)}  className="form-control" />
              </div> */}
                 <div className="col-lg-2 col-sm-12">
                <label htmlFor="productType-filter" style={{marginBottom:"8px"}}>Product Type:</label>
                <select id="productType-filter" value={filterProductType} className="form-control" onChange={(e) =>  handleInputChange(e)}>
                  <option value=''>none</option>
                  <option value="Custom Round Neck">Custom Round Neck</option>
                  <option value="Blank Drop Sholder">Blank Drop Sholder</option>
                  <option value="Blank Hoodie">Blank Hoodie</option>
                  <option value="Blank Round Neck">Blank Round Neck</option>
                  <option value="Custom Drop Sholder">Custom Drop Sholder</option>
                  <option value="Custom Hoodie">Custom Hoodie</option>
                </select>
              </div> 
              
             
             


                     
              <div className="col-lg-2 col-sm-12">
                  <label htmlFor="startDate" className="form-label">Start Date</label>

                                   <input type='date' id='startDate' className='form-control' value={startDate} onChange={handleInputChange} />
                
                  </div>   
                   <div className="col-lg-2 col-sm-12">
               
                 
                  <label style={{textAlign:"start"}} htmlFor="endDate" className="form-label">End Date</label>
                  <input type='date' id='endDate' className='form-control'  value={endDate} onChange={handleInputChange}  />
                  </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="status-filter" style={{marginBottom:"8px"}}>Status:</label>
                <select id="status-filter"  className="form-control" value={filterStatus} onChange={(e) =>  handleInputChange(e)}>
                  <option   value="all">All</option>
                  <option value="Pending">Pending</option>
                  <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                  <option value="Approved">Approved</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-production">In Production</option>
                  <option value="out for delivery">Out for delivery</option>
                 <option value="delivered">Delivered</option>
                  {/* <option value="payment-released">Payment Released</option> */}
                  <option value="returned">Returned</option>
                  <option value="cancel">Cancel</option>
                  
                </select>
              </div>
               
              </div>
            </form>

          

            <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItem < 30 ? orderMap.length :actualIndexOfLastItem} of {orderMap.length}</span>
           <button style={{marginRight:"20px",border:"none",background:'none'}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none",background:'none'}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(info.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
                
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
               {/* Tab content */}
               <div className="tab-content mt-4">
              <div id="all" className=" tab-pane active">
                
            
              </div>
              <div id="active" className=" tab-pane fade">
                {/* Order list content for Active tab */}
                <h1>active</h1>
              </div>
              <div id="delivered" className=" tab-pane fade">
                {/* Order list content for Delivered tab */}
                <h1>delivered</h1>
              </div>
              <div id="returned" className=" tab-pane fade">
                {/* Order list content for Returned tab */}
              </div>
            </div>
            {/* filter by order Id  */}
            {
                orderMap
                ?.slice(indexOfFirstItem, indexOfLastItem)
                .sort((a, b) => {
                  const statusDateA = new Date(a.updatedAt || a.statusDate?.replace(" at ", " "));
                  const statusDateB = new Date(b.updatedAt || b.statusDate?.replace(" at ", " "));
                  const createdAtA = new Date(a.createdAt);
                  const createdAtB = new Date(b.createdAt);
                
                  const latestA = statusDateA > createdAtA ? statusDateA : createdAtA;
                  const latestB = statusDateB > createdAtB ? statusDateB : createdAtB;
                
                  if (latestA > latestB) return -1;
                  if (latestA < latestB) return 1;
                  return 0;
                })
                
                
              
             .map((orderInfo,index) => (
               // Your order item JSX code
               <div key={index} className="row mt-4 order-list" style={{border: '#00194600 2px solid', padding: '30px 10px 10px 10px', backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)'}}>
           
               <>
                  <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.clientName}
               </p></div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?._id}</p>
             
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{lineHeight: '15px'}}>{orderInfo?.name}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.address}</p>
               <p style={{lineHeight: '15px'}}>{orderInfo?.phone}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <button style={{lineHeight: '15px',color: '#fff', border: '5px greenyellow', backgroundColor: getViewClientColor(
                                orderInfo?.orderStatus
                                ), padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.orderStatus}</button>
               <p style={{fontSize: '14px'}}>Updated on {orderInfo?.statusDate}   </p>
               <p style={{fontSize: '14px'}}> created at: {new Date(orderInfo?.createdAt).toLocaleDateString('en-US', options)}</p>
             </div>
             <div className="col-md-1 col-sm-12">
               <p className='whiteColor' style={{lineHeight: '15px',color:'#fff !important', border: '5px greenyellow', backgroundColor: 'rgb(127, 208, 255)', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px'}}>{orderInfo?.paymentStatus}</p>
             </div>
             <div className="col-md-2 col-sm-12">
               <p style={{fontWeight: 800, lineHeight: '15px'}}>Amount to receive: <span style={{fontWeight: 400}}>{parseInt(orderInfo?.recvMoney)}</span></p>
             </div>
             <div className="col-md-1 col-sm-12">
             <Link style={{textDecoration:"none",lineHeight: '15px', border: '5px #001846', backgroundColor: '#001846', padding: '10px', fontWeight: 'bold', display: 'inline-block', borderRadius: '5px', color: '#fff'}}   to={`/viewOrder/${orderInfo?._id}`}
                                              state={ {orderInfo}}>View</Link>
             
             </div>
               </>
            
           </div>
             ))
            
              } 
          </div>
          
          <Footer/>
    <BackToTop/>
        </div>
      );
    };
    export default MyOrders;


