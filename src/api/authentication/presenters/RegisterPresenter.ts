import {IOutput} from "../../../infrastructure/web/frameworks/express/outputs/interfaces/IOutput";

export default class RegisterPresenter {

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