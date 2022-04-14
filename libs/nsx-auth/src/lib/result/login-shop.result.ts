import { createUnionType } from '@nestjs/graphql';
import { CurrentUser } from '@myancommerce/nsx-user';
import { InvalidCredentialsError } from '@myancommerce/nsx-error';

export const LoginShopResult = createUnionType({
    name: 'LoginShopResult',
    types: () => [CurrentUser, InvalidCredentialsError],
    resolveType(value) {
        if (value instanceof InvalidCredentialsError) {
            return InvalidCredentialsError;
        }

        return CurrentUser;
    },
});
