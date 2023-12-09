import React from 'react';
import { Alert, Col, Form, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';

const RecipientDetail = ({
    formData,
    handleInputChange,
    areas,
    districts,
    zones,
    printbazcost,
    deliveryFee,
    suggestedCollectAmount,
    recvMoney,
    formValid,
    recvAmount,
alert}) => {
    return (
        <div >
<div className="col-md-12">
                    <h3>Recipient Details</h3>
      <Row xs={12} md={2}>
                    <Form.Group className="mb-3 rcp_info">
                      <Form.Label>Recipient's Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control"
                        id="recipientName"
                        onChange={(e) =>  handleInputChange(e)}
                        required
                        placeholder="Enter Name"
                      />
                    </Form.Group>
      
                    <Form.Group className="mb-3">
                      <Form.Label>Recipient's Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        pattern="[0-9]{11}"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientPhone"
                        required
                        placeholder="Enter recipient number"
                      />
                    </Form.Group>
                    </Row>
                   <Row xs={12} md={3} >
                   <Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">District</Form.Label>
                      <Form.Control
                        as="select"
                        name="districts"
                        value={formData.districts}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select District</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>
           <Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Zone</Form.Label>
                      <Form.Control
                        as="select"
                        name="zones"
                        value={formData.zones}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select Zone</option>
        {zones.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>
<Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Area</Form.Label>
                      <Form.Control
                        as="select"
                        name="areas"
                        value={formData.areas}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select Area</option>
        {areas.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>


                   </Row>
                 

                    <Form.Group className="mb-3 rcp_info">
                      <Form.Label>Recipient's/Delivery Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientAddress"
                        required
                        placeholder="Enter recipient address"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label> Special Instructions</Form.Label>
                      {["bottom"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Any specific request for
                              production, branding or delivery
                            </Tooltip>
                          }
                        >
                          <span variant="secondary" className="info_icon">
                            <img
                              style={{
                                marginLeft: "5px",
                                width: "15px",
                                height: "15px",
                              }}
                              src="/images/info.png"
                              alt="info"
                            />
                          </span>
                        </OverlayTrigger>
                      ))}
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="instruction"
                        value={formData.instruction}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientAddress"
                        style={{ height: "150px" }}
                        placeholder=""
                      />
                    </Form.Group>
                  </div> 
                  {/* <hr /> */}
                  <div className="col-md-12 d-flex flex-column align-items-center ">            
<div style={{ width: '100%' }}>
                    <h3>Cost Of Order</h3>
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Total Quantity</label>
      
                      <h3>
                        {" "}
                        {/* <span style={{ fontSize: "" }}>&#2547;</span> {addbrandLogo ?parseInt(printbazcost+5):printbazcost} */}
                        <span style={{ fontSize: "" }}>{formData?.quantity}</span> 
                      </h3>
                    </div> <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Printbaz Cost</label>
      
                      <h3>
                        {" "}
                        {/* <span style={{ fontSize: "" }}>&#2547;</span> {addbrandLogo ?parseInt(printbazcost+5):printbazcost} */}
                        <span style={{ fontSize: "" }}>&#2547;</span> {printbazcost}
                      </h3>
                    </div>
      
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Delivery Fee</label>
      
                      <h3>
                        {" "}
                        <span style={{ fontSize: "" }}>&#2547;</span>{" "}
                        {deliveryFee}
                      </h3>
                    </div>
                    <div>

                    <Row  className="costOrder_Style">
                      <Col xs={12} md={6}>
                    <Form.Group className="mb-3 ">
                      <Form.Label>Amount to Collect</Form.Label>
                      {["bottom"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                             Amount of money you want the
                              receiver will pay; Must include delivery fee
                            </Tooltip>
                          }
                        >
                          <span variant="secondary" className="info_icon">
                            <img
                              style={{
                                marginLeft: "5px",
                                width: "15px",
                                height: "15px",
                              }}
                              src="/images/info.png"
                              alt="info"
                            />
                          </span>
                        </OverlayTrigger>
                      ))}
                    
                      <Form.Control
                        type="number"
                        name="collectAmount"
                        value={formData.collectAmount}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);;
                        }}
                        required
                        placeholder=""
                      />
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                           <Form.Group className="mb-3 ">
                           <Form.Label>Minimum Amount to Collect</Form.Label>
                          
                           <Form.Control
                             type="number"
                             name="collectAmount"
                             value={ printbazcost && (  {deliveryFee}) && suggestedCollectAmount ?suggestedCollectAmount : '' }
                             readOnly
                           />
                         </Form.Group>
                         </Col>
                    
                   
                     
                      </Row>
                    </div>
                    
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Cash Handling fee</label>{" "}
                      <h3> 3%</h3>
                    </div>
      
                    {/* {formData?.quantity && formData?.orderDetailArr[0]?.printSize && formData?.collectAmount && ( */}
                      <div >
                        <div className="costOrder_Style">
                        <label htmlFor="printbazCost">You will receive</label>
                        <h3> {recvMoney>0 && Math.floor(recvMoney)}</h3>
                        </div>
                       
                      
                        { formValid===true &&
    <p style={{color:"red",textAlign:"right"}}>{recvAmount}</p>
  }
                       
             
                  {/* <Button  className='ordercancel_btn' type="submit">
        Cancel
      </Button> */}
                      </div>
                    {/* )} */}
                  </div>
                  {
                    alert===true &&
                    <Alert key="danger" variant="danger">
                    Quantity required!
                  </Alert>
                  }
          
                 
                  </div>
</div>
    );
};

export default RecipientDetail;