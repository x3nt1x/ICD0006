import { type IComment } from "@/domain/IComment"
import { BaseEntityService } from "@/services/BaseEntityService"

export class CommentService extends BaseEntityService<IComment>
{
    constructor()
    {
        super('v1/Comment');
    }
}