import React from 'react';
import trophy from '../Image/trophy.png';


export default function SubmitActivty(props) {

    const calculateCurrentWinner = (username) => {
        let topScore = 0;
        let topScorer = ''
        state.activtySummary.map(summary => {
            if (summary.points > topScore) {
                topScore = summary.points
                topScorer = summary.username
            }
        })
        if (username === topScorer) {
            return <img src={trophy} />
        }
    }

    return(
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell align="right">Points</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.activitySummary.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.points}</TableCell>
                            <TableCell align="right">{calculateCurrentWinner(row.username)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}