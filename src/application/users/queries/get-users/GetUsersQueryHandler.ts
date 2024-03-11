import {inject, singleton} from "tsyringe";
import {IRoleRepository, IUserRepository} from "../../../interfaces";
import {NotFoundError} from "../../../../domain/common/errors";

@singleton()
export class GetUsersQueryHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
    ) {}

    public async execute(request: any): Promise<any> {
        const foundUsers = await this._userRepository.getUsers(request.limit, request.skip)

        if (!foundUsers) {
            throw new NotFoundError()
        }

        try {

            return foundUsers.map((user: any) => {
                return {
                    id: user._id,
                    email: user.email,
                    role: user.role.name,
                    permissions: user.role.permissions.map((perm: any) => {
                        return {
                            id: perm._id,
                            name: perm.name
                        }
                    })
                }
            })

        } catch (error) {
            throw error
        }
    }
}