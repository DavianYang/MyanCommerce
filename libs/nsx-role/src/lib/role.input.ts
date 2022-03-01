import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoleWhereInput {
    @Field()
    code: string;

    @Field()
    description: string;
}
