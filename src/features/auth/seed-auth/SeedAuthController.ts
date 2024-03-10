import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {SeedAuthCommandHandler} from "./SeedAuthCommandHandler";
import {SeedAuthCommand} from "./SeedAuthCommand";
import {logger} from "../../../decorators/logger";

export class SeedAuthController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const seedAuthCommandHandler = container.resolve(SeedAuthCommandHandler)

        const seedAuthCommand = new SeedAuthCommand(
            request.body.permissions,
            request.body.roles
        )

        console.log(seedAuthCommand)

        await seedAuthCommandHandler.execute(seedAuthCommand)
    }
}

