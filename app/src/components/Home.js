import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import SubmissionStatus from './SubmittionAlert';
import axios from 'axios'
import TransactionService from "../rest/TransactionService";
import SubmitTransaction from "./SubmitTransaction";
import ReviewTransaction from "./ReviewTransactions";

const PageNames = {
    SubmitPage: 'submitPage',
    ReviewPage: 'reviewPage'
};

const
    purchaseTypes = [
        {
            value: 'Wedding',
            label: 'Wedding',
        },
        {
            value: 'Alcohol',
            label: 'Alcohol',
        }
    ];
const
    userNames = [
        {
            value: 'Tim',
            label: 'Tim',
        },
        {
            value: 'Loz',
            label: 'Loz',
        }
    ];

const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            input: {
                background: "#fff",
            },
        },
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.submitPurchase = this.submitPurchase.bind(this);
        this.state = {
            purchaseType: 'Wedding',
            userName: 'Loz',
            isSubmitted: false
            
        }
    }


    async submitPurchase() {
        if (!this.state.isSubmitted) {
            TransactionService.submitPurchase()
                .catch((error) => {
                    console.log(error);


                })
                .then((response) => {
                    console.log("api response: ", response)

                    this.setState({
                        isSubmitted: true
                    });
                });
        } else {
            console.log("already submitted");
        }
    }


    handleChange = event => {
        console.log(event);
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    submittionStatus() {
        if (!this.state.isSubmitted) {
            return "Submit"
        } else {
            return "Submitted"
        }
    }


    render() {

        return (
            <ThemeProvider theme={theme}>
            {console.log("About to show submit sections")}
            {console.log(this.props.activePage)}
            { ((this.props.activePage === PageNames.SubmitPage)) ? (
                <div className={"landing-page-component-container"}>
                {console.log("In Submit")}
                    <SubmitTransaction 
                    purchaseType = {this.state.purchaseType}
                    usrname = {this.state.userName}
                    isSubmitted = {this.state.isSubmitted}
                    handleChange = {this.handleChange.bind(this)}
                    submitPurchase = {this.submitPurchase.bind(this)}
                    submittionStatus = {this.submittionStatus.bind(this)}/>
                </div>
            ) : ((this.props.activePage === PageNames.ReviewPage)) && (
                <div className={"landing-page-component-container"}>
                    <ReviewTransaction />
                </div>
            )}

                </ThemeProvider>
        )
    }
}

export default Home;