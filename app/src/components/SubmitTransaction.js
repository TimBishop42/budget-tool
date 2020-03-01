import { ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SubmissionStatus from "./SubmittionAlert";
import React from "react";


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

class SubmitTransaction extends React.Component {

    constructor(props) {
        super();
    }
    render() {
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        placeholder={"Purchase Type"}
                        color={"secondary"}
                        variant="outlined"
                        name="purchaseType"
                        select
                        value={this.props.purchaseType}
                        onChange={this.props.handleChange}>
                        {purchaseTypes.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        placeholder={"User Name"}
                        color={"secondary"}
                        variant="outlined"
                        name="userName"
                        select
                        value={this.props.userName}
                        onChange={this.props.handleChange}>
                        {userNames.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        placeholder={"Amount"}
                        variant="outlined"
                        name="amount"
                        value={this.props.amount}
                        onChange={this.props.handleChange}/>
                    </Grid>
                <Grid item>
                    <TextField 
                    name="description"
                    placeholder={"Description"} 
                    value={this.props.description}
                    onChange={this.props.handleChange}
                    variant="outlined" />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={this.props.submitPurchase} color={"primary"}>
                        {this.props.submittionStatus()}
                    </Button>
                </Grid>
                <SubmissionStatus submissionState={this.props.isSubmitted} />
            </Grid>
        )
    }
}


export default SubmitTransaction;