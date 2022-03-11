import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@myancommerce/nsx-prisma';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Global()
@Module({
    providers: [RoleService, RoleResolver],
    imports: [PrismaModule],
    exports: [RoleService],
})
export class RoleModule {}
