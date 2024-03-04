import App from "./infrastructure/web/frameworks/express/App";

const app = new App()

app.run().catch(console.error)