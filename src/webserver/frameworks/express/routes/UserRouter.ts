import {RouterProvider} from "./RouterProvider";
import {CreateUserRoute} from "../../../../features/users/create-user/CreateUserRoute";
import {DeleteUserRoute} from "../../../../features/users/delete-user/DeleteUserRoute";


export class UserRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.use('/register', new CreateUserRoute().getRouter());
        this._router.use('/:id', new DeleteUserRoute().getRouter());
    }
}