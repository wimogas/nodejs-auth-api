import {AuthorizeAttributeDecorator} from "./AuthorizeAttributeDecorator";
import {IController, IHTTPRequest} from "../interfaces";
import {UnauthorizedError} from "../domain/common/errors";
import {Role} from "./";

export class PolicyAttributeDecorator extends AuthorizeAttributeDecorator {

    private readonly _permissions: string;

    public constructor(
        requirements: string,
        controller: IController) {
        super(controller);
        this._permissions = requirements
    }

    public async execute(request: IHTTPRequest): Promise<any> {
        console.log(request.user.permissions)
        let hasPermissions = request.user.permissions.includes(this._permissions)
        console.log(hasPermissions)
        let isAdminOrSame = (request.user.id === request.params.id) || request.user.roles === Role.Admin

        if(!hasPermissions || !isAdminOrSame) {
            throw new UnauthorizedError()
        }

        return super.execute(request)
    }
}