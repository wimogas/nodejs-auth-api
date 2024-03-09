import {IController, IHTTPRequest} from "../interfaces";

export class AuthorizeAttributeDecorator implements IController {
    protected _controller: IController;

    public constructor(
        controller: IController
    ) {
        this._controller = controller
    }

    public async execute(request: IHTTPRequest): Promise<void> {
        await this._controller.execute(request)
    }
}