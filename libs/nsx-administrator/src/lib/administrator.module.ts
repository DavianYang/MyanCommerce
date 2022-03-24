import { PrismaModule } from '@myancommerce/nsx-prisma';
import { UserModule } from '@myancommerce/nsx-user';
import { Global, Module } from '@nestjs/common';

import { AdministratorResolver } from './administrator.resolver';
import { AdministratorService } from './administrator.service';

@Global()
@Module({
    imports: [UserModule, PrismaModule],
    providers: [AdministratorService, AdministratorResolver],
    exports: [AdministratorService],
})
export class AdministratorModule {}
