import { Module } from '@nestjs/common';

import { UserModule } from '@myancommerce/nsx-user';
import { PrismaModule } from '@myancommerce/nsx-prisma';
import { CountryModule } from '@myancommerce/nsx-country';

import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { ConfigModule } from '@myancommerce/nsx-config';

@Module({
    imports: [ConfigModule, PrismaModule, UserModule, CountryModule],
    providers: [CustomerResolver, CustomerService],
    exports: [CustomerService],
})
export class CustomerModule {}
