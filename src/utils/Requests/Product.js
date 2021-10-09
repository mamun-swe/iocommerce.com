import Axios from 'axios'
import { WebApi } from '../api'

// Specific item
const Show = async (slug) => {
    const response = await Axios.get(`${WebApi}product/${slug}`)
    return response
}

const Product = {
    Show
}

export default Product