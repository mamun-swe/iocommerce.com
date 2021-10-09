import React, { useState, useEffect } from 'react'
import './style.scss'
import jwt_decode from 'jwt-decode'
import { NavLink, Route, useHistory } from 'react-router-dom'

import Navbar from '../../../components/NavBar/Index'
import Footer from '../../../components/Footer/Index'
import Dashboard from '../Dashboard/Index'
import OrderIndex from '../Orders/Index'
import OrderShow from '../Orders/Show'
import AccountDetails from '../AccountDetails/Index'
import PasswordChange from '../PasswordUpdate/Index'

const Index = () => {
    const history = useHistory()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(false)
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            const decode = jwt_decode(token)
            setUser(decode.data)
        }
    }, [])

    // Logout
    const doLogout = async () => {
        try {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                localStorage.removeItem('token')
                history.push('/')
            }, 2000);

        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="account-master">
            <Navbar />

            <div className="container py-4">
                <div className="row">
                    <div className="col-12">

                        {/* Mobile Page buttona */}
                        <div className="page-links-in-button-mobile d-lg-none">
                            <NavLink type="button" className="btn shadow-sm" exact activeClassName="is-Active" to="/account/">dashboard</NavLink>
                            <NavLink type="button" className="btn shadow-sm" exact activeClassName="is-Active" to="/account/orders">orders</NavLink>
                            <NavLink type="button" className="btn shadow-sm" exact activeClassName="is-Active" to="/account/details">account details</NavLink>
                            <NavLink type="button" className="btn shadow-sm" exact activeClassName="is-Active" to="/account/password-update">Update password</NavLink>
                            <button
                                type="button"
                                className="btn rounded-0 shadow-sm"
                                disabled={isLoading}
                                onClick={doLogout}
                            >{isLoading ? 'Logging out...' : 'logout'}</button>
                        </div>

                        <div className="d-flex">
                            {/* Side Menu */}
                            <div className="side-menu px-lg-3 d-none d-lg-block">
                                <NavLink exact activeClassName="is-Active" to="/account/">dashboard</NavLink>
                                <NavLink exact activeClassName="is-Active" to="/account/orders">orders</NavLink>
                                <NavLink exact activeClassName="is-Active" to="/account/details">account details</NavLink>
                                <NavLink exact activeClassName="is-Active" to="/account/password-update">Update password</NavLink>
                                <button
                                    type="button"
                                    className="btn btn-block rounded-0 shadow-none"
                                    disabled={isLoading}
                                    onClick={doLogout}
                                >{isLoading ? 'Logging out...' : 'logout'}</button>
                            </div>

                            {/* Main Menu */}
                            <div className="main-menu flex-fill px-lg-3">
                                <Route
                                    exact
                                    path='/account/'
                                    component={() => <Dashboard user={user} />}
                                />
                                <Route exact path="/account/orders" component={OrderIndex} />
                                <Route exact path="/account/orders/:id" component={OrderShow} />
                                <Route
                                    exact
                                    path='/account/details'
                                    component={() => <AccountDetails user={user} />}
                                />

                                <Route exact path="/account/password-update" component={PasswordChange} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Index;