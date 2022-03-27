import { InvalidCredentialsError } from '@myancommerce/nsx-error';
import { createUnionType } from '@nestjs/graphql';
import { AuthUserResponse } from '../response/auth-user.response';

export const AuthenticationResult = createUnionType({
    name: 'AuthenticationResult',
    types: () => [AuthUserResponse, InvalidCredentialsError],
});
