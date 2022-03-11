import { Request as HttpRequest, Response as HttpResponse } from 'express';
import gql from 'graphql-tag';
import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '@myancommerce/nsx-user';
import { PrismaModule, PrismaService } from '@myancommerce/nsx-prisma';
import { RoleModule } from '@myancommerce/nsx-role';
import { CreateAdministrator } from '@myancommerce/generated';
import {
    TestGraphQLClient,
    testEnvironment,
    testConfiguration,
} from '@myancommerce/nsx-testing';

import { AdministratorModule } from './administrator.module';

export const ADMINISTRATOR_FRAGMENT = gql`
    fragment Administrator on AdministratorDto {
        id
        firstName
        lastName
        emailAddress
    }
`;

export const CREATE_ADMINISTRATOR = gql`
    mutation CreateAdministrator($input: CreateAdministratorInput!) {
        createAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;

export const GET_ADMINISTRATOR = gql`
    query GetAdministrator($id: String!) {
        administrator(id: $id) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;

describe('Administrator Resolver', () => {
    let app: INestApplication;
    let adminClient: TestGraphQLClient;

    const { port, hostname, adminApiPath } = testEnvironment.apiConfig;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    ...testEnvironment.appConfig,
                    load: [testConfiguration],
                }),
                GraphQLModule.forRootAsync({
                    useFactory: async (prisma: PrismaService) => ({
                        ...testEnvironment.graphqlConfig,
                        path: testEnvironment.apiConfig.adminApiPath,
                        debug: testEnvironment.apiConfig.adminApiDebug,
                        playground:
                            testEnvironment.apiConfig.adminApiPlayground,
                        include: [AdministratorModule, UserModule, RoleModule],
                        context: ({ req, res }: any) => ({
                            request: req as HttpRequest,
                            response: res as HttpResponse,
                            prisma,
                        }),
                    }),
                    inject: [PrismaService],
                }),
                PrismaModule,
                AdministratorModule,
                UserModule,
                RoleModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useLogger(new Logger());

        await app.listen(port, hostname || '');

        adminClient = new TestGraphQLClient(
            `http://${hostname}:${port}/${adminApiPath}`,
        );
    });

    it('createAdministrator', async () => {
        const result = await adminClient.query<
            CreateAdministrator.Mutation,
            CreateAdministrator.Variables
        >(CREATE_ADMINISTRATOR, {
            input: {
                emailAddress: 'hello2345@test.com',
                firstName: 'Mg',
                lastName: 'Mg',
                roleIds: [1],
            },
        });
        expect(result.createAdministrator).toMatchSnapshot();
    });
});
