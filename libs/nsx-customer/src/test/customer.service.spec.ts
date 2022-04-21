import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@myancommerce/nsx-config';
import { PrismaModule, PrismaService } from '@myancommerce/nsx-prisma';
import {
    assertThrowsWithMessage,
    populateForTesting,
    testConfiguration,
    testEnvironment,
} from '@myancommerce/nsx-testing';

import { CustomerModule } from '../lib/customer.module';
import { CustomerService } from '../lib/customer.service';
import { RoleModule } from '@myancommerce/nsx-role';
import { INestApplication } from '@nestjs/common';
import { CustomerDto } from '../lib/customer.model';

describe('CustomerService', () => {
    let app: INestApplication;
    let service: CustomerService;
    let prisma: PrismaService;

    let firstCustomer: CustomerDto;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    ...testEnvironment.appConfig,
                    load: [testConfiguration],
                }),
                PrismaModule,
                CustomerModule,
                RoleModule,
            ],
        }).compile();

        prisma = moduleRef.get(PrismaService);
        // await prisma.cleanDatabase();

        // const configService = moduleRef.get(ConfigService);

        app = moduleRef.createNestApplication();

        await app.init();

        await populateForTesting(app, { customerCount: 5 });

        service = moduleRef.get<CustomerService>(CustomerService);
    });

    afterAll(async () => {
        await prisma.cleanDatabase();
        await app.close();
    });

    it('should get customers', async () => {
        let result = await service.findAll({ include: { user: true } });

        expect(result.length).toBe(5);
        firstCustomer = result[0];
    });

    it(
        'should throws invalid countryCode error',
        assertThrowsWithMessage(
            async () =>
                await service.createAddress(firstCustomer.id, {
                    fullName: 'fullName',
                    company: 'company',
                    streetLine1: 'streetLine1',
                    streetLine2: 'streetLine2',
                    city: 'city',
                    province: 'province',
                    postalCode: 'postalCode',
                    countryCode: 'INVALID',
                    phoneNumber: 'phoneNumber',
                    defaultShippingAddress: false,
                    defaultBillingAddress: false,
                }),
            "Entity 'Country' with ID 'INVALID' not found.",
        ),
    );
});
