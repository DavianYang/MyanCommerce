import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async () => ({
                store: redisStore,
                host: 'localhost',
                port: '6379',
                ttl: 10 * 100,
            }),
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisCacheModule {}
