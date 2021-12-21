import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConnectionModule } from '../connection/connection.module';
import { ServiceModule } from '../service/service.module';

import { CustomerResolver } from './resolvers/admin/customer.resolver';

const adminResolvers = [CustomerResolver];

/**
 * The internal module containing some shared providers used by more than
 * one API module.
 */
@Module({
    imports: [ConfigModule, ServiceModule, ConnectionModule.forRoot()],
    exports: [ConfigModule, ServiceModule, ConnectionModule.forRoot()],
})
export class APISharedModule {}

/**
 * The internal module containing the Admin GraphQL API resolvers
 */
@Module({
    imports: [APISharedModule],
    providers: [...adminResolvers],
    exports: [...adminResolvers],
})
export class AdminAPIModule {}
