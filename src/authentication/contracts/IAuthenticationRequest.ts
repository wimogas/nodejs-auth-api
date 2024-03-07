export default interface IAuthenticationRequest {
    email: string,
    password: string,
    permissions?: string;
    roles?: string;
}