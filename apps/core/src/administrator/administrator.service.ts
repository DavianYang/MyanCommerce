import {
    CreateAdministratorInput,
    DeletionResponse,
    DeletionResult,
    UpdateAdministratorInput,
} from '@myancommerce/generated';
import { ID, PaginatedList } from '@myancommerce/shared';
import { Injectable } from '@nestjs/common';
import { RequestContext } from '../api/common/request-context';
import { TransactionalConnection } from '../connection/transactional-connection';
import { EntityNotFoundError } from '../error/entitiy-not-found.error';
import { User } from '../user/entities/user.entity';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { Administrator } from './entities/administrator.entity';
import { ErrorResultUnion } from '../common';

/**
 * @description
 * Contains methods relating to {@link Role} entities.
 *
 * @docsCategory services
 */
@Injectable()
export class AdministratorService {
    constructor(
        private connection: TransactionalConnection,
        private userService: UserService,
        private roleService: RoleService,
    ) {}

    findAll(ctx: RequestContext): Promise<PaginatedList<Administrator>> {
        return this.connection
            .getRepository(ctx, Administrator)
            .createQueryBuilder('administrator')
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
    }

    findOne(
        ctx: RequestContext,
        administratorId: ID,
    ): Promise<Administrator | undefined> {
        return this.connection
            .getRepository(ctx, Administrator)
            .findOne(administratorId, {
                relations: ['user', 'user.roles'],
                where: {
                    deletedAt: null,
                },
            });
    }

    findOneByUserId(
        ctx: RequestContext,
        userId: ID,
    ): Promise<Administrator | undefined> {
        return this.connection.getRepository(ctx, Administrator).findOne({
            where: {
                user: { id: userId },
                deletedAt: null,
            },
        });
    }

    async create(
        ctx: RequestContext,
        input: CreateAdministratorInput,
    ): Promise<Administrator> {
        const administrator = new Administrator(input);
        administrator.user = await this.userService.createAdminUser(
            ctx,
            input.emailAddress,
        );

        let createdAdministrator = await this.connection
            .getRepository(ctx, Administrator)
            .save(administrator);

        for (const roleId of input.roleIds) {
            createdAdministrator = await this.assignRole(
                ctx,
                createdAdministrator.id,
                roleId,
            );
        }

        return createdAdministrator;
    }

    async update(
        ctx: RequestContext,
        id: ID,
        input: UpdateAdministratorInput,
    ): Promise<Administrator> {
        let administrator = await this.findOne(ctx, id);

        if (!administrator) {
            throw new EntityNotFoundError('Administrator', id);
        }

        const update = Object.assign(administrator, input);

        const updatedAdministrator = this.connection
            .getRepository(ctx, Administrator)
            .save(update);

        return updatedAdministrator;
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const administrator = await this.findOne(ctx, id);

        if (!administrator) {
            throw new EntityNotFoundError('Administrator', id);
        }

        await this.connection
            .getRepository(ctx, Administrator)
            .remove(administrator);

        return {
            result: DeletionResult.Deleted,
        };
    }

    async assignRole(
        ctx: RequestContext,
        administratorId: ID,
        roleId: ID,
    ): Promise<Administrator> {
        const administrator = await this.findOne(ctx, administratorId);

        if (!administrator) {
            throw new EntityNotFoundError('Administrator', administratorId);
        }

        const role = await this.roleService.findOne(ctx, roleId);

        if (!role) {
            throw new EntityNotFoundError('Role', roleId);
        }

        administrator.user.roles.push(role);

        await this.connection
            .getRepository(ctx, User)
            .save(administrator.user, { reload: false });

        return administrator;
    }
}
