import {Request, Response} from "express";
import UserService from '../modules/users/service';
import {Constants} from '../modules/common/constants';
import axios from "axios";
import {IUser} from '../modules/users/model';
import TodoService from '../modules/todos/service';
import {ITodo} from '../modules/todos/model';
import {IPosts, IResponseData} from '../modules/common/model';

export class DataController {

    private userService: UserService = new UserService();
    private todoService: TodoService = new TodoService();

    public async getData(req: Request, res: Response) {
        const resData: IResponseData = {
            distinctCompanyNamesOfUsersWithMore3CompletedTasks: [],
            companyNamesBySearchStr: [],
            usersBaseData: [],
            usersWithSumOfTodos: [],
        };
        const companyNames = {};
        const companyNamesSearchStr = {};

        let {company} = req.query;
        company = typeof company === 'string' ? company : '';

        const resUsers: IUser[] = await this.userService.getAll();
        const resTodos: ITodo[] = await this.todoService.get();
        const todosGroupedByUserId = this.groupByPropArray(resTodos, 'userId');

        const {data: resPosts} = await axios({url: `${Constants.URL}/posts`});
        const resPostsGroupByUserId = this.groupByPropArray(resPosts, 'userId');
        const {data: resComments} = await axios({url: `${Constants.URL}/comments`});
        const resCommentsGroupByPostId = this.groupByPropArray(resComments, 'postId');


        resUsers.forEach((u: IUser) => {
            u.todosSum = todosGroupedByUserId[u.id].length;
            const userHasMoreThen3CompletedTasks = todosGroupedByUserId[u.id].filter((f: ITodo) => f.completed).length > 3;
            if (userHasMoreThen3CompletedTasks) {
                const compName = u.company.name;
                // @ts-ignore
                companyNames[compName] = 1;
            }
            if (u.company.name.toLowerCase().includes(company.toString().toLowerCase())) {
                // @ts-ignore
                companyNamesSearchStr[u.company.name] = 1;
            }

            resPostsGroupByUserId[u.id].forEach((p: IPosts) => {
                if (resCommentsGroupByPostId[p.id].length > 3) {
                    u.postWithMoreThen3CommentsCounter = u.postWithMoreThen3CommentsCounter === undefined ? 1 : ++u.postWithMoreThen3CommentsCounter;
                    if (u.postWithMoreThen3CommentsCounter > 1) {
                        this.addUserToBaseList(u, resData)
                    }
                } else if (u.address && u.address.geo && u.address.geo.lat && u.address.geo.lng) {
                    this.addUserToBaseList(u, resData)
                }
            })
        });

        resData.distinctCompanyNamesOfUsersWithMore3CompletedTasks = Object.keys(companyNames);
        resData.companyNamesBySearchStr = Object.keys(companyNamesSearchStr);
        res.json(resData);


    }


    groupByPropArray(arr: any[], prop: string) {
        const grouped: any = {};
        for (let i = 0; i < arr.length; i++) {
            let p = arr[i][prop];
            if (!grouped[p]) {
                grouped[p] = [];
            }
            grouped[p].push(arr[i]);
        }
        return grouped;
    }

    addUserToBaseList(u: IUser, resData: IResponseData) {
        resData.usersBaseData.push({name: u.name, email: u.email})
    }
}