import { Module } from '@nestjs/common';
import { ServiceModule } from 'service/service.module';
import { ConfigModule } from './config/config.module';
import { ConnectionModule } from './connection/connection.module';
import { AdminstratorService } from './adminstrator/adminstrator.service';

@Module({
    imports: [ConfigModule, ServiceModule, ConnectionModule],
    providers: [AdminstratorService],
})
export class AppModule {}
