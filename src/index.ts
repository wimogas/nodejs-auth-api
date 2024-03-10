import 'reflect-metadata'
import http from 'http'
import {app} from './webserver/frameworks/express'
import {DatabaseFactory} from "./infrastructure/common/persistence";

const database = DatabaseFactory.createDatabase(process.env.DB_PROVIDER)
const server = http.createServer(app);

database.connect().catch(console.error)
server.listen(process.env.PORT || 5000)