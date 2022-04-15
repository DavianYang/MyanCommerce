import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { Node } from '@myancommerce/nsx-common';

@ObjectType()
export class CurrentUser extends Node implements Partial<User> {
    @Field(() => String)
    identifier: string;
}
