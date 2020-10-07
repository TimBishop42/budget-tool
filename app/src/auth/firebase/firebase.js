import app from 'firebase/app';
import 'firebase/auth';

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
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}
export default Firebase;
