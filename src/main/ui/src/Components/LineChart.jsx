import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const state = {
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
        }
    ]
}


export default function LineChart() {

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
            }]
    });

    return (
        <div>
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
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
  