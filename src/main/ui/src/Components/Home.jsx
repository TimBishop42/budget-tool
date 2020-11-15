import React from 'react';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TransactionService from "../Rest/TransactionService";
import SubmitTransaction from "./SubmitTransaction";
import ReviewTransaction from "./ReviewTransaction";
import UserAdministration from './UserAdministration'
import Button from "@material-ui/core/Button";
import { auth } from "../firebase"

const PageNames = {
    SubmitPage: 'submitPage',
    ReviewPage: 'reviewPage',
    AdminPage: 'adminPage'
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
            description: '',
            amount: '',
            purchaseType: '',
            userName: '',
            isSubmitted: false,
            activePage: 'submitPage',
            isLoading: true,
            users: [],
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
                    // if(response.equals)
                    this.setState({
                        isSubmitted: true
                    });
                });
        } else {
            console.log("already submitted");
        }
    }

    async submitUserRole(userRole, user) {
        TransactionService.saveUserRole(userRole, user)
            .catch((error) => {
                console.log(error);
            })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        users: response.data
                    });
                }
            });
    }




    handleChange = event => {
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

    showAdminFunction() {
        if (this.props.user.roles === 'ROLE_ADMIN') {
            return (
                <Button variant="contained"
                    color={this.state.activePage === PageNames.AdminPage ? "secondary" : "primary"}
                    style={{ marginLeft: 16 }} onClick={() => this.changeView(PageNames.AdminPage)}>
                    User Admin
        </Button>
            )
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
        else if (this.props.user.roles === 'ROLE_ADMIN' && buttonChoice === 'adminPage') {
            TransactionService.getAllUsers()
                .catch((error) => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        console.log(response);
                        this.setState({ users: response.data })
                    }
                    else {
                        return null;
                    }
                })
        }
    }

    returnSelectedView() {
        if (this.state.activePage === PageNames.SubmitPage) {
            console.log("going to try and return submit page");
            return (
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
            )
        }

        else if (this.state.activePage === PageNames.ReviewPage) {

            console.log("going to try and return review page");
            return (
                <div className={"landing-page-component-container"}>
                    <ReviewTransaction
                        transactions={this.state.transactions}
                    />
                </div>
            )
        }
        else if (this.state.activePage === PageNames.AdminPage) {
            console.log("going to try and return admin page");
            return (
                <UserAdministration
                    users={this.state.users}
                    submitNewRole={this.submitUserRole.bind(this)} />
            )
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
                        {this.showAdminFunction()}
                    </div>
                </div>

                {
                    this.returnSelectedView()
                }

            </ThemeProvider>
        )
    }
}

export default Home;