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
    customers(
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
    customer(
        @Context() { prisma }: RequestContext,
        @Args('id', { type: () => String }) userId: ID,
    ): Promise<CustomerDto | null> {
        return this.customerService.findOne(prisma, {
            where: { id: userId as string },
    // Strict for Admin
    @Mutation(() => CreateCustomerResult, {
        description:
            'Create a new Customer. If a password is provided, a new User will also be created an linked to the Customer.',
    })
    async createCustomer(
        @Input() input: CreateCustomerInput,
    ): Promise<typeof CreateCustomerResult> {
        return await this.customerService.create(input);
    }
        });
    }

    @Mutation(() => CustomerDto)
    createCustomer(
        @Context() { prisma }: RequestContext,
        @Args('input') input: CreateCustomerInput,
    ): Promise<CustomerDto> {
        return this.customerService.create(prisma, { data: input });
    }
}
