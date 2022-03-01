import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@myancommerce/nsx-prisma';
import { AdministratorResolver } from './administrator.resolver';
import { AdministratorService } from './administrator.service';

@Global()
@Module({
    providers: [AdministratorService, AdministratorResolver],
    imports: [PrismaModule],
    exports: [AdministratorService],
})
export class AdministratorModule {}
