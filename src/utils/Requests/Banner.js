import Axios from 'axios'
import { WebApi } from '../api'

// List of banners
const Index = async () => {
    const response = await Axios.get(`${WebApi}banner`)
    return response
}

const Banner = {
    Index
}

export default Banner