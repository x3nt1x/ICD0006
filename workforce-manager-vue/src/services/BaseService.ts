import Axios, { type AxiosInstance } from 'axios'

export abstract class BaseService
{
    private static BASE_URL: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5255/api/';

    protected axios: AxiosInstance;

    constructor(url: string)
    {
        this.axios = Axios.create({
            baseURL: BaseService.BASE_URL + url,
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        })

        this.axios.interceptors.request.use(request => { return request })
    }
}