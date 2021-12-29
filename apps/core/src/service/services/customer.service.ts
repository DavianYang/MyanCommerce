import { Injectable } from '@nestjs/common';
import { RequestContext } from '../../api/common/request-context';
import { Customer } from '../../entity/customer/customer.entity';
import { TransactionalConnection } from '../../connection/transactional-connection';

/**
 * @description
 * Contains methods relating to {@link Customer} entities.
 *
 * @docsCategory services
 */
@Injectable()
export class CustomerService {
    constructor(private connection: TransactionalConnection) {}

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
    async create(ctx: RequestContext, input: any) {
        const customer = new Customer(input);
        const createdCustomer = await this.connection
            .getRepository(ctx, Customer)
            .save(customer);
        console.log('created customer', createdCustomer);
        return createdCustomer;
    }
}
