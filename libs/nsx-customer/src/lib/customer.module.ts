import { Module } from '@nestjs/common';

import { UserModule } from '@myancommerce/nsx-user';
import { PrismaModule } from '@myancommerce/nsx-prisma';
import { CountryModule } from '@myancommerce/nsx-country';

import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';

@Module({
    imports: [PrismaModule, UserModule, CountryModule],
    providers: [CustomerResolver, CustomerService],
    exports: [CustomerService],
})
export class CustomerModule {}
