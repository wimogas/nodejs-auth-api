import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import router from "./infrastructure/web/frameworks/express/routes"

class App {
    public static async main(): Promise<void>{
        const port = parseInt(process.env.PORT)
        const app = express()

        app.use(express.json())

        app.use(cors())

        app.use(router)

        app.listen(port, () => {
            console.log(`Server is running in port ${port}`)
        } )
    }
}

App.main().catch(console.error)