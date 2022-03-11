import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@myancommerce/nsx-prisma';

import { UserService } from './user.service';

@Global()
@Module({
    providers: [UserService],
    imports: [PrismaModule],
    exports: [UserService],
})
export class UserModule {}
