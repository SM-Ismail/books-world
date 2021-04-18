import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '../Box/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const Home = () => {
    const [books, setBooks] = useState([]);
    const classes = useStyles();

    useEffect(()=>{
        fetch("https://aqueous-reef-84639.herokuapp.com/allBooks")
        .then(res => res.json())
        .then(data => setBooks(data))
    }, [])
    return (
        <div style={{margin:"20px"}}>
           <div className={classes.root} id="home">
                <Grid container spacing={3}>
                    {
                        books.map(book =>
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <Box key={book._id} book={book}></Box>
                            </Grid>)
                    }
                </Grid>
            </div>
        </div>
    );
};

export default Home;