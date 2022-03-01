import { Injectable } from '@nestjs/common';
import { PrismaService } from '@myancommerce/nsx-prisma';
import { Role, Prisma } from '@prisma/client';
import { CUSTOMER_ROLE_CODE, SUPERADMIN_ROLE_CODE } from './role.constant';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) {}

    private getRoleByCode(code: string): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: { code },
        });
    }

    async role(
        roleWhereUniqueInput: Prisma.RoleWhereUniqueInput,
    ): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: roleWhereUniqueInput,
        });
    }

    async roles(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RoleWhereUniqueInput;
        where?: Prisma.RoleWhereInput;
        orderBy?: Prisma.RoleOrderByWithRelationInput;
    }): Promise<Role[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.role.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
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

    async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
        return this.prisma.role.create({
            data,
        });
    }

    async updateRole(params: {
        where: Prisma.RoleWhereUniqueInput;
        data: Prisma.RoleUpdateInput;
    }): Promise<Role> {
        const { where, data } = params;
        return this.prisma.role.update({
            data,
            where,
        });
    }

    async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
        return this.prisma.role.delete({
            where,
        });
    }
}
