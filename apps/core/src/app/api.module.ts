import { Module } from '@nestjs/common';

import { ConnectionModule } from '../connection/connection.module';
import { ServiceModule } from './service.module';
import { configureGraphQLModule } from '../api/config/configure-graphql-module';
import { AdminAPIModule } from '../api/api-internal-modules';

/**
 * The ApiModule is responsible for the public API of the application. This is where requests
 * come in, are parsed and then handed over to the ServiceModule classes which take care
 * of the business logic.
 */
@Module({
    imports: [
        ServiceModule,
        ConnectionModule.forRoot(),
        AdminAPIModule,
        configureGraphQLModule(configService => ({
            apiType: 'admin',
            apiPath: configService.apiOptions.adminApiPath,
            playground: configService.apiOptions.adminApiPlayground,
            debug: configService.apiOptions.adminApiDebug,
            // typePaths: path.join(__dirname, 'graphql', '**', '*.graphql'),
            typePaths: 'apps/core/src/graphql/**/*.graphql',
            resolverModule: AdminAPIModule,
        })),
    ],
})
export class ApiModule {
    constructor() {}
}
