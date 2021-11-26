import { Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from './config.service';

@Module({
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(private configService: ConfigService, private moduleref: ModuleRef){}

    async onApplicationBootstrap() {
        
    }

    async onApplicationShutdown(signal?: string) {
        
    }

}