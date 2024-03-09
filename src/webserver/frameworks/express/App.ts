import express, {Express, Router} from 'express'
import cors from 'cors'
import 'dotenv/config'
import errorHandlingMiddleware from "./middlewares/ErrorHandlingMiddleware";
import {ApiRouter} from "./routes";
import {DatabaseFactory} from "../../../database/DatabaseFactory";

export class App {
    private readonly _app : Express
    private readonly db_provider: string = process.env.DB_PROVIDER || "IN_MEMORY";

    public constructor() {
        this._app = express()
    }
    public run(): Express {
        this.initApp()
        return this._app;
    }

    private initApp(): void {
        const router = this.initRouter()
        this.initDatabase().catch(console.error)

        this._app.use(express.json())
        this._app.use(cors())
        this._app.use(router)
        this._app.use(errorHandlingMiddleware.handleError)
    }

    private async initDatabase() : Promise<void> {
        const database = DatabaseFactory.createDatabase(this.db_provider)
        await database.connect()
    }

    private initRouter(): Router {
        return new ApiRouter().getRouter()
    }
}
