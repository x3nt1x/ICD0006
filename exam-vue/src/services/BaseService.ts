import Axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useIdentityStore } from '@/stores/identity'
import { type IJWTResponse } from '@/domain/identity/IJWTResponse'

export abstract class BaseService
{
    private static BASE_URL: string = 'http://localhost:5138/api/';

    protected axios: AxiosInstance;
    protected jwtResponse: IJWTResponse | undefined;

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

        this.jwtResponse = useIdentityStore().JWTResponse;
    }

    protected authorizationHeader(): AxiosRequestConfig<any> | undefined
    {
        return { headers: { 'Authorization': 'Bearer ' + useIdentityStore().JWTResponse?.jwt } }
    }
}