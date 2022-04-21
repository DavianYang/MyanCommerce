import { Injectable } from '@nestjs/common';
import { Address, Customer, Prisma, User } from '@prisma/client';

import { ConfigService } from '@myancommerce/nsx-config';
import { ID } from '@myancommerce/nox-common';
import { DeletionResponse, DeletionResult } from '@myancommerce/nsx-common';
import {
    EmailAddressConflictError,
    EntityNotFoundError,
    ErrorResultUnion,
    InternalServerError,
    isGraphQlErrorResult,
    MissingPasswordError,
} from '@myancommerce/nsx-error';
import { UserService } from '@myancommerce/nsx-user';
import { PrismaService } from '@myancommerce/nsx-prisma';
import { CountryService } from '@myancommerce/nsx-country';

import { UpdateAddressInput } from './input/update-address.input';
import { CreateAddressInput } from './input/create-address.input';
import { CreateCustomerInput } from './input/create-customer.input';
import { RegisterCustomerInput } from './input/register-customer.input';
import { CreateCustomerResult } from './result/create-customer.result';
import { RegisterCustomerResult } from './result/register-customer.result';
import { VerifyCustomerResult } from './result/verify-customer-account.result';
import { UpdateCustomerInput } from './input';
import { UpdateCustomerResult } from './result';

@Injectable()
export class CustomerService {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private userService: UserService,
        private countryService: CountryService,
    ) {}

    async findOne(
        args: Prisma.CustomerFindFirstArgs,
    ): Promise<Customer | null> {
        return this.prisma.customer.findFirst(args);
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
            return new EmailAddressConflictError({ email: input.emailAddress });
        }

        // if password is specified, return verification token,
        // if not, customer can have email address verified and set their password
        // in a later step using `VerifyCustomerEmailAddress`

        const user = await this.userService.createCustomerUser(
            input.emailAddress,
            input.password,
        );

        if (isGraphQlErrorResult(user)) {
            return user;
        }

        const CustomerInclude: Prisma.CustomerInclude = {
            user: true,
        };

        return await this.prisma.customer.create({
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
            include: CustomerInclude,
        });
    }

    /**
     * @description
     * Registers a new Customer account
     *
     * This method is intended to be used in storefront Customer-creation flows.
     */
    async registerCustomerAccount(
        input: RegisterCustomerInput,
    ): Promise<typeof RegisterCustomerResult> {
        if (
            !this.configService.get('authConfig.requireVerification') &&
            !input.password
        ) {
            return new MissingPasswordError();
        }

        const result = await this.create({
            title: input.title,
            firstName: input.firstName,
            lastName: input.lastName,
            emailAddress: input.emailAddress,
            phoneNumber: input.phoneNumber,
            password: input.password || null,
        });

        if (isGraphQlErrorResult(result)) {
            return result;
        }

        return {
            success: true,
        };
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
        // query Address with customer and customer addresses
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

    async update(
        customerId: ID,
        input: UpdateCustomerInput,
    ): Promise<typeof UpdateCustomerResult> {
        const hasEmailAddress = (
            i: any,
        ): i is UpdateCustomerInput & { emailAddress: string } =>
            Object.hasOwnProperty.call(i, 'emailAddress');

        const customer = await this.findOne({
            where: { id: customerId as string },
        });

        if (hasEmailAddress(input)) {
            if (customer?.emailAddress !== input.emailAddress) {
                const existingCustomer = await this.findOne({
                    where: { emailAddress: input.emailAddress },
                });

                if (existingCustomer) {
                    return new EmailAddressConflictError();
                }
            }
        }

        return await this.prisma.customer.update({
            where: { id: customerId as string },
            data: input,
        });
    }

    async deleteAddress(args: Prisma.AddressDeleteArgs): Promise<Address> {
        return this.prisma.address.delete(args);
    }

    async softDelete(customerId: ID): Promise<DeletionResponse> {
        await this.prisma.$transaction(async (_prisma: any) => {
            const customer = await _prisma.customer.update({
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

    async verifyCustomerEmailAddress(
        verificationToken: string,
        password?: string,
    ): Promise<
        ErrorResultUnion<
            typeof VerifyCustomerResult,
            Customer & { user: User | null }
        >
    > {
        const result = await this.userService.verifyUserByToken(
            verificationToken,
            password,
        );

        if (isGraphQlErrorResult(result)) return result;

        const userInclude = Prisma.validator<Prisma.CustomerInclude>()({
            user: true,
        });

        const customer = await this.prisma.customer.findUnique({
            where: { userId: result.id },
            include: userInclude,
        });

        if (!customer) {
            throw new InternalServerError({
                errorCode: 'error.cannot-locate-customer-for-user',
                message: 'Cannot Locate Customer For User Verification',
            });
        }

        return customer;
    }
}
