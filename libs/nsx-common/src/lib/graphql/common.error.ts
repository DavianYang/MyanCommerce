import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
    UNKNOwN_ERROR,
}

registerEnumType(ErrorCode, {
    name: 'ErrorCode',
});

@ObjectType()
export class ErrorResult {
    @Field(() => ErrorCode)
    errorCode: ErrorCode;

    @Field()
    message: String;
}

@ObjectType({
    description:
        'Returned if the user authentication credentials are not valid',
})
export class InvalidCredentialsError extends ErrorResult {
    @Field()
    authenticationError: String;
}
