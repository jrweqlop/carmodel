import axios from "axios";

const url = process.env.NEXT_PUBLIC_API || 'http://localhost:4500/api/v1'

export const instance = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
        'X-Custom-Header': 'foobar', 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});