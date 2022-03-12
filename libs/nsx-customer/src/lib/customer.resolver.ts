import { ID, RequestContext } from '@myancommerce/nox-common';
import { PaginationArgs } from '@myancommerce/nsx-common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateCustomerInput } from './customer.input';
import { CustomerDto } from './customer.model';
import { CustomerService } from './customer.service';

@Resolver(() => CustomerDto)
export class CustomerResolver {
    constructor(private readonly customerService: CustomerService) {}

    @Query(() => [CustomerDto])
    administrators(
        @Context() { prisma }: RequestContext,
        @Args() { cursor, take, skip }: PaginationArgs,
    ): Promise<CustomerDto[]> {
        const filterBy = Object.assign(
            {},
            cursor && { cursor: { id: cursor } },
            take && { take },
            (skip && { skip }) || (cursor && { skip: 1 }),
        );
        return this.customerService.findAll(prisma, filterBy);
    }

    @Query(() => CustomerDto)
    administrator(
        @Context() { prisma }: RequestContext,
        @Args('id', { type: () => String }) userId: ID,
    ): Promise<CustomerDto | null> {
        return this.customerService.findOne(prisma, {
            where: { id: userId as string },
        });
    }

    @Mutation(() => CustomerDto)
    createAdministrator(
        @Context() { prisma }: RequestContext,
        @Args('input') input: CreateCustomerInput,
    ): Promise<CustomerDto> {
        return this.customerService.create(prisma, { data: input });
    }
}
