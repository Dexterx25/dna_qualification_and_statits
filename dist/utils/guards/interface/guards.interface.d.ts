import { Request } from 'express';
export interface IAccess {
    id: string;
}
export interface IRefresh {
    id: string;
}
export interface IAccess {
}
export interface ICustomReq extends Request {
    session: IAccess | IRefresh;
}
export interface IUserPermission {
    name: string;
    module: string;
}
