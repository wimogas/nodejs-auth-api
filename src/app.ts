import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'dotenv/config'

import router from "./infrastructure/web/frameworks/express/routes"
import errorHandlingMiddleware from "./infrastructure/web/frameworks/express/middlewares/ErrorHandlingMiddleware";
import {connectDB} from "./infrastructure/database/connect";

export default class App {
    private _db;
    private _port;
    public constructor(
        db,
        port
    ) {
        this._db = db
        this._port = port
    }
    public async run() {
        const app: Application = express()
        connectDB(this._db).catch(console.error)
        app.use(express.json())
        app.use(cors())
        app.use(router)
        app.use(errorHandlingMiddleware.handleError)
        app.use("/test", (req: Request, res: Response, next: NextFunction): void => {
            res.json({message: "All systems nominal"})
        });
        return app.listen(this._port, (): void => console.log(`Server running on port ${this._port}`))
    }
}
