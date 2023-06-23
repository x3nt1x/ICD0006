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

export interface IAssignment
{
    id: string;
    orderId: string;
    title: string;
    description: string;
    priority: ETaskPriority;
    status: ETaskStatus;
    dueDate: string;
}