import React from 'react';
import { Form } from 'react-bootstrap';


const FileInputFields = ({itemToEdit,handleFileChange,index,item}) => {
    return (
        <>
         {
  !itemToEdit &&
  <Form.Group controlId="formFile" className="mb-3">
  <Form.Label>Upload Main File</Form.Label>
  <Form.Control
    type="file"
    name="file"
    onChange={(e) => handleFileChange(e, index, 'mainFile',item?.file?.fileId)}
    required={
      item.quantityM ||
      item.quantityL ||
      item.quantityXL ||
      item.quantityXXL
    }
    accept=".ai,.eps,.psd,.pdf,.svg,.png"
    multiple
  />
  <p
    className="uploadFilePlaceholder"
    style={{ color: "gray" }}
  >
    upload .ai,.eps,.psd,.pdf,.svg,.png file
  </p>
</Form.Group>
}
{
  itemToEdit &&
  <Form.Group controlId="formFile" className="mb-3">
  <Form.Label>Upload Main File</Form.Label>
  <Form.Control
    type="file"
    name="file"
    required={
      (item.quantityM ||
      item.quantityL ||
      item.quantityXL ||
      item.quantityXXL) &&
      !item.file
    }
    // onChange={(e) => handleFileChange(e, index)}
    onChange={(e) => handleFileChange(e, index, 'mainFile',item?.file?.fileId)}
   
    accept=".ai,.eps,.psd,.pdf,.svg,.png"
    multiple
  />
  <p
    className="uploadFilePlaceholder"
    style={{ color: "gray" }}
  >
    upload .ai,.eps,.psd,.pdf,.svg,.png file
  </p>
</Form.Group>
}
                 
                  {/* Display the image if it exists */}
                  {item?.file?.fileId && (
                    <img
                    //   src={item?.file?.fileUrl}
                    src={`https://drive.google.com/uc?id=${item?.file?.fileId}`}
                      alt="Uploaded file"
                      style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust size as needed
                    />
                  )}

               
                  {
                    !itemToEdit &&
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Mockup/T-Shirt Demo Picture</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      required={
                        item.quantityM ||
                        item.quantityL ||
                        item.quantityXL ||
                        item.quantityXXL
                      }
                      accept="image/*"
                      // onChange={(e) => handleFileChange(e, index, 'image')}
                      onChange={(e) => handleFileChange(e, index, 'image',item?.image?.fileId)}
                      multiple
                    />
                  </Form.Group>
                  }
                  {
                    itemToEdit &&
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Mockup/T-Shirt Demo Picture</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      required={
                        (item.quantityM ||
                        item.quantityL ||
                        item.quantityXL ||
                        item.quantityXXL) &&
                        !item.image
                      }
                      accept="image/*"
                      // onChange={(e) => handleFileChange(e, index)}
                      onChange={(e) => handleFileChange(e, index, 'image',item?.image?.fileId)}
                      multiple
                    />
                  </Form.Group>
                  }
                
                  {item?.image?.fileId && (
                    <img
                    //   src={item?.image?.fileUrl}
                      src={`https://drive.google.com/uc?id=${item?.image?.fileId}`}
                      alt="Uploaded img"
                      style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust size as needed
                    />
                  )}
                 

                  
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

export default FileInputFields;