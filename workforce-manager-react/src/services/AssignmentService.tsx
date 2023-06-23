import { AxiosError } from "axios";
import { IAssignment } from "../domain/IAssignment";
import { IComment } from "../domain/IComment";
import { IJWTResponse } from "../domain/Identity/IJWTResponse";
import { BaseEntityService } from "./BaseEntityService";

export class AssignmentsService extends BaseEntityService<IAssignment>
{
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void))
    {
        super('v1/Assignment', setJwtResponse);
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
}