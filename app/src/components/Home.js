import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import {createMuiTheme, makeStyles, MuiThemeProvider, ThemeProvider} from '@material-ui/core/styles';
import SubmissionStatus from './SubmittionAlert';
import axios from 'axios'
import TransactionService from "../rest/TransactionService";
import SubmitTransaction from "./SubmitTransaction";
import ReviewTransaction from "./ReviewTransactions";
import * as ComponentStyles from "../style/ComponentStyles";
import Button from "@material-ui/core/Button";

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
            description: '',
            amount: '',
            purchaseType: 'Wedding',
            userName: 'Loz',
            isSubmitted: false,
            activePage: 'submitPage'
            
        }
    }


    async submitPurchase() {
        if (!this.state.isSubmitted) {
            TransactionService.submitPurchase(this.state.description, this.state.amount, this.state.purchaseType, this.state.userName)
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

    changeView(buttonChoice) {
        this.setState({
            activePage: buttonChoice
        })
    }


    render() {

        return (
            <ThemeProvider theme={theme}>
                <div className={"landing-page-navigation-container"}>
                        <Button variant="contained"
                                color={this.state.activePage === PageNames.SubmitPage ? "secondary" : "primary"}
                                style={{marginRight: 8}} onClick={() => this.changeView(PageNames.SubmitPage)}>
                            Submit
                        </Button>

                        <Button variant="contained"
                                color={this.state.activePage === PageNames.ReviewPage ? "secondary" : "primary"}
                                style={{marginLeft: 8}} onClick={() => this.changeView(PageNames.ReviewPage)}>
                            Review
                        </Button>
                </div>

            { ((this.state.activePage === PageNames.SubmitPage)) ? (
                <div className={"landing-page-component-container"}>
                    <SubmitTransaction 
                    purchaseType = {this.state.purchaseType}
                    username = {this.state.userName}
                    amount = {this.state.amount}
                    description = {this.state.description}
                    isSubmitted = {this.state.isSubmitted}
                    handleChange = {this.handleChange.bind(this)}
                    submitPurchase = {this.submitPurchase.bind(this)}
                    submittionStatus = {this.submittionStatus.bind(this)}/>
                </div>
            ) : ((this.state.activePage === PageNames.ReviewPage)) && (
                <div className={"landing-page-component-container"}>
                    <ReviewTransaction />
                </div>
            )}

                </ThemeProvider>
        )
    }
}

export default Home;