import React, { Component, PropTypes } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import Top5 from '../components/top5';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive';

import Plotly from 'plotly.js';

class Home extends Component {
    constructor(props) {
        super(props);

    }
    state={
        top5:null,
        world:null,
        startDate:null,
        endDate:null
    };
    componentDidMount(){
      axios.get('/getCounts').then(res=>{
        //console.log(res);
        this.setState({
          top5:res.data
        })
    }).catch(err=>{
        console.log(err)
    })
      axios.get('/getWorldmap').then(res=>{
        //console.log(res);
        this.setState({
          world:res.data,
          startDate:res.data.names[0],
          endDate:res.data.names[res.data.names.length - 1]
        })
        const worldData=this.state.world;
        var graphDiv = document.getElementById('myDiv');
         var layout = {
           hovermode: 'closest',
           sliders: [{
             currentvalue: {
               visible: true,
               prefix: 'Cases as of ',
               xanchor: 'center',
               font: {size: 14, color: '#666'}
             },
             steps: worldData.sliderSteps
           }]
         };
         var config = {responsive: true}
       Plotly.newPlot(graphDiv,  {data:worldData.chart,
         layout: layout,config:config}).then(function () {
       Plotly.addFrames(graphDiv,worldData.framedata)}).then(
       
           function () {
             Plotly.animate(graphDiv, worldData.names, worldData.fig_world_animate)
           });
    }).catch(err=>{
        console.log(err)
    });
    }

    


    render() {

      
        let displaytop5=this.state.top5? (
        <div>
            <Top5 top5={this.state.top5}></Top5>
        </div>):
        <div className="padding10per">
        <Typography color="textSecondary">Loading...</Typography><LinearProgress color="secondary" />
        </div>;
        let displayWorld=this.state.world? (
          <div>
            
          
          <div>
                <h4><center>World-wide spread summary from {this.state.startDate} to {this.state.endDate}</center></h4>
                <div id="myDiv"></div>
                
            </div>
          
            
            </div>
            ):
            <div className="padding10per">
            <Typography color="textSecondary">Loading...</Typography><LinearProgress color="secondary" />
            </div>;
        return(
        <Grid container>
                <Grid item sm={12} xs={12}>
                    <h4><center>Top 5 Most Affected States as of 11 June 2020</center></h4>
                <div>{displaytop5}</div>
                </Grid>
                <Grid item sm={12} xs={12}>
                <MediaQuery maxDeviceWidth={424} orientation={'portrait'}>
              <Typography color="textSecondary"  className="alignCenter">Sorry! We cannot render in portrait mode! Kindly change the orientation to view the graph...</Typography>
          </MediaQuery>
          <MediaQuery minDeviceWidth={424} >
                <div>{displayWorld}</div>
                
                </MediaQuery>
                
                </Grid>
            </Grid>
        );
    }
}

Home.propTypes = {

};

export default Home;