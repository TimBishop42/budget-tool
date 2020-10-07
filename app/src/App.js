import React, {Component} from 'react';
import './static/css/App.css';
import 'typeface-roboto';
import Home from './components/Home.js';
import LoginPage from './components/LoginPage';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {inject} from "mobx-react";
import * as ROUTES from './constants/routes';

const PageNames = {
    SubmitPage: 'submitPage',
    ReviewPage: 'reviewPage'
};

@inject('userState')
class App extends Component {
    // userState = userState;

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
                    <h1>Budget App</h1>
                    <div>
                        Welcome
                    </div>

                </header>
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <div className="App-main">
                        <Router>

                            {this.props.userState.isLoggedIn ? (
                                <Switch>
                                    <Route exact path={ROUTES.LANDING} component={Home}/>
                                    <Route exact path={ROUTES.HOME} component={Home}/>
                                </Switch>
                            ) : (
                                <Switch>
                                    <Route exact path={ROUTES.LANDING} component={LoginPage}/>
                                    <Route exact path={ROUTES.HOME} component={LoginPage}/>
                                </Switch>
                            )
                            }

                        </Router>
                    </div>


            </div>
        );
    }
}

export default App;
