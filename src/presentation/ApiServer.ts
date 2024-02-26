import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import router from "./routes"

export class ApiServer {

    public static async run(port: number): Promise<void> {

        const app = express()

        app.use(express.json())

        app.use(cors())

        app.use(router)

        app.listen(port, () => {
            console.log(`Server is running in port ${port}`)
        } )

    }
}