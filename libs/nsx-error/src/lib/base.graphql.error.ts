import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorResult {
    @Field()
    errorCode: String;

    @Field()
    message: String;
}
