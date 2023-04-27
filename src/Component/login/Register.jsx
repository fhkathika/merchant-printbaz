import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
const Register = () => {
 
  const { createUser,updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);
    const name = form.name.value;
    // const photoUrl=form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        form.reset();
        handleUpdateUserProfile(name);
        navigate("/login");
      })
      .catch((e) => {
        console.error(e);
        setError(e.message);
      });
  };
  const handleUpdateUserProfile=(name)=>{
    const profile={
      displayName:name,
    }
    updateUserProfile(profile)
    .then(()=>{})
    .catch(error=>console.error(error))
  }
  const handleAccepted=event=>{
    setAccepted(event.target.checked)
  }
  return (
    <Container className=" mx-auto">
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>Register</h3>
      <Form  onSubmit={ handleSubmit }>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label style={{textAlign:"left"}}>Username</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" onClick={handleAccepted} label={<>Accept  <Link to="/terms">Terms and conditions</Link> </>} />
        </Form.Group> */}
        {/* <Button className="loginBtn" type="submit" disabled={!accepted}>
          Register
        </Button>  */}
        <div className="loginBtn">
        <Button style={{backgroundColor:"#124"}}  type="submit" >
          Register
        </Button>
        </div>
               
        <Form.Text className="text-danger">{error}</Form.Text>
      </Form>
    </Container>
  );
};

export default Register;
