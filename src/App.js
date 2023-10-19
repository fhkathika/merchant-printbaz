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
import InvoicePdf from "./Component/invoicePdf/InvoicePdf";
import RedirectToAppropriateRoute from "./Component/RedirectToAppropriateRoute";
import ResetPasswordField from "./Component/resetPasswordFIeld/ResetPasswordField";
import UpdatePasswordField from "./Component/UpdatePasswordField";
import ReactGA from 'react-ga';
import Footer from "./Component/footer/Footer";
import Ticket from "./Component/ticket/Ticket";
import ViewTicket from "./Component/viewTicket/ViewTicket";
import ScreenShot from "./Component/screenShot/ScreenShot";
import LocationTest from "./Component/automaticLocationTest/LocationTest";
import NewOrdersWithOption from "./Component/newOrdersWithOption/NewOrdersWithOption";
import CustomDropSholder from "./Component/customDropSholder/CustomDropSholder";
import BlankRoundNeck from "./Component/blankRoundNeck/BlankRoundNeck";
import BlankDropSholder from "./Component/blankDropSholder/BlankDropSholder";
import CustomHoodie from "./Component/custonHoodie/CustomHoodie";
import BlankHoodie from "./Component/blankHoodie/BlankHoodie";

ReactGA.initialize("UA-267461228-1")
function App() {
  const { user, loading } = useContext(AuthContext);
  const navigate=useNavigate();
  const location=useLocation();
  const from=location.state?.from?.pathname || '/dashboard'

//   useEffect(() => {
//     if (!loading) {
//         if (!user && location.pathname !== "/login") {
//             navigate("/login");
//             console.log("no user");
//         } else if (user && location.pathname === "/login") {
//             navigate(from, {replace: true} );
//         }
//     }
// }, [user, location.pathname, navigate, loading]);


 
    // return (
    //   <>
    //     <div className="alert-overlay"  />
    //     <div className="alert-box" >
    //       <Spinner   animation="grow" variant="danger" />
    //       <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
    //       <Spinner  animation="grow" variant="light" />
    //       <Spinner  animation="grow" variant="primary" />
    //       <h2>Please wait!</h2>
    //     </div>
    //   </>
    // );
  
  return (
    <div className="App">
       
      <Routes>
      <Route path="/" element={<RedirectToAppropriateRoute/>} />
         <Route path="/login" element={<Login />} />
         <Route path="/resetPasswordFIeld" element={<ResetPasswordField />} />
         <Route path="/reset/:token" element={<UpdatePasswordField/>} />
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
        /> 
            <Route
          path="/ticket"
          element={
            <PrivateRoute>
              <Ticket />
            </PrivateRoute>
          }
        />  
         <Route path="/viewTicket/:id" element={<ViewTicket/>} />
            <Route
          path="/invoicePdf/:id"
          element={
            <PrivateRoute>
              <InvoicePdf />
            </PrivateRoute>
          }
        /> 
        
          <Route
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
          path="/screenshot"
          element={
            <PrivateRoute>
              <ScreenShot />
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
          path="/calculator"
          element={
              <TeeShirtCapingCalcForm />
           
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
           <Route
          path="/automaticLocationTest"
          element={
            <PrivateRoute>
              <LocationTest />
            </PrivateRoute>
          }
        /> 
         <Route
          path="/newOrdersWithOption"
          element={
            <PrivateRoute>
              <NewOrdersWithOption />
            </PrivateRoute>
          }
        />  
         <Route
          path="/customDropSholder"
          element={
            <PrivateRoute>
              <CustomDropSholder />
            </PrivateRoute>
          }
        /> 
        <Route
          path="/blankRoundNeck"
          element={
            <PrivateRoute>
              <BlankRoundNeck />
            </PrivateRoute>
          }
        />
        <Route
          path="/blankDropSholder"
          element={
            <PrivateRoute>
              <BlankDropSholder />
            </PrivateRoute>
          }
        /> 
        <Route
          path="/custonHoodie"
          element={
            <PrivateRoute>
              <CustomHoodie />
            </PrivateRoute>
          }
        />
        <Route
          path="/blankHoodie"
          element={
            <PrivateRoute>
              <BlankHoodie />
            </PrivateRoute>
          }
        />
      </Routes>
     
    </div>
  );
}

export default App;
