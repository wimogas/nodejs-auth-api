import {inject, singleton} from "tsyringe";
import {IPermissionRepository} from "../../../database/interfaces/IPermissionRepository";

@singleton()
export class CreatePermissionCommandHandler {

    public constructor(
        @inject("permissionRepository") private _permissionRepository: IPermissionRepository,
    ) {}

    public async execute(request: any): Promise<void> {
        try {

            // check if permission exists
            // else add permission
        } catch (error) {
            throw error
        }
    }
}