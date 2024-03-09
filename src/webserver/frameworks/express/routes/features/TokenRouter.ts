import {RouterBuilder} from "../RouterBuilder";
import container from '../../../../../di';
import {GetTokenController} from "../../../../../features/tokens";
import {OkResponse} from "../../responses";

export class TokenRouter extends RouterBuilder {
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