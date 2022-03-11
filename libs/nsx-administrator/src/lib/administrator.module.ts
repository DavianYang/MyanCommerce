import { Global, Module } from '@nestjs/common';

import { AdministratorResolver } from './administrator.resolver';
import { AdministratorService } from './administrator.service';

@Global()
@Module({
    providers: [AdministratorService, AdministratorResolver],
    exports: [AdministratorService],
})
export class AdministratorModule {}
