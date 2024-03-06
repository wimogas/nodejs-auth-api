import 'reflect-metadata'
import http from 'http'

import App from "./webserver/frameworks/express/App";

const server = http.createServer(App);

server.listen(process.env.PORT || 5000)