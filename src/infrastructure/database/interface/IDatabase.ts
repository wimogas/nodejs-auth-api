export interface IDatabase {
    connect(): Promise<void>
    close(): Promise<void>
}