import {IOutput} from "../../../infrastructure/web/frameworks/express/outputs/interfaces/IOutput";
import {IPresenter} from "../../../application/authentication/interfaces/IPresenter";

export default class RegisterPresenter implements IPresenter {

    private _registerOutput: IOutput;

    public constructor(
        registerOutput: IOutput
    ) {
        this._registerOutput = registerOutput
    }

    public present(response: any) {
        this._registerOutput.respond(response)
    }

}