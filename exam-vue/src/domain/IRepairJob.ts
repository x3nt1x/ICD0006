export enum EStatus
{
    Pending,
    InWork,
    Done
}

export interface IRepairJob
{
    id: string;
    jobId: string;
    repairId: string;
    status: EStatus;
}