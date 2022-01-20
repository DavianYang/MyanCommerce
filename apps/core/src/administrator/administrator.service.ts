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
import { UserService } from '../user/user.service';
import { Administrator } from './entities/administrator.entity';

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

        const createdAdministrator = await this.connection
            .getRepository(ctx, Administrator)
            .save(administrator);

        return createdAdministrator;
    }

    async update(
        ctx: RequestContext,
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
}
