import { Module } from '@nestjs/common';
import { ApiModule } from './api.module';
import { ServiceModule } from './service.module';
import { ConfigModule } from '../config/config.module';
import { ConnectionModule } from '../connection/connection.module';

@Module({
    imports: [ConfigModule, ApiModule, ServiceModule, ConnectionModule],
})
export class AppModule {}
