export enum ECategory
{
    Nut,
    Bolt,
    Tire
}

export enum ELocation
{
    Drawer,
    Shelf
}

export interface IItem
{
    id: string;
    name: string;
    category: ECategory;
    location: ELocation;
    price: number;
    stock: number;
    defaultStock: number;
}