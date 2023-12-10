
import { Button } from "react-bootstrap";

const ConfirmOrderAlert = ({ isOpen,message, onClose, onConfirm}) => {
  if (!isOpen) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p className="" style={{color:"orange",fontSize:"20px"}}>{message}</p>
       
        <div style={{display:"flex",justifyContent:"center"}} className="mt-3">
        {/* <Button variant="success" onClick={()=>{onConfirm();onClose()}}>Yes</Button> */}
        <Button variant="success" onClick={()=>{onConfirm();onClose()}}>Yes</Button>
        <Button variant="warning" onClick={onClose} style={{marginLeft:"20px"}}>Cancel</Button>
        </div>
       
        
      </div>
    </div>
  );
};
export default ConfirmOrderAlert;