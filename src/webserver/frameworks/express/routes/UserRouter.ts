import {RouterProvider} from "./RouterProvider";
import {CreateUserEndpoint} from "../../../../features/user/create-user/CreateUserEndpoint";
import {DeleteUserEndpoint} from "../../../../features/user/delete-user/DeleteUserEndpoint";
import {GetUserEndpoint} from "../../../../features/user/get-user/GetUserEndpoint";
import {UpdateUserEndpoint} from "../../../../features/user/update-user/UpdateUserEndpoint";


export class UserRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {

        //POST
        this._router.use('/register', new CreateUserEndpoint().getRouter());

        //GET
        this._router.use('/', new GetUserEndpoint().getRouter());

        //DELETE
        this._router.use('/', new DeleteUserEndpoint().getRouter());

        //PATCH
        this._router.use('/', new UpdateUserEndpoint().getRouter());
    }
}