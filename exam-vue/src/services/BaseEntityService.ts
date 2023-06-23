import { type AxiosError } from "axios"
import { BaseService } from "@/services/BaseService"
import { IdentityService } from "@/services/IdentityService"

export abstract class BaseEntityService<TEntity> extends BaseService
{
    constructor(url: string)
    {
        super(url);
    }

    async allAsync(): Promise<TEntity[] | undefined>
    {
        try
        {
            const response = await this.axios.get<TEntity[]>('', this.authorizationHeader());

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            if (!await this.refreshJwt(error as AxiosError))
                return undefined;

            const response = await this.axios.get<TEntity[]>('', this.authorizationHeader());

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }

    async postAsync(data: TEntity): Promise<TEntity | undefined>
    {
        try
        {
            const response = await this.axios.post<TEntity>('', data, this.authorizationHeader());

            if (response.status === 201)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            if (!await this.refreshJwt(error as AxiosError))
                return undefined;

            const response = await this.axios.post<TEntity>('', data, this.authorizationHeader());

            if (response.status === 201)
                return response.data;

            return undefined;
        }
    }

    async putAsync(id: string, data: TEntity): Promise<boolean>
    {
        try
        {
            const response = await this.axios.put(id, data, this.authorizationHeader());

            return response.status === 204;
        }
        catch (error)
        {
            if (!await this.refreshJwt(error as AxiosError))
                return false;

            const response = await this.axios.put(id, data, this.authorizationHeader());

            return response.status === 204;
        }
    }

    async findAsync(id: string): Promise<TEntity | undefined>
    {
        try
        {
            const response = await this.axios.get<TEntity>(id, this.authorizationHeader());

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            if (!await this.refreshJwt(error as AxiosError))
                return undefined;

            const response = await this.axios.get<TEntity>(id, this.authorizationHeader());

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }

    async deleteAsync(id: string): Promise<boolean>
    {
        try
        {
            const response = await this.axios.delete(id, this.authorizationHeader());

            return response.status === 204;
        }
        catch (error)
        {
            if (!await this.refreshJwt(error as AxiosError))
                return false;

            const response = await this.axios.delete(id, this.authorizationHeader());

            return response.status === 204;
        }
    }

    protected async refreshJwt(error: AxiosError): Promise<boolean>
    {
        const identityService = new IdentityService();

        return await identityService.refreshToken(error);
    }
}