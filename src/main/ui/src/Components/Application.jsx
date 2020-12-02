import React, { useContext } from "react";
import '../App.css';
// import 'typeface-roboto';
import Home from './Home';
import Box from '@material-ui/core/Box';
import DefaultScreen from './DefaultScreen';
import SignIn from './SignIn';
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
import { UserContext } from "../Providers/UserProvider";
import { auth } from "../firebase"
import Button from '@material-ui/core/Button';
import * as ComponentStyles from "../Style/ComponentStyles";
import { Link } from "@reach/router";



function Application() {
  const user = useContext(UserContext);

  function renderAuthenticatedContent(user) {
    if (user.roles) {
      return <Home user={user} />
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
              {/* <Botton
              variant="contained"
              color="primary"
              onClick={() => {}}></Botton> */}
              <Button
                variant="contained"
                color="primary"
                className={ComponentStyles.loginStyles.submit}
                onClick={() => { auth.signOut() }}>Sign out</Button>
            </Box>
          </div>
          : null}

        <h1><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Budget App</Link></h1>
        <div>Welcome</div>
      </header>
      <div className="App-main"></div>
      {user ?
        renderAuthenticatedContent(user)
        :
        <Router>
          <SignIn path="/" />
          <SignUp path="signUp" />
          <PasswordReset path="passwordReset"/>
        </Router>
      }
    </div>

  );
}


export default Application;
