import {
    EmailAddressConflictError,
    PasswordValidationError,
} from '@myancommerce/nsx-error';
import { createUnionType } from '@nestjs/graphql';
import { AdministratorDto } from '../administrator.model';

export const CreateAdmnistratorResult = createUnionType({
    name: 'CreateAdmnistratorResult',
    types: () => [
        AdministratorDto,
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

        return AdministratorDto;
    },
});
