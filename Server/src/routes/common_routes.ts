import {Application, Request, Response} from 'express';
import {DataController} from '../controllers/dataController';

export class CommonRoutes {

    private dataController: DataController = new DataController();

    public route(app: Application) {


        app.get('/get_data/', (req: Request, res: Response) => {
            this.dataController.getData(req, res);
        });

    }
}
