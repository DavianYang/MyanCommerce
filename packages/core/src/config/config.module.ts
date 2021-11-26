import { Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(){}

    async onApplicationBootstrap() {
        
    }

    async onApplicationShutdown() {
        
    }

}