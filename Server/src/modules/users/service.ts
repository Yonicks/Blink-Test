import {Constants} from '../common/constants';
import axios from 'axios';


export default class UserService {

    public async getAll(): Promise<any> {
        const res = await axios({url: `${Constants.URL}/users`});
        if (res.status === 200) {
            return res.data;
        }
    }



}