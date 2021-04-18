import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const Header = () => {
    let history = useHistory();
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const paths = ['', 'home', 'orders', 'admin', 'deals'];
    const handleChange = (event, newValue) => {
        setValue(newValue);
        
        history.push(`/${paths[newValue]}`);
    };
    
    const handleLogIn = () =>{
        history.push('/login')
    }
    const [userLoggedIn] = useContext(UserContext);
    console.log(userLoggedIn);
    const {email} = userLoggedIn;
    return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <h3 style={{marginRight:"50px", color:"brown"}}> Books World </h3>
                    <Tab to="/home" label="Home" />
                    <Tab to="/destination" label="Orders" />
                    <Tab to="/blog" label="Admin" />
                    <Tab to="/contact" label="Deals" />
                    <button onClick={handleLogIn} style={{backgroundColor:"green", color:"white", width: "100px", height:"60px"}}>Log In</button>
                    <p style={{marginLeft:"50px"}}>{email}</p>
                </Tabs>
            </Paper>
        </div>
    );
};

export default Header;