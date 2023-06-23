export interface IOrder
{
    id: string;
    clientId: string;
    name: string;
    clientName?: string;
    totalTasks: number;
    start: string;
    end?: string;
}