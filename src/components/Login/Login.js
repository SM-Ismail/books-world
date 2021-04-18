import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
library.add(fab, faGoogle);

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
    })

    const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var user = result.user;
                const { displayName, email } = user;
                console.log(displayName, email);
                const googleSignedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                };
                setUser(googleSignedInUser);
                setUserLoggedIn(googleSignedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <Button onClick={handleGoogleSignIn} style={{marginLeft:'570px', marginTop:'30px'}}  variant="contained" color="secondary">
            <FontAwesomeIcon icon={faGoogle} size="2x"/><span style={{marginLeft:"8px"}}>Log in with Google</span>
        </Button>  
    );
};

export default Login;