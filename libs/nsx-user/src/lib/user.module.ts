import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@myancommerce/nsx-prisma';

import { UserService } from './user.service';
import { RoleModule } from '@myancommerce/nsx-role';

@Global()
@Module({
    imports: [PrismaModule, RoleModule],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
