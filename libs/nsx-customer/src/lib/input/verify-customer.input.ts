import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyCustomerInput {
    @Field(() => String)
    token: string;

    @Field(() => String, { nullable: true })
    password?: string;
}
