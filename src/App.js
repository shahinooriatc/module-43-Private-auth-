import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useContext, useState } from 'react';

export const userContext = createContext();

function App() {
  const [LoggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[LoggedInUser,setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <Route path='/inventory'>
            <Inventory></Inventory>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/shipment'>
            <Shipment></Shipment>
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetails></ProductDetails>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
