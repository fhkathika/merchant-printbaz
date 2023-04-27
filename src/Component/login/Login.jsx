import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Login = ({closePopup}) => {
  const { signIn ,loading} = useContext(AuthContext);
  const [error,setError]=useState('');
  const [close,setClose]=useState('');

  const navigate=useNavigate();
  const location=useLocation();
  const from=location.state?.from?.pathname || '/'
  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from,{replace:true});
      })
      .catch((error) => console.error(error));
  };
  const { providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email,password)
    .then(result=>{
        const user=result.user;
        console.log(user);
        form.reset();
        setError("");
        if(loading){
          return <Spinner animation="border" variant="primary"/>
      }
        navigate(from,{replace:true});
        setClose(closePopup)
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
        setError("This account does not exist in our database.");
      }
     
    })
  };
  return (
    <Container className=" mx-auto">
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>Sign in as a reseller </h3>
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
          Login
        </Button>
        </div>
       
       <br />
        <Form.Text className="text-danger">
       {loading}
        </Form.Text> <Form.Text className="text-danger">
       {error}
        </Form.Text>
      </Form>
      <div className="btn_groupFlex">
      {/* <Button
     className="googleBtn"
    
     onClick={() => {
       handleGoogleSignIn();
       closePopup();
     }}
   >
     {" "}
    <img className="icon" src="/images/search.png" alt="google"/> <span>Sign In With Google</span> 
   </Button>  */}
  
      </div>
     
    </Container>
  );
};

export default Login;
