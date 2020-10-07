import * as React from 'react';
import {action, observable} from "mobx";
import UserStorage from "../store/UserStorage";

export const UserDetails = ({
    name: null,
    token: null  //firebase token
});

class UserState {
    @observable isLoggedIn = false;
    @observable user = UserDetails;

    constructor() {
        // Load user
        let user = UserStorage.getUser();

        if (user != null) {
            this.isLoggedIn = true;
            UserStorage.setIsLoggedIn(true);

            this.user = user;
        }
    }

    @action
    login(user) {
        //window.location.href = "/landing-page"; //temp solution not to be used as a best react practise.
        console.log('Currently in UserState: ')
        console.log(user)
        this.user = user;
        UserStorage.storeUser(user);

        setTimeout(() => {
            if (!this.isLoggedIn) {
                this.loggingInUpdateHeader()
            }
        }, 300);
    }

    @action
    loggingInUpdateHeader() {
        this.isLoggedIn = true;
        UserStorage.setIsLoggedIn(true);
        console.log(this.isLoggedIn)
        console.log(this.user)
    }

    // // Update user details off server
    // @action
    // refreshUserDetails(user) {
    //     console.log("USER BELOW IN STATE");
    //     console.log(user);
    //
    //     this.user.userId = user.userId;
    //     this.user.userRole = user.userRole;
    //     this.user.firstName = user.firstName;
    //     this.user.lastName = user.lastName;
    //     this.user.city = user.city;
    //     this.user.postCode = user.postCode;
    //     this.user.state = user.state;
    //     this.user.company = user.company;
    //     this.user.jobTitle = user.jobTitle;
    //     this.user.yearsOfExperience = user.yearsOfExperience;
    //     this.user.phoneNumber = user.phoneNumber;
    //     this.user.linkedInURL = user.linkedInURL;
    //     this.user.aboutMe = user.aboutMe;
    //     this.user.emailAddress = user.emailAddress;
    //     this.user.token = user.token;
    //
    //     UserStorage.storeUser(user);
    // }

    getUser() {
        return this.user;
    }

    getUserId() {
        if (!this.user)
            return undefined;

        return this.user.userId;
    }
    getToken() {
        if (!this.user)
            return undefined;

        return this.user.token;
    }

}

let userState = new UserState();

export default userState;