import { createUnionType } from '@nestjs/graphql';

import { Success } from '@myancommerce/nsx-common';
import {
    EmailAddressConflictError,
    MissingPasswordError,
    PasswordValidationError,
} from '@myancommerce/nsx-error';

export const RegisterCustomerResult = createUnionType({
    name: 'RegisterCustomerResult',
    types: () => [
        Success,
        EmailAddressConflictError,
        PasswordValidationError,
        MissingPasswordError,
    ],
    resolveType(value) {
        if (value instanceof EmailAddressConflictError) {
            return EmailAddressConflictError;
        }

        if (value instanceof PasswordValidationError) {
            return PasswordValidationError;
        }

        if (value instanceof MissingPasswordError) {
            return MissingPasswordError;
        }

        return Success;
    },
});
