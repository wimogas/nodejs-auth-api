import {inject, singleton} from "tsyringe";
import {GetUserQuery} from "./GetUserQuery";
import {NotFoundError, BadRequestError} from "../../../domain/common/errors";
import {IUserRepository} from "../../../database/interfaces/IUserRepository";
import {IIdGeneratorService} from "../../../services/IIdGeneratorService";

@singleton()
export class GetUserQueryHandler {

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

        // get role and permissions

        return {
            id: foundUser._id.toString(),
            email: foundUser.email,
            role: "",
            permissions: ""
        }
    }
}