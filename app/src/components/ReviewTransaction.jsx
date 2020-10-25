import React from "react";
import TransactionService from "../Rest/TransactionService";
import Grid from "@material-ui/core/Grid";


class ReviewTransaction extends React.Component {


    constructor(props) {
        super();
        this.state = {
            transactions: [],
            isLoading: true,

        }
    }

    async componentDidMount() {
        console.log("getting transaction list")
        const response = await fetch('/tool/api/getTransactions');
        const body = await response.json();
        this.setState({ transactions: body });
    }

    // async getPurchases() {
    //     TransactionService.reviewTransactions()
    //         .catch((error) => {
    //             console.log(error);


    //         })
    //         .then((response) => {
    //             console.log("api response: ", response)
    //             return response
    //         });
    // }



    render() {
        return (
            <div className="transactins-review">
                <h2>Review Transactions</h2>

                {this.state.transactions.map(transaction =>
                    <div key={transaction.id}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item>
                                {transaction.category}
                            </Grid>
                            <Grid item>
                                {transaction.description}
                            </Grid>
                            <Grid item>
                                {transaction.name}
                            </Grid>
                            <Grid item>
                                {transaction.cost}
                            </Grid>
                        </Grid>
                    </div>
                )}

            </div>

        )
    }


}

export default ReviewTransaction;