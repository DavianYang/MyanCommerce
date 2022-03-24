import { PrismaModule, PrismaService } from '@myancommerce/nsx-prisma';
import { testConfiguration, testEnvironment } from '@myancommerce/nsx-testing';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerModule } from './customer.module';

describe('CustomerResolver', () => {
    let prisma: PrismaService;

    beforeEach(async () => {
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

        prisma = moduleRef.get(PrismaService);
        await prisma.cleanDatabase();
    });

    it('should be defined', () => {});
});
