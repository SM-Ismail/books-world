import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Box = (props) => {
    const book = props.book;
    const {bookName, author, price, info, imageURL, _id} = book;
    const classes = useStyles();

    let history = useHistory();
    const handleBuyNow = (id) => {
        history.push(`/checkout/${id}`);
    }
    return (
        <div style={{backgroundColor: "khaki"}}>
            <Card className={classes.root}>
                <CardActionArea style={{backgroundColor:"cornsilk"}}>
                    <CardMedia
                        className={classes.media}
                        style={{height: 0, paddingTop: '85%'}}
                          image={imageURL}
                    />
                    <CardContent style={{color:"tomato"}}>
                        <Typography  gutterBottom variant="h4" component="h5">
                            {bookName}
                         </Typography>
                         <Typography  gutterBottom variant="h5" component="h5">
                            Author: {author}
                         </Typography>
                         <Typography  gutterBottom variant="h6" component="h6">
                            {info}
                         </Typography>
                         <Typography  gutterBottom variant="h5" component="h5">
                            Price: $ {price}
                         </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={()=>handleBuyNow(_id)} size="large" color="secondary">
                        Buy Now
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Box;