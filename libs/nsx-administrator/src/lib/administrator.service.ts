import { Injectable } from '@nestjs/common';
import { Prisma, Administrator } from '@prisma/client';
import { UserService } from '@myancommerce/nsx-user';
import { PrismaService } from '@myancommerce/nsx-prisma';
import { isGraphQlErrorResult } from '@myancommerce/nsx-error';
import { CreateAdministratorInput } from './input/create-administrator.input';
import { CreateAdmnistratorResult } from './result/create-administrator.result';

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

    async create(
        input: CreateAdministratorInput,
    ): Promise<typeof CreateAdmnistratorResult> {
        const user = await this.userService.createAdminUser(
            input.emailAddress,
            input.password,
        );

        if (isGraphQlErrorResult(user)) {
            return user;
        }

        return await this.prisma.administrator.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                emailAddress: input.emailAddress,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
    }

    async update(args: Prisma.AdministratorUpdateArgs): Promise<Administrator> {
        return this.prisma.administrator.update(args);
    }

    async delete(args: Prisma.AdministratorDeleteArgs): Promise<Administrator> {
        return this.prisma.administrator.delete(args);
    }
}
