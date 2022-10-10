import axios from "../axios"
import authApiConst from "../constants/authApiConst"

class authApi {
    constructor() {
        axios.defaults.headers.common["authorization"] = localStorage.getItem('accessToken');
    }

    login(data) {
        return axios.post(authApiConst.LOGIN, data)
    }

    register(data) {
        return axios.post(authApiConst.REGISTER, data)
    }

    checkUsername(username) {
        return axios.get(authApiConst.CHECK_USERNAME, { params: { username: username } })
    }

    checkEmail(email) {
        return axios.get(authApiConst.CHECK_EMAIL, { params: { email: email } })
    }

    changePassword(data) {
        return axios.post(authApiConst.CHANGE_PASSWORD, data)
    }
}

export default new authApi()