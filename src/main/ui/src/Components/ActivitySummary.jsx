import React, { useState, useEffect } from 'react';
import trophy from '../Image/trophy.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TransactionService from "../Rest/TransactionService";


const useStyles = makeStyles((theme) =>({
    table: {
      minWidth: 30,
    },
    // paper: {
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },
  }));

export default function ActivitySummary(props) {


    const classes = useStyles();


    const calculateCurrentWinner = (username) => {
        let topScore = 0;
        let topScorer = ''
        props.activitySummary.map(summary => {
            if (summary.points > topScore) {
                topScore = summary.points
                topScorer = summary.username
            }
        })
        if (username === topScorer) {
            return <img src={trophy} />
        }
    }

    const returnSummaryData = () => {
        console.log(props.activitySummary && props.activitySummary.length > 0)
        if (props.activitySummary && props.activitySummary.length > 0) {
            return(
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Winner</TableCell>
                        <TableCell align="center">User</TableCell>
                        <TableCell align="center">Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.activitySummary.map((row) => (
                        <TableRow key={row.name}>
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="center">{calculateCurrentWinner(row.username)}</TableCell>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            )
        }
        else {
            return <Paper className={classes.paper}>Loading...</Paper>
        }
    }

    return(
        returnSummaryData(props)
        
    )

}