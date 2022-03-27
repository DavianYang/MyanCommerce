import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get(key: string) {
        return await this.cache.get(key);
    }

    async set(key: string, value: any) {
        await this.cache.set(key, value);
    }
    async del(key: string, _: any) {
        await this.cache.del(key);
    }
}
