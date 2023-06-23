import { type AxiosError } from "axios";
import { type IWorker } from "@/domain/IWorker"
import { type IJWTResponse } from "@/domain/identity/IJWTResponse";
import { BaseEntityService } from "@/services/BaseEntityService"

export class WorkerService extends BaseEntityService<IWorker>
{
    constructor()
    {
        super('v1/Worker');
    }

    async postWorkers(jwtData: IJWTResponse, data: IWorker[]): Promise<number | undefined>
    {
        try
        {
            const response = await this.axios.post<IWorker[]>(`/AddMultiple`, data, { headers: { 'Authorization': 'Bearer ' + jwtData.jwt } });

            if (response.status === 204)
                return response.status;

            return undefined;
        }
        catch (error)
        {
            const newJwt = await super.refreshJwt(error as AxiosError, jwtData);

            const response = await this.axios.post<IWorker[]>(`/AddMultiple`, data, { headers: { 'Authorization': 'Bearer ' + newJwt } });

            if (response.status === 204)
                return response.status;

            return undefined;
        }
    }
}