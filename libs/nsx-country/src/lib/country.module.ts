import { Module } from '@nestjs/common';
import { PrismaModule } from '@myancommerce/nsx-prisma';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';

@Module({
    imports: [PrismaModule],
    providers: [CountryService, CountryResolver],
    exports: [CountryService],
})
export class CountryModule {}
