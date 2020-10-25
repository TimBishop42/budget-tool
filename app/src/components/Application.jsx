import React, { useContext } from "react";
import '../App.css';
// import 'typeface-roboto';
import Home from './Home';
import SignIn from './SignIn';
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import { UserContext } from "../Providers/UserProvider";
import { auth } from "../firebase"
import Button from '@material-ui/core/Button';
import * as ComponentStyles from "../Style/ComponentStyles";



function Application() {
    const user = useContext(UserContext);

        return (
          <div className="App">
                <header className="App-header">
                {user ? 
                    <Button  
                variant="contained"
                color="primary"
                className={ComponentStyles.loginStyles.submit}
                onClick = {() => {auth.signOut()}}>Sign out</Button>
            : null}

                    <h1>Budget App</h1>
                    <div>
                        Welcome
                    </div>

                </header>
                    <div className="App-main"></div>
            {user ?
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
