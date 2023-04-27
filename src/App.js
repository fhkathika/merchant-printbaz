import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import TeeShirtCapingCalcForm from './Component/teeShrtCapming/TeeShirtCapingCalcForm';
import PrivateRoute from "../src/routes/PrivateRoute.jsx";
import NavigationBar from './Component/Navbar/NavigationBar';
import Login from './Component/login/Login';
import Register from './Component/login/Register';
import PrintSizeDemo from './Component/printSizeDemo/PrintSizeDemo';
import TermsConditions from './Component/termsConditions/TermsConditions';
import ResellerForm from './Component/reSellerForm/ResellerForm';
import DashBoard from './dashboard/DashBoard';
function App() {
  return (
    
     <div className="App">
      <NavigationBar/>
    <Routes>
    <Route
        path="/"
        element={
          < PrivateRoute>
        <DashBoard/>
          </PrivateRoute>
       }
      />
    <Route
        path="/teeShrtCapming"
        element={ <TeeShirtCapingCalcForm/>}
      />  
    
      <Route
        path="/login"
        element={ <Login/>}
      />   
      <Route
        path="/register"
        element={<Register/>}
      /> 
       <Route
        path="/printSizeDemo"
        
        element={
        <PrivateRoute>
   <PrintSizeDemo/>
        </PrivateRoute>
        }
     
      /> 
       <Route
        path="/termsConditions"
        element={
        < PrivateRoute>
        <TermsConditions/>
        </PrivateRoute>
        }
      />
        <Route
        path="/reSellerForm"
        element={
          < PrivateRoute>
           <ResellerForm/>
          </PrivateRoute>
       }
      />  
        
    </Routes>
    </div>
   
  );
}

export default App;
