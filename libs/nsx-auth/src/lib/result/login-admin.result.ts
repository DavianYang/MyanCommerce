import { createUnionType } from '@nestjs/graphql';
import { CurrentUser } from '@myancommerce/nsx-user';
import { InvalidCredentialsError } from '@myancommerce/nsx-error';

export const LoginAdminResult = createUnionType({
    name: 'LoginAdminResult',
    types: () => [CurrentUser, InvalidCredentialsError],
    resolveType(value) {
        if (value instanceof InvalidCredentialsError) {
            return InvalidCredentialsError;
        }

        return CurrentUser;
    },
});
