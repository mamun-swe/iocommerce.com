import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom'
import { toast, Slide } from 'react-toastify'

import { dateFormate } from '../../../utils/Helpers'
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

const Index = () => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [header] = useState({ headers: { Authorization: "Bearer " + localStorage.getItem('token') } })

    // Get order history
    const fetchData = useCallback(async () => {
        try {
            const response = await Requests.Order.Index(header)
            if (response.status === 200) setData(response.data.data)
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                toast.error("Network error")
            }
        }
    }, [header])


    useEffect(() => {
        fetchData()
    }, [header, fetchData])

    return (
        <div className="order-index pt-5 mt-lg-2">
            {isLoading ? <p>Loading...</p> :
                <table className="table table-sm table-borderless">
                    <thead>
                        <tr>
                            <td className="text-center">SL</td>
                            <td>Order code</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td className="text-center">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, i) =>
                            <tr key={i}>
                                <td className="text-center custom-py">{i + 1}</td>
                                <td className="custom-py">{item.orderCode}</td>
                                <td className="custom-py">{dateFormate(item.createdAt)}</td>
                                <td className="custom-py">
                                    <span className={item.status === 'Pending' ? "text-danger" : "text-success"}>{item.status}</span>
                                </td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-sm shadow-none"
                                        onClick={() => history.push(`/account/orders/${item._id}`)}
                                    >Track order</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </div>
    )
};

export default Index;