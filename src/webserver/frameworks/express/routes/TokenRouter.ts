import container from "../../../../di";
import {RouterProvider} from "./RouterProvider";
import GetTokenController from "../../../../features/tokens/get-token/GetTokenController";
import {OkResponse} from "../responses/OkResponse";

export class TokenRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.get('/', this.handleHTTPRequest(
                container.resolve(GetTokenController),
                OkResponse));
    }
}