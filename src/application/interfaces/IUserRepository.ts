export interface IUserRepository {
    addUser(user: any): Promise<any>
    getUserById(id: string): Promise<any>
    getUserByEmail(email: string): Promise<any>
    deleteUser(id: string): Promise<void>
    updateUser(user: any): Promise<void>
    updateUserRole(user: any): Promise<void>
    getUsers(limit: number, skip: number): Promise<any>
}