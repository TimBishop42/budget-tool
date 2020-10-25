import { Link } from "@reach/router";
import React, { useContext, useState } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as ComponentStyles from "../Style/ComponentStyles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, { displayName });
        }
        catch (error) {
            setError('Error Signing up with email and password');
        }

        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <form className={ComponentStyles.loginStyles.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="displayName"
                    value={displayName}
                    placeholder="E.g: Tim"
                    id="displayName"
                    onChange={event => onChangeHandler(event)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => onChangeHandler(event)}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => onChangeHandler(event)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(event) => { createUserWithEmailAndPasswordHandler(event, email, password) }}
                    className={ComponentStyles.loginStyles.submit}>
                    Sign Up
                        </Button>
            </form>
        </Container>
    );
}


export default SignUp;