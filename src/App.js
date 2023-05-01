import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import TeeShirtCapingCalcForm from "./Component/teeShrtCapming/TeeShirtCapingCalcForm";
import PrivateRoute from "../src/routes/PrivateRoute.jsx";
import NavigationBar from "./Component/Navbar/NavigationBar";
import Login from "./Component/login/Login";
import Register from "./Component/login/Register";
import PrintSizeDemo from "./Component/printSizeDemo/PrintSizeDemo";
import TermsConditions from "./Component/termsConditions/TermsConditions";
import ResellerForm from "./Component/reSellerForm/ResellerForm";
import DashBoard from "./dashboard/DashBoard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthProvider/AuthProvider";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import MyOrders from "./Component/Orders/MyOrders";
import NewOrder from "./Component/newOrder/NewOrder";
function App() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!loading) {
  //     if (user) {
  //       // User is authenticated, so navigate to dashboard
  //       navigate('/dashboard');
  //     } else {
  //       // User is not authenticated, so navigate to login page
  //       navigate('/login');
  //     }
  //   }
  // }, [user, navigate, loading]);
  if (loading) {
    return (
      <>
        <div className="alert-overlay"  />
        <div className="alert-box" >
          <Spinner   animation="grow" variant="danger" />
          <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
          <Spinner  animation="grow" variant="light" />
          <Spinner  animation="grow" variant="primary" />
          <h2>Please wait!</h2>
        </div>
      </>
    );
  }
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />  
         <Route
          path="/myorders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        /> 
         <Route
          path="/newOrder"
          element={
            <PrivateRoute>
              <NewOrder />
            </PrivateRoute>
          }
        />

        <Route
          path="/teeShrtCapming"
          element={
            <PrivateRoute>
              <TeeShirtCapingCalcForm />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/printSizeDemo"
          element={
            <PrivateRoute>
              <PrintSizeDemo />
            </PrivateRoute>
          }
        />
        <Route
          path="/termsConditions"
          element={
            <PrivateRoute>
              <TermsConditions />
            </PrivateRoute>
          }
        />
        <Route
          path="/reSellerForm"
          element={
            <PrivateRoute>
              <ResellerForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
