import React, { useState } from 'react'
import './style.scss'
import { useForm } from 'react-hook-form'
import Requests from '../../../utils/Requests/Index';

const PasswordChange = () => {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })

    const onSubmit = async (data) => {
        if (data.newPassword !== data.rePassword) {
            return setError("rePassword", {
                type: "manual",
                message: "Password doesn't match."
            })
        }
        clearErrors("rePassword")

        setLoading(true)
        await Requests.Account.UpdatePassword(data, header)
        setLoading(false)
    }


    return (
        <div className="password-cahnge my-4">
            <div className="row">
                <div className="col-12 col-lg-8 m-auto mt-3 mb-4">
                    <div className="card">
                        <div className="title">
                            <p className="mb-0">Password change</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* old Password */}
                                <div className="form-group mb-4">
                                    {errors.oldPassword && errors.oldPassword.message ? (
                                        <p className="text-danger">{errors.oldPassword && errors.oldPassword.message}</p>
                                    ) : <p className="text-muted">Old password*</p>}

                                    <input
                                        type="password"
                                        name="oldPassword"
                                        placeholder="********"
                                        className={errors.oldPassword ? "form-control shadow-none error" : "form-control shadow-none"}
                                        ref={register({
                                            required: "Old password is required"
                                        })}
                                    />
                                </div>

                                {/* New Password */}
                                <div className="form-group mb-2">
                                    {errors.newPassword && errors.newPassword.message ? (
                                        <p className="text-danger">{errors.newPassword && errors.newPassword.message}</p>
                                    ) : <p className="text-muted">New password*</p>
                                    }

                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="********"
                                        className={errors.newPassword ? "form-control shadow-none error" : "form-control shadow-none"}
                                        ref={register({
                                            required: "New password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Minimun length 8 character"
                                            }
                                        })}
                                    />
                                </div>

                                {/* Re-type Password */}
                                <div className="form-group mb-4">
                                    {errors.rePassword && errors.rePassword.message ?
                                        <small className="text-danger">{errors.rePassword && errors.rePassword.message}</small> :
                                        <small className="text-muted">Re-type password*</small>
                                    }

                                    <input
                                        type="password"
                                        name="rePassword"
                                        placeholder="********"
                                        className={errors.rePassword ? "form-control shadow-none error" : "form-control shadow-none"}
                                        ref={register({
                                            required: "Re-type new password.",
                                            minLength: {
                                                value: 8,
                                                message: "Minimun length 8 character"
                                            }
                                        })}
                                    />
                                </div>

                                <div className="text-right">
                                    <button type="submit" className="btn shadow-none mt-3" disabled={isLoading}>
                                        {isLoading ? <span>Saving...</span> : <span>Save changes</span>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordChange;