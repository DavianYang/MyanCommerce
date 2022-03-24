import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { RoleService } from '@myancommerce/nsx-role';
import { PrismaService } from '@myancommerce/nsx-prisma';
import { ID } from '@myancommerce/nox-common';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private roleService: RoleService,
    ) {}

    async findOne(args: Prisma.UserFindUniqueArgs): Promise<User | null> {
        return this.prisma.user.findUnique(args);
    }

    async findMany(args: Prisma.UserFindManyArgs): Promise<User[]> {
        return this.prisma.user.findMany(args);
    }

    async createCustomerUser(identifier: string): Promise<User> {
        const customerRole = await this.roleService.getCustomerRole();
        return this.prisma.user.create({
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

    async createAdminUser(identifier: string): Promise<User> {
        const adminRole = await this.roleService.getAdminRole();

        return this.prisma.user.create({
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

    async updateUser(args: Prisma.UserUpdateArgs): Promise<User> {
        return this.prisma.user.update(args);
    }

    async deleteUser(args: Prisma.UserDeleteArgs): Promise<User> {
        return this.prisma.user.delete(args);
    }

    async softDelete(userId: ID) {
        await this.prisma.user.update({
            where: { id: userId as string },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
