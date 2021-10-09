import Axios from 'axios'
import { WebApi } from '../api'

// List of items
const Products = async (page) => {
    const response = await Axios.get(`${WebApi}home-products?page=${page}`)
    return response
}

const Home = {
    Products
}

export default Home