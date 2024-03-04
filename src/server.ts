import App from "./infrastructure/web/frameworks/express/app";

const DB = process.env.MONGODB_CONNECTION
const PORT = process.env.PORT

const app = new App(DB, PORT)

app.run().catch(console.error)