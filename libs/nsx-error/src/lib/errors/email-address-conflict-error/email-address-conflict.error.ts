import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorResult } from '../../base.graphql.error';
import { EMAIL_ADDRESS_CONFLICT_ERROR_CODE } from './email-address-conflict.constant';

@ObjectType({
    description:
        'Returned when attempting to create a Customer with an email address already registered to an existing User.',
})
export class EmailAddressConflictError extends ErrorResult {
    @Field(() => String)
    email: String;

    constructor(partial?: Partial<EmailAddressConflictError>) {
        super(
            EMAIL_ADDRESS_CONFLICT_ERROR_CODE,
            `User with this ${partial?.email || 'email'} already exist.`,
        );
        Object.assign(this, partial);
    }
}
