import {IAddress, ICompany} from '../common/model';


export interface IUser {
    id?: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany;
    todosSum?: number;
    completedTaskSum?: number;
    postWithMoreThen3CommentsCounter?: number;
    have2PostsWith3Comments?: boolean;
}