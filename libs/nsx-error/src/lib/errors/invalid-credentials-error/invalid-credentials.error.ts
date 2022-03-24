import { ObjectType, Field } from '@nestjs/graphql';
import { ErrorResult } from '../../base.graphql.error';

@ObjectType({
    description:
        'Returned if the user authentication credentials are not valid',
})
export class InvalidCredentialsError extends ErrorResult {
    @Field()
    authenticationError: String;
}
