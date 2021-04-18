import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Orders from './components/Orders/Orders';
import CheckOut from './components/CheckOut/CheckOut';
import Manage from './components/Manage/Manage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [bookToBuy, setBookToBuy] = useState({});
  

    return (
      <UserContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
        <div>
          <Router>
            <Header />

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              {/* <Route path="/admin">
                <Admin />
              </Route> */}
              <PrivateRoute path="/orders">
                <Orders />
              </PrivateRoute>
              <PrivateRoute path="/checkout/:id">
                <CheckOut />
              </PrivateRoute>
              <PrivateRoute path="/admin">
                <Admin />
              </PrivateRoute>
              <PrivateRoute path="/manage">
                <Manage />
              </PrivateRoute>
            </Switch>
          </Router>
        </div>
      </UserContext.Provider>
  );
}

export default App;
