import { type AxiosError } from "axios";
import { type IBaseEntity } from "@/domain/IBaseEntity";
import { type IJWTResponse } from "@/domain/identity/IJWTResponse";
import { BaseService } from "@/services/BaseService";
import { IdentityService } from "@/services/IdentityService";

export abstract class BaseEntityService<TEntity extends IBaseEntity> extends BaseService
{
    constructor(url: string)
    {
        super(url);
    }

    async getAll(jwtData: IJWTResponse): Promise<TEntity[] | undefined>
    {
        try
        {
            const response = await this.axios.get<TEntity[]>('', { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await this.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.get<TEntity[]>('', { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }

    async post(jwtData: IJWTResponse, data: TEntity): Promise<TEntity | undefined>
    {
        try
        {
            const response = await this.axios.post<TEntity>('', data, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 201)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await this.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.post<TEntity>('', data, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 201)
                return response.data;

            return undefined;
        }
    }

    async put(jwtData: IJWTResponse, data: TEntity): Promise<number | undefined>
    {
        try
        {
            const response = await this.axios.put(data.id, data, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 204)
                return response.status;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await this.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.put(data.id, data, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 204)
                return response.status;

            return undefined;
        }
    }

    async find(jwtData: IJWTResponse, id: string): Promise<TEntity | undefined>
    {
        try
        {
            const response = await this.axios.get<TEntity>(id, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await this.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.get<TEntity>(id, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }

    async delete(jwtData: IJWTResponse, id: string): Promise<number | undefined>
    {
        try
        {
            const response = await this.axios.delete(id, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 204)
                return response.status;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await this.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.delete(id, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 204)
                return response.status;

            return undefined;
        }
    }

    async refreshJwt(e: AxiosError, jwtData: IJWTResponse): Promise<string | undefined>
    {
        if (e.response?.status !== 401)
            return undefined;

        let identityService = new IdentityService();

        let refreshedJwt = await identityService.refreshToken(jwtData);
        if (refreshedJwt)
            return refreshedJwt.jwt

        return undefined;
    }
}