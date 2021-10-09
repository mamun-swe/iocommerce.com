import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkIfLoggedIn } from '../../utils/Authenticate'

export default function Index({ children, ...rest }) {
    const loggedIn = checkIfLoggedIn()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/"
                            }}
                        />
                    )
            }
        />
    );
}