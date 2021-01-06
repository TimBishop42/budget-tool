import { ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SubmissionStatus from "./SubmittionAlert";
import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from "react-datepicker";
import TransactionService from "../Rest/TransactionService";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ActivitySummary from './ActivitySummary';


import "react-datepicker/dist/react-datepicker.css";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function SubmitActivty() {
    const [startDate, setStartDate] = useState(new Date());

    const classes = useStyles();

    const [state, setState] = useState({
        run: false,
        pushups: false,
        steps: false,
        gym: false,
        nodrinking: false,
        sundaydrinking: false,
        isSubmitted: false,
        activityDate: new Date(),
        submittionError: '',
        activtySummary: [],
        activitiesUpdated: false,
    });


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked, isSubmitted: false });
    };

    const handleDateChange = (date) => {
        setState({ ...state, activityDate: date, isSubmitted: false })
    }

    useEffect(() => {
        console.log("Getting activity summary")
        getActivitySummary();
    }, [state.activitiesUpdated]);

    const prepSelection = () => {
        const activityList = [];
        //check every single value that we are submitting.....
        if (state.run) {
            activityList.push("RUN")
        }
        if (state.pushups) {
            activityList.push("PUSHUPS")
        }
        if (state.steps) {
            activityList.push("STEPS")
        }
        if (state.gym) {
            activityList.push("GYM")
        }
        if (state.nodrinking) {
            activityList.push("NODRINKING")
        }
        if (state.sundaydrinking) {
            activityList.push("SUNDAYDRINKING")
        }
        activityList.map((activity) => {
            console.log(activity)
        })
        return activityList;
    }

    const submitSelections = async () => {
        if (!state.isSubmitted) {
            const activityList = prepSelection()
            TransactionService.submitActivity(activityList, state.activityDate)
                .catch((error) => {
                    console.log(error);
                    setState({ ...state, submittionError: error })
                })
                .then((response) => {
                    console.log("api response: ", response)
                    // if(response.equals)
                    setState({ ...state, isSubmitted: true, activitiesUpdated: !state.activitiesUpdated });
                });
        } else {
            console.log("Already Submitted");
        }
    }

    const getActivitySummary = async () => {
        TransactionService.getActivitySummary()
            .catch((error) => {
                console.log(error);
            })
            .then((response) => {
                console.log("api response: ", response.data)
                setState({ ...state, activtySummary: response.data });
                // displayData();
            });
    }


    const submittionStatus = () => {
        if (!state.isSubmitted) {
            return "Submit"
        } else {
            return "Submitted"
        }
    }

    return (
        <div>
            <Grid container style={{ marginTop: 8 }} direction="column" spacing={2}>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.run}
                                onChange={handleChange}
                                name="run"
                                color="primary"
                            />
                        }
                        label="Run"
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.pushups}
                                onChange={handleChange}
                                name="pushups"
                                color="primary"
                            />
                        }
                        label="Pushups"
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.steps}
                                onChange={handleChange}
                                name="steps"
                                color="primary"
                            />
                        }
                        label="10k Steps"
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.gym}
                                onChange={handleChange}
                                name="gym"
                                color="primary"
                            />
                        }
                        label="Gym"
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.nodrinking}
                                onChange={handleChange}
                                name="nodrinking"
                                color="primary"
                            />
                        }
                        label="No Drinking"
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.sundaydrinking}
                                onChange={handleChange}
                                name="sundaydrinking"
                                color="primary"
                            />
                        }
                        label="Sunday Drinking"
                    />
                </Grid>
                <Grid item>
                    <DatePicker selected={state.activityDate} onChange={handleDateChange} />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => { submitSelections() }} color={"primary"}>
                        {submittionStatus()}
                    </Button>
                </Grid>
                <SubmissionStatus
                    submissionState={state.isSubmitted}
                    submisisonError={state.submisisonError} />
            </Grid>
            <h1>Tim and Loz Get Shredded Scores!!!</h1>
            <ActivitySummary
            activitySummary={state.activtySummary}/>
        </div>


    )
}
