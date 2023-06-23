import { type AxiosError } from "axios"
import { type IJWTResponse } from "@/domain/identity/IJWTResponse"
import { type IAssignment } from "@/domain/IAssignment"
import { type IComment } from "@/domain/IComment"
import { BaseEntityService } from "@/services/BaseEntityService"
import type { IWorker } from "@/domain/IWorker"

export class AssignmentService extends BaseEntityService<IAssignment>
{
    constructor()
    {
        super('v1/Assignment');
    }

    async getAssignmentComments(jwtData: IJWTResponse, id: string): Promise<IComment[] | undefined>
    {
        try
        {
            const response = await this.axios.get<IComment[]>(`/${id}/Comments`, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await super.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.get<IComment[]>(`/${id}/Comments`, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }

    async getAssignmentWorkers(jwtData: IJWTResponse, id: string): Promise<IWorker[] | undefined>
    {
        try
        {
            const response = await this.axios.get<IWorker[]>(`/${id}/Workers`, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await super.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.get<IWorker[]>(`/${id}/Workers`, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 200)
                return response.data;

            return undefined;
        }
    }
}