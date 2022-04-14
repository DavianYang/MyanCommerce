import { InternalServerError } from '@myancommerce/nsx-error';
import { CachedSession, CacheStrategy } from './cache.strategy.interface';

export class InMemoryCacheStrategy implements CacheStrategy {
    private readonly cache = new Map<string, CachedSession>();
    private readonly cacheSize: number = 1000;

    constructor(cacheSize?: number) {
        if (cacheSize != null) {
            if (cacheSize < 1) {
                throw new InternalServerError({
                    errorCode: 'error.invalid-variable-cache-size',
                    variables: { cacheSize },
                    message: `Cache Size must be a postive integer`,
                });
            }
            this.cacheSize = cacheSize;
        }
    }

    get(
        sessionToken: string,
    ): CachedSession | Promise<CachedSession | undefined> | undefined {
        const item = this.cache.get(sessionToken);

        if (item) {
            // refresh keys
            this.cache.delete(sessionToken);
            this.cache.set(sessionToken, item);
        }

        return item;
    }

    set(session: CachedSession) {
        if (this.cache.has(session.token)) {
            // refresh token
            this.cache.delete(session.token);
        } else if (this.cache.size === this.cacheSize) {
            // evict the oldest
            this.cache.delete(this.first());
        }

        this.cache.set(session.token, session);
        console.log('Cache: ', this.cache);
    }

    delete(sessionToken: string): void | Promise<void> {
        this.cache.delete(sessionToken);
    }

    clear(): void | Promise<void> {
        this.cache.clear();
    }

    private first() {
        return this.cache.keys().next().value;
    }
}
