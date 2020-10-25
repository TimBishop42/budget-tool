import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as ComponentStyles from "../Style/ComponentStyles";
import { Link } from "@reach/router";
import { signInWithGoogle, auth } from "../firebase"



const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };



        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={ComponentStyles.loginStyles.paper}>
                    <Avatar className={ComponentStyles.loginStyles.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={ComponentStyles.loginStyles.form} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="userEmail"
                            label="Email Address"
                            name="userEmail"
                            autoComplete="email"
                            autoFocus
                            onChange = {(event) => onChangeHandler(event)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="userPassword"
                            label="Password"
                            type="password"
                            id="userPassword"
                            autoComplete="current-password"
                            onChange = {(event) => onChangeHandler(event)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
                            className={ComponentStyles.loginStyles.submit}
                        >
                            Sign In
                        </Button>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={() => signInWithGoogle()}
                            className={ComponentStyles.loginStyles.submit}
                        >
                            Sign In With Google
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="signUp" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                            <Link to="signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }

export default SignIn