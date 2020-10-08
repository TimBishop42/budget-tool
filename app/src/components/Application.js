import React, { useContext } from "react";
import '../static/css/App.css';
import 'typeface-roboto';
import Home from './Home';
import LoginPage from './LoginPage';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {inject} from "mobx-react";
import * as ROUTES from '../constants/routes';
import { UserContext } from "../auth/firebase/UserProvider";
import UserProvider from "../auth/firebase/UserProvider";


// @inject('userState')
function Application() {
    // userState = userState;
    const user = useContext(UserContext);

        return (
            user ?
            <Home />
          :
            <Router>
              <LoginPage path="/" />
              {/* <PasswordReset path = "/pw-forget" /> */}
            </Router>
          
      );
    }


export default Application;
