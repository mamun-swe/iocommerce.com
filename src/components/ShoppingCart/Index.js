import React, { useEffect, useState } from 'react'
import './style.scss'
import Icon from 'react-icons-kit'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { Images } from '../../utils/Images'
import { useSelector, useDispatch } from 'react-redux'
import { ic_clear, ic_expand_less, ic_expand_more } from 'react-icons-kit/md'
import {
    productsList,
    removeProduct,
    incrementQuantity,
    decrementQuantity
} from '../../redux/Actions/cartAction'
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

const Index = ({ show, onHide }) => {
    const { register, handleSubmit, errors } = useForm()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isCheckout, setCheckout] = useState(false)
    const [isLoading, setLoading] = useState(false)
    let { cartProducts } = useSelector((state => state.products))
    const header = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

    useEffect(() => {
        dispatch(productsList())
    }, [dispatch])

    // Remove item from cart
    const removeItem = data => {
        const newData = {
            id: data.id,
            cartId: data.cartId,
            name: data.name,
            price: data.selling_price,
            stock: data.stock,
            image: data.image,
            quantity: 1
        }
        dispatch(removeProduct(newData))
    }

    // Checkout Handeller
    const checkoutHandeller = () => {
        if (localStorage.getItem("token")) {
            setCheckout(true)
        } else {
            setCheckout(false)
            toast.error("Need to login account!")
            setTimeout(() => {
                history.push("/login")
            }, 2000)
        }
    }

    // Count subtotal
    const countSubTotal = data => {
        let amount = 0

        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                const element = data[i]
                amount += element.price * element.quantity
            }
        }

        return amount
    }

    // Place order
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const orderData = {
                deliveryAddress: data.address,
                items: cartProducts.map(item => {
                    return ({
                        product: item.id,
                        quantity: item.quantity
                    })
                })
            }

            const response = await Requests.Order.Place(orderData, header)
            if (response.status === 201) {
                toast.success(response.data.message)
            }
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                toast.error("Network error")
            }
        }
    }

    return (
        <div className={show ? "shopping-cart-container open" : "shopping-cart-container"}>

            {/* Cart header */}
            <div className="cart-header border-bottom">
                <div className="d-flex">
                    <div><h6 className="mb-0">Shopping Cart</h6></div>
                    <div className="ml-auto">
                        <button type="button" className="btn btn-light rounded-circle shadow-none" onClick={onHide}>
                            <Icon icon={ic_clear} size={22} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Cart body */}
            <div className={show ? "cart-body open" : "cart-body"}>

                {!isCheckout ?
                    //  Cart items container
                    <div className="cart-items-container">
                        {cartProducts && cartProducts.length ?
                            cartProducts.map((product, i) =>
                                <div className="cart-item d-flex border-bottom p-2" key={i}>
                                    {/* Quantity Inc Desc container */}
                                    <div className="quantity-inc-desc-container">
                                        <ul>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm shadow-none"
                                                    onClick={() => dispatch(incrementQuantity(product.cartId))}
                                                    disabled={product.quantity >= product.available_quantity ? true : false}
                                                >
                                                    <Icon icon={ic_expand_less} className="icon" size={18} />
                                                </button>
                                            </li>
                                            <li><p>{product.quantity}</p></li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm shadow-none"
                                                    onClick={() => dispatch(decrementQuantity(product.cartId))}
                                                    disabled={product.quantity <= 1 ? true : false}
                                                >
                                                    <Icon icon={ic_expand_more} className="icon" size={18} />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* image container */}
                                    <div className="image-container px-2">
                                        <img src={product.image} className="img-fluid" alt="..." />
                                    </div>

                                    {/* content container */}
                                    <div className="content-container flex-fill">
                                        <p className="name">{product.name.slice(0, 15)}...</p>
                                        <p className="quantity">Quantity: {product.quantity}</p>
                                    </div>

                                    {/* price container */}
                                    <div className="price-container flex-fill">
                                        <p>Tk. {product.price * product.quantity}</p>
                                    </div>

                                    {/* remove item container */}
                                    <div className="remove-item-container px-1">
                                        <button
                                            type="button"
                                            className="btn btn-sm shadow-none"
                                            onClick={() => removeItem(product)}
                                        >
                                            <Icon icon={ic_clear} className="icon" size={17} />
                                        </button>
                                    </div>
                                </div>
                            ) :

                            <div className="text-center p-4">
                                <img src={Images.EmptyCart} className="img-fluid" alt="..." style={{ width: 200 }} />
                                <p>Your cart is empty</p>
                            </div>
                        }

                        {/* Total price */}
                        {cartProducts && cartProducts.length ?
                            <div className="text-right p-2">
                                <p>Total = {countSubTotal(cartProducts)} Tk.</p>
                            </div>
                            : null
                        }
                    </div>
                    :

                    // Order process data
                    <div className="checkout-container p-3">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Subtotal container */}
                            <div className="d-flex">
                                <div><p className="font-14 mb-0">Subtotal</p></div>
                                <div className="ml-auto">
                                    <p className="font-14 mb-0">: {countSubTotal(cartProducts)} tk.</p>
                                </div>
                            </div>

                            {/* Delivery charge */}
                            <div className="d-flex">
                                <div><p className="font-14 mb-0">Delivery charge</p></div>
                                <div className="ml-auto">
                                    <p className="font-14 mb-0">: 100 tk.</p>
                                </div>
                            </div>

                            <hr className="my-2" />

                            {/* Total */}
                            <div className="d-flex mb-4">
                                <div><p className="font-14 mb-0">Total</p></div>
                                <div className="ml-auto">
                                    <p className="font-14 mb-0">: {countSubTotal(cartProducts) + 100} tk.</p>
                                </div>
                            </div>

                            {/* Delivery address */}
                            <div className="form-group mb-3">
                                {errors.address && errors.address.message ?
                                    <p className="text-danger">{errors.address && errors.address.message}</p> :
                                    <p>Delivery address</p>
                                }

                                <input
                                    type="text"
                                    name="address"
                                    className={errors.address ? "form-control shadow-none font-13 py-3 error" : "form-control shadow-none font-13 py-3"}
                                    placeholder="Enter address"
                                    ref={register({ required: "Address is required" })}
                                />
                            </div>

                            {/* Submit button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn font-15 font-weight-bolder m-auto shadow-none px-4"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Place Order"}
                                </button>
                            </div>
                        </form>
                    </div>
                }

            </div>

            {/* Cart Footer */}
            {cartProducts && cartProducts.length && !isCheckout &&
                <div className="cart-footer border-top">
                    <button
                        type="button"
                        className="btn btn-block shadow-none py-2"
                        onClick={checkoutHandeller}
                    >Checkout</button>
                </div>
            }
        </div>
    );
};

export default Index;