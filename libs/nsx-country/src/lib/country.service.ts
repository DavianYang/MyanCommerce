import { Injectable } from '@nestjs/common';
import { Country, Prisma } from '@prisma/client';

import { PrismaService } from '@myancommerce/nsx-prisma';

@Injectable()
export class CountryService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(args: Prisma.CountryFindUniqueArgs): Promise<Country | null> {
        return this.prisma.country.findUnique(args);
    }

    async findAll(args: Prisma.CountryFindManyArgs): Promise<Country[]> {
        return this.prisma.country.findMany(args);
    }

    async findOnebyCode(countryCode: string): Promise<Country | null> {
        const country = await this.findOne({
            where: {
                code: countryCode,
            },
        });

        // If not found, return country code not valid

        return country;
    }

    async create({ data }: Prisma.CountryCreateArgs): Promise<Country> {
        return await this.prisma.country.create({
            data,
        });
    }

    async update(args: Prisma.CountryUpdateArgs): Promise<Country> {
        return this.prisma.country.update(args);
    }

    async delete(args: Prisma.CountryDeleteArgs): Promise<Country> {
        return this.prisma.country.delete(args);
    }
}
