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
import { Tooltip } from "@material-ui/core";
import { auth } from 'firebase';


const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
    root: {
        background: '#3f50b5',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginLeft: 16,
        minWidth: '200px'
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
        requestedRole: 'Role_Admin',
        role: 'Role_Admin',
    }
    const userRole = {
        requestedRole: 'Role_User',
        role: 'Role_Admin',
    }

    function ToolButton(user, roleType, buttonText){
        let warningText = "";
        user.authorities.map(authorityObject => {
            console.log(authorityObject)
            console.log(roleType)
            if(authorityObject.authority === roleType) {
                warningText = "User already has this role";
            }
        })
        return (
        <Tooltip title={warningText}>
            <Button className={classes.root} onClick={() => props.submitNewRole(roleType, user.id)}>{buttonText}</Button>
        </Tooltip>
        )
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
                                <StyledTableCell align="left">{user.authorities.map(authority => {
                                    return authority.authority.replace('ROLE_', ' ');
                                    // {authority.role}
                                    // authority.replace('ROLE_', '')
                                })}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                {ToolButton(user, "ROLE_ADMIN", "Add Admin Role")}
                                {ToolButton(user, "ROLE_USER", "Add User Role")}
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