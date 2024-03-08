import {RouterProvider} from "./RouterProvider";
import {GetTokenEndpoint} from "../../../../features/tokens/get-token/GetTokenEndpoint";


export class TokenRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.use('/', new GetTokenEndpoint().getRouter());
    }
}