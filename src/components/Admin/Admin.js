import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Admin.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Admin = () => {
    const classes = useStyles();
    const [imageURL, setImageURL] = useState(null);
    const handleAddBook = () => {
        document.getElementById("add-book").style.display = 'none';
        document.getElementById("form").style.display = 'block';
    }
    const handleSave = () => {
        const name = document.getElementById("name").value;
        const author = document.getElementById("author").value;
        const price = document.getElementById("price").value;
        const info = document.getElementById("info").value;
        const bookInfo = { bookName: name, author, price, imageURL, info };
        fetch("https://aqueous-reef-84639.herokuapp.com/addBook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookInfo)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '35454ff9895106ad18a19b3f14a69082');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    let history = useHistory();
    const handleManageProducts = () => {
        history.push('/manage')
    }
    return (
        <div style={{marginLeft: "30px"}} className={classes.root}>
            <h3 style={{ textAlign: "centre" }}>Hello, Admin</h3>
            <Button id="add-book" onClick={handleAddBook} variant="contained" color="primary">
                Add Book
            </Button>
            <Button onClick={handleManageProducts} variant="contained" color="secondary">
                Manage Products
            </Button>
            
            <div id="form" style={{ display: 'none'}}>
                <input className="inputs" type="text" id="name" placeholder="book name" />
                <br />
                <input className="inputs" type="text" id="author" placeholder="Author's name" />
                <br />
                <input className="inputs" type="text" id="price" placeholder="price" />
                <br />
               Book image: <input type="file" id="image" onChange={handleImageUpload} />
                <br />
                <input className="inputs" type="text" id="info" placeholder="information" />
                <br />
                <button onClick={handleSave} id="submit"> Save </button>
            </div>
        </div>
    );
};

export default Admin;