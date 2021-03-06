import React,{useState,useEffect} from 'react';
import { fetchDailyData } from '../../api/apiCalls';
import {Line,Bar} from 'react-chartjs-2';
import { Grid } from '@material-ui/core';

const Chart = ({data:{confirmed,recovered,deaths},country}) =>{
    const [dailyData, setDailyData] = useState([])

    useEffect(() =>{
        const fetchApi = async () => {
        setDailyData(await fetchDailyData())
        }
        fetchApi()
        console.log(dailyData)

    },[])

    console.log({confirmed,recovered,deaths});
    const lineChart = (
        dailyData.length
        ?(
        <Line 
            data={{
                labels:dailyData.map(({date}) => date),
                datasets:[{
                    data:dailyData.map(({confirmed}) => confirmed),
                    label:'Infected',
                    borderColor:'blue',
                    fill:true
                },
                {
                    data:dailyData.map(({deaths}) => deaths),
                    label:'Deaths',
                    borderColor:'red',                    
                    fill:true
                }]
            }}
        />)
        : null
    )

    const barChart = (

        confirmed
        ?(
            <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null

    )

    return(
        <Grid container style={{width:"80%",marginLeft:"auto",marginRight:"auto",marginTop:"5%"}}>
            {country? barChart : lineChart}
        </Grid>
    )
}

export default Chart;