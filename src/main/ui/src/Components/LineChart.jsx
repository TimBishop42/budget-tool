import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import TransactionService from "../Rest/TransactionService";


export default function LineChart(props) {

    const [state, setState] = useState({
        labels: ['1/1/2021', '2/1/2021', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Tim',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [3, 5, 8, 11, 14]
            },
            {
                label: 'Loz',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,1,1,1)',
                borderWidth: 2,
                data: [4, 6, 10, 13, 17]
            }],
        activtiesUpdated: false
    });

    useEffect(() => {
        console.log("Getting aggregate activity")
        getAggregateActivity();
    }, [props.activitiesUpdated]);


    const getAggregateActivity = async () => {
        TransactionService.getAggregateActivity()
            .catch((error) => {
                console.log(error);
            })
            .then((response) => {
                console.log("aggregate activity api response: ", response.data)
                setState({ ...state, activtySummary: response.data});
                // displayData();
            });
    }

    return (
        <div>
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Wed Shred Scores',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    );
}
