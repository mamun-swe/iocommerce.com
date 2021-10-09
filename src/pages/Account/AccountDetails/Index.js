import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'
import { toast, Slide } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { DatePicker } from '../../../components/Datepicker/Index'
import { CustomLoader } from '../../../components/ghostLoader/CustomLoader'
import Requests from '../../../utils/Requests/Index'
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


const Index = () => {
    const { register, handleSubmit, errors } = useForm()
    const [data, setData] = useState({})
    const [dob, setDob] = useState({ value: null, error: null })
    const [isLoading, setLoading] = useState(true)
    const [isUpdate, setUpdate] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })

    // Fetch data
    const fetchData = useCallback(async () => {
        const response = await Requests.Account.Me(header)
        if (response.status === 200) {
            setData(response.data.data)
            setDob({ value: response.data.data.dob })
        }

        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData()
    }, [header, fetchData])

    // Submit form
    const onSubmit = async (data) => {
        if (!dob.value) return setDob({ ...dob, error: "D.O.B is required." })

        const formData = { ...data, dob: dob.value }

        setUpdate(true)
        await Requests.Account.Update(formData, header)
        setUpdate(false)
    }

    if (isLoading) return <CustomLoader height={200} />

    return (
        <div className="account-details">
            <div className="header text-center my-4">
                <h5>account details</h5>
            </div>

            <div className="body mb-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">

                        {/* Name */}
                        <div className="col-12 col-lg-6">
                            <div className="form-group mb-4">
                                {errors.name && errors.name.message ? (
                                    <p className="text-danger">{errors.name && errors.name.message}</p>
                                ) : <p className="text-muted">Name*</p>}

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    defaultValue={data.name || null}
                                    className={errors.name ? "form-control shadow-none error" : "form-control shadow-none"}
                                    ref={register({
                                        required: "Name is required*",
                                        minLength: {
                                            value: 5,
                                            message: "Minimun length 5 character"
                                        }
                                    })}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="col-12 col-lg-6">
                            <div className="form-group mb-4">
                                <p className="text-muted">Phone number</p>

                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="01XXXXXXXXX"
                                    defaultValue={data.phone || null}
                                    className="form-control shadow-none"
                                    ref={register()}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* E-mail */}
                        <div className="col-12">
                            <div className="form-group mb-4">
                                {errors.name && errors.name.message ? (
                                    <p className="text-danger">{errors.email && errors.email.message}</p>
                                ) : <p className="text-muted">E-mail*</p>}

                                <input
                                    type="text"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    defaultValue={data.email || null}
                                    className={errors.email ? "form-control shadow-none error" : "form-control shadow-none"}
                                    ref={register({
                                        required: "E-mail is required*",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="col-12 col-lg-6">
                            <div className="form-group mb-4">
                                {errors.gender && errors.gender.message ?
                                    <p className="text-danger">{errors.gender && errors.gender.message}</p>
                                    : <p>Gender</p>}

                                <select
                                    name="gender"
                                    className="form-control shadow-none"
                                    defaultValue={data ? data.gender : null}
                                    ref={register({ required: "Gender is required*" })}
                                >
                                    <option value="">-- Select Gender --</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Marital Status */}
                        <div className="col-12 col-lg-6">
                            <div className="form-group mb-4">
                                {errors.maritalStatus && errors.maritalStatus.message ?
                                    <p className="text-danger">{errors.maritalStatus && errors.maritalStatus.message}</p>
                                    : <p>Marital status</p>}

                                <select
                                    name="maritalStatus"
                                    className="form-control shadow-none"
                                    defaultValue={data ? data.maritalStatus : null}
                                    ref={register({ required: "Marital a is required*" })}
                                >
                                    <option value="">-- Select marital status --</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Separated">Separated</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                        </div>

                        {/* D.O.B */}
                        <div className="col-12">
                            <div className="form-group mb-4">
                                {errors.dob && errors.dob.message ?
                                    <p className="text-danger">{errors.dob && errors.dob.message}</p>
                                    : <p>Date of birth</p>}

                                <DatePicker
                                    default={dob.value ? dob.value : null}
                                    value={event => setDob({ value: event, error: null })}
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="col-12 text-center">
                            <button
                                type="submit"
                                className="btn shadow-none"
                                disabled={isUpdate}
                            >
                                {isUpdate ? <span>Saving...</span> : <span>Save changes</span>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Index;