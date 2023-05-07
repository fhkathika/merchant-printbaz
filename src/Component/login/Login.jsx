// import { GoogleAuthProvider } from "firebase/auth";
// import React, { useContext, useState } from "react";
// import { Container, Spinner } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import { Container, Form } from "react-bootstrap";

// const Login = ({closePopup}) => {
//   const { signIn ,loading} = useContext(AuthContext);
//   const [error,setError]=useState('');
//   const [close,setClose]=useState('');

//   const navigate=useNavigate();
//   const location=useLocation();
//   const from=location.state?.from?.pathname || '/'
//   const handleGoogleSignIn = () => {
//     providerLogin(googleProvider)
//       .then((result) => {
//         const user = result.user;
//         console.log(user);
//         navigate(from,{replace:true});
//       })
//       .catch((error) => console.error(error));
//   };
//   const { providerLogin } = useContext(AuthContext);
//   const googleProvider = new GoogleAuthProvider();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     signIn(email,password)
//     .then(result=>{
//         const user=result.user;
//         console.log(user);
//         form.reset();
//         setError("");
//         if(loading){
//           return <Spinner animation="border" variant="primary"/>
//       }
//         navigate(from,{replace:true});
//         setClose(closePopup)
//     })
//     .catch(e=>{
      
//       console.error(e.message)
//       if(loading){
//         return <Spinner animation="border" variant="primary"/>
//     }
//       if (e.message === "Firebase: Error (auth/wrong-password).") {
//         setError("Wrong Password.");
//       } else if (
//         e.message ===
//         "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
//       ) {
//         setError(
//           "Account temporarily disabled. Please contact customer support."
//         );
//       } else if (e.message === "Firebase: Error (auth/user-not-found).") {
//         setError("This account does not exist in our database.");
//       }
     
//     })
//   };
//   return (
//     <Container className=" mx-auto">
//       <h3 style={{ marginTop: "20px", textAlign: "center" }}>Sign in as a reseller </h3>
//       <Form onSubmit={handleSubmit}>
      
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             required
//             placeholder="Enter email"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="password"
//             required
//             placeholder="Password"
//           />
//         </Form.Group>
//         {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
//           <Form.Check type="checkbox" label="Check me out" />
//         </Form.Group> */}
//         <div className="loginBtn" >
//         <Button style={{backgroundColor: "#124",marginTop:"5px"}} type="submit">
//           Login
//         </Button>
//         </div>
       
//        <br />
//         <Form.Text className="text-danger">
//        {loading}
//         </Form.Text> <Form.Text className="text-danger">
//        {error}
//         </Form.Text>
//       </Form>
//       <div className="btn_groupFlex">
//       {/* <Button
//      className="googleBtn"
    
//      onClick={() => {
//        handleGoogleSignIn();
//        closePopup();
//      }}
//    >
//      {" "}
//     <img className="icon" src="/images/search.png" alt="google"/> <span>Sign In With Google</span> 
//    </Button>  */}
  
//       </div>
     
//     </Container>
//   );
// };

// export default Login;
 import React, { useContext, useEffect, useState } from "react";
 import {  Spinner } from "react-bootstrap";
 import Button from "react-bootstrap/Button";
 import { Link, useLocation, useNavigate } from "react-router-dom";
 import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import Register from "./Register";
const Login = () => {
  const {user}=useContext(AuthContext)
  const { signIn ,loading} = useContext(AuthContext);
  const navigate=useNavigate();
     const location=useLocation();
  const from=location.state?.from?.pathname || '/dashboard'
  const [error,setError]=useState('');
    const [close,setClose]=useState('');
 
    function closePopup() {
      document.getElementById("popup1").style.display = "none";
      setRegister(false)
    }
    const [display, setDisplay] = useState('block');
    const [displayNone, setDisplayNone] = useState('none');
    const [register, setRegister] = useState(false);
    const showRegister = () => {
      setDisplay('none');
      setDisplayNone('block')
    }
     const showLogin = () => {
      setDisplay('block');
      setDisplayNone('none')
    }
    const handleSignUp=(e)=>{
      e.preventDefault()
      setRegister(true)
      setDisplay('block');
      setDisplayNone('block')
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email,password)
    .then(result=>{
        const user=result.user;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        form.reset();
        setError("");
        // navigate("/dashboard");
        if(loading){
          return <Spinner animation="border" variant="primary"/>
      }
        navigate(from,{replace:true});
     
    
    })
    .catch(e=>{
      
      console.error(e.message)
      if(loading){
        return <Spinner animation="border" variant="primary"/>
    }
      if (e.message === "Firebase: Error (auth/wrong-password).") {
        setError("Wrong Password.");
      } else if (
        e.message ===
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        setError(
          "Account temporarily disabled. Please contact customer support."
        );
      } else if (e.message === "Firebase: Error (auth/user-not-found).") {
        setError("Your didnot register yet or register request pending");
      }
     
    })
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/dashboard');
    }
  }, []);
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Printbaz</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <style dangerouslySetInnerHTML={{__html: "\n        .form-group .form-control {\n            margin-bottom: 15px;\n        }\n\n        body {\n  font-family: 'Arial', sans-serif;\n  background-color: #f4f4f4;\n}\n\nh2, h4, h5 {\n  font-weight: bold;\n  color: #333;\n}\n\nh5 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n\ni.fa {\n  color: #333;\n  margin-right: 5px;\n}\n\n.form-group label {\n  font-weight: bold;\n  color: #333;\n}\n\n.btn-primary {\n  background-color: #012652;\n  border-color: #012652;\n}\n\n.btn-secondary {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n\n.btn-link {\n  color: #012652;\n}\n\n.modal-header {\n  background-color: #012652;\n  color: #fff;\n}\n\n.modal-title {\n  font-weight: bold;\n  color: #fff;\n}\n\n.close {\n  color: #fff;\n  opacity: 1;\n}\n\n.modal-body {\n  background-color: #f4f4f4;\n}\n\n.modal-content {\n  border-radius: 0;\n}\n\n.modal .form-control {\n  background-color: #fff;\n  border-color: #ccc;\n}\n\n.left-side {\n  margin-top: 5%;\n}\n\n.left-side h2 {\n  padding-bottom: 30px;\n  color: #012652;\n  font-weight: 700;\n  font-size: 40px;\n}\n\n.left-side p i {\n  font-size: 20px;\n}\n\n.nav-logo img {\n  width: 15%;\n  display: inline-block;\n}\n\n.navbar1 {\n  margin-bottom: 20%;\n}\n\n.nav-logo i {\n  margin-left: 60%;\n  font-size: 20px;\n}\n\n@media only screen and (max-width: 600px) {\n  .help-line {\n    display: block;\n    margin-left: 0% !important;\n  }\n\n  .nav-logo img {\n    width: 35%;\n    margin-bottom: 20px;\n  }\n\n}\n    " }} />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 navbar1">
              <div className="nav-logo">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1102149480284962938/Logo-01.png?width=1440&height=392" alt="Logo" className="img-fluid" />
                <i className="fa fa-phone help-line">  Help Line: 123-456-7890</i>
              </div>
            </div>
            <div className="col-md-6 left-side">
              <h2>আপনার শুধু ডিজাইনের কাজ,<br /> বাকি দ্বায়িত্বে প্রিন্টবাজ!</h2>
              <p><i className="fa fa-info-circle" />  <b>সাইন ইন করুন</b></p>
              <p><i className="fa fa-question-circle" /> <b>ডিজাইন এবং তথ্য দিন</b> </p>
              <p><i className="fa fa-map-marker" />  <b>প্রফিট বুঝে নিন</b></p>
              {/* <p><i className="fa fa-question-circle" /> </p> */}
            </div>
            <div className="col-md-6">
              <div className="row mt-4">
                <div className="col-md-12">
              
                  <Container className=" mx-auto">
      <h4 style={{ marginTop: "20px"}}>Sign in   </h4>
      <Form onSubmit={handleSubmit}>   
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            placeholder="Password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <div className="loginBtn" >
        <Button style={{backgroundColor: "#124",marginTop:"5px"}} type="submit">
          Sign in
        </Button>
           <Button onClick={handleSignUp} style={{backgroundColor: "#124",marginTop:"5px",marginLeft:"10px"}} >
          Sign up
        </Button>
        
        </div>
       
       <br />
        <Form.Text className="text-danger">
       {loading}
        </Form.Text> <Form.Text className="text-danger">
       {error}
        </Form.Text>
      </Form>
     
      {
                  register===true && <div id="popup1" className="overlay">
                  <div className="popup">
                      <a className="close cursor_pointer mr-4" onClick={closePopup}>&times;</a>
                      <div className="content">
                      <div style={{ display: display }}>
                      
                      <Register  onClick={closePopup} id ="register" />
                      </div>
                      
                      <div style={{marginTop: "15px" }}>
                      <div>
                       
     
      {/* <div id="register"style={{ display: displayNone }}> <Register /></div> */}
      {/* {
                          displayNone==="block" && 
                          <p  style={{ backgroundColor:"none",border:"none",textDecoration:"none",color:"#124",fontWeight:"500",cursor:"pointer",textAlign:"center",marginTop:"12px"}} onClick={showLogin}> Log in</p>
                      } */}
    </div>
               

                      </div>
                    
                    
                      </div>
                    
                  </div>
                  </div>
              
}
    </Container>
                </div>
              </div>
            </div>
          </div>
          {/* Register Modal */}
          <div className="modal fade" id="registerModal" tabIndex={-1} role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="registerModalLabel">Sign Up</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form id="registerForm">
                    <h5>Basic Information</h5>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" className="form-control" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Password" required />
                    </div>
                    <h5>Personal Information</h5>
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" placeholder="Name" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="text" className="form-control" placeholder="Phone Number" required />
                    </div>
                    <div className="form-group">
                      <label>WhatsApp Number</label>
                      <input type="text" className="form-control" placeholder="WhatsApp Number" required />
                    </div>
                    <div className="form-group">
                      <label>Facebook/Instagram Profile Link</label>
                      <input type="text" className="form-control" placeholder="Facebook/Instagram Profile Link" required />
                    </div>
                    <div className="form-group">
                      <label>Facebook/Instagram Page Link</label>
                      <input type="text" className="form-control" placeholder="Facebook/Instagram Page Link" required />
                    </div>
                    <div className="form-group">
                      <label>Duration of Business</label>
                      <input type="text" className="form-control" placeholder="Duration of Business" required />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" className="form-control" placeholder="Address" required />
                    </div>
                    <h5>Payment Information</h5>
                    <div className="form-group">
                      <label>Bank Name</label>
                      <input type="text" className="form-control" placeholder="Bank Name" required />
                    </div>
                    <div className="form-group">
                      <label>Account Name</label>
                      <input type="text" className="form-control" placeholder="Account Name" required />
                    </div>
                    <div className="form-group">
                      <label>Account Number</label>
                      <input type="text" className="form-control" placeholder="Account Number" required />
                    </div>
                    <div className="form-group">
                      <label>Branch Name</label>
                      <input type="text" className="form-control" placeholder="Branch Name" required />
                    </div>
                    <div className="form-group">
                      <label>Routing Number</label>
                      <input type="text" className="form-control" placeholder="Routing Number" required />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div></div>
    );
  }
  export default Login;