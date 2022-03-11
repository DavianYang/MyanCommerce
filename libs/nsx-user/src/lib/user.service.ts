import { Injectable } from '@nestjs/common';
import { User, Prisma, PrismaClient } from '@prisma/client';
import { RoleService } from '@myancommerce/nsx-role';

@Injectable()
export class UserService {
    constructor(private roleService: RoleService) {}

    async findOne(
        prisma: PrismaClient,
        args: Prisma.UserFindUniqueArgs,
    ): Promise<User | null> {
        return prisma.user.findUnique(args);
    }

    async findMany(
        prisma: PrismaClient,
        args: Prisma.UserFindManyArgs,
    ): Promise<User[]> {
        return prisma.user.findMany(args);
    }

    async createCustomerUser(
        prisma: PrismaClient,
        identifier: string,
    ): Promise<User> {
        const customerRole = await this.roleService.getCustomerRole(prisma);
        return prisma.user.create({
            data: {
                identifier,
                roles: {
                    connect: {
                        id: customerRole.id,
                    },
                },
            },
        });
    }

    async createAdminUser(
        prisma: PrismaClient,
        identifier: string,
    ): Promise<User> {
        const adminRole = await this.roleService.getAdminRole(prisma);

        return prisma.user.create({
            data: {
                identifier,
                roles: {
                    connect: {
                        id: adminRole.id,
                    },
                },
            },
        });
    }

    async updateUser(
        prisma: PrismaClient,
        args: Prisma.UserUpdateArgs,
    ): Promise<User> {
        return prisma.user.update(args);
    }

    async deleteUser(
        prisma: PrismaClient,
        args: Prisma.UserDeleteArgs,
    ): Promise<User> {
        return prisma.user.delete(args);
    }
}
