import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import {handleErrorMiddleware} from "./middlewares";
import helmet from "helmet";
import logger from 'morgan'
import {router} from './routes'

const app = express()

app.use(helmet());
app.use(logger('dev'));
app.use(express.json())
app.use(cors())

app.use(router)

app.use(handleErrorMiddleware)

export default app