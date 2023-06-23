import { BaseService } from "@/services/BaseService"
import { useIdentityStore } from "@/stores/identity"
import { type IAppUser } from "@/domain/identity/IAppUser";
import { type IJWTResponse } from "@/domain/identity/IJWTResponse"

export class IdentityService extends BaseService
{
    constructor()
    {
        super('v1/identity/Account/');
    }

    async getUsers(): Promise<IAppUser[] | undefined>
    {
        try
        {
            const response = await this.axios.get<IAppUser[]>('GetUsers');

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            return undefined;
        }
    }

    async register(email: string, password: string, firstName: string, lastName: string): Promise<true | undefined>
    {
        try
        {
            const response = await this.axios.post<IJWTResponse>('Register', { email, password, firstName, lastName });

            if (response.status !== 200)
                return undefined;

            useIdentityStore().setJwtResponse(response.data);

            return true;
        }
        catch (e)
        {
            return undefined;
        }
    }

    async login(email: string, password: string): Promise<true | undefined>
    {
        try
        {
            const response = await this.axios.post<IJWTResponse>('Login', { email, password });

            if (response.status !== 200)
                return undefined;

            useIdentityStore().setJwtResponse(response.data);

            return true;
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
            const response = await this.axios.post('Logout', data, { headers: { 'Authorization': 'Bearer ' + data.jwt } });

            if (response.status !== 200)
                return undefined;

            useIdentityStore().setJwtResponse(undefined);

            return true;
        }
        catch (e)
        {
            const refreshedJwt = await this.refreshToken(data);

            const response = await this.axios.post('Logout', refreshedJwt, { headers: { 'Authorization': 'Bearer ' + refreshedJwt?.jwt } });

            if (response.status !== 200)
                return undefined;

            useIdentityStore().setJwtResponse(undefined);

            return true;
        }
    }

    async refreshToken(data: IJWTResponse): Promise<IJWTResponse | undefined>
    {
        try
        {
            const response = await this.axios.post<IJWTResponse>('RefreshToken', data);

            if (response.status !== 200)
                return undefined;

            useIdentityStore().setJwtResponse(response.data);

            return response.data;
        }
        catch (e)
        {
            return undefined;
        }
    }
}