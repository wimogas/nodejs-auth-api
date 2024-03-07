export interface IPermissionsService {
    check(request: any, permissions: string) : boolean
}