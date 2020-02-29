import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
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
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitPurchase = this.submitPurchase.bind(this);
        this.state = {
            purchaseType: 'Wedding',
            userName: 'Loz',
            isSubmitted: false,
            activePage: 'submitPage'
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
            { ((this.state.activePage === PageNames.EventsPage)) ? (
                <div className={"landing-page-component-container"}>
                    <SubmitTransaction {...this.props} />
                </div>
            ) : ((this.state.activePage === PageNames.ProfilePage)) && (
                <div className={"landing-page-component-container"}>
                    <ReviewTransaction />
                </div>
            )}

                    {/*<Grid container direction="column" spacing={2}>*/}
                    {/*    <Grid item>*/}
                    {/*        <TextField*/}
                    {/*            placeholder={"Purchase Type"}*/}
                    {/*            color={"secondary"}*/}
                    {/*            variant="outlined"*/}
                    {/*            name="purchaseType"*/}
                    {/*            select*/}
                    {/*            value={this.state.purchaseType}*/}
                    {/*            onChange={this.handleChange}>*/}
                    {/*            {purchaseTypes.map(option => (*/}
                    {/*                <MenuItem key={option.value} value={option.value}>*/}
                    {/*                    {option.label}*/}
                    {/*                </MenuItem>*/}
                    {/*            ))}*/}
                    {/*        </TextField>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item>*/}
                    {/*        <TextField*/}
                    {/*            placeholder={"User Name"}*/}
                    {/*            color={"secondary"}*/}
                    {/*            variant="outlined"*/}
                    {/*            name="userName"*/}
                    {/*            select*/}
                    {/*            value={this.state.userName}*/}
                    {/*            onChange={this.handleChange}>*/}
                    {/*            {userNames.map(option => (*/}
                    {/*                <MenuItem key={option.value} value={option.value}>*/}
                    {/*                    {option.label}*/}
                    {/*                </MenuItem>*/}
                    {/*            ))}*/}
                    {/*        </TextField>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item>*/}
                    {/*        <TextField placeholder={"Amount"} variant="outlined"/>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item>*/}
                    {/*        <TextField placeholder={"Description"} variant="outlined"/>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item>*/}
                    {/*        <Button variant="contained" onClick={this.submitPurchase} color={"primary"}>*/}
                    {/*            {this.submittionStatus()}*/}
                    {/*        </Button>*/}
                    {/*    </Grid>*/}
                    {/*    <SubmissionStatus submissionStatus={this.state.isSubmitted}/>*/}
                    {/*</Grid>*/}
                </ThemeProvider>
        )
    }
}

export default Home;