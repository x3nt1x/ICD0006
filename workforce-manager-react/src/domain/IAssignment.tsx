import { UUID } from "crypto";
import { IBaseEntity } from "./IBaseEntity";

export enum ETaskPriority
{
    Low,
    Medium,
    High
}

export enum ETaskStatus
{
    OnHold,
    Paused,
    Pending,
    Archived,
    InProgress,
    Done
}

export interface IAssignment extends IBaseEntity
{
    title: string;
    description: string;
    priority: ETaskPriority;
    status: ETaskStatus;
    dueDate: string;
    orderId: UUID;
}