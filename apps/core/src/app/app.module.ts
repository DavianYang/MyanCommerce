import { Request as HttpRequest, Response as HttpResponse } from 'express';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule, PrismaService } from '@myancommerce/nsx-prisma';
import { AdministratorModule } from '@myancommerce/nsx-administrator';
import { RoleModule } from '@myancommerce/nsx-role';
import { CustomerModule } from '@myancommerce/nsx-customer';
import { UserModule } from '@myancommerce/nsx-user';
import { CountryModule } from '@myancommerce/nsx-country';

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
            }),
            inject: [PrismaService],
        }),
        AdministratorModule,
        CustomerModule,
        UserModule,
        RoleModule,
        CountryModule,
    ],
})
export class AppModule {}
