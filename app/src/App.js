import React, { Component } from 'react';
import logo from './logo.svg';
import './static/App.css';
import 'typeface-roboto';
import Home from './components/Home.js';
import * as ComponentStyles from "./style/ComponentStyles";
import {MuiThemeProvider} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const PageNames = {
    SubmitPage: 'submitPage',
    ReviewPage: 'reviewPage'
};

class App extends Component {
    state = {
        isLoading: true,
        purchases: [],
        activePage: 'submitPage'
    };

    async componentDidMount() {
        const response = await fetch('/tool/api/getTransactions');
        const body = await response.json();
        this.setState({ purchases: body, isLoading: false });
    }

    changeView(buttonChoice) {
        this.setState({
            activePage: buttonChoice
        })
    }

    render() {
        const { purchases, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <div className="App-intro">
                        <h1>Budget App</h1>
                        <div>
                            Welcome
                        </div>
                        {/* Navigation buttons to switch between submit transactions and review transactions list */}
                        <div className={"landing-page-navigation-container"}>
                            <MuiThemeProvider theme={ComponentStyles.buttonCustomStyles}>
                                <Button variant="contained" color={this.state.activePage === PageNames.SubmitPage ? "secondary" : "primary"} style={{ marginRight: 8 }} onClick={() => this.changeView(PageNames.SubmitPage)}>
                                    Submit Transaction
                            </Button>

                                <Button variant="contained" color={this.state.activePage === PageNames.ReviewPage ? "secondary" : "primary"} style={{ marginLeft: 8 }} onClick={() => this.changeView(PageNames.ReviewPage)}>
                                    Review
                            </Button>
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="App-main">
                        <Home activePage = {this.state.activePage}/>
                    </div>
                </header>

            </div>
        );
    }
}

export default App;
