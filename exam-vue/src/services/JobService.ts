import { BaseEntityService } from "@/services/BaseEntityService"
import { type IJob } from "@/domain/IJob"

export class JobService extends BaseEntityService<IJob>
{
    constructor()
    {
        super('v1/Job');
    }
}