import {IUser} from '../users/model';

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeo;
}

export interface IGeo {
    lat: string;
    lng: string;
}

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IPosts {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IComments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface IResponseData {
    distinctCompanyNamesOfUsersWithMore3CompletedTasks?: string[];
    companyNamesBySearchStr?: string[];
    usersBaseData?: { name: string, email: string }[];
    usersWithSumOfTodos?: IUser[];
}
