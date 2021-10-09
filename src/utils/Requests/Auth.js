import Axios from 'axios'
import { AuthApi } from '../api'


// Login to account
const Login = async (data) => {
    const response = await Axios.post(`${AuthApi}login`, data)
    return response
}

// Register account
const Register = async (data) => {
    const response = await Axios.post(`${AuthApi}register`, data)
    return response
}

const Auth = {
    Login,
    Register
}

export default Auth