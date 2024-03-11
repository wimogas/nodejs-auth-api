export class GetPermissionsQuery {
    private readonly _limit: any = 20
    private readonly _skip: any = 1

    public constructor(
        limit?: string,
        skip?: string) {
        this._limit = parseInt(limit)
        this._skip = parseInt(skip)
    }

    get limit(): any {
        return this._limit;
    }
    get skip(): any {
        return this._skip;
    }
}