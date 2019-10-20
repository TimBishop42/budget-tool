import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    purchases: []
  };

  async componentDidMount() {
    const response = await fetch('/tool/api/getTransactions');
    const body = await response.json();
    this.setState({ purchases: body, isLoading: false });
  }

  render() {
    const {purchases, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>Test Transactions</h2>
            <div >
                hello
              </div>
            {/* {purchases.map(purchase =>
              <div key={purchase.id}>
                {purchase.name}
              </div>
            )} */}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
