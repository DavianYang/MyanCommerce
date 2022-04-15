import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '@myancommerce/nsx-prisma';

import { UserService } from './user.service';
import { RoleModule } from '@myancommerce/nsx-role';
import { AuthModule } from '@myancommerce/nsx-auth';
import { ConfigModule } from '@myancommerce/nsx-config';

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        RoleModule,
        forwardRef(() => AuthModule),
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
