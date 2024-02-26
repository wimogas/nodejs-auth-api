import {ApiServer} from "./presentation/ApiServer";

export async function main(): Promise<void> {
    const port = parseInt(process.env.PORT)
    await ApiServer.run(port)
}

main()