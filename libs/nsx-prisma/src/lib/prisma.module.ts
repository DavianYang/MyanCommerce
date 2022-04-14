import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@myancommerce/nsx-config';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
