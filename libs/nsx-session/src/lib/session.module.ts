import { CacheModule } from '@myancommerce/nsx-cache';
import { ConfigModule } from '@myancommerce/nsx-config';
import { PrismaModule } from '@myancommerce/nsx-prisma';
import { Module } from '@nestjs/common';
import { SessionService } from './session.service';

@Module({
    imports: [ConfigModule, PrismaModule, CacheModule],
    providers: [SessionService],
    exports: [SessionService],
})
export class SessionModule {}
