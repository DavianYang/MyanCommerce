import { Field, ObjectType } from '@nestjs/graphql';
import { Administrator } from '@prisma/client';
import { BaseModel } from '@myancommerce/nsx-common';
import { UserDto } from '@myancommerce/nsx-user';

@ObjectType()
export class AdministratorDto
    extends BaseModel
    implements Partial<Administrator>
{
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    emailAddress!: string;

    @Field(() => UserDto)
    user?: UserDto;
}
