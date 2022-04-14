import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class RoleDto implements Partial<Role> {
    @Field(() => ID)
    id: number;

    @Field()
    code: string;

    @Field()
    description: string;
}
