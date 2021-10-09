import Axios from 'axios'
import { WebApi } from '../api'

// Seggestion of items
const Seggestion = async (query) => {
    const response = await Axios.get(`${WebApi}search/suggestion/${query}`)
    return response
}

// Results of items
const Results = async (query) => {
    const response = await Axios.get(`${WebApi}search/results/${query}`)
    return response
}

const Search = {
    Seggestion,
    Results
}

export default Search