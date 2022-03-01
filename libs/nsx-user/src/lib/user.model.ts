import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@myancommerce/nsx-common';
import { Role } from '@myancommerce/nsx-role';

@ObjectType()
export class User extends BaseModel {
    @Field()
    identifier: string;

    @Field()
    verified: boolean;

    @Field(() => [Role])
    roles: Role[];

    @Field({ nullable: true })
    lastLogin: Date;
}
