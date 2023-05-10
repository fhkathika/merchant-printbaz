import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import Invoice from "./Component/invoice/Invoice";
import OrderTracking from "./Component/orderTracking/OrderTracking";
import Profile from "./Component/profile/Profile";
import Payment from "./Component/payment/Payment";
import TestiSendEmail from "./testiSendEmail/TestiSendEmail";
import SendRegisterConfirmationEmail from "./Component/confirmationMailRegister/SendRegisterConfirmationEmail";
import SendOrderConfirmationEmail from "./confirmationMailOrder/SendOrderConfirmationEmail";


function App() {
  const { user, loading } = useContext(AuthContext);
  const navigate=useNavigate();
  const location=useLocation();
  const from=location.state?.from?.pathname || '/dashboard'
  useEffect(() => {
    if (!user && location.pathname !== "/login") {
      navigate("/login");
    } else if (user && location.pathname === "/login") {
      // navigate("/dashboard");
      navigate(from,{replace:true});
    }
  }, [user, location.pathname, navigate]);

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
        {/* <Route
          path="/"
          element={
          
              <Login />
          
          }
        /> */}
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
          path="/confirmationMailOrder"
          element={
            <PrivateRoute>
              <SendOrderConfirmationEmail/>
            </PrivateRoute>
          }
        />  
           <Route
          path="/confirmationMailRegister"
          element={
            <PrivateRoute>
              <SendRegisterConfirmationEmail/>
            </PrivateRoute>
          }
        />  
         <Route
          path="/viewOrder/:id"
          element={
            <PrivateRoute>
              <OrderTracking />
            </PrivateRoute>
          }
        />  
          <Route
          path="/invoice"
          element={
            <PrivateRoute>
              <Invoice />
            </PrivateRoute>
          }
        />   <Route
          path="/testiSendEmail"
          element={
            <PrivateRoute>
              <TestiSendEmail />
            </PrivateRoute>
          }
        />  
           <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />  
              <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
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
