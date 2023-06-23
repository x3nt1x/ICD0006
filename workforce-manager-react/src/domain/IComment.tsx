import { IBaseEntity } from "./IBaseEntity";

export interface IComment extends IBaseEntity
{
    content: string;
    date: string;
    firstName: string;
    lastName: string;
}