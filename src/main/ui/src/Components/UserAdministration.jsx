import { withStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import TransactionService from "../Rest/TransactionService";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
    root: {
        background: 'blue',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginLeft: 16,
      },
});

const
    roleTypes = [
        {
            value: 'Role_Admin',
            label: 'admin',
        },
        {
            value: 'Role_User',
            label: 'user',
        }
    ];



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

function UserAdministration(props) {
    const classes = useStyles();
    const [roleSelection, setRoleSelection] = useState(false)

    const adminRole = {
        requestedRole : 'Role_Admin',
        role: 'Role_Admin',
    }
    const userRole = {
        requestedRole : 'Role_User',
        role: 'Role_Admin',
    }

    

    return (
        <div className="transactins-review">
            <h1>Manage Users</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="left">UserId</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Authority</StyledTableCell>
                            <StyledTableCell align="left">Role Selection</StyledTableCell>
                            {/* <StyledTableCell align="left">Cost</StyledTableCell> */}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>

                        {props.users.map(user =>
                            <StyledTableRow key={user.id}>
                                {/* <TableCell component="th" scope="row">
                                        {transaction.name}
                                    </TableCell> */}
                                <StyledTableCell align="left">{user.id}</StyledTableCell>
                                <StyledTableCell align="left">{user.email}</StyledTableCell>
                                <StyledTableCell align="left">{user.authorities[0].authority}</StyledTableCell>
                                <StyledTableCell align="left">
                                        <Button className={classes.root} onClick={() => props.submitNewRole('ROLE_ADMIN', user.id)}>Add Admin Role</Button>
                                        <Button className={classes.root} onClick={() => props.submitNewRole('ROLE_USER', user.id)}>Add User Role</Button>
                                    </StyledTableCell>
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