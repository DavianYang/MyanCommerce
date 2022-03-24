import { UserService } from '@myancommerce/nsx-user';
import { Injectable } from '@nestjs/common';
import { Customer, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class CustomerService {
    constructor(private userService: UserService) {}

    async findOne(
        prisma: PrismaClient,
        args: Prisma.CustomerFindUniqueArgs,
    ): Promise<Customer | null> {
        return prisma.customer.findUnique(args);
    }

    async findAll(
        prisma: PrismaClient,
        args: Prisma.CustomerFindManyArgs,
    ): Promise<Customer[]> {
        return prisma.customer.findMany(args);
    }

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

    async update(
        prisma: PrismaClient,
        args: Prisma.CustomerUpdateArgs,
    ): Promise<Customer> {
        return prisma.customer.update(args);
    }

    async delete(
        prisma: PrismaClient,
        args: Prisma.AdministratorDeleteArgs,
    ): Promise<Customer> {
        return prisma.customer.delete(args);
    }
}
