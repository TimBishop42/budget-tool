import React, { useState } from "react";
import { Link } from "@reach/router";
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as ComponentStyles from "../Style/ComponentStyles";
import { auth } from "../firebase"


const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        }
    };

    const sendResetEmail = event => {
        event.preventDefault();
        auth
          .sendPasswordResetEmail(email)
          .then(() => {
              setEmailHasBeenSent(true);
            setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
          })
          .catch(() => {
            setError("Error resetting password");
          });
      };

    return (
        <div className="mt-8">
            <Typography component="h1" variant="h5">
                Reset your Password
                    </Typography>
            <form className={ComponentStyles.loginStyles.form}>
                {emailHasBeenSent && (
                    <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
                        An email has been sent to you!
            </div>)}
                {error !== null && (
                    <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
                        {error}
                    </div>
                )}
                <Grid container direction="column">
                    <Grid item xs>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            name="userEmail"
                            label="Email"
                            type="email"
                            id="userEmail"
                            inputStyle={{ width: '50%' }}
                            onChange={onChangeHandler} />
                    </Grid>
                    <Grid item xs>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={event => {
                                sendResetEmail(event);
                              }}>Send me a reset link</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
export default PasswordReset;