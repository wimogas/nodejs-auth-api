import mongoose from "mongoose";
import {IIdGeneratorService} from "../../../application/common/services/IIdGeneratorService";

export class MongoDbIdGeneratorService implements IIdGeneratorService{
    public generateId() {
        return new mongoose.Types.ObjectId().toString()
    }
}