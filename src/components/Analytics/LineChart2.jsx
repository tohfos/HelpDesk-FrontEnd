import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Legend,
    Tooltip
  )
const LineChart2 = ({ y,string,labels }) => {
    let myLabels=labels? labels.map((label)=>label):[]
    let myFeatures = y? y.map((value)=> value):[]
    const data = {
        labels: myLabels,
        datasets: [{
            label: string,
            data: myFeatures,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'yellow',
            borderColor:'blue'
        }]
    };
    const options = {
        plugins: {
            legend: true,

        },
        scales: {
            x:{
                grid:{
                    display:false
                }
            },
            y:{
                min:1,
                max:5,
                ticks:{
                    stepSize:1
                },
                grid:{
                    borderDash:[10]
                }
            }
        }
    }

  return( 
  <div style={
    {
        width:'1000px',
        height:'300px',
        padding:'20px'
    }
  }>
  <Line data={data} options={options} ></Line>
  </div>
  );
};

export default LineChart2;
