import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App.js';

const PrivateRoute = ({ children, ...rest }) => {
    const [userLoggedIn] = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                userLoggedIn.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;