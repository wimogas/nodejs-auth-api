export interface ICrypto {
    handleHash(password: string, salt: number): Promise<string>
    handleCompare(password: string, hash:string) : Promise<boolean>
}