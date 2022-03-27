import { Request as HttpRequest, Response as HttpResponse } from 'express';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule, PrismaService } from '@myancommerce/nsx-prisma';
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
            useFactory: async (prisma: PrismaService) => ({
                ...environment.graphqlConfig,
                path: environment.apiConfig.adminApiPath,
                debug: environment.apiConfig.adminApiDebug,
                playground: environment.apiConfig.adminApiPlayground,
                context: ({ req, res }: any) => ({
                    request: req as HttpRequest,
                    response: res as HttpResponse,
                    prisma,
                }),
                formatError: error => ({
                    code: error.extensions?.['code'] || 'SERVER_ERROR',
                    name: error.extensions?.['exception']?.name || error.name,
                    message:
                        error.extensions?.['exception']?.response?.message ||
                        error.message,
                    errLocations: environment.apiConfig.adminApiDebug
                        ? error.locations
                        : undefined,
                    errPath: environment.apiConfig.adminApiDebug
                        ? error.path
                        : undefined,
                    variables: environment.apiConfig.adminApiDebug
                        ? error.extensions?.['exception']?.variables
                        : undefined,
                    stacktrace: error.extensions?.['exception']?.stacktrace,
                }),
            }),
            inject: [PrismaService],
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
