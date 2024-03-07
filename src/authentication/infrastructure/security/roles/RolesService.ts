export class RolesService {
    public check(request: any, roles: string): boolean {
        return request.user.roles.includes(roles)
    }
}