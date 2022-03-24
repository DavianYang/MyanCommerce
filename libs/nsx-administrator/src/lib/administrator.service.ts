import { Injectable } from '@nestjs/common';
import { Prisma, Administrator } from '@prisma/client';
import { UserService } from '@myancommerce/nsx-user';
import { PrismaService } from '@myancommerce/nsx-prisma';

@Injectable()
export class AdministratorService {
    constructor(
        private readonly prisma: PrismaService,
        private userService: UserService,
    ) {}

    async findOne(
        args: Prisma.AdministratorFindUniqueArgs,
    ): Promise<Administrator | null> {
        return this.prisma.administrator.findUnique(args);
    }

    async findAll(
        args: Prisma.AdministratorFindManyArgs,
    ): Promise<Administrator[]> {
        return this.prisma.administrator.findMany(args);
    }

    async create({
        data,
    }: Prisma.AdministratorCreateArgs): Promise<Administrator> {
        return await this.prisma.$transaction(async (_prisma: any) => {
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

    async update(args: Prisma.AdministratorUpdateArgs): Promise<Administrator> {
        return this.prisma.administrator.update(args);
    }

    async delete(args: Prisma.AdministratorDeleteArgs): Promise<Administrator> {
        return this.prisma.administrator.delete(args);
    }
}
