import { ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SubmissionStatus from "./SubmittionAlert";
import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



const
    purchaseTypes = [
        {
            value: 'Wedding',
            label: 'Wedding',
        },
        {
            value: 'Alcohol',
            label: 'Alcohol',
        }
    ];
const
    userNames = [
        {
            value: 'Tim',
            label: 'Tim',
        },
        {
            value: 'Loz',
            label: 'Loz',
        }
    ];
const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

function SubmitTransaction(props) {

    return (
        <Grid container style={{ marginTop: 8 }} direction="column" spacing={2}>
            <Grid item>
                <RadioGroup
                    aria-label="User"
                    name="purchaseType"
                    row
                    style={{justifyContent: 'center'}}
                    // className={classes.group}
                    value={props.purchaseType}
                    onChange={props.handleChange}
                >
                    <FormControlLabel value="Wedding" control={<Radio />} label="Wedding" />
                    <FormControlLabel value="Alcohol" control={<Radio />} label="Alcohol" />
                </RadioGroup>
            </Grid>
            <Grid item>
                <RadioGroup
                    aria-label="User"
                    name="userName"
                    row
                    style={{justifyContent: 'center'}}
                    // className={classes.group}
                    value={props.userName}
                    onChange={props.handleChange}
                >
                    <FormControlLabel value="Tim" control={<Radio />} label="Tim" />
                    <FormControlLabel value="Loz" control={<Radio />} label="Loz" />
                </RadioGroup>
            </Grid>
            {/* <Grid item>
                <TextField
                    placeholder={"User Name"}
                    color={"secondary"}
                    variant="outlined"
                    name="userName"
                    select
                    value={props.userName}
                    onChange={props.handleChange}>
                    {userNames.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid> */}
            <Grid item>
                <TextField
                    placeholder={"Amount"}
                    variant="outlined"
                    name="amount"
                    type="number"
                    value={props.amount}
                    onChange={props.handleChange} />
            </Grid>
            <Grid item>
                <TextField
                    name="description"
                    placeholder={"Description"}
                    value={props.description}
                    onChange={props.handleChange}
                    variant="outlined" />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={props.submitPurchase} color={"primary"}>
                    {props.submittionStatus()}
                </Button>
            </Grid>
            <SubmissionStatus submissionState={props.isSubmitted} />
        </Grid>
    )
}



export default SubmitTransaction;