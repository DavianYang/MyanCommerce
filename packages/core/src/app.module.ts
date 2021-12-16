import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConnectionModule } from './connection/connection.module';

@Module({
    imports: [ConfigModule, ConnectionModule],
})
export class AppModule {}
