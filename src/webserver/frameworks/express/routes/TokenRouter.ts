import {RouterProvider} from "./RouterProvider";
import {GetTokenRoute} from "../../../../features/tokens/get-token/GetTokenRoute";


export class TokenRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.use('/', new GetTokenRoute().getRouter());
    }
}