import axios from "axios";

export const api = axios.create({
    baseURL:'https://64f71e159d77540849531ed5.mockapi.io/api/v1',
    headers:{
        'content-type': 'application/json'
    }

})