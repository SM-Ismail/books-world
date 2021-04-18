import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const CheckOut = () => {
    const classes = useStyles();
    const [product, setProduct] = useState({});
    const [userLoggedIn] = useContext(UserContext);
    const id = useParams();
    const idExtracted = { ...id };
    console.log(idExtracted.id);
    useEffect(() => {
        fetch(`https://aqueous-reef-84639.herokuapp.com/product/${idExtracted.id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
            })
    }, [idExtracted.id])
    const { bookName, author, price, info } = product;

    var today = new Date();
    let date_raw = today.getDate();
    let month_raw = today.getMonth() + 1;
    let year = today.getFullYear();
    var date, month;
    if (date_raw < 10) { date = "0" + date_raw.toString() } else { date = date_raw.toString() }
    if (month_raw < 10) { month = "0" + month_raw.toString() } else { month = month_raw.toString() }
    const dateDisplay = date+"-"+month+"-"+year;
   
    const handleCheckOut = () => {
        const newOrder = {...userLoggedIn, ...product};
        newOrder.orderDate = dateDisplay;
        console.log(newOrder);
        fetch("https://aqueous-reef-84639.herokuapp.com/addOrder", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newOrder)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
    return (
        <div style={{marginLeft:"30px", color: "green"}} className={classes.root}>
            <h2> Name of the Book: {bookName}</h2>
            <h3> Author: {author}</h3>
            <h3> Price: $ {price}</h3>
            <h3> Additional info: {info}</h3>
            <div>
                <h3>Order date: {date}{'-'}{month}{'-'}{year}</h3>
            </div>
            <Button onClick={handleCheckOut} variant="contained" color="secondary">
                Check Out
            </Button>
        </div>
    );
};

export default CheckOut;