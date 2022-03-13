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
        prisma: PrismaClient,
        { data }: Prisma.CustomerCreateArgs,
    ): Promise<Customer> {
        return await prisma.$transaction(async (_prisma: any) => {
            const user = await this.userService.createCustomerUser(
                _prisma,
                data.emailAddress,
            );

            return await _prisma.customer.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    emailAddress: data.emailAddress,
                    title: data.title,
                    phoneNumber: data.phoneNumber,
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
