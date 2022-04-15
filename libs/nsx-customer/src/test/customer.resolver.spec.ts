import { GraphQLModule } from '@nestjs/graphql';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule, ConfigService } from '@myancommerce/nsx-config';
import { RoleModule } from '@myancommerce/nsx-role';
import { PrismaModule, PrismaService } from '@myancommerce/nsx-prisma';
import { UserModule } from '@myancommerce/nsx-user';
import { CountryModule } from '@myancommerce/nsx-country';
import {
    populateForTesting,
    testConfiguration,
    testEnvironment,
    TestGraphQLClient,
} from '@myancommerce/nsx-testing';

import { CustomerModule } from '../lib/customer.module';
import { CustomerDto } from '../lib/customer.model';
import {
    GET_CUSTOMERS,
    GET_CUSTOMER,
    GET_CUSTOMER_WITH_USER,
} from './definitions/customer.definitions';
import {
    CREATE_ADDRESS,
    UPDATE_ADDRESS,
} from './definitions/address.definitions';

describe('CustomerResolver', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let apolloClient: TestGraphQLClient;

    // Placeholder customers for testing
    let firstCustomer: CustomerDto;
    // let secondCustomer: CustomerDto;
    // let thirdCustomer: CustomerDto;

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
                        path: testEnvironment.apiConfig.apiPath,
                        debug: testEnvironment.apiConfig.apiDebug,
                        playground: testEnvironment.apiConfig.apiPlayground,
                        include: [
                            CustomerModule,
                            UserModule,
                            RoleModule,
                            CountryModule,
                        ],
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
            )}/${configService.get('apiConfig.apiPath')}`,
        );
    });

    afterAll(async () => {
        await app.close();
    });

    it('should get customers', async () => {
        let result = await apolloClient.query(GET_CUSTOMERS);

        expect(result.customers.length).toBe(5);
        firstCustomer = result.customers[0];
        // secondCustomer = result.customers[1];
        // thirdCustomer = result.customers[2];
    });

    it('should query customer resolve with user', async () => {
        const { customer } = await apolloClient.query(GET_CUSTOMER_WITH_USER, {
            id: firstCustomer.id,
        });

        expect(customer.user).toMatchObject({
            identifier: firstCustomer.emailAddress,
            verified: true,
        });
    });

    describe('addresses', () => {
        let firstCustomerAddressIds: string[] = [];

        // it('should throws invalid countryCode error', async () => {
        //     const result = await apolloClient.query(CREATE_ADDRESS, {
        //         id: firstCustomer.id,
        //         input: {
        //             fullName: 'fullName',
        //             company: 'company',
        //             streetLine1: 'streetLine1',
        //             streetLine2: 'streetLine2',
        //             city: 'city',
        //             province: 'province',
        //             postalCode: 'postalCode',
        //             countryCode: 'INVALID',
        //             phoneNumber: 'phoneNumber',
        //             defaultShippingAddress: false,
        //             defaultBillingAddress: false,
        //         },
        //     });

        //     console.log('Invalid Error Result ------------');
        //     console.log(result);
        // });

        it('should creates a new address', async () => {
            const result = await apolloClient.query(CREATE_ADDRESS, {
                id: firstCustomer.id,
                input: {
                    fullName: 'fullName',
                    company: 'company',
                    streetLine1: 'streetLine1',
                    streetLine2: 'streetLine2',
                    city: 'city',
                    province: 'province',
                    postalCode: 'postalCode',
                    countryCode: 'DZ',
                    phoneNumber: 'phoneNumber',
                    defaultShippingAddress: false,
                    defaultBillingAddress: false,
                },
            });

            expect(result.createAddress).toMatchObject({
                fullName: 'fullName',
                company: 'company',
                streetLine1: 'streetLine1',
                streetLine2: 'streetLine2',
                city: 'city',
                province: 'province',
                postalCode: 'postalCode',
                country: {
                    code: 'DZ',
                    name: 'Algeria',
                },
                phoneNumber: 'phoneNumber',
                defaultShippingAddress: false,
                defaultBillingAddress: false,
            });
        });

        it('should query customer resolve with addresses', async () => {
            const { customer } = await apolloClient.query(GET_CUSTOMER, {
                id: firstCustomer.id,
            });

            expect(customer.addresses.length).toBe(1);
            firstCustomerAddressIds = customer.addresses
                .map((address: any) => address.id)
                .sort();
        });

        it('should update the country when updating countryCode of address', async () => {
            const result = await apolloClient.query(UPDATE_ADDRESS, {
                id: firstCustomerAddressIds[0],
                input: { countryCode: 'AF' },
            });

            expect(result.updateAddress.country).toMatchObject({
                code: 'AF',
                name: 'Afghanistan',
            });
        });

        it('should allow only a single default address when updating the address', () => {});
    });
});
