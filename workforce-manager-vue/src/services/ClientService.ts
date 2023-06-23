import { type AxiosError } from "axios";
import { type IClient } from "@/domain/IClient"
import { type IOrder } from "@/domain/IOrder";
import { type IContact } from "@/domain/IContact";
import { type IAssignment } from "@/domain/IAssignment";
import { type IJWTResponse } from "@/domain/identity/IJWTResponse";
import { BaseEntityService } from "@/services/BaseEntityService"

export class ClientService extends BaseEntityService<IClient>
{
    constructor()
    {
        super('v1/Client');
    }

    async getClientOrders(jwtData: IJWTResponse, id: string): Promise<IOrder[] | undefined>
    {
        try
        {
            const response = await this.axios.get<IOrder[]>(`/${id}/Orders`, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await super.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.get<IOrder[]>(`/${id}/Orders`, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }

    async getClientContacts(jwtData: IJWTResponse, id: string): Promise<IContact[] | undefined>
    {
        try
        {
            const response = await this.axios.get<IContact[]>(`/${id}/Contacts`, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await super.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.get<IContact[]>(`/${id}/Contacts`, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }

    async getClientAssignments(jwtData: IJWTResponse, id: string): Promise<IAssignment[] | undefined>
    {
        try
        {
            const response = await this.axios.get<IAssignment[]>(`/${id}/Assignments`, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await super.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.get<IAssignment[]>(`/${id}/Assignments`, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }
}