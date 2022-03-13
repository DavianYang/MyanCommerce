import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserResponse {
    @Field(() => ID)
    id: string;

    @Field()
    identifier: string;

    @Field()
    token: string; // remove after adding cache session

    constructor(partial?: Partial<AuthUserResponse>) {
        Object.assign(this, partial);
    }
}
