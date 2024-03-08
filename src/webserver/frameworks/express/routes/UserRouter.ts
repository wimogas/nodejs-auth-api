import container from "../../../../di";
import {RouterProvider} from "./RouterProvider";
import CreateUserController from "../../../../features/user/create-user/CreateUserController";
import DeleteUserController from "../../../../features/user/delete-user/DeleteUserController";
import GetUserController from "../../../../features/user/get-user/GetUserController";
import UpdateUserController from "../../../../features/user/update-user/UpdateUserController";
import {CreatedResponse} from "../responses/CreatedResponse";
import {OkResponse} from "../responses/OkResponse";
import {NoContentResponse} from "../responses/NoContentResponse";

export class UserRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {

        //POST
        this._router.post('/register',
            this.handleHTTPRequest(
                container.resolve(CreateUserController),
                CreatedResponse));

        //GET
        this._router.get('/:id',
            this.handleHTTPRequest(
                container.resolve(GetUserController),
                OkResponse));

        //DELETE
        this._router.delete('/:id',
            this.handleHTTPRequest(
                container.resolve(DeleteUserController),
                NoContentResponse));

        //PATCH
        this._router.patch('/:id',
            this.handleHTTPRequest(
                container.resolve(UpdateUserController),
                NoContentResponse));
    }
}