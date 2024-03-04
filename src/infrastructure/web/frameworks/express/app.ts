import express, { Application } from 'express'
import cors from 'cors'
import 'dotenv/config'
import errorHandlingMiddleware from "./middlewares/ErrorHandlingMiddleware";
import {connectDB} from "../../../database/mongodb/connect";
import ApiRouter from "./routes/ApiRouter";

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
        const router = new ApiRouter().getRouter()

        connectDB(this._db).catch(console.error)

        app.use(express.json())
        app.use(cors())
        app.use(router)
        app.use(errorHandlingMiddleware.handleError)

        return app.listen(this._port, (): void => console.log(`Server running on port ${this._port}`))
    }
}
