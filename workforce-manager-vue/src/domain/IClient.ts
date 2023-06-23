import { type IContact } from '@/domain/IContact';

export interface IClient
{
    id: string;
    name: string;
    totalOrders: number;
    totalTasks: number;
    contacts: IContact[];
}