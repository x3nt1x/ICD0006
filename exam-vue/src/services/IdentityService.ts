import { BaseService } from "@/services/BaseService"
import { useIdentityStore } from "@/stores/identity"
import { type IJWTResponse } from "@/domain/identity/IJWTResponse"
import { type AxiosError } from "axios"

export class IdentityService extends BaseService
{
    constructor()
    {
        super('v1/identity/Account/');
    }

    async register(email: string, password: string, firstName: string, lastName: string): Promise<boolean>
    {
        try
        {
            const response = await this.axios.post<IJWTResponse>('Register', { email, password, firstName, lastName });

            if (response.status !== 200)
                return false;

            useIdentityStore().setJwtResponse(response.data);

            return true;
        }
        catch (error)
        {
            return false;
        }
    }

    async login(email: string, password: string): Promise<boolean>
    {
        try
        {
            const response = await this.axios.post<IJWTResponse>('Login', { email, password });

            if (response.status !== 200)
                return false;

            useIdentityStore().setJwtResponse(response.data);

            return true;
        }
        catch (error)
        {
            return false;
        }
    }

    async logout(): Promise<boolean>
    {
        try
        {
            const response = await this.axios.post('Logout', this.jwtResponse, this.authorizationHeader());

            if (response.status !== 200)
                return false;

            useIdentityStore().setJwtResponse(undefined);

            return true;
        }
        catch (error)
        {
            if (!await this.refreshToken(error as AxiosError))
                return false;

            const response = await this.axios.post('Logout', this.jwtResponse, this.authorizationHeader());

            if (response.status !== 200)
                return false;

            useIdentityStore().setJwtResponse(undefined);

            return true;
        }
    }

    async refreshToken(error: AxiosError): Promise<boolean>
    {
        if (error.response?.status !== 401)
            return false;

        const response = await this.axios.post<IJWTResponse>('RefreshToken', this.jwtResponse);

        if (response.status !== 200)
            return false;

        useIdentityStore().setJwtResponse(response.data);

        return true;
    }
}