import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Plot from 'react-plotly.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
class AgeGroups extends Component {
    constructor(props) {
        super(props);

    }
    state={
        agesData:null,
    };
    componentDidMount(){
        axios.get('/getAges').then(res=>{
            //console.log(res);
            this.setState({
                agesData:res.data
            })
        }).catch(err=>{
            console.log(err)
        })
    }


    render() {
        let displayages=this.state.agesData? (
            <div>
                <h4><center>Summary of Confirmed cases as per Age Gruops</center></h4>
                    
            <div className="alignCenter">
                <Plot data={this.state.agesData.chart}
                useResizeHandler={true}
                responsive={true}
                layout={this.state.agesData.layout}
                
                ></Plot>
            </div>
            
            </div>
            ):
            <div className="padding10per">
            <Typography color="textSecondary">Loading...</Typography>
            <LinearProgress color="secondary" />
            </div>;
            return(
            <Grid container>
                    <Grid item sm={12} xs={12}>
                        <div>{displayages}</div>
                    </Grid>
                    
                </Grid>
            );                

    }
}

AgeGroups.propTypes = {

};

export default AgeGroups;