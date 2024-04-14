import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);


const PiePercentage = ({ title, percentage}) => {

  const [data, setData] = useState({
    labels: ['One', 'Two', 'Three'],
    datasets: [{
        data: [0,0,0],
        backgroundColor: ['aqua', 'bloodorange', 'prupel']
    }]
  });

  const options = {
    
  };

  useEffect(() => {
    setData({
        labels: [title, 'fail'],
        datasets: [{
            data: [percentage, 100 - percentage],
            backgroundColor: ['aqua', 'bloodorange', 'prupel']
        }]
    });
  }, [percentage, title]);

  return (
    <>
        <h3>{ title }</h3>
        <Pie data={data} options={options}/>
    </>
  )
}

export default PiePercentage