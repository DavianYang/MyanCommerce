import { EmailAddressConflictError } from '@myancommerce/nsx-error';
import { createUnionType } from '@nestjs/graphql';
import { CustomerDto } from '../customer.model';

export const UpdateCustomerResult = createUnionType({
    name: 'UpdateCustomerResult',
    types: () => [CustomerDto, EmailAddressConflictError],
    resolveType(value) {
        if (value instanceof EmailAddressConflictError) {
            return EmailAddressConflictError;
        }

        return CustomerDto;
    },
});
