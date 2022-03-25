import { gql } from 'apollo-server-express';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule, PrismaService } from '@myancommerce/nsx-prisma';
import {
    populateForTesting,
    testConfiguration,
    testEnvironment,
    TestGraphQLClient,
} from '@myancommerce/nsx-testing';

import { CustomerModule } from './customer.module';
import { GraphQLModule } from '@nestjs/graphql';
import { INestApplication } from '@nestjs/common';
import { RoleModule } from '@myancommerce/nsx-role';

const GET_CUSTOMERS = gql`
    query GetCustomers {
        customers {
            id
            firstName
            lastName
            title
            emailAddress
            phoneNumber
        }
    }
`;

describe('CustomerResolver', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let apolloClient: TestGraphQLClient;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    ...testEnvironment.appConfig,
                    load: [testConfiguration],
                }),
                GraphQLModule.forRootAsync({
                    useFactory: async () => ({
                        ...testEnvironment.graphqlConfig,
                        path: testEnvironment.apiConfig.adminApiPath,
                        debug: testEnvironment.apiConfig.adminApiDebug,
                        playground:
                            testEnvironment.apiConfig.adminApiPlayground,
                        context: ({ req, res }: any) => ({
                            request: req,
                            response: res,
                        }),
                    }),
                }),
                PrismaModule,
                CustomerModule,
                RoleModule,
            ],
        }).compile();

        prisma = moduleRef.get(PrismaService);
        await prisma.cleanDatabase();

        const configService = moduleRef.get(ConfigService);

        app = moduleRef.createNestApplication();

        await app.listen(
            configService.get('apiConfig.port') as number,
            (configService.get('apiConfig.hostname') as string) || '',
        );

        await populateForTesting(app, { customerCount: 5 });

        apolloClient = new TestGraphQLClient(
            `http://localhost:${configService.get(
                'apiConfig.port',
            )}/${configService.get('apiConfig.adminApiPath')}`,
        );
    });

    afterAll(async () => {
        await app.close();
    });

    it('it get customers', async () => {
        let result = await apolloClient.query(GET_CUSTOMERS);

        expect(result.customers.length).toBe(5);
    });
});
