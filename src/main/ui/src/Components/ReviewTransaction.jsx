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
import { withStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 18,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

function ReviewTransaction (props) {
    const classes = useStyles();

        return (
            <div className="transactins-review">
                <h2>Review Transactions</h2>
                <TableContainer component={Paper}>
                    <Table  className={classes.table} size="small" aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="left">Category</StyledTableCell>
                                <StyledTableCell align="left">Description</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="left">Cost</StyledTableCell>
                                <StyledTableCell align="left">Purchase Date</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>

                            {props.transactions.map(transaction =>
                                <StyledTableRow key={transaction.name}>
                                    {/* <TableCell component="th" scope="row">
                                        {transaction.name}
                                    </TableCell> */}
                                    <StyledTableCell align="left">{transaction.category}</StyledTableCell>
                                    <StyledTableCell align="left">{transaction.description}</StyledTableCell>
                                    <StyledTableCell align="left">{transaction.name}</StyledTableCell>
                                    <StyledTableCell align="left">{transaction.cost}</StyledTableCell>
                                    <StyledTableCell align="left">{transaction.purchaseDate}</StyledTableCell>

                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        )
    }




export default ReviewTransaction;