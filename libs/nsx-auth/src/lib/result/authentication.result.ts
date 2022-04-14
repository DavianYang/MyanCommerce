import {
    EmailAddressConflictError,
    InvalidCredentialsError,
} from '@myancommerce/nsx-error';
import { createUnionType } from '@nestjs/graphql';
import { AuthUserResponse } from '../response/auth-user.response';

export const AuthenticationResult = createUnionType({
    name: 'AuthenticationResult',
    types: () => [
        AuthUserResponse,
        InvalidCredentialsError,
        EmailAddressConflictError,
    ],
    resolveType(value) {
        if (value instanceof EmailAddressConflictError) {
            return EmailAddressConflictError;
        }

        if (value instanceof InvalidCredentialsError) {
            return InvalidCredentialsError;
        }

        return AuthUserResponse;
    },
});
