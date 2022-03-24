import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@myancommerce/nsx-common';
import { RoleDto } from '@myancommerce/nsx-role';

@ObjectType()
export class UserDto extends BaseModel {
    @Field(() => Date, { nullable: true })
    deletedAt?: Date;

    @Field(() => String)
    identifier: string;

    @Field(() => Boolean)
    verified: boolean;

    @Field(() => [RoleDto])
    roles: RoleDto[];

    @Field(() => Date, { nullable: true })
    lastLogin: Date;
}
