import { createUnionType } from '@nestjs/graphql';

import { Success } from '@myancommerce/nsx-common';
import { EmailAddressConflictError } from '@myancommerce/nsx-error';

export const RegisterCustomerResult = createUnionType({
    name: 'RegisterCustomerResult',
    types: () => [Success, EmailAddressConflictError],
    resolveType(value) {
        if (value instanceof EmailAddressConflictError) {
            return EmailAddressConflictError;
        }

        return Success;
    },
});
