import { ObjectType } from '@nestjs/graphql';
import { ErrorResult } from '../../base.graphql.error';

@ObjectType({
    description:
        'Returned when attempting to create a Customer with an email address already registered to an existing User.',
})
export class EmailAddressConflictError extends ErrorResult {
    constructor(partial?: Partial<EmailAddressConflictError>) {
        super();
        Object.assign(this, partial);
    }
}
