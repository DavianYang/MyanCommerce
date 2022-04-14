import { InternalServerError } from '@myancommerce/nsx-error';
import { createClient, RedisClient } from 'redis';
import { CachedSession, CacheStrategy } from './cache.strategy.interface';

export class RedisCacheStrategy implements CacheStrategy {
    private readonly cache: RedisClient;

    constructor() {
        this.cache = createClient();

        this.cache.on('connect', () => {
            console.log('Redis connection established');
        });
    }

    async get(sessionToken: string): Promise<CachedSession | undefined> {
        if (!this.cache.connected) {
            throw new InternalServerError({
                message: 'Please connect to redis server',
            });
        }

        return new Promise((resolve, reject) => {
            this.cache.get(sessionToken, (error, item) => {
                if (error) reject(error);

                if (item) resolve(JSON.parse(item));
            });
        });
    }

    set(session: CachedSession) {
        this.cache.exists(session.token, (err, reply) => {
            if (err) console.log(err);

            if (!reply) {
                this.cache.set(session.token, JSON.stringify(session));
            }
        });
    }

    delete(sessionToken: string): void | Promise<void> {
        this.cache.del(sessionToken);
    }

    clear(): void | Promise<void> {
        this.cache.flushall();
    }
}
