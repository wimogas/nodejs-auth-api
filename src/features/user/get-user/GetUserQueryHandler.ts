import {inject, singleton} from "tsyringe";
import {IUserRepository} from "../../../interfaces/IUserRepository";
import {GetUserQuery} from "./GetUserQuery";
import {NotFoundError} from "../../../domain/errors/NotFoundError";

@singleton()
export default class GetUserQueryHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        ) {}

    public async execute(request: GetUserQuery): Promise<any> {
        const foundUser = await this._userRepository.getUserById(request.id)
        if (!foundUser) {
            throw new NotFoundError("User not found.")
        }

        return {
            id: foundUser._id.toString(),
            email: foundUser.email,
        }
    }
}