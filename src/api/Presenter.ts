import {IOutput} from "../infrastructure/web/frameworks/express/outputs/interfaces/IOutput";

export default class Presenter {

    private _output: IOutput;

    public constructor(
        output: IOutput
    ) {
        this._output = output
    }

    public present(response: any) {
        this._output.respond(response)
    }
}