export class PermissionsService {
    public check(request: any, permissions: string): boolean {
        return request.user.permissions.includes(permissions)
    }
}