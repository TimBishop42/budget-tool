import React, {Component} from 'react';
import logo from './logo.svg';
import './static/App.css';
import 'typeface-roboto';
import Home from './components/Home.js';

class App extends Component {
    state = {
        isLoading: true,
        purchases: []
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
                    </div>
                    <div className="App-main">
                        <Home/>
                    </div>
                </header>

            </div>
        );
    }
}

export default App;
