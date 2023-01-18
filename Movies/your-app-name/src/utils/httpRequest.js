import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const get = async (path, opitions = {}) => { // bât đồng bộ path~user/... options~param
    const response = await httpRequest.get(path, opitions) // chờ httpRequest.get()
    return response.data
}

export default httpRequest;