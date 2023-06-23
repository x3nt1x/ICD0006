import { BaseService } from "./BaseService";
import { IJWTResponse } from "../domain/Identity/IJWTResponse";
import { IRegisterData } from "../domain/Identity/IRegisterData";
import { ILoginData } from "../domain/Identity/ILoginData";

export class IdentityService extends BaseService
{
    constructor()
    {
        super('v1/identity/account/');
    }

    async register(data: IRegisterData): Promise<IJWTResponse | undefined>
    {
        try
        {
            const response = await this.axios.post<IJWTResponse>('register', data);

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (e)
        {
            return undefined;
        }
    }

    async login(data: ILoginData): Promise<IJWTResponse | undefined>
    {
        try
        {
            const response = await this.axios.post<IJWTResponse>('login', data);

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (e)
        {
            return undefined;
        }
    }

    async logout(data: IJWTResponse): Promise<true | undefined>
    {
        try
        {
            const response = await this.axios.post('logout', data,
            {
                headers: {
                    'Authorization': 'Bearer ' + data.jwt
                }
            });

            if (response.status === 200)
                return true;

            return undefined;
        }
        catch (e)
        {
            return undefined;
        }
    }

    async refreshToken(data: IJWTResponse): Promise<IJWTResponse | undefined>
    {
        try
        {
            const response = await this.axios.post<IJWTResponse>('refreshtoken', data);

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (e)
        {
            return undefined;
        }
    }
}