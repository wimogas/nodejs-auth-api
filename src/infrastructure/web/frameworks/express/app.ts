import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from "./routes"
import errorHandlingMiddleware from "./middlewares/ErrorHandlingMiddleware";
import {connectDB} from "../../../database/mongodb/connect";

export default class App {
    private _db: string;
    private readonly _port: string;
    public constructor(
        db: string,
        port: string
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
