import Axios from 'axios'
import { WebApi } from '../api'


// Store review
const SentMail = async (data) => {
    return await Axios.post(`${WebApi}mail`, data)
}

const Mail = { SentMail }
export default Mail