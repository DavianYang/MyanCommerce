import { Injectable } from '@nestjs/common';
import { Role, Prisma, PrismaClient } from '@prisma/client';
import { CUSTOMER_ROLE_CODE, SUPERADMIN_ROLE_CODE } from './role.constant';

/**
 * @description
 * Contains methods relating to {@link Role} models.
 *
 * @docsCategory services
 */
@Injectable()
export class RoleService {
    constructor() {}

    private getRoleByCode(
        prisma: PrismaClient,
        code: string,
    ): Promise<Role | null> {
        return prisma.role.findUnique({
            where: { code },
        });
    }

    async roles(
        prisma: PrismaClient,
        args: Prisma.RoleFindManyArgs,
    ): Promise<Role[] | null> {
        return prisma.role.findMany(args);
    }

    async role(
        prisma: PrismaClient,
        args: Prisma.RoleFindUniqueArgs,
    ): Promise<Role | null> {
        return prisma.role.findUnique(args);
    }

    async findAll(
        prisma: PrismaClient,
        args: Prisma.RoleFindManyArgs,
    ): Promise<Role[]> {
        return prisma.role.findMany(args);
    }

    getCustomerRole(prisma: PrismaClient): Promise<Role> {
        return this.getRoleByCode(prisma, CUSTOMER_ROLE_CODE).then(role => {
            if (!role) {
                throw new Error('error.customer-role-not-found');
            }
            return role;
        });
    }

    getAdminRole(prisma: PrismaClient): Promise<Role> {
        return this.getRoleByCode(prisma, SUPERADMIN_ROLE_CODE).then(role => {
            if (!role) {
                throw new Error('error.administrator-role-not-found');
            }
            return role;
        });
    }

    async createRole(
        prisma: PrismaClient,
        { data }: Prisma.RoleCreateArgs,
    ): Promise<Role> {
        return prisma.role.create({
            data: {
                code: data.code,
                description: data.description,
            },
        });
    }

    async updateRole(
        prisma: PrismaClient,
        args: Prisma.RoleUpdateArgs,
    ): Promise<Role> {
        return prisma.role.update(args);
    }

    async deleteRole(
        prisma: PrismaClient,
        args: Prisma.RoleDeleteArgs,
    ): Promise<Role> {
        return prisma.role.delete(args);
    }
}
