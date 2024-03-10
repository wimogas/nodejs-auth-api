import {inject, singleton} from "tsyringe";
import {GetUserQuery} from "./GetUserQuery";
import {IUserRepository} from "../../../interfaces";
import {NotFoundError} from "../../../../domain/common/errors";

@singleton()
export class GetUserQueryHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository) {}

    public async execute(request: GetUserQuery): Promise<any> {

        const foundUser = await this._userRepository.getUserById(request.id)

        if (!foundUser) {
            throw new NotFoundError("User not found.")
        }

        const permissions = foundUser.role.permissions.map((perm: any) => perm.name)

        return {
            id: foundUser._id.toString(),
            email: foundUser.email,
            role: foundUser.role.name,
            permissions
        }
    }
}