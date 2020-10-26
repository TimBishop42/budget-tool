import axios from "axios";
import firebase from "firebase/app";


export class TransactionService {
    // apiBaseUrl = CONFIG.apiURL;

    constructor() {

    }

 
    submitPurchase(description, amount, purchaseType, userName) {
        let url = "/tool/api/saveTransaction"
        return firebase.auth().currentUser.getIdToken(true).then(idToken => 
         axios.post(url, {
                name: userName,
                category: purchaseType,
                description: description,
                cost: amount
            },
            {headers: {'Content-Type': 'application/json' , 'X-Authorization-Firebase': idToken}})
        )}

    reviewTransactions() {
        let url = "/tool/api/getTransactions"

        return axios.get(url)
            // , {
            //     name: 'Tim',
            //     category: 'Wedding',
            //     description: 'Bought at this place',
            //     cost: 10.27
            // },
            // {headers: {'Content-Type': 'application/json'}})
    }

}

export default new TransactionService();