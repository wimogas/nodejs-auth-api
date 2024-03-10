export interface IIdGeneratorService {
    generateId(): any
    verifyId(id: string): boolean
}