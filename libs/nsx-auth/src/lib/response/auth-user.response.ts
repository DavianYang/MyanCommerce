import { UserDto } from '@myancommerce/nsx-user';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserResponse {
    @Field(() => UserDto)
    user: UserDto;

    @Field()
    token: string; // remove after adding cache session

    constructor(partial?: Partial<AuthUserResponse>) {
        Object.assign(this, partial);
    }
}
