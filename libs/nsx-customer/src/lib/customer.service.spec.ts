import { PrismaModule } from '@myancommerce/nsx-prisma';
import { testConfiguration, testEnvironment } from '@myancommerce/nsx-testing';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerModule } from './customer.module';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
    let service: CustomerService;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    ...testEnvironment.appConfig,
                    load: [testConfiguration],
                }),
                PrismaModule,
                CustomerModule,
            ],
        }).compile();

        service = moduleRef.get<CustomerService>(CustomerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
