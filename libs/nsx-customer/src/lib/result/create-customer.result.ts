import {
    EmailAddressConflictError,
    PasswordValidationError,
} from '@myancommerce/nsx-error';
import { createUnionType } from '@nestjs/graphql';
import { CustomerDto } from '../customer.model';

export const CreateCustomerResult = createUnionType({
    name: 'CreateCustomerResult',
    types: () => [
        CustomerDto,
        EmailAddressConflictError,
        PasswordValidationError,
    ],
    resolveType(value) {
        if (value instanceof EmailAddressConflictError) {
            return EmailAddressConflictError;
        }

        if (value instanceof PasswordValidationError) {
            return PasswordValidationError;
        }

        return CustomerDto;
    },
});
