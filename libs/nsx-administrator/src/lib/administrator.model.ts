import { Field, ObjectType, ArgsType, Int } from '@nestjs/graphql';
import { Administrator } from '@prisma/client';
import { BaseModel } from '@myancommerce/nsx-common';
import { User } from '@myancommerce/nsx-user';

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

    @Field()
    user?: User;
}

@ArgsType()
export class PaginationArgs {
    @Field(() => String, { nullable: true })
    cursor?: string;

    @Field(() => Int, { nullable: true })
    take?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;
}
