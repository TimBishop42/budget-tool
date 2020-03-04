import React, {Component} from 'react';
import logo from './logo.svg';
import './static/css/App.css';
import 'typeface-roboto';
import Home from './components/Home.js';
import * as ComponentStyles from "./style/ComponentStyles";
import {MuiThemeProvider} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import LoginPage from './components/LoginPage';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

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
        this.setState({purchases: body, isLoading: false});
    }

    render() {
        const {purchases, isLoading} = this.state;

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
                    </div>
                    <div className="App-main">
                        <Router>
                            <Switch>
                                <Route exact path='/' component={LoginPage}/>
                                <Route exact path='/home' component={Home}/>
                            </Switch>
                        </Router>
                    </div>
                </header>

            </div>
        );
    }
}

export default App;
