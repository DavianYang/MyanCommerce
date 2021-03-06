import { Injectable } from '@nestjs/common';
import { Address, Customer, Prisma } from '@prisma/client';

import { ID } from '@myancommerce/nox-common';
import { DeletionResponse, DeletionResult } from '@myancommerce/nsx-common';
import {
    EmailAddressConflictError,
    EMAIL_ADDRESS_CONFLICT_ERROR_CODE,
    EMAIL_ADDRESS_CONFLICT_ERROR_MESSSAGE,
    EntityNotFoundError,
} from '@myancommerce/nsx-error';
import { UserService } from '@myancommerce/nsx-user';
import { PrismaService } from '@myancommerce/nsx-prisma';
import { CountryService } from '@myancommerce/nsx-country';

import { CreateCustomerResult } from './result/create-customer.result';
import { UpdateAddressInput } from './input/update-address.input';
import { CreateAddressInput } from './input/create-address.input';
import { CreateCustomerInput } from './input/create-customer.input';

@Injectable()
export class CustomerService {
    constructor(
        private readonly prisma: PrismaService,
        private userService: UserService,
        private countryService: CountryService,
    ) {}

    async findOne(
        args: Prisma.CustomerFindUniqueArgs,
    ): Promise<Customer | null> {
        return this.prisma.customer.findUnique(args);
    }

    async findAll(args: Prisma.CustomerFindManyArgs): Promise<Customer[]> {
        return this.prisma.customer.findMany(args);
    }

    /**
     * @description
     * Creates a new Customer, including creation of a new User with the special `customer` Role.
     *
     * This method is intended to be used in admin-created Customer flows.
     */
    async create(
        input: CreateCustomerInput,
    ): Promise<typeof CreateCustomerResult> {
        const existingCustomer = await this.findOne({
            where: { emailAddress: input.emailAddress },
        });

        if (existingCustomer) {
            return new EmailAddressConflictError({
                errorCode: EMAIL_ADDRESS_CONFLICT_ERROR_CODE,
                message: EMAIL_ADDRESS_CONFLICT_ERROR_MESSSAGE,
            });
        }

        // if password is specified, return verification token,
        // if not, customer can have email address verified and set their password
        // in a later step using `VerifyCustomerEmailAddress`

        return await this.prisma.$transaction(async (_prisma: any) => {
            const user = await this.userService.createCustomerUser(
                input.emailAddress,
            );

            return await _prisma.customer.create({
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    emailAddress: input.emailAddress,
                    title: input.title,
                    phoneNumber: input.phoneNumber,
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });
        });
    }

    async createAddress(
        customerId: ID,
        input: CreateAddressInput,
    ): Promise<Address> {
        const customer = await this.findOne({
            where: { id: customerId as string },
            include: {
                addresses: true,
            },
        });

        if (!customer) {
            throw new EntityNotFoundError('Customer', customerId);
        }

        const country = await this.countryService.findOnebyCode(
            input.countryCode as string,
        );

        if (!country) {
            throw new EntityNotFoundError(
                'Country',
                input.countryCode as string,
            );
        }

        // Create Address and Save to DB
        const createdAddress = await this.prisma.address.create({
            data: {
                fullName: input.fullName,
                company: input.company,
                streetLine1: input.streetLine1,
                streetLine2: input.streetLine2,
                city: input.city,
                province: input.province,
                postalCode: input.postalCode,
                phoneNumber: input.phoneNumber,
                defaultBillingAddress: input.defaultBillingAddress,
                defaultShippingAddress: input.defaultShippingAddress,
                customer: {
                    connect: {
                        id: customer!.id as string,
                    },
                },
                country: {
                    connect: {
                        id: country!.id as string,
                    },
                },
            },
            include: {
                customer: true,
                country: true,
            },
        });

        // - Enforce Single Address
        // query Address with customer and cusomter addresses
        // if it is, map customer addresses id, and check if id and created Address Id are equal
        // If the id aren't equal, if input's defualtBillingAddress is true, make it false
        // If the id aren't equal, if input's defualtShippingAddress is true,make it false

        return createdAddress;
    }

    async updateAddress(
        addressId: ID,
        input: UpdateAddressInput,
    ): Promise<Address> {
        let newCountry;

        const address = await this.prisma.address.findUnique({
            where: { id: addressId as string },
            include: {
                country: true,
            },
        });

        if (!address) {
            throw new EntityNotFoundError('Address', addressId);
        }

        if (input.countryCode && input.countryCode !== address?.country.code) {
            newCountry = await this.countryService.findOnebyCode(
                input.countryCode,
            );
        }

        return await this.prisma.address.update({
            where: { id: addressId as string },
            data: {
                fullName: input.fullName,
                company: input.company,
                streetLine1: input.streetLine1,
                streetLine2: input.streetLine2,
                city: input.city,
                province: input.province,
                postalCode: input.postalCode,
                phoneNumber: input.phoneNumber,
                defaultBillingAddress: input.defaultBillingAddress,
                defaultShippingAddress: input.defaultShippingAddress,
                country: {
                    connect: {
                        id: newCountry?.id || address?.country.id,
                    },
                },
            },
            include: {
                country: true,
            },
        });
    }

    async deleteAddress(args: Prisma.AddressDeleteArgs): Promise<Address> {
        return this.prisma.address.delete(args);
    }

    async update(args: Prisma.CustomerUpdateArgs): Promise<Customer> {
        // If Customer Id and customer from input email address isn't matched, return EmailAddressConflictError
        return await this.prisma.customer.update(args);
    }

    async softDelete(customerId: ID): Promise<DeletionResponse> {
        await this.prisma.$transaction(async (_prisma: any) => {
            const customer = await this.prisma.customer.update({
                where: { id: customerId as string },
                data: {
                    deletedAt: new Date(),
                },
                include: {
                    user: true,
                },
            });

            await this.userService.softDelete(customer.user?.id as string);
        });

        return {
            result: DeletionResult.DELETED,
        };
    }
}
