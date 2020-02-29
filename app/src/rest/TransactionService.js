import axios from "axios";

export class TransactionService {
    // apiBaseUrl = CONFIG.apiURL;

    constructor() {

    }

    //If we are getting event details for a user why are we not passing the unique token?
    submitPurchase() {
        let url = "/tool/api/saveTransaction"

        return axios.post(url, {
                name: 'Tim',
                category: 'Wedding',
                description: 'Bought at this place',
                cost: 10.27
            },
            {headers: {'Content-Type': 'application/json'}})
    }

}

export default new TransactionService();