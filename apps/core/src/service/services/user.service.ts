import { ID } from '@myancommerce/shared';
import { Injectable } from '@nestjs/common';
import { RequestContext } from '../../api/common/request-context';
import { TransactionalConnection } from '../../connection/transactional-connection';
import { User } from '../../entity/user/user.entity';

/**
 * @description
 * Contains methods relating to {@link User} entities.
 *
 * @docsCategory services
 */
@Injectable()
export class UserService {
    constructor(private connection: TransactionalConnection) {}

    async getUserById(
        ctx: RequestContext,
        userId: ID,
    ): Promise<User | undefined> {
        return this.connection.getRepository(ctx, User).findOne(userId);
    }

    async getUserByEmailAddress(
        ctx: RequestContext,
        emailAddress: string,
    ): Promise<User | undefined> {
        return this.connection.getRepository(ctx, User).findOne({
            where: {
                identifier: emailAddress,
                deletedAt: null,
            },
        });
    }

    async createCustomerUser(
        ctx: RequestContext,
        identifier: string,
    ): Promise<User> {
        const user = new User();
        user.identifier = identifier;
        return this.connection.getRepository(ctx, User).save(user);
    }
}
