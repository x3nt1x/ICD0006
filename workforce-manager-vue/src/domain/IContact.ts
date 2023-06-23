export enum EContactType
{
    Email,
    Phone
}

export interface IContact
{
    id?: string;
    clientId?: string,
    content: string;
    info?: string;
    type: EContactType; 
}