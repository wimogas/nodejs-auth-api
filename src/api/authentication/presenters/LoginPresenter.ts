import {IOutput} from "../../../infrastructure/web/frameworks/express/outputs/interfaces/IOutput";
import {IPresenter} from "../../../application/authentication/interfaces/IPresenter";

export default class LoginPresenter implements IPresenter {

    private _loginOutput: IOutput;

    public constructor(
        registerOutput: IOutput
    ) {
        this._loginOutput = registerOutput
    }

    public present(response: any) {
        this._loginOutput.respond(response)
    }

}