import Axios from 'axios'
import { AccountApi } from '../api'


// Store review
const Store = async (data) => {
    const header = { headers: { Authorization: "Bearer " + localStorage.getItem('token') } }
    const response = await Axios.post(`${AccountApi}review`, data, header)
    return response
}

const Review = { Store }
export default Review