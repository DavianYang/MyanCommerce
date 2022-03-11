import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
    @Field()
    code: string;

    @Field()
    description: string;
}

@InputType()
export class UpdateRoleInput {
    @Field()
    code: string;

    @Field()
    description: string;
}
