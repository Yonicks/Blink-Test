import {Constants} from '../common/constants';
import axios from 'axios';


export default class TodoService {
    public async get(): Promise<any> {
        const res = await axios({url: `${Constants.URL}/todos`});
        if (res.status === 200) {
            return res.data;
        }
    }

    public async getAllIsCompletedTaskOfUser(userId: number, isCompleted: boolean): Promise<any> {
        const res = await axios({url: `${Constants.URL}/users/${userId}/todos?completed=${isCompleted}`});
        if (res.status === 200) {
            return res.data;
        }
    }

}