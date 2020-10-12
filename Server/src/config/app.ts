import express from "express";
import * as bodyParser from "body-parser";
import {CommonRoutes} from '../routes/common_routes';

class App {

    public app: express.Application;


    private common_routes: CommonRoutes = new CommonRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.common_routes.route(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

}

export default new App().app;