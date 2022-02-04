import { Module } from '@nestjs/common';
import { ConfigModule } from '@myancommerce/nsx-config';
import { ApiModule } from './api.module';
import { ServiceModule } from './service.module';
import { ConnectionModule } from '../connection/connection.module';

@Module({
    imports: [ConfigModule, ApiModule, ServiceModule, ConnectionModule],
})
export class AppModule {}
