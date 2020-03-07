import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from "react-router-dom";
import {inject, observer} from "mobx-react";
import userState from "../state/UserState";
import * as ComponentStyles from "../style/ComponentStyles";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {/*<Link color="inherit" href="https://material-ui.com/">*/}
            {/*    Your Website*/}
            {/*</Link>{' '}*/}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



@observer
@inject('userState')
class SignIn extends React.Component {

    logUserIn() {
        console.log('Ábout to long user in');
        this.props.userState.login({
                name: 'Tim',
                token: 'testToken'
            }
        );
        console.log('Ábout to long user in')
    }

    test(){
        console.log('where are we???')
    }

    constructor(props) {
        super();
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={ComponentStyles.loginStyles.paper}>
                    {console.log(this.props.userState.isLoggedIn)}
                    <Avatar className={ComponentStyles.loginStyles.avatar}>
                        {/*<LockOutlinedIcon />*/}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={ComponentStyles.loginStyles.form} noValidate>
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
                            className={ComponentStyles.loginStyles.submit}
                        >
                            Sign In
                        </Button>
                        {/*<RouterLink to={'/home'}>Skip</RouterLink>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={ComponentStyles.loginStyles.logIn}
                            onClick={() => this.props.userState.loginUserIn()}>
                            Skip with state
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}
export default SignIn