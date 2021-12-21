import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ServiceModule } from './service/service.module';
import { ConfigModule } from './config/config.module';
import { ConnectionModule } from './connection/connection.module';

@Module({
    imports: [ConfigModule, ApiModule, ServiceModule, ConnectionModule],
})
export class AppModule {}
