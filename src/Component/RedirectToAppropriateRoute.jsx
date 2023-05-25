import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider/AuthProvider";
const RedirectToAppropriateRoute = () => {
  const { user, loading } = useContext(AuthContext);
console.log("user",user);
  if (loading) {
    return (
      <>
        <div className="alert-overlay" />
        <div className="alert-box">
          <Spinner animation="grow" variant="danger" />
          <Spinner style={{ padding: "20px" }} animation="grow" variant="warning" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="primary" />
          <h2>Please wait!</h2>
        </div>
      </>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}


export default RedirectToAppropriateRoute;


