import { withStyles, makeStyles } from '@material-ui/core/styles';
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

function UserAdministration (props) {
    const classes = useStyles();

    return (
        <div className="transactins-review">
            <h1>Manage Users</h1>
            <TableContainer component={Paper}>
                    <Table  className={classes.table} size="small" aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="left">Username</StyledTableCell>
                                <StyledTableCell align="left">Email</StyledTableCell>
                                <StyledTableCell align="left">Authority?</StyledTableCell>
                                {/* <StyledTableCell align="left">Cost</StyledTableCell> */}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>

                            {props.users.map(user =>
                                <StyledTableRow key={transaction.name}>
                                    {/* <TableCell component="th" scope="row">
                                        {transaction.name}
                                    </TableCell> */}
                                    <StyledTableCell align="left">{user.name}</StyledTableCell>
                                    <StyledTableCell align="left">{user.email}</StyledTableCell>
                                    <StyledTableCell align="left">{user.authorities}</StyledTableCell>
                                    {/* <StyledTableCell align="left">{transaction.cost}</StyledTableCell> */}
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            
            </div>

            )



}

export default UserAdministration;