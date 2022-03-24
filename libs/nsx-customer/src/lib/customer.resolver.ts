import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ID } from '@myancommerce/nox-common';
import {
    DeletionResponse,
    IDArg,
    Input,
    PaginationArgs,
    Success,
} from '@myancommerce/nsx-common';

import { CreateCustomerInput } from './input/create-customer.input';
import { CustomerDto } from './customer.model';
import { CustomerService } from './customer.service';

import { CreateCustomerResult } from './result/create-customer.result';
import { UpdateCustomerResult } from './result/update-customer.result';
import { UpdateCustomerInput } from './input/update-customer.input';
import { AddressDto } from './address.model';
import { CreateAddressInput } from './input/create-address.input';
import { UpdateAddressInput } from './input/update-address.input';

@Resolver(() => CustomerDto)
export class CustomerResolver {
    constructor(private readonly customerService: CustomerService) {}

    // Strict for Admin
    @Query(() => [CustomerDto])
    async customers(
        @Args() { cursor, take, skip }: PaginationArgs,
    ): Promise<CustomerDto[]> {
        const filterBy = Object.assign(
            {},
            cursor && { cursor: { id: cursor } },
            take && { take },
            (skip && { skip }) || (cursor && { skip: 1 }),
        );
        return await this.customerService.findAll(filterBy);
    }

    // Strict for Admin
    @Query(() => CustomerDto)
    async customer(
        @Args('id', { type: () => String }) userId: ID,
    ): Promise<CustomerDto | null> {
        return await this.customerService.findOne({
            where: { id: userId as string },
            select: {
                user: true,
            },
        });
    }

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

    // Strict for Admin and Current Customer Only
    @Mutation(() => AddressDto, {
        description:
            'Create a new Address and associate it with the Customer specified by customerId',
    })
    async createAddress(
        @IDArg('customerId') customerId: ID,
        @Input() input: CreateAddressInput,
    ): Promise<AddressDto> {
        return await this.customerService.createAddress(customerId, input);
    }

    // Strict for Admin and Current Customer
    @Mutation(() => UpdateCustomerResult, {
        description: 'Update an existing Customer',
    })
    async updateCustomer(
        @Args('email', { type: () => String }) email: string,
        @Input() input: UpdateCustomerInput,
    ): Promise<typeof UpdateCustomerResult> {
        return await this.customerService.update({
            where: { emailAddress: email },
            data: input,
            select: { user: true },
        });
    }

    // Strict for Admin and Current Customer
    @Mutation(() => AddressDto, {
        description: 'Update an existing Address with addressId',
    })
    async updateAddress(
        @IDArg('addressId') addressId: ID,
        @Input() input: UpdateAddressInput,
    ): Promise<AddressDto> {
        return await this.customerService.updateAddress(addressId, input);
    }

    // Strict for Admin and Current Customer
    @Mutation(() => Success, {
        description: 'Delete an existing Address with addressId',
    })
    async deleteAddress(@IDArg('addressId') addressId: ID): Promise<Success> {
        await this.customerService.deleteAddress({
            where: { id: addressId as string },
        });

        return { success: true };
    }

    // Strict for Admin and Current Customer
    @Mutation(() => DeletionResponse, { description: 'Delete a Customer' })
    async deleteCustomer(
        @IDArg('customerId') customerId: ID,
    ): Promise<DeletionResponse> {
        return await this.customerService.softDelete(customerId);
    }
}
