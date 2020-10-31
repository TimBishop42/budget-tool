import React from "react";
import TransactionService from "../Rest/TransactionService";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
// const classes = useStyles();

// export default function BasicTable() {
//     const classes = useStyles();
// }


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
        TransactionService.reviewTransactions()
            .catch((error) => {
                console.log(error);
            })
            .then(response => response.data)
            .then(data => this.setState({ transactions: data }));
    }



    render() {
        return (
            <div className="transactins-review">
                <h2>Review Transactions</h2>
                <TableContainer component={Paper}>
                    <Table  size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.state.transactions.map(transaction =>
                                <TableRow key={transaction.name}>
                                    {/* <TableCell component="th" scope="row">
                                        {transaction.name}
                                    </TableCell> */}
                                    <TableCell align="right">{transaction.category}</TableCell>
                                    <TableCell align="right">{transaction.description}</TableCell>
                                    <TableCell align="right">{transaction.name}</TableCell>
                                    <TableCell align="right">{transaction.cost}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        )
    }


}

export default ReviewTransaction;