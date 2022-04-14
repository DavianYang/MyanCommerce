import { ID } from '@myancommerce/nox-common';
import { InjectableStrategy } from '@myancommerce/nsx-common';

export type CacheSessionUser = {
    id: ID;
    identifier: string;
    verified: boolean;
};

export type CachedSession = {
    cachedExpiry: number;
    id: ID;
    token: string;
    expires: Date;
    authenticationStrategy?: string;
    user?: CacheSessionUser;
};

export interface CacheStrategy extends InjectableStrategy {
    set(session: CachedSession): void | Promise<void>;
    get(
        sessionToken: string,
    ): CachedSession | undefined | Promise<CachedSession | undefined>;
    delete(sessionToken: string): void | Promise<void>;
    clear(): void | Promise<void>;
}
