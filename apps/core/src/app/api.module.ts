import path from 'path';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ConnectionModule } from '../connection/connection.module';
import { ServiceModule } from './service.module';
import { ConfigModule } from '../config/config.module';
import { AdminAPIModule } from '../api/api-internal-modules';
import { ConfigService } from '../config/config.service';

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
        GraphQLModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                path: '/' + 'admin',
                typePaths: [path.join(__dirname, 'graphql', '**', '*.graphql')],
                include: [AdminAPIModule],
                playground: config.apiOptions.adminApiPlayground || false,
                debug: config.apiOptions.adminApiDebug || false,
                context: (req: any) => req,
                cors: false,
            }),
            inject: [ConfigService],
            imports: [ConfigModule, ServiceModule],
        }),
    ],
})
export class ApiModule {
    constructor() {}
}
