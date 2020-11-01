import React from 'react';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TransactionService from "../Rest/TransactionService";
import SubmitTransaction from "./SubmitTransaction";
import ReviewTransaction from "./ReviewTransaction";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase"

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
            purchaseType: '',
            userName: '',
            isSubmitted: false,
            activePage: 'submitPage',
            isLoading: true,
            transactions: []

        }
    }

    async componentDidMount() {
        TransactionService.reviewTransactions()
            .catch((error) => {
                console.log(error);
            })
            .then(response => {
                if (response) {
                    this.setState({ transactions: response.data })
                }
                else {
                    return null;
                }
            })
            // .then(data => this.setState({ transactions: data }));
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
        console.log("Setting :" + event.target.name + " To: " + event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
            isSubmitted: false
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
        if (buttonChoice === 'reviewPage') {
            //Reload the transactions
            TransactionService.reviewTransactions()
                .catch((error) => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        this.setState({ transactions: response.data })
                    }
                    else {
                        return null;
                    }
                })
        }
    }


    render() {

        return (
            <ThemeProvider theme={theme}>
                <div className={"landing-page-navigation-container"}>
                    <div className="App-intro">

                        {/* Navigation buttons to switch between submit transactions and review transactions list */}

                        <Button variant="contained"
                            color={this.state.activePage === PageNames.SubmitPage ? "secondary" : "primary"}
                            style={{ marginRight: 8 }} onClick={() => this.changeView(PageNames.SubmitPage)}>
                            Submit
                        </Button>

                        <Button variant="contained"
                            color={this.state.activePage === PageNames.ReviewPage ? "secondary" : "primary"}
                            style={{ marginLeft: 8 }} onClick={() => this.changeView(PageNames.ReviewPage)}>
                            Review
                        </Button>
                    </div>
                </div>

                {
                    ((this.state.activePage === PageNames.SubmitPage)) ? (
                        <div className={"landing-page-component-container"}>
                            <SubmitTransaction
                                purchaseType={this.state.purchaseType}
                                username={this.state.userName}
                                amount={this.state.amount}
                                description={this.state.description}
                                isSubmitted={this.state.isSubmitted}
                                handleChange={this.handleChange.bind(this)}
                                submitPurchase={this.submitPurchase.bind(this)}
                                submittionStatus={this.submittionStatus.bind(this)} />
                        </div>
                    ) : ((this.state.activePage === PageNames.ReviewPage)) && (
                        <div className={"landing-page-component-container"}>
                            <ReviewTransaction
                                transactions={this.state.transactions}
                            />
                        </div>
                    )
                }

            </ThemeProvider>
        )
    }
}

export default Home;