import axios from "../axios"
import postApiConst from "../constants/postApiConst"

class postApi {
    constructor() {
        axios.defaults.headers.common["authorization"] = localStorage.getItem('accessToken');
    }

    getCategoryPulldown() {
        return axios.post(postApiConst.CATEGORY_PULLDOWN)
    }

    getLinkDownloadTypePulldown() {
        return axios.post(postApiConst.LINK_DOWNLOAD_TYPE_PULLDOWN)
    }

    getPostList(data) {
        return axios.post(postApiConst.POST_LIST, data)
    }

    getPostDetail(data) {
        return axios.post(postApiConst.POST_DETAIL, data)
    }

    savePost(data) {
        return axios.post(postApiConst.POST_SAVE, data)
    }
}

export default new postApi()