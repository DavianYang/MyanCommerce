import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from '@myancommerce/nsx-prisma';
import { AdministratorModule } from '@myancommerce/nsx-administrator';
import { RoleModule } from '@myancommerce/nsx-role';
import { CustomerModule } from '@myancommerce/nsx-customer';
import { UserModule } from '@myancommerce/nsx-user';
import { AuthModule } from '@myancommerce/nsx-auth';
import { CountryModule } from '@myancommerce/nsx-country';
import { RedisCacheModule } from '@myancommerce/nsx-redis';

import { environment } from '../environments/environment';
import { appConfiguration } from './app.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            ...environment.appConfig,
            load: [appConfiguration],
        }),
        PrismaModule,
        GraphQLModule.forRootAsync({
            useFactory: async () => ({
                ...environment.graphqlConfig,
                path: environment.apiConfig.apiPath,
                debug: environment.apiConfig.apiDebug,
                playground: environment.apiConfig.apiPlayground,
                include: [
                    AuthModule,
                    AdministratorModule,
                    CustomerModule,
                    UserModule,
                    RoleModule,
                    CountryModule,
                    ShopModule,
                ],
            }),
        }),
        RedisCacheModule,
        AdministratorModule,
        AuthModule,
        CustomerModule,
        UserModule,
        RoleModule,
        CountryModule,
    ],
})
export class AppModule {}
