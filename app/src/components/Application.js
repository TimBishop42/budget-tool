import React, { useContext } from "react";
import '../static/css/App.css';
import 'typeface-roboto';
import Home from './Home';
import SignIn from './SignIn';
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import UserProvider from "../auth/firebase/UserProvider";
import { UserContext } from "../auth/firebase/UserProvider";


// @inject('userState')
function Application() {
    // userState = userState;
    const user = useContext(UserContext);
    console.log(user);
    console.log('In the main application');

        return (
          <div className="App">
                <header className="App-header">
                    <h1>Budget App</h1>
                    <div>
                        Welcome
                    </div>

                </header>
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <div className="App-main"></div>
            {user === null ?
            <Home />
          :
            <Router>
              <SignIn path="/" />
              <SignUp path = "signUp" />
            </Router>
          }
          </div>
          
      );
    }


export default Application;
