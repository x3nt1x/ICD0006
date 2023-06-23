import { type IJobItem } from "@/domain/IJobItem"

export interface IJob
{
    id: string;
    name: string;
    duration: string;
    totalPrice: number;
    jobItems: IJobItem[];
}