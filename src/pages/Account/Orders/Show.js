import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import 'react-toastify/dist/ReactToastify.css'
import { toast, Slide } from 'react-toastify'
import Requests from '../../../utils/Requests/Index'

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

const Show = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [header] = useState({ headers: { Authorization: "Bearer " + localStorage.getItem('token') } })

    // Get order history
    const fetchData = useCallback(async () => {
        try {
            const response = await Requests.Order.Show(id, header)
            if (response.status === 200) setData(response.data.data)
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                toast.error("Network error")
            }
        }
    }, [id, header])


    useEffect(() => {
        fetchData()
    }, [id, header, fetchData])

    if (isLoading) return <p className="text-center">Loading...</p>

    return (
        <div className="order-show pt-3 pt-lg-5 mt-lg-3">

            {/* Order details */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <table className="table table-sm table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <td style={{ width: 140 }}>
                                            <p className="font-13 mb-0">Order Code</p>
                                        </td>
                                        <td>
                                            <p className="font-13 mb-0">: {data.orderCode || "N/A"}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: 140 }}>
                                            <p className="font-13 mb-0">Pay with</p>
                                        </td>
                                        <td>
                                            <p className="font-13 mb-0">: {data.paymentMethod || "N/A"}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: 140 }}>
                                            <p className="font-13 mb-0">Payment Status</p>
                                        </td>
                                        <td>
                                            <p className="font-13 mb-0">: {data.paymentStatus || "N/A"}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: 140 }}>
                                            <p className="font-13 mb-0">Order Status</p>
                                        </td>
                                        <td>
                                            <p className="font-13 mb-0">: {data.status || "N/A"}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: 140 }}>
                                            <p className="font-13 mb-0">Delivery Address</p>
                                        </td>
                                        <td>
                                            <p className="font-13 mb-0">: {data.deliveryAddress || "N/A"}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 col-md-6">
                            <table className="table table-sm table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <td style={{ width: 140 }}>
                                            <p className="font-13 mb-0">Subtotal</p>
                                        </td>
                                        <td>
                                            <p className="font-13 mb-0">: {data.subTotalPrice || 0} tk.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: 140 }}>
                                            <p className="font-13 mb-0">Delivery Charge</p>
                                        </td>
                                        <td>
                                            <p className="font-13 mb-0">: {data.deliveryCharge || 0} tk.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: 140 }}>
                                            <p className="font-13 mb-0">Total</p>
                                        </td>
                                        <td>
                                            <p className="font-13 mb-0">: {data.totalPrice || 0} tk.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order products */}
            <div className="card border-0 shadow-sm mb-3">
                <div className="card-header p-2 bg-white border-0">
                    <p className="font-15 font-weight-bolder mb-0">Products</p>
                </div>
                <div className="card-body p-0">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <td><p className="text-center font-13 mb-0">#</p></td>
                                <td></td>
                                <td><p className="font-13 mb-0">Product</p></td>
                                <td><p className="font-13 mb-0">Price</p></td>
                                <td><p className="font-13 mb-0">Quantity</p></td>
                                <td><p className="font-13 mb-0">Subtotal</p></td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products && data.products.length ?
                                data.products.map((item, i) =>
                                    <tr key={i}>
                                        <td><p className="text-center font-13 mb-0">{i + 1}</p></td>
                                        <td>
                                            <img
                                                src={item.image}
                                                className="img-fluid"
                                                style={{ height: 40, width: 40 }}
                                                alt={item.name}
                                            />
                                        </td>
                                        <td><p className="font-13 mb-0">{item.name}</p></td>
                                        <td><p className="font-13 mb-0">{item.salePrice} tk.</p></td>
                                        <td><p className="font-13 mb-0">{item.quantity}</p></td>
                                        <td><p className="font-13 mb-0">{item.subTotal} tk.</p></td>
                                    </tr>
                                ) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Show;