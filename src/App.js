import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from './components/Review/Review';
import ManageInventory from './components/ManageInventory/ManageInventory';
import Error from './components/Error/Error';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const  Mycontext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <Mycontext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>email:{loggedInUser.email}</p>
      
        <Router>
        <Header></Header>
          <Switch>
            
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route exact path="/">
                <Shop></Shop>
            </Route>

            <Route path="/login">
                <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
               <Shipment></Shipment>
            </PrivateRoute>

            <Route path="/review">
              <Review></Review>
            </Route>

            <PrivateRoute path="/manage">
              <ManageInventory></ManageInventory>

            </PrivateRoute>
              
              <Route path="/product/:productKey">
                <ProductDetail></ProductDetail>
              </Route>

            <Route path="/*">
              <Error></Error>
            </Route>
        </Switch>
      </Router>
    </Mycontext.Provider>
  );
}

export default App;
