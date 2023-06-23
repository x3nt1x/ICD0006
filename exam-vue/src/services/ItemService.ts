import { BaseEntityService } from "@/services/BaseEntityService"
import { type IItem } from "@/domain/IItem"

export class ItemService extends BaseEntityService<IItem>
{
    constructor()
    {
        super('v1/Item');
    }
}