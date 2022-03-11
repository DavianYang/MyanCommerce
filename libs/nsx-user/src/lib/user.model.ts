import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@myancommerce/nsx-common';
import { RoleDto } from '@myancommerce/nsx-role';

@ObjectType()
export class UserDto extends BaseModel {
    @Field()
    identifier: string;

    @Field()
    verified: boolean;

    @Field(() => [RoleDto])
    roles: RoleDto[];

    @Field({ nullable: true })
    lastLogin: Date;
}
