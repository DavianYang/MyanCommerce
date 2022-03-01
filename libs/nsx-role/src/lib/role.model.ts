import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Role {
    @Field(() => ID)
    id: number;

    @Field()
    code: string;

    @Field()
    description: string;
}
