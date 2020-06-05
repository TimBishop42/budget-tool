import app from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB4KZkGIXussltji_ruFR-dSsRIy7SZNyQ",
    authDomain: "budget-tool-311f2.firebaseapp.com",
    databaseURL: "https://budget-tool-311f2.firebaseio.com",
    projectId: "budget-tool-311f2",
    storageBucket: "budget-tool-311f2.appspot.com",
    messagingSenderId: "288013794732",
    appId: "1:288013794732:web:033f3737fc6df85a998e09",
    measurementId: "G-XJHJW1XXH2"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}
export default Firebase;
