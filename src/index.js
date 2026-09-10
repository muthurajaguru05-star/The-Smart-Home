import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Categore from './Admin/Categore';
import Dashboard from './Admin/Dashboard';
import Order from './Admin/Order';
import Product from './Admin/Product';
import User from './Admin/User';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addproduct from './Admin/Addproduct';
import Addcategory from './Admin/Addcategory';
import Webregister from './Website/Webregister';
import Webabout from './Website/Webabout';
import Weblogin from './Website/Weblogin';
import Webcheckout from './Website/Webcheckout';
import { Mailjs } from './Website/Mailjs';
import Webprofile from "./Website/Webprofile";
import Logout from './Admin/Logout';
import Payment from "./Website/Payment";
import Webcontact from './Website/Webcontact';
import MyOrders from "./Website/Myorders";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
       <BrowserRouter>
    {/* <Lastnavebar/> */}
      <div className="page-animated">
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* <Route path="/" element={<Dashboard/>} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/product" element={<Product />} />
           <Route path="/addproduct" element={<Addproduct />} />
            <Route path="/categore" element={<Categore />} />
            <Route path="/user" element={<User />} />
            <Route path="/order" element={<Order />}/>
            <Route path="/addcategory" element={<Addcategory />}/>
           
           
           <Route path="/*" element={<App />} />
            <Route path='/about' element={<Webabout/>}/>
            <Route path='/register' element={<Webregister/>}/>
            <Route path='/login' element={<Weblogin/>}/>
            <Route path="/logout" element={<Logout />} />
            <Route path="/payment"element={<Payment />}/>
            <Route path='/contact' element={<Webcontact/>}/>


             <Route path="/webprofile" element={<Webprofile />} />
               <Route path="/checkout" element={<Webcheckout />} />
               <Route path="/mailjs" element={<Mailjs/>} />
               <Route path="/myorders" element={<MyOrders/>}/>

               
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
)
reportWebVitals();
