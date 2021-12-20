import { Injectable } from '@nestjs/common';
import { RequestContext } from 'api/common/request-context';
import { Customer } from 'entity/customer/customer.entity';
import { UserService } from './user.service';
import { TransactionalConnection } from 'connection/transactional-connection';

/**
 * @description
 * Contains methods relating to {@link Customer} entities.
 *
 * @docsCategory services
 */
@Injectable()
export class CustomerService {
    constructor(
        private connection: TransactionalConnection,
        private userService: UserService,
    ) {}

    /**
     * @description
     * Creates a new Customer, including creation of a new User with the special `customer` Role.
     *
     * If the `password` argument is specified, the Customer will be immediately verified. If not,
     * then an {@link AccountRegistrationEvent} is published, so that the customer can have their
     * email address verified and set their password in a later step using the `verifyCustomerEmailAddress()`
     * method.
     *
     * This method is intended to be used in admin-created Customer flows.
     */
    async create(ctx: RequestContext, input) {
        const customer = new Customer(input);

        customer.user = await this.userService.createCustomerUser(
            ctx,
            input.emailAddress,
        );

        const createdCustomer = await this.connection
            .getRepository(ctx, Customer)
            .save(customer);

        return createdCustomer;
    }
}
