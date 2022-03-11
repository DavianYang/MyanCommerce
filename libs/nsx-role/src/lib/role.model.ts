import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleDto {
    @Field(() => ID)
    id: number;

    @Field()
    code: string;

    @Field()
    description: string;
}
