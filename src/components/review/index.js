
import React, { useState } from 'react'
import Icon from 'react-icons-kit'
import { ic_star, ic_star_border } from 'react-icons-kit/md'
import { toast, Slide } from 'react-toastify'
import { useForm } from 'react-hook-form'
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

// Rating star
const RatingStar = ({ star }) => {

    const styles = {
        fillStar: {
            color: '#fed049'
        },
        blankStar: {
            color: '#555'
        }
    }

    return (
        <div>
            {star === 5 ?
                <div>
                    <Icon style={styles.fillStar} icon={ic_star} size={16} />
                    <Icon style={styles.fillStar} icon={ic_star} size={16} />
                    <Icon style={styles.fillStar} icon={ic_star} size={16} />
                    <Icon style={styles.fillStar} icon={ic_star} size={16} />
                    <Icon style={styles.fillStar} icon={ic_star} size={16} />
                </div>
                : star === 4 ?
                    <div>
                        <Icon style={styles.fillStar} icon={ic_star} size={16} />
                        <Icon style={styles.fillStar} icon={ic_star} size={16} />
                        <Icon style={styles.fillStar} icon={ic_star} size={16} />
                        <Icon style={styles.fillStar} icon={ic_star} size={16} />
                        <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                    </div>
                    : star === 3 ?
                        <div>
                            <Icon style={styles.fillStar} icon={ic_star} size={16} />
                            <Icon style={styles.fillStar} icon={ic_star} size={16} />
                            <Icon style={styles.fillStar} icon={ic_star} size={16} />
                            <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                            <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                        </div>
                        : star === 2 ?
                            <div>
                                <Icon style={styles.fillStar} icon={ic_star} size={16} />
                                <Icon style={styles.fillStar} icon={ic_star} size={16} />
                                <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                            </div>
                            : star === 1 ?
                                <div>
                                    <Icon style={styles.fillStar} icon={ic_star} size={16} />
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                </div>
                                :
                                <div>
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                    <Icon style={styles.blankStar} icon={ic_star_border} style={{ color: "#dfdfdf" }} size={16} />
                                </div>
            }
        </div>
    );
}

// Review list
export const Reviews = (props) => {
    return (
        <div>
            <div>
                <h6 className="title">Reviews ({props.data && props.data.reviews && props.data.reviews.length ? props.data.reviews.length : '0'})</h6>
                <div className="reviews-container">
                    {props.data && props.data.reviews && props.data.reviews.length ?
                        props.data.reviews.map((item, i) =>
                            <div className="mb-4" key={i}>
                                <div className="d-flex">
                                    <div><RatingStar star={parseInt(item.rating)} /></div>
                                </div>
                                <p className="text-muted font-13 mb-1">{item.customer ? item.customer.name : null}</p>
                                <p className="font-14 mb-0">{item.review}</p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

// Review list
export const ReviewForm = (props) => {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm()
    const [rating, setRating] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        try {
            let error = true

            if (data.review) error = false
            else if (rating) error = false
            else error = true

            if (error) {
                return setError("review", {
                    type: "manual",
                    message: "Rating or Review is required."
                })
            } else {
                clearErrors("review")
            }

            if (!localStorage.getItem("token")) {
                return toast.error("Need to login.")
            }

            setLoading(true)
            const formData = {
                ...data,
                rating: rating || null,
                product: props.data._id
            }

            const response = await Requests.Review.Store(formData)
            if (response && response.status === 201) {
                toast.success(response.data.message)
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Ratings */}
                <div className="mb-3">
                    <div className={rating === 1 ? "text-warning" : "text-muted"}
                        onClick={() => setRating(1)}
                    >
                        <Icon icon={ic_star} size={16} />
                    </div>
                    <div className={rating === 2 ? "text-warning" : "text-muted"}
                        onClick={() => setRating(2)}
                    >
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                    </div>
                    <div
                        className={rating === 3 ? "text-warning" : "text-muted"}
                        onClick={() => setRating(3)}
                    >
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                    </div>
                    <div
                        className={rating === 4 ? "text-warning" : "text-muted"}
                        onClick={() => setRating(4)}
                    >
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                    </div>
                    <div
                        className={rating === 5 ? "text-warning" : "text-muted"}
                        onClick={() => setRating(5)}
                    >
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                        <Icon icon={ic_star} size={16} />
                    </div>
                </div>

                {/* Review */}
                <div className="form-group mb-3">
                    {errors.review && errors.review.message ?
                        <small className="text-danger">{errors.review && errors.review.message}</small> :
                        <small>Give your review</small>
                    }

                    <textarea
                        rows={5}
                        name="review"
                        placeholder="Your review"
                        className="form-control shadow-none"
                        ref={register()}
                    />
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        className="btn btn-add-cart shadow-none rounded"
                        // style={{ padding: "13px 20px" }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'LOADING...' : 'SUBMIT'}
                    </button>
                </div>

            </form>
        </div>
    )
}