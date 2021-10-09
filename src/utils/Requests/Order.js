import Axios from 'axios'
import { AccountApi } from '../api'

// List of items
const Index = async (header) => {
    const response = await Axios.get(`${AccountApi}order`, header)
    return response
}

// Show specific item
const Show = async (id, header) => {
    const response = await Axios.get(`${AccountApi}order/${id}`, header)
    return response
}

// Place order
const Place = async (data, header) => {
    const response = await Axios.post(`${AccountApi}order`, data, header)
    return response
}

const Order = {
    Index,
    Show,
    Place
}

export default Order