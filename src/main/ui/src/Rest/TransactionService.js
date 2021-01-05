import axios from "axios";
import firebase from "firebase/app";


export class TransactionService {
    // apiBaseUrl = CONFIG.apiURL;

    constructor() {

    }


    submitPurchase(description, amount, purchaseType, userName) {
        let url = "/tool/api/saveTransaction"
        return firebase.auth().currentUser.getIdToken(false).then(idToken =>
            axios.post(url, {
                name: userName,
                category: purchaseType,
                description: description,
                cost: amount
            },
                { headers: { 'Content-Type': 'application/json', 'X-Authorization-Firebase': idToken } })
        )
    }

    submitActivity(activityList, activityDate) {
        let url = "/tool/api/fitness/saveActivities"
        console.log("Activity list for submittion: " + activityList);
        return firebase.auth().currentUser.getIdToken(false).then(idToken =>
            axios.post(url, {
                    activityNames: activityList,
                    activityDate: activityDate
            },
                { headers: { 'Content-Type': 'application/json', 'X-Authorization-Firebase': idToken } })
        )
    }

    getActivitySummary() {
        let url = "/tool/api/fitness/getSummary"
        // console.log("Activity list for submittion: " + activityList);
        return firebase.auth().currentUser.getIdToken(false).then(idToken =>
            axios.get(url, { headers: { 'X-Authorization-Firebase': idToken } }))
    }

    saveUserRole(userRole, user) {
        console.log("User Role: " + userRole + " Data from user row: " + user)
        let url = "/tool/api/admin/saveNewRole"
        return firebase.auth().currentUser.getIdToken(false).then(idToken =>
            axios.post(url, {
                requestedRole: userRole,
                userId: user
            },
                { headers: { 'Content-Type': 'application/json', 'X-Authorization-Firebase': idToken } })
        )
    }

    reviewTransactions() {
        let url = "/tool/api/getTransactions"

        return firebase.auth().currentUser.getIdToken(false).then(idToken =>
            axios.get(url, { headers: { 'X-Authorization-Firebase': idToken } }))
    }

    getUserRoles() {
        let url = "/tool/api/getRoles"

        return firebase.auth().currentUser.getIdToken(false).then(idToken =>
            axios.get(url, { headers: { 'X-Authorization-Firebase': idToken } }))
    }

    getAllUsers() {
        let url = "/tool/api/admin/getAllUsers"

        return firebase.auth().currentUser.getIdToken(false).then(idToken =>
            axios.get(url, { headers: { 'X-Authorization-Firebase': idToken } }))
    }

}

export default new TransactionService();