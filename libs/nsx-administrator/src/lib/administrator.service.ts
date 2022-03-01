import { Injectable } from '@nestjs/common';
import { Prisma, Administrator, PrismaClient } from '@prisma/client';
import { UserService } from '@myancommerce/nsx-user';

@Injectable()
export class AdministratorService {
    constructor(private userService: UserService) {}

    async findOne(
        prisma: PrismaClient,
        args: Prisma.AdministratorFindUniqueArgs,
    ): Promise<Administrator | null> {
        return prisma.administrator.findUnique(args);
    }

    async findAll(
        prisma: PrismaClient,
        args: Prisma.AdministratorFindManyArgs,
    ): Promise<Administrator[]> {
        return prisma.administrator.findMany(args);
    }

    async create(
        prisma: PrismaClient,
        { data }: Prisma.AdministratorCreateArgs,
    ): Promise<Administrator> {
        return await prisma.$transaction(async (_prisma: any) => {
            const user = await this.userService.createAdminUser(
                data.emailAddress,
            );

            return await _prisma.administrator.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    emailAddress: data.emailAddress,
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
        args: Prisma.AdministratorUpdateArgs,
    ): Promise<Administrator> {
        return prisma.administrator.update(args);
    }

    async delete(
        prisma: PrismaClient,
        args: Prisma.AdministratorDeleteArgs,
    ): Promise<Administrator> {
        return prisma.administrator.delete(args);
    }
}
