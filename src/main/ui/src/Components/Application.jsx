import React, { useContext } from "react";
import '../App.css';
// import 'typeface-roboto';
import Home from './Home';
import Box from '@material-ui/core/Box';
import DefaultScreen from './DefaultScreen';
import SignIn from './SignIn';
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import { UserContext } from "../Providers/UserProvider";
import { auth } from "../firebase"
import Button from '@material-ui/core/Button';
import * as ComponentStyles from "../Style/ComponentStyles";



function Application() {
  const user = useContext(UserContext);

  function renderAuthenticatedContent(user) {
    if (user.roles) {
      return <Home user={user}/>
    }
    else {
      return <DefaultScreen />
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        {user ?
          <div style={{ width: '100%' }}>
            <Box display="flex" flexDirection="row" justifyContent="flex-end" >
              <Button
                variant="contained"
                color="primary"
                className={ComponentStyles.loginStyles.submit}
                onClick={() => { auth.signOut() }}>Sign out</Button>
            </Box>
          </div>
          : null}

        <h1>Budget App</h1>
        <div>
          Welcome
                    </div>

      </header>
      <div className="App-main"></div>
      {user ?
        renderAuthenticatedContent(user)
        :
        <Router>
          <SignIn path="/" />
          <SignUp path="signUp" />
        </Router>
      }
    </div>

  );
}


export default Application;
