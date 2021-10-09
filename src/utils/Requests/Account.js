import Axios from 'axios'
import { AccountApi } from '../api'
import { toast, Slide } from 'react-toastify'
import { errorHandeller } from './Error'
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

// My profile
const Me = async (header) => {
    const response = await Axios.get(`${AccountApi}me`, header)
    return response
}

// Update profile
const Update = async (data, header) => {
    try {
        const response = await Axios.put(`${AccountApi}me`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update password
const UpdatePassword = async (data, header) => {
    try {
        const response = await Axios.put(`${AccountApi}change-password`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Account = {
    Me,
    Update,
    UpdatePassword
}

export default Account