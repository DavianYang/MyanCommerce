import { createUnionType } from '@nestjs/graphql';

import {
    MissingPasswordError,
    PasswordAlreadySetError,
    PasswordValidationError,
    VerificationTokenExpired,
    VerificationTokenInvalidError,
} from '@myancommerce/nsx-error';
import { CurrentUser } from '@myancommerce/nsx-user';

export const VerifyCustomerResult = createUnionType({
    name: 'VerifyCustomerResult',
    types: () => [
        CurrentUser,
        VerificationTokenInvalidError,
        VerificationTokenExpired,
        PasswordAlreadySetError,
        PasswordValidationError,
        MissingPasswordError,
    ],
    resolveType(value) {
        if (value instanceof VerificationTokenInvalidError) {
            return VerificationTokenInvalidError;
        }

        if (value instanceof VerificationTokenExpired) {
            return VerificationTokenExpired;
        }

        if (value instanceof PasswordAlreadySetError) {
            return PasswordAlreadySetError;
        }

        if (value instanceof PasswordValidationError) {
            return PasswordValidationError;
        }

        if (value instanceof MissingPasswordError) {
            return MissingPasswordError;
        }

        return CurrentUser;
    },
});
