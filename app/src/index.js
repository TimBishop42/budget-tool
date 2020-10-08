import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './components/Application';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "mobx-react";
import userState from "./state/UserState";
import Firebase, {FirebaseContext} from './auth/firebase';

ReactDOM.render(
    // <FirebaseContext.Providor value={new Firebase()}>
    //     <Provider userState={userState}>
            <App/>,
    //     </Provider>
    // </FirebaseContext.Providor>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
