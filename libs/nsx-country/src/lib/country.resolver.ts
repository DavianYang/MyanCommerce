import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ID } from '@myancommerce/nox-common';
import { IDArg, Input, PaginationArgs } from '@myancommerce/nsx-common';

import { CountryDto } from './country.model';
import { CountryService } from './country.service';
import { CreateCountryInput } from './input/create-country.input';
import { UpdateCountryInput } from './input/update-country.input';

@Resolver(() => CountryDto)
export class CountryResolver {
    constructor(private readonly countrySerivce: CountryService) {}

    @Query(() => [CountryDto])
    async countries(
        @Args() { cursor, take, skip }: PaginationArgs,
    ): Promise<CountryDto[]> {
        const filterBy = Object.assign(
            {},
            cursor && { cursor: { id: cursor } },
            take && { take },
            (skip && { skip }) || (cursor && { skip: 1 }),
        );
        return await this.countrySerivce.findAll(filterBy);
    }

    @Query(() => CountryDto)
    async country(@IDArg() countryId: ID): Promise<CountryDto | null> {
        return await this.countrySerivce.findOne({
            where: { id: countryId as string },
        });
    }

    @Mutation(() => CountryDto)
    async createCountry(
        @Input() input: CreateCountryInput,
    ): Promise<CountryDto> {
        return await this.countrySerivce.create({ data: input });
    }

    @Mutation(() => CountryDto)
    async updateCountry(
        @IDArg() countryId: ID,
        @Input() input: UpdateCountryInput,
    ): Promise<CountryDto> {
        return await this.countrySerivce.update({
            where: { id: countryId as string },
            data: input,
        });
    }

    @Mutation(() => CountryDto)
    deleteCountry(@IDArg() countryId: ID) {
        return this.countrySerivce.delete({
            where: { id: countryId as string },
        });
    }
}
