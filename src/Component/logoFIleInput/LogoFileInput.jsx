
import React from 'react';
import { Form } from 'react-bootstrap';


const LogoFileInput = ({itemToEdit,handleFileChange,index,item}) => {
    return (
        <>
  <Form.Group controlId="formBrandLogo" className="mb-3">
<Form.Label>Upload Your Brand Logo (optional)</Form.Label>
<Form.Control
type="file"
name="brandLogo"
accept="image/jpeg, image/png"
onChange={(e) => handleFileChange(e, index, 'brandLogo',item?.brandLogo?.fileId)}
/>
</Form.Group>
{item?.brandLogo?.fileId && (
                    <img
                    //   src={item?.image?.fileUrl}
                      src={`https://drive.google.com/uc?id=${item?.brandLogo?.fileId}`}
                      alt="Uploaded img"
                      style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust size as needed
                    />
                  )}
                    
        </>
    );
};

export default LogoFileInput;