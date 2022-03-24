import { PrismaService } from '@myancommerce/nsx-prisma';
import { Injectable } from '@nestjs/common';
import { Role, Prisma } from '@prisma/client';
import { CUSTOMER_ROLE_CODE, SUPERADMIN_ROLE_CODE } from './role.constant';

/**
 * @description
 * Contains methods relating to {@link Role} models.
 *
 * @docsCategory services
 */
@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService) {}

    private getRoleByCode(code: string): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: { code },
        });
    }

    async roles(args: Prisma.RoleFindManyArgs): Promise<Role[] | null> {
        return this.prisma.role.findMany(args);
    }

    async role(args: Prisma.RoleFindUniqueArgs): Promise<Role | null> {
        return this.prisma.role.findUnique(args);
    }

    async findAll(args: Prisma.RoleFindManyArgs): Promise<Role[]> {
        return this.prisma.role.findMany(args);
    }

    getCustomerRole(): Promise<Role> {
        return this.getRoleByCode(CUSTOMER_ROLE_CODE).then(role => {
            if (!role) {
                throw new Error('error.customer-role-not-found');
            }
            return role;
        });
    }

    getAdminRole(): Promise<Role> {
        return this.getRoleByCode(SUPERADMIN_ROLE_CODE).then(role => {
            if (!role) {
                throw new Error('error.administrator-role-not-found');
            }
            return role;
        });
    }

    async createRole({ data }: Prisma.RoleCreateArgs): Promise<Role> {
        return this.prisma.role.create({
            data: {
                code: data.code,
                description: data.description,
            },
        });
    }

    async updateRole(args: Prisma.RoleUpdateArgs): Promise<Role> {
        return this.prisma.role.update(args);
    }

    async deleteRole(args: Prisma.RoleDeleteArgs): Promise<Role> {
        return this.prisma.role.delete(args);
    }
}
