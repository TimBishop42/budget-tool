
import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as ComponentStyles from "../Style/ComponentStyles";



function DefaultScreen(props) {

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={ComponentStyles.loginStyles.paper}>
                <Avatar className={ComponentStyles.loginStyles.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    You do not have sufficient access to perfom any functions on this application, contact the administrator to be assigned a role.
                    </Typography>
            </div>
        </Container>
    );
}
export default DefaultScreen;