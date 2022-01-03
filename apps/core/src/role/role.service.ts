import { CUSTOMER_ROLE_CODE, ID, PaginatedList } from '@myancommerce/shared';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { RequestContext } from '../api/common/request-context';
import { TransactionalConnection } from '../connection/transactional-connection';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
    constructor(private connection: TransactionalConnection) {}

    private getRoleByCode(code: string): Promise<Role | undefined> {
        return this.connection.getRepository(Role).findOne({
            where: { code },
        });
    }

    findAll(ctx: RequestContext): Promise<PaginatedList<Role>> {
        return this.connection
            .getRepository(ctx, Role)
            .createQueryBuilder('role')
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
    }

    findOne(ctx: RequestContext, roleId: ID): Promise<Role | undefined> {
        return this.connection.getRepository(ctx, Role).findOne(roleId);
    }

    async create(ctx: RequestContext, input: any): Promise<Role> {
        const role = new Role({
            code: input.code,
            description: input.description,
        });
        const createdRole = this.connection.getRepository(ctx, Role).save(role);
        return createdRole;
    }

    async update(ctx: RequestContext, input: any): Promise<Role> {
        const role = this.findOne(ctx, input.id);
        if (!role) {
            throw new EntityNotFoundError('Role', input.id);
        }

        const update = Object.assign(input, role);
        const updatedRole = this.connection
            .getRepository(ctx, Role)
            .save(update);

        return updatedRole;
    }

    async delete(ctx: RequestContext, id: ID): Promise<any> {
        const role = await this.findOne(ctx, id);
        if (!role) {
            throw new EntityNotFoundError('Role', role);
        }

        await this.connection.getRepository(ctx, Role).remove(role);

        return {
            result: 'DELETED',
        };
    }

    /**
     * @description
     * Returns Customer Role which is prior defined by special code in MyanCommerce
     */
    getCustomerRole(): Promise<Role> {
        return this.getRoleByCode(CUSTOMER_ROLE_CODE).then(role => {
            if (!role) {
                throw new InternalServerErrorException(
                    'error.customer-role-not-found',
                );
            }
            return role;
        });
    }
}
