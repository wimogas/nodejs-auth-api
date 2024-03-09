import 'reflect-metadata'
import http from 'http'

import {App} from "./webserver/frameworks/express";

const app = new App().run()

const server = http.createServer(app);

server.listen(process.env.PORT || 5000)