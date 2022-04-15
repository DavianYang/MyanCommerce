import { Field, ObjectType } from '@nestjs/graphql';

import { BaseModel } from '@myancommerce/nsx-common';
import { Authentication } from '@prisma/client';
import { UserDto } from '@myancommerce/nsx-user';

@ObjectType()
export class AuthenticationDto
    extends BaseModel
    implements Partial<Authentication>
{
    @Field(() => String)
    identifier: string;

    @Field(() => String)
    method: string;

    @Field(() => String)
    passwordHash: string;

    @Field(() => String, { nullable: true })
    verificationToken?: string;

    @Field(() => String, { nullable: true })
    passwordResetToken?: string;

    @Field(() => String, { nullable: true })
    identifierChangeToken?: string;

    @Field(() => String, { nullable: true })
    pendingIdentifier?: string;

    @Field(() => UserDto)
    user?: UserDto;
}
