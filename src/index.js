import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import ReactGA from "react-ga4";
const root = ReactDOM.createRoot(document.getElementById('root'));
//Initialize GA4

ReactGA.initialize("G-LJBBSL41NN");
root.render(
  <React.StrictMode>
   <BrowserRouter>
     <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode> 
  

);
const SendAnalytics = ()=> {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(SendAnalytics);
