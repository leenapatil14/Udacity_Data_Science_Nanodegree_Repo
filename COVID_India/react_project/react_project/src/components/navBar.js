import React, { Component, PropTypes } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/ToolBar';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';

const drawerWidth = 280;
const useStyles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 30,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    listItemText:{
        fontSize:'1em',
    },
    paddingZero:{
        padding:0,
    }
  });
  
class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    
    state={
        open:false,
        setOpen:false
    };

    render() {
       


const {classes} = this.props;
       
        const handleDrawerOpen = () => {
            this.setState({open:true});
        };
    
        const handleDrawerClose = () => {
            this.setState({open:false});
        };
        return (

            <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.open,
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: this.state.open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  COVID-19 India Data Dashboard
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open,
                }),
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon /> 
                </IconButton>
              </div>
              <Divider />
              <List>
                
                  <ListItem button key="Home" component={Link} to="/">
                    <ListItemIcon><HomeIcon /> </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Home" />
                  </ListItem>
                  <ListItem button key="Tests v/s Cases Summary" component={Link} to="/testvscases">
                    <ListItemIcon><AssessmentIcon /> </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Tests v/s Cases Summary" />
                  </ListItem>
                  <ListItem button key="Distribution wrt Age groups" component={Link} to="/agegroup">
                    <ListItemIcon><SupervisorAccountOutlinedIcon /> </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Distribution wrt Age groups" />
                  </ListItem>
                  <ListItem button key="Hospitalizations Summary" component={Link} to="/hospitalsbeds">
                    <ListItemIcon><LocalHospitalOutlinedIcon /> </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Hospitalizations Summary" />
                  </ListItem>
                
              </List>

            </Drawer>
            </div>
            
        );
    }
}



export default withStyles(useStyles)(NavBar);