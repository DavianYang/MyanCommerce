import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { BaseModel } from '@myancommerce/nsx-common';
import { RoleDto } from '@myancommerce/nsx-role';
import { AuthenticationDto } from '@myancommerce/nsx-auth';

@ObjectType()
export class UserDto extends BaseModel implements Partial<User> {
    @Field(() => Date, { nullable: true })
    deletedAt?: Date;

    @Field(() => String)
    identifier: string;

    @Field(() => Boolean)
    verified: boolean;

    @Field(() => Date, { nullable: true })
    lastLogin: Date;

    @Field(() => [RoleDto])
    roles?: RoleDto[];

    @Field(() => [AuthenticationDto])
    authentication: AuthenticationDto[];
}
