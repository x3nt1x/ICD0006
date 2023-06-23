import { type IRepairJob } from "@/domain/IRepairJob"

export interface IRepair
{
    id: string;
    schedule: string;
    totalTime: string;
    totalPrice: number;
    totalJobs: number;
    repairJobs: IRepairJob[];
}