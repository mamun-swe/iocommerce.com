import React, { useState } from 'react'
import './style.scss'
import { toast, Slide } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Images } from '../../utils/Images'
import Requests from '../../utils/Requests/Index'

import 'react-toastify/dist/ReactToastify.css'
toast.configure({
    autoClose: 2000,
    transition: Slide,
    position: "top-left",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
})

const Login = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)

    if (localStorage.getItem('token')) {
        history.push('/account')
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await Requests.Auth.Login(data)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                history.push('/account')
            }
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Network error.")
                }
            }
        }
    }

    return (
        <div className="Auth">
            <div className="flex-center flex-column">

                <div className="text-center logo-box">
                    <Link to="/">
                        <img src={Images.Logo} className="img-fluid" alt="..." />
                    </Link>
                </div>

                <div className="card shadow border-0">
                    <div className="card-header text-center bg-white">
                        <h4 className="mb-0">Login Account</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Phone*/}
                            <div className="form-group mb-3">
                                {errors.phone && errors.phone.message ? (
                                    <small className="text-danger">{errors.phone && errors.phone.message}</small>
                                ) : <small>Phone</small>}

                                <input
                                    type="text"
                                    name="phone"
                                    className={errors.phone ? "form-control shadow-none error" : "form-control shadow-none"}
                                    placeholder="01xxxxxxxxx"
                                    ref={register({ required: "Phone is required" })}
                                />
                            </div>

                            {/* Password */}
                            <div className="form-group mb-3">
                                {errors.password && errors.password.message ? (
                                    <small className="text-danger">{errors.password && errors.password.message}</small>
                                ) : <small>Password</small>}

                                <input
                                    type="password"
                                    name="password"
                                    className={errors.password ? "form-control shadow-none error" : "form-control shadow-none"}
                                    placeholder="*****"
                                    ref={register({
                                        required: "Please enter password",
                                        minLength: {
                                            value: 8,
                                            message: "Minimun length 8 character"
                                        }
                                    })}
                                />
                            </div>

                            <button type="submit" className="btn btn-block shadow-none" disabled={isLoading}>
                                {isLoading ? <span>Loading...</span> : <span>Submit</span>}
                            </button>

                        </form>

                        <div className="text-right mt-1">
                            <p className="mb-1">Have no account ? <Link to="/register">Register</Link></p>
                            <p>Forgot password ? <Link to="/reset">Reset</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;