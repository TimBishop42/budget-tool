import axios from "axios";

export class TransactionService {
    // apiBaseUrl = CONFIG.apiURL;

    constructor() {

    }

 
    submitPurchase(description, amount, purchaseType, userName) {
        let url = "/tool/api/saveTransaction"

        return axios.post(url, {
                name: userName,
                category: purchaseType,
                description: description,
                cost: amount
            },
            {headers: {'Content-Type': 'application/json'}})
    }

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