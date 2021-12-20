import { Module } from '@nestjs/common';

import { ConnectionModule } from 'connection/connection.module';
import { ServiceModule } from 'service/service.module';

/**
 * The ApiModule is responsible for the public API of the application. This is where requests
 * come in, are parsed and then handed over to the ServiceModule classes which take care
 * of the business logic.
 */
@Module({
    imports: [ServiceModule, ConnectionModule.forRoot()],
})
export class ApiModule {}
