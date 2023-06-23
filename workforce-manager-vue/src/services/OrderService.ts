import { type AxiosError } from "axios";
import { type IOrder } from "@/domain/IOrder"
import { type IAssignment } from "@/domain/IAssignment";
import { type IJWTResponse } from "@/domain/identity/IJWTResponse";
import { BaseEntityService } from "@/services/BaseEntityService"

export class OrderService extends BaseEntityService<IOrder>
{
    constructor()
    {
        super('v1/Order');
    }

    async getOrderAssignments(jwtData: IJWTResponse, id: string): Promise<IAssignment[] | undefined>
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