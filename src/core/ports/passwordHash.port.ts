export interface IPasswordHashPort {
    hash: (password: string) => Promise<string>
    verify: (plaintext_password: string, hashed_password: string) => Promise<boolean>
}