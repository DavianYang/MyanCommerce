/**
 * @description
 * Defines how user passwords get hashed when using the {@link NativeAuthenticationStrategy}.
 *
 */
export interface PasswordHashingStrategy {
    hash(plaintext: string): Promise<string>;
    check(plaintext: string, hash: string): Promise<boolean>;
}
