import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
    @Field()
    emailAddress: string;

    @Field()
    password: string;
}
