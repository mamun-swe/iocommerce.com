import Axios from 'axios'
import { WebApi } from '../api'

// Index of items
const Index = async () => {
    const response = await Axios.get(`${WebApi}category`)
    return response
}

// Show specific item
const Show = async (slug) => {
    const response = await Axios.get(`${WebApi}category/${slug}`)
    return response
}

// Show item products
const Products = async (id, page) => {
    const response = await Axios.get(`${WebApi}category/products/${id}?page=${page}`)
    return response
}

const Category = {
    Index,
    Show,
    Products
}

export default Category