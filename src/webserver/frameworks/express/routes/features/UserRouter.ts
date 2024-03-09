import {RouterBuilder} from "../RouterBuilder";
import {
    CreateUserController,
    DeleteUserController,
    GetUserController,
    UpdateUserController
} from "../../../../../features/user";
import {CreatedResponse, NoContentResponse, OkResponse} from "../../responses";
import {Permission, PolicyAttributeDecorator} from "../../../../../security";
import ProtectedRouteMiddleware from "../../middlewares/ProtectedRouteMiddleware";

export class UserRouter extends RouterBuilder {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {

        //POST
        this._router.post('/register',
            this.handleHTTPRequest(
                new CreateUserController(),
                CreatedResponse));

        //GET
        this._router.get('/:id',
            this.handleHTTPRequest(
                new GetUserController(),
                OkResponse));

        //DELETE
        const deleteUserController = new DeleteUserController()
        const deleteUserPolicyHandler = new PolicyAttributeDecorator(
            Permission.UserDelete,
            deleteUserController)

        this._router.delete('/:id',
            ProtectedRouteMiddleware.setRequestUser,
            this.handleHTTPRequest(
                deleteUserPolicyHandler,
                NoContentResponse));

        //PATCH
        const updateUserController = new UpdateUserController()
        const updateUserPolicyHandler = new PolicyAttributeDecorator(
            Permission.UserEdit,
            updateUserController)

        this._router.patch('/:id',
            ProtectedRouteMiddleware.setRequestUser,
            this.handleHTTPRequest(
                updateUserPolicyHandler,
                NoContentResponse));
    }
}