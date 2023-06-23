import { type IContact } from "@/domain/IContact"
import { BaseEntityService } from "@/services/BaseEntityService"

export class ContactService extends BaseEntityService<IContact>
{
    constructor()
    {
        super('v1/Contact');
    }
}