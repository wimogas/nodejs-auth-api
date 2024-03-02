export default class RegisterPresenter {

    private _registerOutput;

    public constructor(
        registerOutput
    ) {
        this._registerOutput = registerOutput
    }

    public async present(response) {
        const res = response;
        this._registerOutput.respond(res)
    }

}