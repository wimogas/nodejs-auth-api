import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'dotenv/config'

import router from "./infrastructure/web/frameworks/express/routes"
import errorHandlingMiddleware from "./infrastructure/web/frameworks/express/middlewares/ErrorHandlingMiddleware";

const app: Application = express()

app.use(express.json())

app.use(cors())

app.use(router)

app.use(errorHandlingMiddleware.handleError)
app.use("/test", (req: Request, res: Response, next: NextFunction): void => {
    res.json({message: "All systems nominal"})
});

export default app;

