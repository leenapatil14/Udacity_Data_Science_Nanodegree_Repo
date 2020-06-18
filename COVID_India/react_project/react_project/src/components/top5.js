import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    card:{
        padding:10,
        minWidth:80
    },
    titleCard:{
        fontSize:10,
        textAlign:'center',
        
    },
    titleContent:{
        fontSize:7,
        textAlign:'center',
    },
    countContent:{
        fontSize:13,
        fontWeight:'bold',
        textAlign:'center',
    }
    
  });
class Top5 extends Component {
    
    render() {
        const {classes} = this.props;
        const top5_=this.props.top5.map(state_data=>


        <Box p={1} >
        <div key={state_data.States}>
        
        <Card className={classes.card}>
            <CardContent className="padding0">
            <Typography className={classes.titleCard} style={{color:'#ca5d00'}}>
                {state_data.States}
                </Typography>
               
                
            </CardContent>

            <Box display={'flex'}>
                <Box p={3} flex={'auto'} className="padding10">
                <Typography color="textSecondary" className={classes.titleContent}>
                    Confirmed
                </Typography>
                <Typography className={classes.countContent} color={'primary'}>
                {state_data.Confirmed}
                </Typography>
                </Box>
                <Box p={3} flex={'auto'} className="padding10">
                <Typography color="textSecondary" className={classes.titleContent}>
                        Cured
                </Typography>
                <Typography className={classes.countContent} style={{color:"#0e840c"}}>
                {state_data.Cured}
                </Typography>
                </Box>
                <Box p={3} flex={'auto'} className="padding10">
                <Typography color="textSecondary" className={classes.titleContent}>
                        Deaths
                </Typography>
                <Typography className={classes.countContent} color={'error'}>
                {state_data.Deaths}
                </Typography>
                </Box>
            </Box>
        </Card>
        </div>
        </Box>
        
     

            
        

        );
        return (
            <div>
                <Box flexWrap="wrap" display="flex" justifyContent="center" alignItems="center" m={2} p={5} className="padding0" >
                {top5_}
                </Box>
            </div>
        );
    }
}

export default withStyles(useStyles)(Top5);