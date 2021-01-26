import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import TransactionService from "../Rest/TransactionService";


export default function LineChart(props) {

    const [state, setState] = useState({
        labels: ['1/1/2021', '2/1/2021', 'March',
            'April', 'May'],
        activtiesUpdated: false,
        timData: [],
        lozData: [],
        timSumData: [],
        lozSumData: []
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
                let newLabels = response.data[0].map(aggregateActivity =>aggregateActivity.summaryDate)
                let newTimData = response.data[0].map(aggregateActivity =>aggregateActivity.aggregatePoints)
                let newLozData = response.data[1].map(aggregateActivity =>aggregateActivity.aggregatePoints)
                let newTimSumData = response.data[2].map(aggregateActivity =>aggregateActivity.aggregatePoints)
                let newLozSumData = response.data[3].map(aggregateActivity =>aggregateActivity.aggregatePoints)

                setState({ ...state, labels: newLabels, timData: newTimData, lozData: newLozData, timSumData: newTimSumData, lozSumData: newLozSumData});
                // displayData();
            });
    }

    const createDailyLineChart = (labels, timData, lozData) => {

        console.log("Tim Data before drawing chart: ", timData)
        console.log("Loz Data before drawing chart: ", lozData)

        let data = {labels: labels,
        datasets: [
            {
                label: 'Tim',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(242, 169, 12, 1)',
                borderWidth: 2,
                data: timData
            },
            {
                label: 'Loz',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(1, 223, 111, 1)',
                borderWidth: 2,
                data: lozData
            }]}
            return (
        <Line
                data={data}
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
            )}

    return (
        <div>
            {createDailyLineChart(state.labels, state.timData, state.lozData)}
            {createDailyLineChart(state.labels, state.timSumData, state.lozSumData)}
        </div>
    );
}
