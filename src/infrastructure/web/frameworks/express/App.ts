import express, { Application } from 'express'
import cors from 'cors'
import 'dotenv/config'
import errorHandlingMiddleware from "./middlewares/ErrorHandlingMiddleware";
import ApiRouter from "./routes/ApiRouter";
import {DatabaseFactory} from "../../../database/DatabaseFactory";

export default class App {
    private readonly port: string = process.env.PORT || "5000";
    private readonly db_provider: string = process.env.DB_PROVIDER || "IN_MEMORY";
    public async run() {
        const app: Application = express()
        const router = new ApiRouter().getRouter()
        const database = DatabaseFactory.createDatabase(this.db_provider)

        await database.connect()

        app.use(express.json())
        app.use(cors())
        app.use(router)
        app.use(errorHandlingMiddleware.handleError)

        return app.listen(this.port, (): void => console.log(`Server running on port ${this.port}`))
    }
}
