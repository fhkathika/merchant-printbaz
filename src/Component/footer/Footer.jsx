import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer_div">
      <div className="fotter2nd_Layer ">
        <div className="fotter3rd_Layer">
          <section className="footer_Section_Layer mb-4">
            <div className="flex block padding_5">
              <div className="col_30 col_100   ">
                <div className="elementDiv1">
                  <div className="footerIcon">
                    <div className="footerImg_container">
                      <img src="/images/Logo-02.svg" alt="logo" />
                    </div>
                  </div>
                  <div className="footer1stElement">
                    <p className=" firstElementAlign">
                      <img
                        style={{ width: "25px", height: "auto" }}
                        src="/images/Call-01.svg"
                        alt="contact"
                      />

                      <span
                        className="firstElementAlign_text"
                        style={{ color: "#f5f5f5" }}
                      >
                        01927854949
                      </span>
                    </p>
                  </div>
                  <div className="footer1stElement">
                    <p className=" firstElementAlign">
                      <img
                        style={{ width: "25px", height: "auto" }}
                        src="/images/Email-01.svg"
                        alt="contact"
                      />

                      <span
                        className="firstElementAlign_text"
                        style={{ color: "#f5f5f5" }}
                      >
                       merchants@printbaz.com
                      </span>
                    </p>
                  </div>  
                 
                  <div className="footer1stElement">
                    <p className=" firstElementAlign">
                      <img
                        style={{ width: "25px", height: "auto" ,marginBottom:"22px" }}
                        src="/images/Location-01.svg"
                        alt="contact"
                      />

                      <span
                        className="firstElementAlign_text"
                        style={{ color: "#f5f5f5" }}
                      >
                        Banani Breeze, Block- F, House # 76, Road # 2,
                        Charimanbari, Banani, Dhaka, Bangladesh
                      </span>
                    </p>
                  </div>
               
                  <div className="footer1stElement">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                      href="https://wa.me/+8801927854949"
                    >
                      <img
                      className="w35px socialMedia_icon_size"
                        style={{
                          height: "auto",
                          marginRight: "8px",
                          marginTop:"10px"
                        }}
                        src="/images/Whatsapp-01.svg"
                        alt="Whatsapp"
                      />
                    </a>

                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                      href="https://www.facebook.com/Printbaz/"
                    >
                      {" "}
                      <img
                       className="w35px socialMedia_icon_size"
                        style={{
                          height: "auto",
                          marginRight: "8px",
                          marginTop:"10px"
                        }}
                        src="/images/Facebook-01.svg"
                        alt="Facebook"
                      />
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                      href="https://www.instagram.com/printbaz.com.bd/"
                    >
                      {" "}
                      <img
                       className="w35px socialMedia_icon_size"
                        style={{
                          height: "auto",
                          marginRight: "8px",
                          marginTop:"10px"
                        }}
                        src="/images/Instagram-01.svg"
                        alt="Instagram"
                      />
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                      href="https://www.linkedin.com/company/printbaz/"
                    >
                      {" "}
                      <img
                       className="w35px socialMedia_icon_size"
                        style={{
                          height: "auto",
                          marginRight: "8px",
                          marginTop:"10px"
                        }}
                        src="/images/Linkedin-01.svg"
                        alt="Linkedin"
                      />
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                      href="https://www.behance.net/printbaz"
                    >
                      {" "}
                      <img
                       className="w35px socialMedia_icon_size"
                        style={{
                          height: "auto",
                          marginRight: "8px",
                          marginTop:"10px"
                        }}
                        src="/images/Behance-01.svg"
                        alt="Behance"
                      />
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                      href="https://www.youtube.com/@printbaz"
                    >
                      {" "}
                      <img
                       className="w35px socialMedia_icon_size"
                        style={{
                          height: "auto",
                          marginRight: "12px",
                          marginTop:"10px"
                        }}
                        src="/images/Youtube-01.svg"
                        alt="Youtube"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col_25 col_100 " >
              <div className="elementDiv1">
                  <div style={{marginTop:"35px"}} className="m_left25P m_0">
                   
                      <p style={{color:"#f5f5f5",fontSize:"20px",fontWeight:"700"}}>USEFULL LINKS</p>
                  
                  </div>
                  <div className="footer1stElement" >
                    <p className=" firstElementAlign  elelment_text">
                    

                      <span
                        className="firstElementAlign_text m_left25P m_0"
                        style={{ color: "#f5f5f5" }}
                      >
                           <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/dashboard"> Dashboard</Link> 
                        
                      </span>
                    </p>
                  </div>
                  <div className="footer1stElement">
                    <p className=" firstElementAlign  elelment_text">
                   

                      <span
                        className="firstElementAlign_text m_left25P m_0"
                        style={{ color: "#f5f5f5" }}
                      >
                  
                      <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/myorders"> Order</Link> 
                      </span>
                    </p>
                  </div>
                  <div className="footer1stElement">
                    <p className=" firstElementAlign  elelment_text">
                    

                      <span
                        className="firstElementAlign_text m_left25P m_0"
                        style={{ color: "#f5f5f5" }}
                      >
                             <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/newOrder">New Order</Link> 
                     
                      </span>
                    </p>
                  </div>    
                      <div className="footer1stElement">
                    <p className=" firstElementAlign  elelment_text">
                    

                      <span
                        className="firstElementAlign_text m_left25P m_0"
                        style={{ color: "#f5f5f5" }}
                      >
                             <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/newOrder">Blog</Link> 
                     
                      </span>
                    </p>
                  </div> 
                
                 
                </div>
              </div>
              <div className="col_30 col_100 ">
              <div className="elementDiv1">
                  <div style={{marginTop:"35px"}} className="m_L15P m_0">
                   
                      <p style={{color:"#f5f5f5",fontSize:"20px",fontWeight:"700"}}>USEFULL LINKS</p>
                  
                  </div>
                  <div className="footer1stElement">
                    <p className=" firstElementAlign elelment_text">
                    

                      <span
                        className="firstElementAlign_text m_L15P m_0"
                        style={{ color: "#f5f5f5"}}
                      >
                                  <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/profile">Profile</Link> 
                      </span>
                    </p>
                  </div>
                  <div className="footer1stElement">
                    <p className=" firstElementAlign elelment_text">
                   

                      <span
                        className="firstElementAlign_text m_L15P m_0"
                        style={{ color: "#f5f5f5" }}
                      >
                             <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/payment">Payment</Link> 
                      
                      </span>
                    </p>
                  </div>
                  <div className="footer1stElement">
                    <p className=" firstElementAlign elelment_text">
                    

                      <span
                        className="firstElementAlign_text m_L15P m_0"
                        style={{ color: "#f5f5f5"}}
                      >
                             <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/teeShrtCapming">Calculator</Link> 
                     
                      </span>
                    </p>
                  </div> 
                   <div className="footer1stElement">
                    <p className=" firstElementAlign elelment_text">
                    

                      <span
                        className="firstElementAlign_text m_L15P m_0"
                        style={{ color: "#f5f5f5" }}
                      >
                                 <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/printSizeDemo">Print Size Demo</Link> 
                    
                      </span>
                    </p>
                  </div>     
                     <div className="footer1stElement">
                    <p className=" firstElementAlign elelment_text">
                    

                      <span
                        className="firstElementAlign_text m_L15P m_0"
                        style={{ color: "#f5f5f5"}}
                      >
                            <Link className='' style={{textDecoration:"none", color: "#f5f5f5"}} to="/termsConditions"> Terms & Conditions</Link> 
                   
                      </span>
                    </p>
                  </div> 
                 
                </div>
              </div>
           <div className="col_15 col_100  margin_left20">

           <div className="footer1stElemnet  " style={{marginTop:"37px"}} >
                  <p style={{color:"#f5f5f5",fontSize:"20px",fontWeight:"700"}}>ACCEPTED PAYMENT</p>
              <img style={{width: "55px",height: "auto",marginRight: "12px",marginBottom:"12px", marginTop:""}}src="/images/Bkash-01.svg"alt="Youtube"/>
              <img style={{width: "55px",height: "auto",marginRight: "12px",marginBottom:"12px", marginTop:""}}src="/images/Nagad-01.svg"alt="Youtube"/>
              <img style={{width: "55px",height: "auto",marginRight: "12px",marginBottom:"12px", marginTop:""}} className="" src="/images/Rocket-01.svg"alt="Youtube"/>
              <img style={{width: "55px",height: "auto",marginRight: "12px",  marginTop:""}} className="margin_bottom12" src="/images/Mastercard-01.svg"alt="Youtube"/>
              <img style={{width: "55px",height: "auto",marginRight: "12px", marginTop:""}}className="margin_bottom12" src="/images/Visa-01.svg"alt="Youtube"/>
            
              </div>
              <div className="footer1stElemnet " style={{marginTop:"20px"}}>
                  <p style={{color:"#f5f5f5",fontSize:"20px",fontWeight:"700"}}>SECURED BY</p>
              <img style={{width: "55px",height: "auto",marginRight: "12px",marginBottom:"12px", marginTop:""}}src="/images/DMCA-01-01.png"alt="Youtube"/>
              <img style={{width: "55px",height: "auto",marginRight: "12px",marginBottom:"12px", marginTop:""}}src="/images/SSL-01-01.png"alt="Youtube"/>
 
            
              </div>
           </div>
            
            

            
        
             
            </div>
          </section>
          <div style={{backgroundColor:"#001846",borderTop:"1px solid gray"}}>
          <div className="footer_Section_Layer">
            <div className="copyRight_Style copyRight_Style_For_mobile">
<span >© 2023 printbaz.com All rights reserved</span>
            </div>
          </div>
        </div>
        </div>
      
      </div>
    </div>
  );
};

export default Footer;