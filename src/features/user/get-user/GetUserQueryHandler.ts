import {inject, singleton} from "tsyringe";
import {IUserRepository} from "../../../interfaces/IUserRepository";
import {GetUserQuery} from "./GetUserQuery";
import {NotFoundError} from "../../../domain/errors/NotFoundError";
import {IIdGeneratorService} from "../../../interfaces/IIdGeneratorService";
import {BadRequestError} from "../../../domain/errors/BadRequestError";

@singleton()
export default class GetUserQueryHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        @inject("idGenerator") private _idGenerator: IIdGeneratorService,
        ) {}

    public async execute(request: GetUserQuery): Promise<any> {

        const isValidId = this._idGenerator.verifyId(request.id)

        if(!isValidId) {
            throw new BadRequestError()
        }

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