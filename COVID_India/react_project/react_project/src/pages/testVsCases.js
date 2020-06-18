import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Plot from 'react-plotly.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
class TestvsCases extends Component {
    constructor(props) {
        super(props);

    }
    state={
        tests:null,
        cases:null
    };
    componentDidMount(){
        axios.get('/getTests').then(res=>{
            //console.log(res);
            this.setState({
                tests:res.data.tests,
                cases:res.data.cases
            })
        }).catch(err=>{
            console.log(err)
        })
    }


    render() {
        var layout_={legend : {font : {size : 6, color : "#000"}}};
        
        let displaytests=this.state.tests? (
        <div>
            <h4><center>Statewise summary of tests done per day</center></h4>
                
        <div className="alignCenter">
            <Plot data={this.state.tests}
            useResizeHandler={true}
            responsive={true}
            layout={layout_}
            
            ></Plot>
        </div>
        {/* <h4><center>Statewise summary of Confirmed Cases per day</center></h4>
                
        <div className="alignCenter">
            <Plot data={this.state.tests}
            useResizeHandler={true}
            responsive={true}
            layout={layout_}
            
            ></Plot>
        </div> */}
        </div>
        ):
        <div className="padding10per">
        <Typography color="textSecondary">Loading...</Typography>
        <LinearProgress color="secondary" />
        </div>;
        return(
        <Grid container>
                <Grid item sm={12} xs={12}>
                    <div>{displaytests}</div>
                </Grid>
                
            </Grid>
        );
    }
}

TestvsCases.propTypes = {

};

export default TestvsCases;