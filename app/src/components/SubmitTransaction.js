import {ThemeProvider} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SubmissionStatus from "./SubmittionAlert";
import React from "react";


class SubmitTransaction extends React.Component {

    constructor(props) {
        super();
    }
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            placeholder={"Purchase Type"}
                            color={"secondary"}
                            variant="outlined"
                            name="purchaseType"
                            select
                            value={this.state.purchaseType}
                            onChange={this.handleChange}>
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
                            value={this.state.userName}
                            onChange={this.handleChange}>
                            {userNames.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Amount"} variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Description"} variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={this.submitPurchase} color={"primary"}>
                            {this.submittionStatus()}
                        </Button>
                    </Grid>
                    <SubmissionStatus submissionStatus={this.state.isSubmitted}/>
                </Grid>
            </ThemeProvider>
        )
    }
}


export default SubmitTransaction;