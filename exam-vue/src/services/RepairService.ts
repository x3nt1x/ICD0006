import { BaseEntityService } from "@/services/BaseEntityService"
import { type IRepair } from "@/domain/IRepair"

export class RepairService extends BaseEntityService<IRepair>
{
    constructor()
    {
        super('v1/Repair');
    }
}