import { Module } from '@nestjs/common';
import { InMemoryCacheStrategy } from './strategy/in-memory.cache.strategy';

@Module({
    imports: [],
    providers: [InMemoryCacheStrategy],
    exports: [InMemoryCacheStrategy],
})
export class CacheModule {}
