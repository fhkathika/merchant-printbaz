
 import { collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { db } from '../../firebase.config';
import { useGetData } from '../../hooks/useGetData';
import useGetMongoData from '../../hooks/useGetMongoData';
import Footer from '../footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';

 const Profile = () => {
       //  const [quantity, setQuantity] = useState(1);
  const {user}=useContext(AuthContext);
 const [loginUser,setLoginUser]=useState([])

  let id = "resellerId";
  let collections = "resellerInfo";
  const [dbData, setDbData] = useState({});
  const { fetchedData,searchProduct,setSearchProduct, } = useGetData(id, collections, dbData);
  // const resellerInfoFromDb=fetchedData?.resellerInfoArr
  // console.log("resellerInfoFromDb",resellerInfoFromDb);
  const [updateData,setUpdateData]=useState([])
let loggedUser= loginUser?.filter(logUser => logUser.email === user?.email)
console.log("loggedUser",loggedUser);
  useEffect(()=>{
    const getOrders = async () => {
     await fetch('https://mserver.printbaz.com/alluser') //for main site
    //  await fetch('http://localhost:5000/alluser') //for testing site
    .then(res=>res.json())
    .then(data => setLoginUser(data))
    }
    getOrders()
},[loginUser])
  const handleFileChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
        const file = e.target.files[0];
        updateData[name] = file;
        setUpdateData({...updateData});
        const objectUrl = URL.createObjectURL(file);
        document.getElementById('image').src = objectUrl;
        console.log("updateData",updateData);
    };
}
const handleChange=(e)=>{
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
console.log("data",{ ...updateData, [e.target.name]: e.target.value }); 
}
const handleSubmit=async(e)=>{
    e.preventDefault()
    // const storageInstance = getStorage();
    // let imageURL=''
    // if (updateData.brandLogo) {
    //     const imageRef = ref(storageInstance, updateData.brandLogo.name);
    //     await uploadBytes(imageRef, updateData.brandLogo);
    //      imageURL = await getDownloadURL(imageRef);
      
    //     // Update the formData object with the new image download URL
    //     setUpdateData((prevFormData) => ({
    //       ...prevFormData,
    //       brandLogo: updateData.brandLogo.name,
    //       brandLogoURL: imageURL
    //     }));
    //   }
    const storageInstance = getStorage();
let imageURL = '';
if (updateData.brandLogo) {
  const imageRef = ref(storageInstance, updateData.brandLogo.name);
  try {
    const snapshot = await uploadBytesResumable(imageRef, updateData.brandLogo);
    const downloadURL = await getDownloadURL(snapshot.ref);
    imageURL = downloadURL;
  } catch (error) {
    console.error(error);
  }
  // Update the formData object with the new image download URL
  setUpdateData((prevFormData) => ({
    ...prevFormData,
    brandLogo: updateData.brandLogo.name,
    brandLogoURL: imageURL
  }));
}


      const docRef = doc(collection(db, "resellerInfo"), "resellerId");
      await updateDoc(docRef, {
      
        name:updateData.name,
        fbPageLink:updateData.fbPageLink,
        fbAccount:updateData.fbAccount,
        phone:updateData.phone,
        whatsapp:updateData.whatsapp,
        address:updateData.address,
        email:updateData.email,
        password:updateData.password,
        businessDuration:updateData.businessDuration,
        brandName:updateData.brandName,
        brandLogo:imageURL,
        // brandLogo:updateData.brandLogo,
        // Add more properties here as needed
      });
         
      
}


     return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Responsive Form</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <style dangerouslySetInnerHTML={{__html: "\n      /* General styles */\n      body {\n        font-family: Arial, sans-serif;\n        background-color: #f8f9fa;\n      }\n      \n      .navbar {\n        background-color: #001846 !important;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        padding: 20px;\n        padding-left: 40px !important;\n      }\n      \n      .navbar-brand img {\n        width: 150px;\n      }\n      \n      .nav-link {\n        color: #ffffff !important;\n        font-size: 16px;\n        font-weight: 600;\n      }\n      \n      .nav-link:hover {\n        background-color: #ffffff;\n        color: #001846 !important;\n      }\n      .dropdown{\n        padding-left: 1200px;\n      }\n      \n      .dropdown-menu {\n        margin-left: 1120px;\n        \n      }\n\n      .profile-info {\n        padding: 50px;\n      }\n      \n      .form-group h2 {\n        font-weight: 700;\n      }\n\n        .upload-btn {\n            display: flex;\n            align-items: center;\n            gap: 5px;\n        }\n\n        /* Mobile View Styles */\n@media (max-width: 767.98px) {\n      .profile-info {\n        padding: 20px;\n      }\n\n}\n\n    " }} />
         
          <NavigationBar/>
          {
               loggedUser?.map(resellerInfo=> 
                <div className="profile-info">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="bg-white rounded border p-4">
                      <form className="w-100" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <h2>Basic Information</h2>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label style={{textAlign:"left"}}>Email </Form.Label>
    <Form.Control
      type="email"
      name="email"
      readOnly
    //   value={formData.email}
      value={resellerInfo?.email}
   
      onChange={(e) => handleChange(e)}
    />
  </Form.Group> 
                        {/* <div className="form-group">
                          <label htmlFor="email" className="text-dark font-weight-normal">Email</label>
                          <input type="email" name="email" id="email" className="form-control"  onChange={handleChange} placeholder={resellerInfo?.email} />
                        </div> */}
                        <div className="form-group">
                          <label htmlFor="password" className="text-dark font-weight-normal">Password</label>
                          <input type="password" name="password" id="password" className="form-control"  onChange={handleChange} readOnly value={resellerInfo?.password} />
                        </div>
                        <div className="form-group">
                          <h2>Branding Information</h2>
                        </div>
                        <div className="form-group">
                          <label htmlFor="brand-name" className="text-dark font-weight-normal">Brand Name</label>
                          <input type="text" name="brandName" id="brand-name" className="form-control"  onChange={handleChange} readOnly value={resellerInfo?.brandName}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="page-link" className="text-dark font-weight-normal">Facebook/Instagram Page Link</label>
                          <input type="text" name="fbPageLink" id="page-link" className="form-control"  onChange={handleChange}readOnly value={resellerInfo?.fbPageLink}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="logo" className="text-dark font-weight-normal">Brand Logo (Optional)</label>
                          <div className="custom-file">
    <label className="edit_shop_image_div">
        <input
            type="file"
            className='form_control_image'
            name="brandLogo"
            accept='image/*'
            // required
            onChange={handleFileChange}
            style={{display:"none"}}
        />
        <img
            id="image"
            name="brandLogo"
            className={``}
            src={resellerInfo?.brandLogoURL}
            alt="brandLogo"
        />
    </label>
</div>

                        </div>
                        <div className="mt-2 text-dark">
                          <p>Your business logo will be shown in the invoice. Logo image must meet the following criteria:</p>
                          <ul className="list-unstyled ml-3">
                            <li>Must be in png, jpeg or jpg format</li>
                            <li>File size must be within 2 MB</li>
                            <li>Maximum Width is 500px and Maximum Height 500px</li>
                          </ul>
                        </div>
                        <div className="form-group">
                          <h2>Personal Information</h2>
                        </div>
                        <div className="form-group">
                          <label htmlFor="name" className="text-dark font-weight-normal">Name</label>
                          <input type="text" name="name" id="name" className="form-control"  onChange={handleChange} readOnly value={resellerInfo?.name}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone-number" className="text-dark font-weight-normal">Phone Number</label>
                          <input type="number" name="phone-number" id="phone-number" className="form-control"  onChange={handleChange} readOnly value={resellerInfo?.phone}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="whatsapp-number" className="text-dark font-weight-normal">WhatsApp Number</label>
                          <input type="number" name="whatsapp-number" id="whatsapp-number"  onChange={handleChange} className="form-control" readOnly value={resellerInfo?.whatsapp}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="profile-link" className="text-dark font-weight-normal">Facebook/Instagram Profile Link</label>
                          <input type="text" name="fbAccount" id="profile-link"  onChange={handleChange} className="form-control" readOnly value={resellerInfo?.fbAccount}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="dof" className="text-dark font-weight-normal">Duration of Business</label>
                          <input type="text" name="dof" id="dof" className="form-control"  onChange={handleChange} readOnly value={resellerInfo?.businessDuration}  />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address" className="text-dark font-weight-normal">Address</label>
                          <input type="text" name="address" id="address" className="form-control" value={resellerInfo?.address} readOnly  onChange={handleChange}/>
                        </div>
                        {/* <div className="form-group d-flex justify-content-start mt-6">
                          <button type="submit" className="mr-4 btn btn-primary">Update</button>
                          <button type="button" className="btn btn-outline-primary">Cancel</button>
                        </div> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              )}
        <Footer/>
        </div>
      );
};

 export default Profile;