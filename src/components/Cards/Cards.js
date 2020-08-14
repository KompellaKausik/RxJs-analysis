import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from 'react-countup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({


    infected :{
        marginRight:"1%",
        borderBottom: "10px solid rgba(0,0,255,0.5)"
    },

    deaths : {
        marginRight:"1%",
          borderBottom: "10px solid rgba(0,255,0,0.5)"
    },

    recovered :{
        marginRight:"1%",
        borderBottom: "10px solid rgba(255,0,0,0.5)"
    }

   
  });

const Cards = ({ data }) => {
    const classes = useStyles();
  console.log(data);
  if(!data.confirmed){
      return "loading"
  }
  return (
    <Grid>
      <Grid container spacing={3} justify="center" style={{marginTop:"5%"}}>
            <Grid item component={Card} xs={12} md={3} className={classes.infected}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Infected </Typography>
                    <Typography variant="h5"><CountUp
                        start={0}
                        end={data.confirmed.value}
                        duration={2.5}
                        separator=","
                    /></Typography>
                    <Typography color="textSecondary" gutterBottom>{new Date(data.lastUpdate).toDateString()} </Typography>
                    <Typography variant="body2" gutterBottom>Number of active cases</Typography>
                </CardContent>
            
            </Grid>  
            <Grid item component={Card} xs={12} md={3} className={classes.recovered}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recovered </Typography>
                    <Typography variant="h5"><CountUp
                        start={0}
                        end={data.recovered.value}
                        duration={2.5}
                        separator=","
                    /></Typography>
                    <Typography color="textSecondary" gutterBottom>{new Date(data.lastUpdate).toDateString()} </Typography>
                    <Typography variant="body2" gutterBottom>Number of recoveries</Typography>
                </CardContent>
            
            </Grid>  
            <Grid item component={Card} xs={12} md={3} className={classes.deaths}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>deaths </Typography>
                    <Typography variant="h5"><CountUp
                        start={0}
                        end={data.deaths.value}
                        duration={2.5}
                        separator=","
                    /></Typography>
                    <Typography color="textSecondary" gutterBottom>{new Date(data.lastUpdate).toDateString()} </Typography>
                    <Typography variant="body2" gutterBottom>Number of deaths</Typography>
                </CardContent>
            
            </Grid>  
        </Grid>{" "}
    </Grid>
  );
};

export default Cards;
